from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from gtts import gTTS
import os
import phonetics

app = Flask(__name__)
CORS(app)

# Paths for images and audio
BASE_DIR = "./static"
IMAGE_FOLDER = os.path.join(BASE_DIR, "images")
AUDIO_FOLDER = os.path.join(BASE_DIR, "audio")

# Utility function to create audio dynamically
def generate_audio(word):
    audio_file = os.path.join(AUDIO_FOLDER, f"{word}.mp3")
    if not os.path.exists(audio_file):
        tts = gTTS(word, lang='en')
        tts.save(audio_file)
    return f"/static/audio/{word}.mp3"

# Dynamic loading of categories and images
def get_categories_and_images():
    categories = {}
    if os.path.exists(IMAGE_FOLDER):
        for category in os.listdir(IMAGE_FOLDER):
            category_path = os.path.join(IMAGE_FOLDER, category)
            if os.path.isdir(category_path):
                categories[category] = [
                    {
                        "word": os.path.splitext(img)[0],
                        "imageUrl": f"/static/images/{category}/{img}",
                        "audioUrl": generate_audio(os.path.splitext(img)[0]),
                    }
                    for img in os.listdir(category_path)
                    if os.path.isfile(os.path.join(category_path, img))
                ]
    return categories

@app.route("/categories", methods=["GET"])
def get_categories():
    """Endpoint to list all available categories."""
    categories = get_categories_and_images()
    return jsonify({"categories": list(categories.keys())})

@app.route("/get-images/<category>", methods=["GET"])
def get_images_by_category(category):
    """Endpoint to serve all images for a specific category."""
    categories = get_categories_and_images()
    if category not in categories:
        return jsonify({"error": "Category not found"}), 404
    return jsonify({"images": categories[category]})

@app.route("/get-audio/<word>", methods=["GET"])
def get_audio(word):
    """Endpoint to serve pre-generated audio for the word."""
    audio_file = os.path.join(AUDIO_FOLDER, f"{word}.mp3")
    if not os.path.exists(audio_file):
        return jsonify({"error": "Audio not found"}), 404
    return send_from_directory(AUDIO_FOLDER, f"{word}.mp3")

@app.route("/check-pronunciation", methods=["POST"])
def check_pronunciation():
    """Endpoint to check user's pronunciation."""
    data = request.json
    target_word = data.get("word")
    user_input = data.get("spokenWord")

    if not target_word or not user_input:
        return jsonify({"isCorrect": False, "message": "Invalid input."})
    
    target_phonetics = phonetics.metaphone(target_word)
    user_phonetics = phonetics.metaphone(user_input)

    if target_phonetics == user_phonetics:
        return jsonify({"isCorrect": True, "message": "Great job! Pronunciation is correct."})
    else:
        return jsonify({"isCorrect": False, "message": "Try again. Focus on the sounds."})

if __name__ == "__main__":
    os.makedirs(AUDIO_FOLDER, exist_ok=True)
    app.run(debug=True, port=5000)
