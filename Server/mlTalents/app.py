from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os
import numpy as np
import sklearn
\

app = Flask(__name__)
print(sklearn.__version__)
# Determine the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Build full paths to the model, scaler, and label encoder files
model_path = os.path.join(script_dir, "talent_rf_model.pkl")
scaler_path = os.path.join(script_dir, "scaler.pkl")
encoder_path = os.path.join(script_dir, "label_encoder.pkl")

# Load the trained model, scaler, and label encoder at startup
try:
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    label_encoder = joblib.load(encoder_path)
    print("Model, scaler, and label encoder loaded successfully.")
except Exception as e:
    print(f"Error loading model, scaler, or label encoder: {e}")

@app.route('/getTalent', methods=['POST'])
def get_talent():
    try:
        # Parse input JSON
        input_data = request.get_json()
        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        # Expected feature keys
        expected_keys = [
            "quiz_time",
            "quiz_score",
            "piano_time",
            "piano_key_count",
            "drawing_time",
            "drawing_similarity"
        ]

        # Verify that all required keys are present
        for key in expected_keys:
            if key not in input_data:
                return jsonify({"error": f"Missing required field: {key}"}), 400

        # Convert input data into a DataFrame (ensuring the column order)
        df = pd.DataFrame([input_data])[expected_keys]

        # Standardize the numerical features using the loaded scaler
        df_scaled = scaler.transform(df)

        # Make prediction using the Random Forest model
        prediction = model.predict(df_scaled)
        predicted_label = label_encoder.inverse_transform(prediction)[0]

        # Get prediction probabilities for each class
        probabilities = model.predict_proba(df_scaled)[0]
        prob_dict = {}
        for idx, class_name in enumerate(label_encoder.classes_):
            prob_dict[class_name] = float(probabilities[idx])

        # Prepare the response
        response = {
            "predicted_talent": predicted_label,
            "probabilities": prob_dict
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(debug=True, port=5000)
