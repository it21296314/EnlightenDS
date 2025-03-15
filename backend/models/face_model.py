# import joblib
# import numpy as np
# from utils.face_utils import get_landmarks, align_face, crop_face
# from utils.feature_utils import extract_patches, extract_lbp_from_patches, extract_geometric_features

# # Load trained model
# MODEL_PATH = "models/trained_model.pkl"
# model_pipeline = joblib.load(MODEL_PATH)
# scaler = model_pipeline['scaler']
# model = model_pipeline['model']

# # Landmark pairs used for geometric features
# pairs = [
#     (36, 39), (39, 42), (42, 45), (27, 30), (30, 33), (33, 31),
#     (33, 35), (30, 31), (30, 35), (33, 51), (51, 48), (51, 54),
#     (51, 57), (48, 57), (54, 57), (39, 68), (42, 68)
# ]

# def preprocess_image(image_path):
#     import cv2

#     image = cv2.imread(image_path)
#     if image is None:
#         return None

#     landmarks = get_landmarks(image)
#     if landmarks is None or len(landmarks) < 68:
#         return None

#     try:
#         aligned_image, aligned_landmarks = align_face(image, landmarks)
#     except ValueError as e:
#         print(f"Error in alignment: {e}")
#         return None

#     cropped_image = crop_face(aligned_image, aligned_landmarks)
#     cropped_landmarks = get_landmarks(cropped_image)
#     if cropped_landmarks is None:
#         return None

#     patches = extract_patches(cropped_image, cropped_landmarks)
#     lbp_features = extract_lbp_from_patches(patches)
#     geom_features = extract_geometric_features(cropped_landmarks, pairs)

#     combined_features = np.hstack([lbp_features, geom_features])

#     # Padding for fixed-length features
#     max_length = 157
#     if len(combined_features) < max_length:
#         combined_features = np.pad(combined_features, (0, max_length - len(combined_features)), 'constant')

#     # Apply scaler
#     features = scaler.transform([combined_features])
    
#     return features


import os
import cv2
import numpy as npip
import joblib
from feature_utils import get_combined_features

# Load the trained model and scaler
MODEL_PATH = "trained_model.pkl"
model_pipeline = joblib.load(MODEL_PATH)
scaler = model_pipeline['scaler']  # Extract the scaler
model = model_pipeline['model']    # Extract the SVM model

def preprocess_image(image_path):
    """Preprocess image for prediction."""
    # Load image
    image = cv2.imread(image_path)
    if image is None:
        return None
    
    # Extract features
    features = get_combined_features(image)
    if features is None:
        return None
    
    # Handle NaN values
    features = np.nan_to_num(features)
    
    # Apply the same scaler from training
    features = scaler.transform([features])
    
    return features

def predict(image_path):
    """Make prediction on an image."""
    # Preprocess the image
    features = preprocess_image(image_path)
    if features is None:
        return None, None
    
    # Make prediction
    prediction = model.predict(features)
    probability = model.predict_proba(features)[0][1] if hasattr(model, 'predict_proba') else None
    
    result = "Down Syndrome Detected" if prediction[0] == 1 else "No Down Syndrome Detected"
    confidence = float(probability) if probability is not None else None
    
    return result, confidence