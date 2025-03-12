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
import QuizResult from '../../models/maths/QuizResult.js'
import Child from '../../models/child.js'; //

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

// Save quiz result
export const saveQuizResult = async (req, res) => {
  try {
    const { childId, quizMark, completionTime, difficulty, category } = req.body; 

    // Validate required fields
    if (!childId || !quizMark || !completionTime || !difficulty || !category) {
      return res.status(400).json({ message: 'All fields (childId, quizMark, completionTime, difficulty, category) are required' });
    }

    // Check if child exists
    const child = await Child.findById(childId);
    if (!child) return res.status(404).json({ message: 'Child not found' });

    // Create new quiz result
    const newResult = new QuizResult({ childId, quizMark, completionTime, difficulty, category });

    // Save to DB
    await newResult.save();
    res.status(201).json({ message: 'Quiz result saved successfully', result: newResult });

  } catch (error) {
    console.error('Error saving quiz result:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get quiz results for a specific child
export const getChildQuizResults = async (req, res) => {
  try {
    const { childId } = req.params;
    const results = await QuizResult.find({ childId }).sort({ date: -1 });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ✅ Get quiz progress for a specific child
// export const getQuizProgress = async (req, res) => {
//   try {
//       const { childId } = req.params;
//       const quizResults = await QuizResult.find({ childId }).sort({ date: 1 });

//       if (!quizResults.length) {
//           return res.status(404).json({ message: "No quiz results found" });
//       }

//       // Calculate progress
//       const progressData = quizResults.map((result, index) => ({
//           date: result.date,
//           quizMark: result.quizMark,
//           completionTime: result.completionTime,
//           improvement: index === 0 ? 0 : result.quizMark - quizResults[index - 1].quizMark
//       }));

//       res.json(progressData);
//   } catch (error) {
//       res.status(500).json({ message: "Server Error", error });
//   }
// };

// export const getQuizProgress = async (req, res) => {
//   const { childId } = req.params;

//   try {
//     // Fetch all quizzes for the given child
//     const quizzes = await QuizResult.find({ childId }).sort({ createdAt: 1 });

//     if (!quizzes.length) {
//       return res.status(404).json({ message: "No quiz data found for this child." });
//     }

//     // Prepare progress data
//     const progress = quizzes.map((quiz) => ({
//       date: quiz.createdAt ? quiz.createdAt.toISOString() : new Date().toISOString(), // ✅ Handle undefined date
//       score: quiz.correctCount,
//       incorrectCount: quiz.incorrectCount,
//       totalQuestions: quiz.noOfQuestions,
//       accuracy: ((quiz.correctCount / quiz.noOfQuestions) * 100).toFixed(2), // Accuracy percentage
//     }));

//     res.status(200).json(progress);
//   } catch (error) {
//     console.error("Error fetching quiz progress:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getQuizProgress = async (req, res) => {
//   const { childId } = req.params;

//   try {
//     // Fetch all quizzes for the given child
//     const quizzes = await QuizResult.find({ childId }).sort({ createdAt: 1 }).exec();
    
//     console.log("Fetched Quizzes:", quizzes);
    
//     if (!quizzes || quizzes.length === 0) {
//       return res.status(404).json({ message: "No quiz data found for this child." });
//     }

//     // Prepare progress data
//     const progress = quizzes.map((quiz) => ({
//       date: quiz.createdAt ? quiz.createdAt.toISOString() : new Date().toISOString(), // ✅ Handle undefined date
//       score: quiz.correctCount,
//       incorrectCount: quiz.incorrectCount,
//       totalQuestions: quiz.noOfQuestions,
//       accuracy: ((quiz.correctCount / quiz.noOfQuestions) * 100).toFixed(2), // Accuracy percentage
//     }));

//     res.status(200).json(progress);
//   } catch (error) {
//     console.error("Error fetching quiz progress:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getQuizProgress = async (req, res) => {
//   const { childId } = req.params;
//   const { difficulty, category } = req.query; // Get difficulty and category from query parameters

//   try {
//     // Build filter object dynamically
//     let filter = { childId };
//     if (difficulty) filter.difficulty = difficulty;
//     if (category) filter.category = category;

//     // Fetch quizzes based on filters
//     const quizzes = await QuizResult.find(filter).sort({ date: 1 }).exec();

//     console.log("Fetched Quizzes:", quizzes);

//     if (!quizzes || quizzes.length === 0) {
//       return res.status(404).json({ message: "No quiz data found for this child with the given filters." });
//     }
 
//     // Prepare progress data
//     const progress = quizzes.map((quiz) => ({
//       date: quiz.date ? new Date(quiz.date).toISOString() : new Date().toISOString(), // Handle undefined date
//       score: quiz.quizMark || 0, // Ensure valid values
//       completionTime: quiz.completionTime || 0, // Include completion time
//       difficulty: quiz.difficulty,
//       category: quiz.category
//     }));

//     res.status(200).json(progress);
//   } catch (error) {
//     console.error("Error fetching quiz progress:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getQuizProgress = async (req, res) => {
  const { childId } = req.params; // Child ID from URL path
  const { difficulty, category } = req.query; // Difficulty & category from query parameters

  try {
    // Build filter object dynamically
    let filter = { childId };
    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;

    // Fetch quizzes based on filters
    const quizzes = await QuizResult.find(filter).sort({ date: 1 }).exec();

    console.log("Fetched Quizzes:", quizzes);

    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: "No quiz data found for this child with the given filters." });
    }

    // Prepare progress data
    const progress = quizzes.map((quiz) => ({
      date: quiz.date ? new Date(quiz.date).toISOString() : new Date().toISOString(),
      score: quiz.quizMark || 0,
      completionTime: quiz.completionTime || 0,
      difficulty: quiz.difficulty,
      category: quiz.category
    }));

    res.status(200).json(progress);
  } catch (error) {
    console.error("Error fetching quiz progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


