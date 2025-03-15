from keras.models import load_model
import cv2

def load_emotion_model():
    """
    Load and return the pre-trained emotion detection model.
    """
    return load_model('models/emotion_model_csv_chathu.h5')

def load_face_cascade():
    """
    Load and return the Haar Cascade for face detection.
    """
    return cv2.CascadeClassifier('models/haarcascade_frontalface_default.xml')
