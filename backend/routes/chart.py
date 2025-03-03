from flask import Blueprint, jsonify, request
from utils.database import results_collection 
import pandas as pd

chart_bp = Blueprint('chart', __name__)

@chart_bp.route("/chart-data", methods=["GET"])
def get_chart_data():
    """Returns accuracy trends for each user from MongoDB"""
    user_id = request.args.get("user_id")

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    # Fetch user data from MongoDB
    user_data = list(results_collection.find({"user_id": int(user_id)}, {"_id": 0, "user_id": 1, "category": 1, "correct_count": 1, "incorrect_count": 1, "date": 1}))

    if not user_data:
        return jsonify({"error": "No data found for the user"}), 404

    # Convert to DataFrame for calculations
    df = pd.DataFrame(user_data)

    # Group by date and calculate accuracy
    df = df.groupby("date").sum().reset_index()
    df["accuracy"] = (df["correct_count"] / (df["correct_count"] + df["incorrect_count"])) * 100

    return jsonify({
        "dates": df["date"].astype(str).tolist(),
        "accuracy": df["accuracy"].tolist()
    })
