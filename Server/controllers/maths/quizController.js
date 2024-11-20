// // Import your question generator function.
// import generateQuestion from '../../utils/questionGenerator.js';
// export const generateQuiz = (req, res) => {
//   const { category, difficulty } = req.params;

//   try {
//     // Generate 10 questions dynamically
//     const quizQuestions = Array.from({ length: 10 }, () => generateQuestion(category, difficulty));
//     res.json(quizQuestions); // Send as JSON response
//   } catch (error) {
//     res.status(400).json({ error: error.message }); // Handle invalid inputs
//   }
// };

// Import your question generator function.
import generateQuestion from '../../utils/questionGenerator.js';

export const generateQuiz = (req, res) => {
  const { category, difficulty } = req.params;

  try {
    // Define sub-level distribution
    const subLevelCounts = {
      1: 1, // 1 question from sub-level 1
      2: 2, // 2 questions from sub-level 2
      3: 3, // 3 questions from sub-level 3
      4: 4, // 4 questions from sub-level 4
    };

    const quizQuestions = [];

    // Generate questions based on the sub-level distribution
    for (let subLevel = 1; subLevel <= 4; subLevel++) {
      for (let i = 0; i < subLevelCounts[subLevel]; i++) {
        const question = generateQuestion(category, difficulty, subLevel);
        quizQuestions.push(question);
      }
    }

    res.json(quizQuestions); // Send as JSON response
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle invalid inputs
  }
};
