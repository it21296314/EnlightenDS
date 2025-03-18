// // export default function generateQuestion(category, difficulty) {
// //     const operations = {
// //       addition: '+',
// //       subtraction: '-',
// //       multiplication: '*',
// //       division: '/',
// //     };
  
// //     if (!operations[category]) {
// //       throw new Error('Invalid category');
// //     }
  
// //     const operation = operations[category];
// //     let nums = [];
  
// //     if (category === 'division') {
// //       let core = [];
// //       let getRange = [];
  
// //       switch (difficulty) {
// //         case 'beginner':
// //           core = [2, 3, 4, 5, 10];
// //           getRange = [10, 100];
// //           break;
// //         case 'intermediate':
// //           core = [6, 7, 8, 9];
// //           getRange = [10, 500];
// //           break;
// //         case 'advanced':
// //           core = [11, 12, 13, 14, 15];
// //           getRange = [20, 1000];
// //           break;
// //         default:
// //           throw new Error('Invalid difficulty level');
// //       }
  
// //       const coreNum = core[Math.floor(Math.random() * core.length)];
// //       const getNum = Math.floor(Math.random() * (getRange[1] - getRange[0] + 1)) + getRange[0];
// //       nums = [getNum, coreNum];
// //     } else {
// //       switch (difficulty) {
// //         case 'beginner':
// //           nums = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
// //           break;
// //         case 'intermediate':
// //           nums = [
// //             Math.floor(Math.random() * 50) + 1,
// //             Math.floor(Math.random() * 50) + 1,
// //           ];
// //           break;
// //         case 'advanced':
// //           nums = [
// //             Math.floor(Math.random() * 900) + 100, // 3-digit numbers
// //             Math.floor(Math.random() * 900) + 100,
// //           ];
// //           break;
// //         default:
// //           throw new Error('Invalid difficulty level');
// //       }
// //     }
  
// //     // For advanced, create a string for 3-number equations
// //     const questionText = nums.join(` ${operation} `);
  
// //     // Calculate the correct answer
// //     let correctAnswer;
// //     try {
// //       correctAnswer = eval(questionText); // Dynamically calculate answer
// //       if (category === 'division') {
// //         correctAnswer = parseFloat(correctAnswer.toFixed(2)); // Round for division
// //       }
// //     } catch (error) {
// //       correctAnswer = 'undefined';
// //     }
  
// //     return {
// //       question: questionText,
// //       correctAnswer,
// //       category,
// //       difficulty,
// //     };
// //   }

// export default function generateQuestion(category, difficulty, subLevel) {
//   const operations = {
//     addition: '+',
//     subtraction: '-',
//     multiplication: '*',
//     division: '/',
//   };

//   if (!operations[category]) {
//     throw new Error('Invalid category');
//   }

//   const operation = operations[category];
//   let nums = [];

//   const ranges = {
//     addition: {
//       beginner: [[1, 5], [1, 10], [5, 10], [10, 20]],
//       intermediate: [[10, 20], [20, 30], [30, 40], [40, 50]],
//       advanced: [[10, 30], [30, 50], [50, 80], [80, 100]],
//     },
//     subtraction: {
//       beginner: [[1, 5], [5, 10], [10, 15], [15, 20]],
//       intermediate: [[10, 20], [20, 30], [30, 40], [40, 50]],
//       advanced: [[10, 30], [30, 50], [50, 80], [80, 100]],
//     },
//     multiplication: {
//       beginner: [[1, 3], [1, 5], [1, 7], [2, 9]],
//       intermediate: [[2, 5], [3, 7], [4, 10], [5, 12]],
//       advanced: [[6, 10], [8, 12], [10, 15], [10, 20]],
//     },
//     division: {
//       beginner: [[2, 3], [3, 4], [4, 5], [5, 10]],
//       intermediate: [[6, 7], [7, 8], [8, 9], [10, 12]],
//       advanced: [[10, 12], [12, 15], [15, 18], [20, 25]],
//     },
//   };

//   if (!ranges[category][difficulty] || !ranges[category][difficulty][subLevel - 1]) {
//     throw new Error('Invalid difficulty or sub-level');
//   }

//   const [min, max] = ranges[category][difficulty][subLevel - 1];

//   if (category === 'division') {
//     const coreNum = Math.floor(Math.random() * (max - min + 1)) + min;
//     const getNum = Math.floor(Math.random() * 10) + 1; // Ensures divisible numbers
//     nums = [coreNum * getNum, coreNum];
//   } else {
//     nums = [
//       Math.floor(Math.random() * (max - min + 1)) + min,
//       Math.floor(Math.random() * (max - min + 1)) + min,
//     ];
//   }

//   // For advanced, create a string for the equation
//   const questionText = nums.join(` ${operation} `);

//   // Calculate the correct answer
//   let correctAnswer;
//   try {
//     correctAnswer = eval(questionText); // Dynamically calculate the answer
//     if (category === 'division') {
//       correctAnswer = parseFloat(correctAnswer.toFixed(2)); // Round for division
//     }
//   } catch (error) {
//     correctAnswer = 'undefined';
//   }

//   return {
//     question: questionText,
//     correctAnswer,
//     category,
//     difficulty,
//     subLevel,
//   };
// }

export default function generateQuestion(category, difficulty, subLevel) {
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

  const getRange = (subLevel, baseRange) => {
    const [min, max] = baseRange;
    const increment = Math.floor((max - min) / 4); // Divide range into 4 sub-levels
    const subMin = min + increment * (subLevel - 1);
    const subMax = subMin + increment - 1;
    return [subMin, subMax];
  };

  const ranges = {
    beginner: [1, 20],
    intermediate: [10, 50],
    advanced: [10, 100],
  };

  // if (category === 'division') {
  //   const [min, max] = getRange(subLevel, ranges[difficulty]);
  //   const divisorRange = difficulty === 'beginner' ? [2, 5] : difficulty === 'intermediate' ? [6, 9] : [10, 15];
  //   const dividend = Math.floor(Math.random() * (max - min + 1)) + min;
  //   const divisor = Math.floor(Math.random() * (divisorRange[1] - divisorRange[0] + 1)) + divisorRange[0];
  //   nums = [dividend * divisor, divisor];
  // } else {
  //   const [min, max] = getRange(subLevel, ranges[difficulty]);
  //   nums = [
  //     Math.floor(Math.random() * (max - min + 1)) + min,
  //     Math.floor(Math.random() * (max - min + 1)) + min,
  //   ];
  // }

  
  if (category === 'division') {
    const [min, max] = getRange(subLevel, ranges[difficulty]);
    const divisorRange = difficulty === 'beginner' ? [2, 5] : difficulty === 'intermediate' ? [6, 9] : [10, 15];
    const dividend = Math.floor(Math.random() * (max - min + 1)) + min;
    const divisor = Math.floor(Math.random() * (divisorRange[1] - divisorRange[0] + 1)) + divisorRange[0];
    nums = [dividend * divisor, divisor];
  } else if (category === 'subtraction') {
    // For subtraction, ensure first number > second number
    const [min, max] = getRange(subLevel, ranges[difficulty]);
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    // Make sure num1 is greater than num2
    const num1 = num2 + Math.floor(Math.random() * (max - num2 + 1)) + 1;
    nums = [num1, num2];
  } else {
    const [min, max] = getRange(subLevel, ranges[difficulty]);
    nums = [
      Math.floor(Math.random() * (max - min + 1)) + min,
      Math.floor(Math.random() * (max - min + 1)) + min,
    ];
  }

  const questionText = nums.join(` ${operation} `);

  let correctAnswer;
  try {
    correctAnswer = eval(questionText);
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
    subLevel,
  };
}
