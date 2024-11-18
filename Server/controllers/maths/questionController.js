import generateQuestion from '../../utils/questionGenerator.js';

// // Handler to generate a question based on difficulty
// export const generateQuestionHandler = (req, res) => {
//     let { difficulty } = req.params;
//     difficulty = difficulty.toLowerCase().trim(); // Normalize input
  
//     const validDifficulties = ['beginner', 'intermediate', 'advanced'];
//     if (!validDifficulties.includes(difficulty)) {
//       return res.status(400).json({
//         error: `Invalid difficulty level. Valid levels are: ${validDifficulties.join(', ')}`,
//       });
//     }
  
//     try {
//       const question = generateQuestion(difficulty);
//       res.status(200).json(question);
//     } catch (error) {
//       res.status(500).json({ error: 'An unexpected error occurred' });
//     }
//   };

export const generateQuestionHandler = (req, res) => {
    let { category, difficulty } = req.params;
    category = category.toLowerCase().trim();
    difficulty = difficulty.toLowerCase().trim();
  
    const validCategories = ['addition', 'subtraction', 'multiplication', 'division'];
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  
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
  
    try {
      const question = generateQuestion(category, difficulty);
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  };