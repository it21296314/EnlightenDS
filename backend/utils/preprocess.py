import cv2
import numpy as np

def preprocess_image(image):
    """
    Preprocess the image for emotion detection.
    """
    resized = cv2.resize(image, (48, 48))
    normalize = resized / 255.0
    reshaped = np.reshape(normalize, (1, 48, 48, 1))
    return resized, reshaped
