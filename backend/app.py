# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score

# ---------------------------------------------------------------------
# 1. FLOOD MODEL (synthetic, same idea as before)
# ---------------------------------------------------------------------


def generate_synthetic_flood_data(n_samples: int = 600, random_state: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(random_state)

    # Some typical danger levels for different rivers (in meters)
    danger_level_choices = rng.choice([36.0, 49.5, 50.0, 73.0], size=n_samples)

    rain = rng.gamma(shape=2.0, scale=20.0, size=n_samples)
    rain3d = rain + rng.normal(loc=40.0, scale=20.0, size=n_samples)
    rain3d = np.clip(rain3d, 0.0, None)

    river_level = danger_level_choices + rng.normal(loc=-1.0, scale=2.0, size=n_samples)

    soil_moist = np.clip(
        20.0 + 0.3 * rain3d + rng.normal(0.0, 10.0, size=n_samples),
        10.0,
        95.0,
    )

    upstream_rain = np.clip(
        rain + rng.normal(10.0, 25.0, size=n_samples),
        0.0,
        None,
    )

    tba_alert = (
        (rain > 100.0)
        | (river_level > (danger_level_choices - 0.5))
        | (rain3d > 220.0)
    ).astype(int)

    severity = []
    for i in range(n_samples):
        sev = 0
        if (
            (rain3d[i] > 250.0 and river_level[i] > danger_level_choices[i])
            or (rain[i] > 160.0 and upstream_rain[i] > 180.0)
        ):
            sev = 2
        elif (
            (rain3d[i] > 150.0 and river_level[i] > danger_level_choices[i] - 1.0)
            or (rain[i] > 90.0 and soil_moist[i] > 60.0)
        ):
            sev = 1
        severity.append(sev)

    data = pd.DataFrame(
        {
            "Rain_mm": rain.round(1),
            "Rain3d_mm": rain3d.round(1),
            "RiverLevel_m": river_level.round(2),
            "DangerLevel_m": danger_level_choices,
            "SoilMoist_pct": soil_moist.round(1),
            "UpstreamRain_mm": upstream_rain.round(1),
            "TBA_Alert": tba_alert,
            "FloodSeverity": severity,
        }
    )
    return data


print("Training flood model...")
df_flood = generate_synthetic_flood_data()

flood_feature_cols = [
    "Rain_mm",
    "Rain3d_mm",
    "RiverLevel_m",
    "DangerLevel_m",
    "SoilMoist_pct",
    "UpstreamRain_mm",
    "TBA_Alert",
]

X_flood = df_flood[flood_feature_cols]
y_flood = df_flood["FloodSeverity"]

X_train_f, X_test_f, y_train_f, y_test_f = train_test_split(
    X_flood, y_flood, test_size=0.3, random_state=42
)

flood_model = GradientBoostingClassifier(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=3,
    random_state=42,
)
flood_model.fit(X_train_f, y_train_f)

y_pred_f = flood_model.predict(X_test_f)
flood_accuracy = accuracy_score(y_test_f, y_pred_f)
print(f"Flood model trained. Test accuracy: {flood_accuracy:.3f}")


def compute_tba_alert(rain_mm: float, rain3d_mm: float, river_level_m: float, danger_level_m: float) -> int:
    return int(
        (rain_mm > 100.0)
        or (river_level_m > (danger_level_m - 0.5))
        or (rain3d_mm > 220.0)
    )


# ---------------------------------------------------------------------
# 2. HAZARD MODEL (state-level, loaded from joblib)
# ---------------------------------------------------------------------

HAZARD_MODEL_PATH = "hazard_model.pkl"
HAZARD_LABEL_ENCODER_PATH = "hazard_label_encoder.pkl"

hazard_model = None
hazard_label_encoder = None
hazard_model_ready = False

try:
    hazard_model = joblib.load(HAZARD_MODEL_PATH)
    hazard_label_encoder = joblib.load(HAZARD_LABEL_ENCODER_PATH)
    hazard_model_ready = True
    print("Hazard model and label encoder loaded successfully.")
except Exception as exc:
    print("WARNING: could not load hazard model:", exc)
    hazard_model_ready = False


# ---------------------------------------------------------------------
# 3. FLASK APP
# ---------------------------------------------------------------------

app = Flask(__name__)
CORS(app)


@app.route("/api/predict", methods=["POST"])
def predict_flood():
    """
    Expects JSON body:
    {
      "rain_mm": 120,
      "rain3d_mm": 260,
      "river_level_m": 51.2,
      "danger_level_m": 50.0,
      "soil_moist_pct": 70,
      "upstream_rain_mm": 180
    }
    """
    data = request.get_json(force=True)

    try:
        rain_mm = float(data["rain_mm"])
        rain3d_mm = float(data["rain3d_mm"])
        river_level_m = float(data["river_level_m"])
        danger_level_m = float(data["danger_level_m"])
        soil_moist_pct = float(data["soil_moist_pct"])
        upstream_rain_mm = float(data["upstream_rain_mm"])
    except (KeyError, ValueError) as e:
        return jsonify({"error": f"Invalid input: {e}"}), 400

    tba_alert = compute_tba_alert(rain_mm, rain3d_mm, river_level_m, danger_level_m)

    row = pd.DataFrame(
        [
            {
                "Rain_mm": rain_mm,
                "Rain3d_mm": rain3d_mm,
                "RiverLevel_m": river_level_m,
                "DangerLevel_m": danger_level_m,
                "SoilMoist_pct": soil_moist_pct,
                "UpstreamRain_mm": upstream_rain_mm,
                "TBA_Alert": tba_alert,
            }
        ]
    )

    sev_idx = int(flood_model.predict(row)[0])
    severity_map = {0: "Low", 1: "Moderate", 2: "High"}

    return jsonify(
        {
            "severity_index": sev_idx,
            "severity_label": severity_map.get(sev_idx, "Unknown"),
            "tba_alert": tba_alert,
            "model_accuracy": round(float(flood_accuracy), 3),
        }
    )


@app.route("/hazard_predict", methods=["POST"])
def hazard_predict():
    """
    Expects JSON body:
    {
      "state": "Kerala",
      "avg_annual_rain_mm": 2924,
      "avg_temp_c": 28,
      "avg_humidity_pct": 82,
      "coastal": 1,
      "mountainous": 0
    }
    """
    if not hazard_model_ready:
        return jsonify({"error": "Hazard model not available on server"}), 500

    data = request.get_json(force=True)

    try:
        state = str(data["state"])
        avg_annual_rain_mm = float(data["avg_annual_rain_mm"])
        avg_temp_c = float(data["avg_temp_c"])
        avg_humidity_pct = float(data["avg_humidity_pct"])
        coastal = int(data["coastal"])
        mountainous = int(data["mountainous"])
    except (KeyError, ValueError) as e:
        return jsonify({"error": f"Invalid input: {e}"}), 400

    X = pd.DataFrame(
        [
            {
                "state": state,
                "avg_annual_rain_mm": avg_annual_rain_mm,
                "avg_temp_c": avg_temp_c,
                "avg_humidity_pct": avg_humidity_pct,
                "coastal": coastal,
                "mountainous": mountainous,
            }
        ]
    )

    # hazard_model is a full sklearn Pipeline (preprocessing + classifier)
    proba = hazard_model.predict_proba(X)[0]
    idx = int(np.argmax(proba))
    label = hazard_label_encoder.inverse_transform([idx])[0]
    confidence = float(proba[idx])

    return jsonify(
        {
            "hazard_label": label,
            "hazard_confidence": round(confidence, 3),
        }
    )


@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    # Exposed on 5000 so that your React/Vite frontend can call it
    app.run(host="0.0.0.0", port=5000, debug=True)
