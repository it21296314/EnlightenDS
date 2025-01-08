from flask import Blueprint, request, jsonify
import phonetics

pronunciation_bp = Blueprint("pronunciation", __name__)

@pronunciation_bp.route("/check-pronunciation", methods=["POST"])
def check_pronunciation():
    """Check if the spoken word matches the target word."""
    data = request.json
    target_word = data.get("word")
    spoken_word = data.get("spokenWord")

    if not target_word or not spoken_word:
        return jsonify({"isCorrect": False, "message": "Invalid input."})

    if phonetics.metaphone(target_word) == phonetics.metaphone(spoken_word):
        return jsonify({"isCorrect": True, "message": "Correct pronunciation!"})
    return jsonify({"isCorrect": False, "message": "Try again."})
