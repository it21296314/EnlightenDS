# from flask import Blueprint, jsonify

# status_bp = Blueprint("status", __name__)

# @status_bp.route("/status", methods=["GET"])
# def status():
#     return jsonify({"status": "API is running"})

from flask import Blueprint, jsonify

status_bp = Blueprint('status', __name__)

@status_bp.route("/status", methods=["GET"])
def status_route():
    """Endpoint to check API status."""
    return jsonify({"status": "API is running"})