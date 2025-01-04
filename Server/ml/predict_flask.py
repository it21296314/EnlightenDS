from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os

app = Flask(__name__)

# Load the trained model and scaler at startup
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "logistic_regression_model.pkl")
scaler_path = os.path.join(script_dir, "scaler.pkl")

try:
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    print("Model and scaler loaded successfully.")
except Exception as e:
    print(f"Error loading model or scaler: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON
        input_data = request.get_json()
        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        # Convert input data to DataFrame
        df = pd.DataFrame([input_data])

        # Preprocess categorical variables
        df = pd.get_dummies(df, columns=["gender", "category", "difficulty"], drop_first=True)

        # Standardize numerical features
        columns = scaler.get_feature_names_out() if hasattr(scaler, "get_feature_names_out") else None
        df = df.reindex(columns=columns, fill_value=0)  # Ensure all columns match
        df_scaled = scaler.transform(df)

        # Make prediction
        readiness_prediction = model.predict(df_scaled)
        probability = model.predict_proba(df_scaled)[0]

        # Prepare and return response
        response = {
            "readiness": int(readiness_prediction[0]),
            "probability": {
                "not_ready": float(probability[0]),
                "ready": float(probability[1]),
            },
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
