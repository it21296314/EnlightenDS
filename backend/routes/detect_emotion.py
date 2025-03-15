from flask import Blueprint, request, jsonify
import base64
import numpy as np
import cv2
from io import BytesIO
from PIL import Image
from utils.preprocess import preprocess_image
from models.model_loader import load_emotion_model, load_face_cascade

# Create a Blueprint for routes
detect_emotion_bp = Blueprint('detect_emotion', __name__)

# Load the pre-trained model and Haar Cascade
model = load_emotion_model()
faceDetect = load_face_cascade()

# Define emotion labels
labels_dict = {0: 'Angry', 1: 'Disgust', 2: 'Fear', 3: 'Happy', 4: 'Sad', 5: 'Surprise'}

# Endpoint for emotion detection
@detect_emotion_bp.route('/detect-emotion', methods=['POST'])
def detect_emotion():
    data = request.json.get('image')
    if not data:
        return jsonify({'error': 'No image provided'}), 400

    # Decode base64 image data
    image_data = base64.b64decode(data.split(',')[1])
    image = Image.open(BytesIO(image_data))
    frame = np.array(image)

    # Convert frame to grayscale for face detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceDetect.detectMultiScale(gray, 1.3, 3)

    # For each detected face, perform emotion detection
    emotion = 'Unknown'
    for (x, y, w, h) in faces:
        sub_face_img = gray[y:y+h, x:x+w]
        resized, reshaped = preprocess_image(sub_face_img)

        # Predict the emotion and its probability
        result = model.predict(reshaped)
        label = np.argmax(result, axis=1)[0]
        probability = np.max(result)

        # Update emotion if prediction is above certain probability
        if probability > 0.5:
            emotion = labels_dict[label]

    # Returning detected emotion
    return jsonify({'emotion': emotion})
