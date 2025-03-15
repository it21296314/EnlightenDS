# import cv2
# import numpy as np
# import dlib

# # Load dlib models
# detector = dlib.get_frontal_face_detector()
# predictor = dlib.shape_predictor("models/shape_predictor_68_face_landmarks.dat")

# def get_landmarks(image):
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) if len(image.shape) > 2 else image
#     faces = detector(gray)
    
#     for face in faces:
#         landmarks = predictor(gray, face)
#         points = [(landmarks.part(n).x, landmarks.part(n).y) for n in range(68)]
#         return points
#     return None

# def align_face(image, landmarks):
#     left_eye = np.mean(np.array(landmarks[36:42]), axis=0)
#     right_eye = np.mean(np.array(landmarks[42:48]), axis=0)
    
#     dy, dx = right_eye[1] - left_eye[1], right_eye[0] - left_eye[0]
#     angle = np.degrees(np.arctan2(dy, dx))
    
#     eye_center = tuple(np.mean([left_eye, right_eye], axis=0))
#     rotation_matrix = cv2.getRotationMatrix2D(eye_center, angle, scale=1.0)

#     aligned_image = cv2.warpAffine(image, rotation_matrix, (image.shape[1], image.shape[0]), flags=cv2.INTER_LINEAR)
#     return aligned_image, landmarks

# def crop_face(image, landmarks, padding=0.1):
#     min_x, max_x = min(landmarks, key=lambda x: x[0])[0], max(landmarks, key=lambda x: x[0])[0]
#     min_y, max_y = min(landmarks, key=lambda x: x[1])[1], max(landmarks, key=lambda x: x[1])[1]

#     width, height = max_x - min_x, max_y - min_y
#     max_dim = max(width, height)

#     padding_px = int(max_dim * padding)
#     new_min_x, new_max_x = max(min_x - padding_px, 0), min(max_x + padding_px, image.shape[1])
#     new_min_y, new_max_y = max(min_y - padding_px, 0), min(max_y + padding_px, image.shape[0])

#     cropped_image = image[new_min_y:new_max_y, new_min_x:new_max_x]
#     return cv2.resize(cropped_image, (300, 300))





import cv2
import numpy as np
import dlib

# Load facial landmark detector
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

def is_frontal_face(landmarks):
    """Check if the face is frontal based on facial landmarks."""
    left_eye = np.mean(np.array(landmarks[36:42]), axis=0)
    right_eye = np.mean(np.array(landmarks[42:48]), axis=0)
    nose_tip = np.array(landmarks[30])
    eye_distance = np.linalg.norm(left_eye - right_eye)
    nose_to_left_eye = np.linalg.norm(nose_tip - left_eye)
    nose_to_right_eye = np.linalg.norm(nose_tip - right_eye)
    symmetry_threshold = 0.3 * eye_distance
    return abs(nose_to_left_eye - nose_to_right_eye) < symmetry_threshold

def get_landmarks(image_input):
    """Extract facial landmarks from an image."""
    if len(image_input.shape) == 2:  # Check if grayscale
        gray = image_input
    else:
        gray = cv2.cvtColor(image_input, cv2.COLOR_BGR2GRAY)
    
    faces = detector(gray)
    for face in faces:
        landmarks = predictor(gray, face)
        points = [(landmarks.part(n).x, landmarks.part(n).y) for n in range(68)]
        # Add a custom landmark (point 68) as the midpoint between eyebrows
        midpoint_x = (points[21][0] + points[22][0]) // 2
        midpoint_y = (points[21][1] + points[22][1]) // 2
        points.append((midpoint_x, midpoint_y))
        if is_frontal_face(points):
            return points
    return None

def align_face(image, landmarks):
    """Align face horizontally based on eye positions."""
    if landmarks is None or len(landmarks) < 68:
        raise ValueError("Landmarks are invalid or incomplete.")

    # Convert landmarks to numpy array
    landmarks = np.array(landmarks, dtype=np.float32)

    # Calculate the center of the left and right eyes
    left_eye_center = np.mean(landmarks[36:42], axis=0)
    right_eye_center = np.mean(landmarks[42:48], axis=0)

    # Calculate the angle between the eye centers
    dy = right_eye_center[1] - left_eye_center[1]
    dx = right_eye_center[0] - left_eye_center[0]
    angle = np.degrees(np.arctan2(dy, dx))

    # Calculate the center point between the two eyes
    eye_center = tuple(np.mean([left_eye_center, right_eye_center], axis=0))

    # Get the rotation matrix for the alignment
    rotation_matrix = cv2.getRotationMatrix2D(eye_center, angle, scale=1.0)

    # Perform the alignment
    aligned_image = cv2.warpAffine(
        image,
        rotation_matrix,
        (image.shape[1], image.shape[0]),
        flags=cv2.INTER_LINEAR
    )

    # Transform the landmarks to match the aligned image
    ones = np.ones((landmarks.shape[0], 1), dtype=np.float32)  # Homogeneous coordinates
    landmarks_hom = np.hstack([landmarks, ones])
    transformed_landmarks = rotation_matrix @ landmarks_hom.T
    transformed_landmarks = transformed_landmarks[:2].T  # Convert back to (x, y) format

    return aligned_image, transformed_landmarks

def crop_face(image, landmarks, padding_percentage=0.1):
    """Crop the face from the image based on facial landmarks."""
    min_x = min(landmarks, key=lambda x: x[0])[0]
    max_x = max(landmarks, key=lambda x: x[0])[0]
    min_y = min(landmarks, key=lambda x: x[1])[1]
    max_y = max(landmarks, key=lambda x: x[1])[1]

    width = max_x - min_x
    height = max_y - min_y
    max_dimension = max(width, height)

    padding = int(max_dimension * padding_percentage)
    center_x = (min_x + max_x) // 2
    center_y = (min_y + max_y) // 2

    available_left = min_x
    available_right = image.shape[1] - max_x
    available_top = min_y
    available_bottom = image.shape[0] - max_y

    if available_left >= padding and available_right >= padding and available_top >= padding and available_bottom >= padding:
        actual_padding = padding
    else:
        actual_padding = min(available_left, available_right, available_top, available_bottom)

    size = max_dimension + actual_padding * 2

    new_min_x = max(int(center_x - size // 2), 0)
    new_max_x = min(int(center_x + size // 2), image.shape[1])
    new_min_y = max(int(center_y - size // 2), 0)
    new_max_y = min(int(center_y + size // 2), image.shape[0])

    cropped_image = image[new_min_y:new_max_y, new_min_x:new_max_x]
    cropped_image_resized = cv2.resize(cropped_image, (300, 300))

    return cropped_image_resized