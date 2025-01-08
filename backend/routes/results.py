from flask import Blueprint, request, jsonify
from utils.database import results_collection

results_bp = Blueprint("results", __name__)

@results_bp.route("/save-results", methods=["POST"])
def save_results():
    """Save user results in the database."""
    data = request.json
    results_collection.insert_one(data)
    return jsonify({"message": "Results saved successfully."})
