import os
from gtts import gTTS

BASE_DIR = "./static"
IMAGE_FOLDER = os.path.join(BASE_DIR, "images")
AUDIO_FOLDER = os.path.join(BASE_DIR, "audio")

def generate_audio(word):
    """Generate an audio file for a word if it doesn't already exist."""
    audio_path = os.path.join(AUDIO_FOLDER, f"{word}.mp3")
    if not os.path.exists(audio_path):
        tts = gTTS(word, lang="en")
        tts.save(audio_path)
    return f"/static/audio/{word}.mp3"

def get_categories_and_images():
    """Retrieve all categories and their associated images."""
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
