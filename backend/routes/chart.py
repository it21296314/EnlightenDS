from flask import Blueprint, jsonify
from utils.database import results_collection
from datetime import datetime

chart_bp = Blueprint("chart", __name__)

@chart_bp.route("/quiz-trends", methods=["GET"])
def quiz_trends():
    """Fetch overall quiz performance trends for all users (grouped by date)."""

    try:
        # Fetch all quiz results
        results = list(results_collection.find({}, {"_id": 0, "timestamp": 1, "correct_count": 1, "incorrect_count": 1}))

        if not results:
            return jsonify({"message": "No quiz data found."}), 404

        # Group by date
        date_wise_performance = {}

        for result in results:
            # Convert timestamp to date (YYYY-MM-DD)
            timestamp = result.get("timestamp", "")
            if not timestamp:
                continue

            date_str = datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%SZ").strftime("%Y-%m-%d")

            correct = result.get("correct_count", 0)
            incorrect = result.get("incorrect_count", 0)
            total_attempts = correct + incorrect

            if date_str not in date_wise_performance:
                date_wise_performance[date_str] = {"correct": 0, "incorrect": 0, "total": 0}

            date_wise_performance[date_str]["correct"] += correct
            date_wise_performance[date_str]["incorrect"] += incorrect
            date_wise_performance[date_str]["total"] += total_attempts

        # Convert grouped data into a list for frontend
        trend_data = []
        for date, data in sorted(date_wise_performance.items()):
            accuracy = (data["correct"] / data["total"]) * 100 if data["total"] > 0 else 0
            trend_data.append({
                "date": date,
                "accuracy": round(accuracy, 2)  # Convert accuracy to percentage
            })

        return jsonify(trend_data)

    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500
