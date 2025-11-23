import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

# -----------------------------
# 1. Load Dataset
# -----------------------------
DATA_PATH = os.path.join("data", "india_state_hazard_5000.csv")  # update if filename is different

print(f"Loading dataset from: {DATA_PATH}")
df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully!")
print("Total samples:", len(df))
print(df.head())

# -----------------------------
# 2. Encode Categorical Columns
# -----------------------------
label_encoder = LabelEncoder()
df["hazard_label_encoded"] = label_encoder.fit_transform(df["hazard_label"])

# Features
X = df[["avg_annual_rain_mm", "avg_temp_c", "avg_humidity_pct", "coastal", "mountainous"]]

# Target
y = df["hazard_label_encoded"]

# -----------------------------
# 3. Train–Test Split (NO duplication)
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.30, random_state=42, stratify=y
)

print("Train size:", len(X_train))
print("Test size:", len(X_test))

# -----------------------------
# 4. Train Model
# -----------------------------
model = RandomForestClassifier(
    n_estimators=200, 
    random_state=42,
    class_weight="balanced"
)

model.fit(X_train, y_train)

# -----------------------------
# 5. Evaluate Model
# -----------------------------
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)

print("\nTest accuracy:", round(acc, 3))
print("\nClassification report:\n")
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# -----------------------------
# 6. Save Model + Label Encoder
# -----------------------------
joblib.dump(model, "hazard_model.pkl")
joblib.dump(label_encoder, "hazard_label_encoder.pkl")

print("\nModel saved as hazard_model.pkl")
print("Label encoder saved as hazard_label_encoder.pkl")
