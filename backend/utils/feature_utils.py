# import numpy as np
# from skimage.feature import local_binary_pattern

# def extract_patches(image, landmarks, patch_size=32):
#     patches = []
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) if len(image.shape) > 2 else image

#     for x, y in landmarks:
#         patch = gray[max(y - patch_size // 2, 0): y + patch_size // 2, max(x - patch_size // 2, 0): x + patch_size // 2]
#         if patch.size > 0:
#             patches.append(patch)
#     return patches

# def extract_lbp_from_patches(patches, radius=1, points=8, method='uniform'):
#     lbp_features = []
#     for patch in patches:
#         lbp = local_binary_pattern(patch, points, radius, method)
#         hist, _ = np.histogram(lbp.ravel(), bins=np.arange(0, points + 3))
#         hist = hist.astype("float") / (hist.sum() + 1e-6)
#         lbp_features.extend(hist)
#     return lbp_features



import numpy as np
import cv2
from skimage.feature import local_binary_pattern
# from face_utils import get_landmarks, align_face, crop_face
from .face_utils import get_landmarks, align_face, crop_face


# Constants
RADIUS = 1
POINTS = 8 * RADIUS
METHOD = 'uniform'
PATCH_SIZE = 32

# Define landmark indices and pairs
landmark_indices = [36, 39, 42, 45, 27, 30, 33, 31, 35, 51, 48, 54, 57, 68]
pairs = [
    (36, 39), (39, 42), (42, 45), (27, 30), (30, 33), (33, 31),
    (33, 35), (30, 31), (30, 35), (33, 51), (51, 48), (51, 54),
    (51, 57), (48, 57), (54, 57), (39, 68), (42, 68)
]

def extract_patches(image, landmarks, indices, patch_size=PATCH_SIZE):
    """Extract image patches around specific landmarks."""
    patches = []
    if len(image.shape) == 2:  # Already grayscale
        gray = image
    else:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
    for idx in indices:
        (x, y) = landmarks[idx]
        x_start = max(x - patch_size // 2, 0)
        y_start = max(y - patch_size // 2, 0)
        x_end = min(x + patch_size // 2, gray.shape[1])
        y_end = min(y + patch_size // 2, gray.shape[0])
        patch = gray[y_start:y_end, x_start:x_end]
        if patch.size > 0:
            patches.append(patch)
    return patches

def extract_lbp_from_patches(patches, radius=RADIUS, points=POINTS, method=METHOD):
    """Extract local binary pattern features from image patches."""
    lbp_features = []
    for patch in patches:
        lbp = local_binary_pattern(patch, points, radius, method)
        hist, _ = np.histogram(lbp.ravel(), bins=np.arange(0, points + 3), range=(0, points + 2))
        hist = hist.astype("float")
        hist /= (hist.sum() + 1e-6)
        lbp_features.extend(hist)
    return lbp_features

def extract_geometric_features(landmarks, pairs):
    """Extract geometric features based on distances between landmark pairs."""
    geom_features = []
    for i, j in pairs:
        p1 = landmarks[i]
        p2 = landmarks[j]
        distance = np.linalg.norm(np.array(p1) - np.array(p2))
        geom_features.append(distance)
    return geom_features

def get_combined_features(image):
    """Extract combined LBP and geometric features from a face image."""
    landmarks = get_landmarks(image)
    if landmarks is None or len(landmarks) < 68:
        return None

    try:
        aligned_image, aligned_landmarks = align_face(image, landmarks)
    except ValueError as e:
        print(f"Error in alignment: {e}")
        return None

    cropped_image = crop_face(aligned_image, aligned_landmarks)

    cropped_landmarks = get_landmarks(cropped_image)
    if cropped_landmarks is None or len(cropped_landmarks) < 68:
        return None

    patches = extract_patches(cropped_image, cropped_landmarks, landmark_indices)
    lbp_features = extract_lbp_from_patches(patches)
    geom_features = extract_geometric_features(cropped_landmarks, pairs)

    lbp_array = np.array(lbp_features)
    geom_array = np.array(geom_features)
    combined_features = np.hstack([lbp_array, geom_array])
    
    # Important: Pad to match the expected feature length used during training
    max_length = 157  # This is the expected feature length from the training
    if len(combined_features) < max_length:
        combined_features = np.pad(combined_features, (0, max_length - len(combined_features)), 'constant')
    elif len(combined_features) > max_length:
        combined_features = combined_features[:max_length]
        
    return combined_features