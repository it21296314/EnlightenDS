from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import base64
import numpy as np
import cv2
from keras.models import load_model
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the pre-trained model for emotion detection
model = load_model('emotion_model_csv_chathu.h5')

# Load Haar Cascade for face detection
faceDetect = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Define emotion labels
labels_dict = {0: 'Angry', 1: 'Disgust', 2: 'Fear', 3: 'Happy', 4: 'Sad', 5: 'Surprise'}

# Endpoint for emotion detection
@app.route('/detect-emotion', methods=['POST'])
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
        resized = cv2.resize(sub_face_img, (48, 48))
        normalize = resized / 255.0
        reshaped = np.reshape(normalize, (1, 48, 48, 1))

        # Predict the emotion and its probability
        result = model.predict(reshaped)
        label = np.argmax(result, axis=1)[0]
        probability = np.max(result)

        # Update emotion if prediction is above certain probability
        if probability > 0.5:
            emotion = labels_dict[label]
        
        # Drawing rectangle and displaying emotion on the frame (Optional for debugging)
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 1)
        cv2.rectangle(frame, (x, y), (x+w, y+h), (50, 50, 255), 2)
        cv2.rectangle(frame, (x, y-40), (x+w, y), (50, 50, 255), -1)
        cv2.putText(frame, f"{emotion}: {probability:.2f}", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

    # Returning detected emotion
    return jsonify({'emotion': emotion})

if __name__ == '__main__':
    app.run(debug=True)
