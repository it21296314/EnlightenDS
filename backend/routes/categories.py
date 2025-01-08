from flask import Blueprint, jsonify
from utils.helpers import get_categories_and_images

categories_bp = Blueprint("categories", __name__)

@categories_bp.route("/categories", methods=["GET"])
def get_categories():
    """Fetch and return the list of categories."""
    categories = get_categories_and_images()
    return jsonify({"categories": list(categories.keys())})
