
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


import generateQuestion from '../../utils/questionGenerator.js';
import Quiz from '../../models/maths/questionModel.js';

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
      avgResponseTimeForSubLevel4
    } = req.body;

    // Validation
    if (!category || !difficulty || !noOfQuestions || correctCount == null || incorrectCount == null) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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
      avgResponseTimeForSubLevel4
    });

    const savedQuizData = await quizData.save();
    res.status(201).json(savedQuizData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};