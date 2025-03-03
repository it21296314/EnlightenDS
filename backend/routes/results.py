from flask import Blueprint, request, jsonify, send_file
from utils.database import results_collection
import google.generativeai as genai
import os
from dotenv import load_dotenv
from fpdf import FPDF

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
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        results_collection.insert_one(data)
        return jsonify({"message": "Results saved successfully."}), 201
    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

@results_bp.route("/generate-report", methods=["GET"])
def generate_report():
    """Generate AI-based feedback report for parents using Google Gemini API and provide a PDF report."""
    user_id = request.args.get("user_id")
    format_type = request.args.get("format")

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    try:
        user_id = int(user_id)
        results = list(results_collection.find({"user_id": user_id}))

        if not results:
            return jsonify({"message": f"No quiz data found for user {user_id}."}), 404

        total_correct = sum(r.get("correct_count", 0) for r in results)
        total_incorrect = sum(r.get("incorrect_count", 0) for r in results)
        total_attempts = len(results)
        incorrect_words = [word for r in results for word in r.get("incorrect_words", [])]
        category = results[0].get("category", "Unknown")
        marks_percentage = (total_correct / (total_correct + total_incorrect)) * 100 if (total_correct + total_incorrect) > 0 else 0
        time_spent = results[0].get("time_spent", "Unknown")

        incorrect_words_text = (
            "The child performed well, but further practice is still encouraged."
            if not incorrect_words else f"The child struggled with the following words: {', '.join(incorrect_words)}."
        )

        feedback_prompt = f"""
        A child attempted {total_attempts} pronunciation quizzes in the category {category}.
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

        if format_type == "pdf":
            pdf = FPDF()
            pdf.set_auto_page_break(auto=True, margin=15)
            pdf.add_page()
            pdf.set_font("Arial", style="B", size=16)
            pdf.cell(200, 10, "AI Feedback Report", ln=True, align="C")
            pdf.set_font("Arial", size=12)
            pdf.ln(10)
            pdf.cell(200, 10, f"User ID: {user_id}", ln=True)
            pdf.cell(200, 10, f"Category: {category}", ln=True)
            pdf.cell(200, 10, f"Correct Count: {total_correct}", ln=True)
            pdf.cell(200, 10, f"Incorrect Count: {total_incorrect}", ln=True)
            pdf.cell(200, 10, f"Marks Percentage: {marks_percentage:.2f}%", ln=True)
            pdf.cell(200, 10, f"Time Spent: {time_spent}", ln=True)
            pdf.ln(10)
            pdf.set_font("Arial", style="B", size=14)
            pdf.cell(200, 10, "Incorrect Words:", ln=True)
            pdf.set_font("Arial", size=12)
            for word in incorrect_words:
                pdf.cell(200, 10, f"- {word}", ln=True)
            pdf.ln(10)
            pdf.set_font("Arial", style="B", size=14)
            pdf.cell(200, 10, "AI Feedback:", ln=True)
            pdf.set_font("Arial", size=12)
            pdf.multi_cell(0, 10, feedback)

            pdf_file = "feedback_report.pdf"
            pdf.output(pdf_file)
            return send_file(pdf_file, as_attachment=True)

        return jsonify({
            "user_id": user_id,
            "category": category,
            "correct_count": total_correct,
            "incorrect_count": total_incorrect,
            "marks_percentage": marks_percentage,
            "time_spent": time_spent,
            "incorrect_words": incorrect_words,
            "feedback": feedback
        })

    except ValueError:
        return jsonify({"error": "Invalid user ID format"}), 400
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500