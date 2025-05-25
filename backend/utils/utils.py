import numpy as np
import cv2
from scipy.spatial import distance

def get_landmarks(image, detector, predictor):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)
    if len(faces) == 0:
        return None
    largest_face = max(faces, key=lambda rect: rect.width() * rect.height())
    shape = predictor(gray, largest_face)
    coords = np.zeros((68, 2), dtype=int)
    for i in range(0, 68):
        coords[i] = (shape.part(i).x, shape.part(i).y)
    return {'landmarks': coords, 'face_rect': largest_face}

def normalize_landmarks(landmarks, face_rect):
    face_width = face_rect.width()
    face_height = face_rect.height()
    face_center_x = face_rect.left() + face_width / 2
    face_center_y = face_rect.top() + face_height / 2
    normalized = np.zeros_like(landmarks, dtype=float)
    for i in range(landmarks.shape[0]):
        normalized[i, 0] = (landmarks[i, 0] - face_center_x) / face_width
        normalized[i, 1] = (landmarks[i, 1] - face_center_y) / face_height
    return normalized

def calculate_features(landmarks):
    features = []
    def eye_aspect_ratio(eye):
        v1 = distance.euclidean(eye[1], eye[5])
        v2 = distance.euclidean(eye[2], eye[4])
        h = distance.euclidean(eye[0], eye[3])
        return (v1 + v2) / (2.0 * h)

    left_eye = landmarks[36:42]
    right_eye = landmarks[42:48]
    features.append(eye_aspect_ratio(left_eye))
    features.append(eye_aspect_ratio(right_eye))
    left_center = np.mean(left_eye, axis=0)
    right_center = np.mean(right_eye, axis=0)
    eye_dist = distance.euclidean(left_center, right_center)
    face_width = distance.euclidean(landmarks[0], landmarks[16])
    features.append(eye_dist / face_width)
    features.append(distance.euclidean(landmarks[31], landmarks[35]) / distance.euclidean(landmarks[27], landmarks[33]))
    features.append(distance.euclidean(landmarks[48], landmarks[54]) / distance.euclidean(landmarks[51], landmarks[57]))
    face_height = distance.euclidean(landmarks[8], landmarks[27])
    features.append(face_height / face_width)
    features.append(distance.euclidean(landmarks[39], landmarks[42]) / distance.euclidean(landmarks[36], landmarks[45]))
    a, b, c = landmarks[27], landmarks[30], landmarks[33]
    ba, bc = a - b, c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.arccos(np.clip(cosine_angle, -1.0, 1.0))
    features.append(np.degrees(angle))
    def eye_slant(eye):
        dx, dy = eye[0][0] - eye[3][0], eye[0][1] - eye[3][1]
        return np.degrees(np.arctan2(dy, dx))
    features.append(eye_slant(left_eye))
    features.append(eye_slant(right_eye))
    features.append(face_height / face_width)
    features.append(distance.euclidean(landmarks[33], landmarks[51]) / face_height)
    jaw_width = distance.euclidean(landmarks[4], landmarks[12])
    features.append(jaw_width / face_height)
    selected = [8, 27, 30, 33, 36, 39, 42, 45, 48, 54]
    for i in range(len(selected)):
        for j in range(i+1, len(selected)):
            features.append(distance.euclidean(landmarks[selected[i]], landmarks[selected[j]]) / face_width)
    return np.array(features)

def draw_landmarks(image, landmarks, label=None, probability=None):
    colors = {
        'jaw': (0, 255, 0),
        'left_eye': (255, 0, 0),
        'right_eye': (0, 0, 255),
        'mouth': (0, 255, 255),
        'nose': (255, 255, 0),
        'brows': (255, 0, 255)
    }
    for idx, (x, y) in enumerate(landmarks):
        if 0 <= idx <= 16:
            color = colors['jaw']
        elif 17 <= idx <= 26:
            color = colors['brows']
        elif 27 <= idx <= 35:
            color = colors['nose']
        elif 36 <= idx <= 41:
            color = colors['left_eye']
        elif 42 <= idx <= 47:
            color = colors['right_eye']
        elif 48 <= idx <= 67:
            color = colors['mouth']
        else:
            color = (0, 255, 0)
        cv2.circle(image, (x, y), 2, color, -1)
        cv2.putText(image, str(idx), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255, 255, 255), 1)
    # if label is not None and probability is not None:
    #     msg = f"Prediction: {'DS' if label == 1 else 'Healthy'} ({probability*100:.1f}%)"
    #     cv2.putText(image, msg, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
    if label is not None and probability is not None:
        is_healthy = (label == 0)
    msg = f"Prediction: {'DS' if not is_healthy else 'Healthy'} ({probability*100:.1f}%)"
    color = (0, 255, 0) if is_healthy else (0, 0, 255)  # Green if healthy, red otherwise
    cv2.putText(image, msg, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    
    legend_items = list(colors.items())
    for i, (name, color) in enumerate(legend_items):
        y = 50 + i * 20
        cv2.circle(image, (10, y), 5, color, -1)
        cv2.putText(image, name.replace('_', ' ').title(), (20, y + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 255), 1)
    return image
