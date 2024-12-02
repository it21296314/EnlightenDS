from flask import Flask, jsonify, request, send_from_directory 
from flask_cors import CORS
from gtts import gTTS
import phonetics
import os
import pygame

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Paths for images and audio
IMAGE_FOLDER = "./static/images"
AUDIO_FOLDER = "./static/audio"

# Initialize pygame for audio playback
pygame.mixer.init()

# Dictionary of words and images
WORDS_AND_IMAGES = {
    "apple": "apple.jpg",
    "cat": "cat.jpeg",
    "orange": "orange.jpeg",
    "flower":"flower.jpeg",
    "G":"g.jpeg"
}

# Get random word and image
def get_random_word():
    import random
    word, image = random.choice(list(WORDS_AND_IMAGES.items()))
    return word, os.path.join(IMAGE_FOLDER, image)

@app.route("/get-image", methods=["GET"])
def get_image():
    """Endpoint to serve a random word and image."""
    word, image_path = get_random_word()
    return jsonify({
        "word": word,
        "imageUrl": f"/static/images/{WORDS_AND_IMAGES[word]}",
        "audioUrl": f"/get-audio/{word}"
    })

@app.route("/get-audio/<word>", methods=["GET"])
def get_audio(word):
    """Endpoint to generate and serve reference audio for the word."""
    audio_file = os.path.join(AUDIO_FOLDER, f"{word}.mp3")
    try:
        # Generate audio if not exists
        if not os.path.exists(audio_file):
            tts = gTTS(word, lang='en')
            tts.save(audio_file)
        return send_from_directory(AUDIO_FOLDER, f"{word}.mp3")
    except Exception as e:
        return jsonify({"error": f"Error generating audio: {str(e)}"}), 500

@app.route("/check-pronunciation", methods=["POST"])
def check_pronunciation():
    """Endpoint to check user's pronunciation."""
    data = request.json
    target_word = data.get("word")
    user_input = data.get("spokenWord")

    # Phonetic comparison
    if not target_word or not user_input:
        return jsonify({"isCorrect": False, "message": "Invalid input."})
    
    target_phonetics = phonetics.metaphone(target_word)
    user_phonetics = phonetics.metaphone(user_input)

    if target_phonetics == user_phonetics:
        return jsonify({"isCorrect": True, "message": "Great job! Pronunciation is correct."})
    else:
        return jsonify({"isCorrect": False, "message": "Try again. Focus on the sounds."})

if __name__ == "__main__":
    # Create audio folder if not exists
    os.makedirs(AUDIO_FOLDER, exist_ok=True)
    app.run(debug=True, port=5000)
