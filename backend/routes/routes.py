from flask import Blueprint, request, jsonify, send_file
import cv2
import tempfile
import base64
import os
import numpy as np
from werkzeug.utils import secure_filename

from models.model import model, detector, predictor
from utils.utils import get_landmarks, normalize_landmarks, calculate_features, draw_landmarks

routes = Blueprint("routes", __name__)

preview_image_path = "preview.jpg"

@routes.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "Image file is required."}), 400

    file = request.files["image"]
    filename = secure_filename(file.filename)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp:
        file.save(temp.name)
        image = cv2.imread(temp.name)

    try:
        result = get_landmarks(image, detector, predictor)
        if result is None:
            return jsonify({"error": "No face detected."})

        landmarks = result['landmarks']
        face_rect = result['face_rect']
        norm_landmarks = normalize_landmarks(landmarks, face_rect)
        features = calculate_features(norm_landmarks).reshape(1, -1)
        prediction = model.predict(features)[0]
        prob = model.predict_proba(features)[0][prediction]

        vis_image = draw_landmarks(image.copy(), landmarks, label=prediction, probability=prob)
        cv2.imwrite(preview_image_path, vis_image)
        _, buffer = cv2.imencode('.jpg', vis_image)
        img_base64 = base64.b64encode(buffer).decode('utf-8')

        return jsonify({
            "prediction": "DS" if prediction == 1 else "Healthy",
            "probability": round(prob * 100, 2),
            "image": img_base64
        })

    except Exception as e:
        return jsonify({"error": str(e)})

@routes.route("/preview.jpg")
def preview():
    if os.path.exists(preview_image_path):
        return send_file(preview_image_path, mimetype='image/jpeg')
    return jsonify({"error": "No preview image available. Please run a prediction first."})

@routes.route("/")
def home():
    return "DS Landmark Model API is running."
