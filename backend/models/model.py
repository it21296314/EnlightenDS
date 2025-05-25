import dlib
import pickle

# Load model and predictor
with open("improved_modell.pkl", "rb") as f:
    model = pickle.load(f)

predictor_path = "shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(predictor_path)

__all__ = ["model", "detector", "predictor"]
