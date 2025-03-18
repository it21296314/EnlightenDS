import os
from flask import Blueprint, request, jsonify
from models.face_model import preprocess_image, model, scaler

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files["image"]
    image_path = "temp.jpg"
    image_file.save(image_path)

    features = preprocess_image(image_path)
    if features is None:
        return jsonify({"error": "Invalid image or face not detected"}), 400

    prediction = model.predict(features)
    probability = model.predict_proba(features)[0][1] if hasattr(model, 'predict_proba') else None

    result = "Down Syndrome Detected" if prediction[0] == 1 else "No Down Syndrome Detected"
    confidence = float(probability) if probability is not None else None

    return jsonify({"prediction": result, "confidence": confidence})