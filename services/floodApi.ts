// services/floodApi.ts

// Features we send to the backend model
export interface FloodFeatures {
  rainfall: number;        // mm
  river_level: number;     // metres (approx)
  soil_saturation: number; // 0–100 %
  dam_status: number;      // 0–1 (health of dams / upstream situation)
}

// What we expect back from the Flask API
export interface FloodApiResult {
  severity: string;   // "Low", "Moderate", "High"
  probability: number; // 0–1
  message: string;
}

export async function getFloodPrediction(
  features: FloodFeatures
): Promise<FloodApiResult> {
  const response = await fetch("http://127.0.0.1:5000/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(features),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Backend error ${response.status}: ${text}`);
  }

  return response.json();
}
