from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from gtts import gTTS
import os
import phonetics

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient("mongodb+srv://it21342394:enlightends@cluster0.jflpe.mongodb.net/enlightends?retryWrites=true&w=majority&appName=Cluster0")
db = client["quiz_app"]
results_collection = db["results"]

BASE_DIR = "./static"
IMAGE_FOLDER = os.path.join(BASE_DIR, "images")
AUDIO_FOLDER = os.path.join(BASE_DIR, "audio")

def generate_audio(word):
    audio_path = os.path.join(AUDIO_FOLDER, f"{word}.mp3")
    if not os.path.exists(audio_path):
        tts = gTTS(word, lang="en")
        tts.save(audio_path)
    return f"/static/audio/{word}.mp3"

def get_categories_and_images():
    categories = {}
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
    categories = get_categories_and_images()
    return jsonify({"categories": list(categories.keys())})

@app.route("/get-images/<category>", methods=["GET"])
def get_images(category):
    categories = get_categories_and_images()
    if category not in categories:
        return jsonify({"error": "Category not found"}), 404
    return jsonify({"images": categories[category]})

@app.route("/check-pronunciation", methods=["POST"])
def check_pronunciation():
    data = request.json
    target_word = data.get("word")
    spoken_word = data.get("spokenWord")

    if not target_word or not spoken_word:
        return jsonify({"isCorrect": False, "message": "Invalid input."})
    
    if phonetics.metaphone(target_word) == phonetics.metaphone(spoken_word):
        return jsonify({"isCorrect": True, "message": "Correct pronunciation!"})
    else:
        return jsonify({"isCorrect": False, "message": "Try again."})

@app.route("/save-results", methods=["POST"])
def save_results():
    data = request.json
    results_collection.insert_one(data)
    return jsonify({"message": "Results saved successfully."})

@app.route("/analytics", methods=["GET"])
def analytics():
    records = list(results_collection.find({}, {"_id": 0}))
    return jsonify(records)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
