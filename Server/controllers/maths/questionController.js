
// // import generateQuestion from '../../utils/questionGenerator.js';
// // export const generateQuestionHandler = (req, res) => {
// //     let { category, difficulty } = req.params;
// //     category = category.toLowerCase().trim();
// //     difficulty = difficulty.toLowerCase().trim();
  
// //     const validCategories = ['addition', 'subtraction', 'multiplication', 'division'];
// //     const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  
// //     if (!validCategories.includes(category)) {
// //       return res.status(400).json({
// //         error: `Invalid category. Valid categories are: ${validCategories.join(', ')}`,
// //       });
// //     }
  
// //     if (!validDifficulties.includes(difficulty)) {
// //       return res.status(400).json({
// //         error: `Invalid difficulty level. Valid levels are: ${validDifficulties.join(', ')}`,
// //       });
// //     }
  
// //     try {
// //       const question = generateQuestion(category, difficulty);
// //       res.status(200).json(question);
// //     } catch (error) {
// //       res.status(500).json({ error: 'An unexpected error occurred' });
// //     }
// //   };

// import generateQuestion from '../../utils/questionGenerator.js';

// export const generateQuestionHandler = (req, res) => {
//   let { category, difficulty, subLevel } = req.params;
//   category = category.toLowerCase().trim();
//   difficulty = difficulty.toLowerCase().trim();
//   subLevel = parseInt(subLevel);

//   const validCategories = ['addition', 'subtraction', 'multiplication', 'division'];
//   const validDifficulties = ['beginner', 'intermediate', 'advanced'];
//   const validSubLevels = [1, 2, 3, 4];

//   if (!validCategories.includes(category)) {
//     return res.status(400).json({
//       error: `Invalid category. Valid categories are: ${validCategories.join(', ')}`,
//     });
//   }

//   if (!validDifficulties.includes(difficulty)) {
//     return res.status(400).json({
//       error: `Invalid difficulty level. Valid levels are: ${validDifficulties.join(', ')}`,
//     });
//   }

//   if (!validSubLevels.includes(subLevel)) {
//     return res.status(400).json({
//       error: `Invalid sub-level. Valid sub-levels are: ${validSubLevels.join(', ')}`,
//     });
//   }

//   try {
//     const question = generateQuestion(category, difficulty, subLevel);
//     res.status(200).json(question);
//   } catch (error) {
//     res.status(500).json({ error: 'An unexpected error occurred' });
//   }
// };

import mongoose from 'mongoose';
import generateQuestion from '../../utils/questionGenerator.js';
import Quiz from '../../models/maths/questionModel.js';

import Child from '../../models/child.js'

export const generateQuestionHandler = (req, res) => {
  let { category, difficulty, subLevel } = req.params;
  category = category.toLowerCase().trim();
  difficulty = difficulty.toLowerCase().trim();
  subLevel = parseInt(subLevel, 10); // Convert to integer

  const validCategories = ['addition', 'subtraction', 'multiplication', 'division'];
  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  const validSubLevels = [1, 2, 3, 4];

  if (!validCategories.includes(category)) {
    return res.status(400).json({
      error: `Invalid category. Valid categories are: ${validCategories.join(', ')}`,
    });
  }

  if (!validDifficulties.includes(difficulty)) {
    return res.status(400).json({
      error: `Invalid difficulty level. Valid levels are: ${validDifficulties.join(', ')}`,
    });
  }

  if (!validSubLevels.includes(subLevel)) {
    return res.status(400).json({
      error: `Invalid sub-level. Valid sub-levels are: ${validSubLevels.join(', ')}`,
    });
  }

  try {
    const question = generateQuestion(category, difficulty, subLevel);
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

// Post Controller
// export const saveQuizData = async (req, res) => {
//   try {
//     const {
//       category,
//       difficulty,
//       noOfQuestions,
//       correctCount,
//       incorrectCount,
//       noOfAttemptsInSubLevel1,
//       noOfAttemptsInSubLevel2,
//       noOfAttemptsInSubLevel3,
//       noOfAttemptsInSubLevel4,
//       noOfCorrectQuestionsInSubLevel1,
//       noOfCorrectQuestionsInSubLevel2,
//       noOfCorrectQuestionsInSubLevel3,
//       noOfCorrectQuestionsInSubLevel4,
//       avgResponseTimeForSubLevel1,
//       avgResponseTimeForSubLevel2,
//       avgResponseTimeForSubLevel3,
//       avgResponseTimeForSubLevel4
//     } = req.body;

//     // Validation
//     if (!category || !difficulty || !noOfQuestions || correctCount == null || incorrectCount == null) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const quizData = new Quiz({
//       category,
//       difficulty,
//       noOfQuestions,
//       correctCount,
//       incorrectCount,
//       noOfAttemptsInSubLevel1,
//       noOfAttemptsInSubLevel2,
//       noOfAttemptsInSubLevel3,
//       noOfAttemptsInSubLevel4,
//       noOfCorrectQuestionsInSubLevel1,
//       noOfCorrectQuestionsInSubLevel2,
//       noOfCorrectQuestionsInSubLevel3,
//       noOfCorrectQuestionsInSubLevel4,
//       avgResponseTimeForSubLevel1,
//       avgResponseTimeForSubLevel2,
//       avgResponseTimeForSubLevel3,
//       avgResponseTimeForSubLevel4
//     });

//     const savedQuizData = await quizData.save();
//     res.status(201).json(savedQuizData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An unexpected error occurred' });
//   }
// };

export const saveQuizData = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      noOfQuestions,
      correctCount,
      incorrectCount,
      noOfAttemptsInSubLevel1,
      noOfAttemptsInSubLevel2,
      noOfAttemptsInSubLevel3,
      noOfAttemptsInSubLevel4,
      noOfCorrectQuestionsInSubLevel1,
      noOfCorrectQuestionsInSubLevel2,
      noOfCorrectQuestionsInSubLevel3,
      noOfCorrectQuestionsInSubLevel4,
      avgResponseTimeForSubLevel1,
      avgResponseTimeForSubLevel2,
      avgResponseTimeForSubLevel3,
      avgResponseTimeForSubLevel4,
      childId,  // childId to be passed in the request body
    } = req.body;

    // Validation check to ensure that all required fields are passed
    if (
      !category || 
      !difficulty || 
      !noOfQuestions || 
      correctCount == null || 
      incorrectCount == null || 
      !childId
    ) {
      console.log('Missing fields:', { 
        category, 
        difficulty, 
        noOfQuestions, 
        correctCount, 
        incorrectCount, 
        childId 
      });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the child exists in the database
    const childExists = await Child.findById(childId);
    if (!childExists) {
      console.log('Child not found with id:', childId);
      return res.status(400).json({ error: 'Child ID does not exist' });
    }

    // Create the new Quiz document with the passed data
    const quizData = new Quiz({
      category,
      difficulty,
      noOfQuestions,
      correctCount,
      incorrectCount,
      noOfAttemptsInSubLevel1,
      noOfAttemptsInSubLevel2,
      noOfAttemptsInSubLevel3,
      noOfAttemptsInSubLevel4,
      noOfCorrectQuestionsInSubLevel1,
      noOfCorrectQuestionsInSubLevel2,
      noOfCorrectQuestionsInSubLevel3,
      noOfCorrectQuestionsInSubLevel4,
      avgResponseTimeForSubLevel1,
      avgResponseTimeForSubLevel2,
      avgResponseTimeForSubLevel3,
      avgResponseTimeForSubLevel4,
      childId:new mongoose.Types.ObjectId(childId) // The childId is referenced here to associate this quiz with the child
    });

    // Save the quiz data to the database
    const savedQuizData = await quizData.save();
    console.log('Quiz data saved:', savedQuizData);

    // Send a success response with the saved quiz data
    res.status(201).json(savedQuizData);
    
  } catch (error) {
    console.error('Error in saveQuizData:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};
