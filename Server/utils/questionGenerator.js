export default function generateQuestion(category, difficulty) {
    const operations = {
      addition: '+',
      subtraction: '-',
      multiplication: '*',
      division: '/',
    };
  
    if (!operations[category]) {
      throw new Error('Invalid category');
    }
  
    const operation = operations[category];
    let nums = [];
  
    if (category === 'division') {
      let core = [];
      let getRange = [];
  
      switch (difficulty) {
        case 'beginner':
          core = [2, 3, 4, 5, 10];
          getRange = [10, 100];
          break;
        case 'intermediate':
          core = [6, 7, 8, 9];
          getRange = [10, 500];
          break;
        case 'advanced':
          core = [11, 12, 13, 14, 15];
          getRange = [20, 1000];
          break;
        default:
          throw new Error('Invalid difficulty level');
      }
  
      const coreNum = core[Math.floor(Math.random() * core.length)];
      const getNum = Math.floor(Math.random() * (getRange[1] - getRange[0] + 1)) + getRange[0];
      nums = [getNum, coreNum];
    } else {
      switch (difficulty) {
        case 'beginner':
          nums = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
          break;
        case 'intermediate':
          nums = [
            Math.floor(Math.random() * 50) + 1,
            Math.floor(Math.random() * 50) + 1,
          ];
          break;
        case 'advanced':
          nums = [
            Math.floor(Math.random() * 900) + 100, // 3-digit numbers
            Math.floor(Math.random() * 900) + 100,
          ];
          break;
        default:
          throw new Error('Invalid difficulty level');
      }
    }
  
    // For advanced, create a string for 3-number equations
    const questionText = nums.join(` ${operation} `);
  
    // Calculate the correct answer
    let correctAnswer;
    try {
      correctAnswer = eval(questionText); // Dynamically calculate answer
      if (category === 'division') {
        correctAnswer = parseFloat(correctAnswer.toFixed(2)); // Round for division
      }
    } catch (error) {
      correctAnswer = 'undefined';
    }
  
    return {
      question: questionText,
      correctAnswer,
      category,
      difficulty,
    };
  }
  
 // src/controllers/questionController.js

// The dynamic function to generate questions
// export default function generateQuestion(category, difficulty) {
//     const operations = {
//       addition: '+',
//       subtraction: '-',
//       multiplication: '*',
//       division: '/',
//     };
  
//     if (!operations[category]) {
//       throw new Error('Invalid category');
//     }
  
//     const operation = operations[category];
//     let nums = [];
  
//     if (category === 'division') {
//       let core = [];
//       let getRange = [];
  
//       switch (difficulty) {
//         case 'beginner':
//           core = [2, 3, 4, 5, 10];
//           getRange = [10, 100];
//           break;
//         case 'intermediate':
//           core = [6, 7, 8, 9];
//           getRange = [10, 500];
//           break;
//         case 'advanced':
//           core = [11, 12, 13, 14, 15];
//           getRange = [20, 1000];
//           break;
//         default:
//           throw new Error('Invalid difficulty level');
//       }
  
//       const coreNum = core[Math.floor(Math.random() * core.length)];
//       const getNum = Math.floor(Math.random() * (getRange[1] - getRange[0] + 1)) + getRange[0];
//       nums = [getNum, coreNum];
//     } else {
//       switch (difficulty) {
//         case 'beginner':
//           nums = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
//           break;
//         case 'intermediate':
//           nums = [
//             Math.floor(Math.random() * 50) + 1,
//             Math.floor(Math.random() * 50) + 1,
//           ];
//           break;
//         case 'advanced':
//           nums = [
//             Math.floor(Math.random() * 900) + 100, // 3-digit numbers
//             Math.floor(Math.random() * 900) + 100,
//           ];
//           break;
//         default:
//           throw new Error('Invalid difficulty level');
//       }
//     }
  
//     const questionText = nums.join(` ${operation} `);
  
//     // Calculate the correct answer
//     let correctAnswer;
//     try {
//       correctAnswer = eval(questionText); // Dynamically calculate answer
//       if (category === 'division') {
//         correctAnswer = parseFloat(correctAnswer.toFixed(2)); // Round for division
//       }
//     } catch (error) {
//       correctAnswer = 'undefined';
//     }
  
//     return {
//       question: questionText,
//       correctAnswer,
//       category,
//       difficulty,
//     };
//   }
  
//   // Controller to generate a quiz with 10 questions
//   export const generateQuiz = (req, res) => {
//     const { category, difficulty } = req.params;
  
//     // Generate 10 questions dynamically using the `generateQuestion` function
//     try {
//       const quizQuestions = [];
//       for (let i = 0; i < 10; i++) {
//         const question = generateQuestion(category, difficulty);
//         quizQuestions.push(question);
//       }
      
//       res.json(quizQuestions); // Send the quiz questions as a JSON response
//     } catch (error) {
//       res.status(400).json({ error: error.message }); // Return error if something goes wrong
//     }
//   };
   