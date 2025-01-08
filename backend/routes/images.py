from flask import Blueprint, jsonify
from utils.helpers import get_categories_and_images

images_bp = Blueprint("images", __name__)

@images_bp.route("/get-images/<category>", methods=["GET"])
def get_images(category):
    """Fetch and return images for a specific category."""
    categories = get_categories_and_images()
    if category not in categories:
        return jsonify({"error": "Category not found"}), 404
    return jsonify({"images": categories[category]})
