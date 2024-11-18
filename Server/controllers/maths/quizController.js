// Import your question generator function.
import generateQuestion from '../../utils/questionGenerator.js';
export const generateQuiz = (req, res) => {
  const { category, difficulty } = req.params;

  try {
    // Generate 10 questions dynamically
    const quizQuestions = Array.from({ length: 10 }, () => generateQuestion(category, difficulty));
    res.json(quizQuestions); // Send as JSON response
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle invalid inputs
  }
};

  