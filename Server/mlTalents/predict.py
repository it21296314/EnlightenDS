from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np

app = Flask(__name__)

# 1. Provide the Dataset
@app.route('/dataset', methods=['GET'])
def get_dataset():
    """
    Returns the contents of 'synthetic_dataset3.xlsx' as JSON.
    """
    data = pd.read_excel('synthetic_dataset3.xlsx')
    # Convert the DataFrame to JSON
    dataset_json = data.to_json(orient='records')
    return dataset_json, 200

# 2. Predict Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    """
    Expects JSON with the following fields:
      - quiz_time
      - quiz_score
      - piano_time
      - piano_key_count
      - drawing_time
      - drawing_similarity

    Returns the predicted talented_area.
    """
    # Load model and preprocessing objects
    model = joblib.load('talent_rf_model.pkl')
    scaler = joblib.load('scaler.pkl')
    label_encoder = joblib.load('label_encoder.pkl')

    # Parse the JSON input
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # Extract features in the correct order
    try:
        quiz_time = float(data['quiz_time'])
        quiz_score = float(data['quiz_score'])
        piano_time = float(data['piano_time'])
        piano_key_count = float(data['piano_key_count'])
        drawing_time = float(data['drawing_time'])
        drawing_similarity = float(data['drawing_similarity'])
    except KeyError as e:
        return jsonify({'error': f'Missing key: {str(e)}'}), 400
    except ValueError as e:
        return jsonify({'error': f'Invalid value type: {str(e)}'}), 400

    # Create a 2D array for a single sample
    sample = np.array([
        quiz_time,
        quiz_score,
        piano_time,
        piano_key_count,
        drawing_time,
        drawing_similarity
    ]).reshape(1, -1)

    # Scale the sample
    sample_scaled = scaler.transform(sample)

    # Make prediction
    prediction = model.predict(sample_scaled)
    predicted_label = label_encoder.inverse_transform(prediction)[0]

    return jsonify({'predicted_talented_area': predicted_label}), 200

# 3. Main entry point
if __name__ == '__main__':
    # You can specify a different port if you want
    app.run(debug=True, port=5000)
