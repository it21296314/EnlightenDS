import random
from flask import Blueprint, jsonify
from utils.helpers import get_categories_and_images

randomimage_bp = Blueprint("randomimage", __name__)

@randomimage_bp.route("/get-random-image", methods=["GET"])
def get_random_image():
    """Fetch and return a random image along with its associated word and audio."""
    categories = get_categories_and_images()
    all_images = [img for images in categories.values() for img in images]  # Flatten list

    if not all_images:
        return jsonify({"error": "No images available"}), 404

    # Select a random image object
    random_entry = random.choice(all_images)  # Example format: {'imageUrl': '...', 'word': '...', 'audioUrl': '...'}

    # Ensure the selected object has the necessary keys
    if not all(key in random_entry for key in ["imageUrl", "word", "audioUrl"]):
        return jsonify({"error": "Invalid image entry format"}), 500

    # Return the formatted response
    return jsonify({
        "imageUrl": random_entry["imageUrl"],
        "word": random_entry["word"],
        "audioUrl": random_entry["audioUrl"]
    })
