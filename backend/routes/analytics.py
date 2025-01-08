from flask import Blueprint, jsonify
from utils.database import results_collection

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/analytics", methods=["GET"])
def analytics():
    """Retrieve analytics data from the database."""
    records = list(results_collection.find({}, {"_id": 0}))
    return jsonify(records)
