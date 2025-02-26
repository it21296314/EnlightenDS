from flask import Blueprint, request, jsonify
from utils.database import results_collection
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Google Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY is not set. Check your .env file.")
    
genai.configure(api_key=API_KEY)

results_bp = Blueprint("results", __name__)

@results_bp.route("/save-results", methods=["POST"])
def save_results():
    """Save user results in the database."""
    data = request.json
    results_collection.insert_one(data)
    return jsonify({"message": "Results saved successfully."})

@results_bp.route("/generate-report", methods=["GET"])
def generate_report():
    """Generate AI-based feedback report for parents using Google Gemini API."""
    user_id = request.args.get("user_id")
    results = list(results_collection.find({"user_id": user_id}))

    if not results:
        return jsonify({"message": "No quiz data found for this user."}), 404

    total_correct = sum(r.get("correct_count", 0) for r in results)
    total_incorrect = sum(r.get("incorrect_count", 0) for r in results)
    total_attempts = len(results)
    incorrect_words = [word for r in results for word in r.get("incorrect_words", [])]

    # Handle empty incorrect_words gracefully
    if not incorrect_words:
        incorrect_words_text = "The child performed well, but further practice is still encouraged."
    else:
        incorrect_words_text = f"The child struggled with the following words: {', '.join(incorrect_words)}."

    # AI Feedback Generation
    feedback_prompt = f"""
    A child attempted {total_attempts} pronunciation quizzes.
    Correct answers: {total_correct}, Incorrect answers: {total_incorrect}.
    {incorrect_words_text}
    Suggest improvement strategies, practice words, and engaging activities.
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model.generate_content(feedback_prompt)
        feedback = response.text if response.text else "AI feedback could not be generated at this time."
    except Exception as e:
        feedback = f"Error generating feedback: {str(e)}"

    return jsonify({
        "correct_count": total_correct,
        "incorrect_count": total_incorrect,
        "feedback": feedback
    })
