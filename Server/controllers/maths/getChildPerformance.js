// import express from 'express';
// import Quizs from '../../models/maths/questionModel.js';
// import QuizResult from '../../models/maths/QuizResult.js';
// import mongoose from "mongoose";

// const getChildPerformance = async (req, res) => {
//     const { childId } = req.params;
  
//     try {
//       const objectId = new mongoose.Types.ObjectId(childId);

//       const quizData = await Quizs.find({ childId: objectId });
  
//       if (!quizData.length) {
//         return res.status(404).json({ message: "No quiz data found." });
//       }
  
//       const performance = {};
//       const recommendations = [];
  
//       quizData.forEach(({ category, difficulty, correctCount, incorrectCount, totalQuestions }) => {
//         performance[category] = performance[category] || {
//           beginner: {},
//           intermediate: {},
//           advanced: {},
//         };
  
//         performance[category][difficulty] = { correctCount, incorrectCount, totalQuestions };
  
//         const accuracy = (correctCount / totalQuestions) * 100;
  
//         accuracy < 50
//           ? recommendations.push(`Practice more ${category} at ${difficulty} level.`)
//           : accuracy > 80 && recommendations.push(`Try moving to the next level in ${category}.`);
//       });
  
//       res.status(200).json({ performance, recommendations });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
  
//   // Export default at the bottom
//   export default getChildPerformance;
  
  


// import express from 'express';
// import Quizs from '../../models/maths/questionModel.js';
// import QuizResult from '../../models/maths/QuizResult.js';

// export const getChildPerformance = async (req, res) => {
//   const { childId } = req.params;

//   try {
//     // Fetch quiz data for the child
//     const quizData = await Quizs.find({ childId });

//     if (!quizData.length) {
//       return res.status(404).json({ message: "No quiz data found for this child." });
//     }

//     // Structure for category-wise performance tracking
//     const performance = {};
//     const recommendations = [];

//     quizData.forEach((quiz) => {
//       const { category, difficulty, correctCount, incorrectCount, noOfQuestions, avgResponseTimeForSubLevel1, avgResponseTimeForSubLevel2, avgResponseTimeForSubLevel3, avgResponseTimeForSubLevel4 } = quiz;

//       if (!performance[category]) {
//         performance[category] = {
//           beginner: { correct: 0, incorrect: 0, total: 0, avgResponseTime: 0, attempts: 0 },
//           intermediate: { correct: 0, incorrect: 0, total: 0, avgResponseTime: 0, attempts: 0 },
//           advanced: { correct: 0, incorrect: 0, total: 0, avgResponseTime: 0, attempts: 0 },
//         };
//       }

//       // Update category and difficulty stats
//       performance[category][difficulty].correct += correctCount;
//       performance[category][difficulty].incorrect += incorrectCount;
//       performance[category][difficulty].total += noOfQuestions;
//       performance[category][difficulty].attempts += 1;
//       performance[category][difficulty].avgResponseTime += (avgResponseTimeForSubLevel1 + avgResponseTimeForSubLevel2 + avgResponseTimeForSubLevel3 + avgResponseTimeForSubLevel4) / 4;

      
//     });

//     // Generate comments based on performance
//     const comments = [];
//     Object.keys(performance).forEach(category => {
//       let strengths = [];
//       let weaknesses = [];
//       let avoided = false;

//       Object.keys(performance[category]).forEach(level => {
//         const { correct, incorrect, total, avgResponseTime, attempts } = performance[category][level];

//         if (attempts === 0) {
//           avoided = true;
//           return;
//         }

//         const accuracy = (correct / total) * 100;
//         if (accuracy < 50) {
//           recommendations.push(`Practice more ${category} at ${difficulty} level.`);
//         } else if (accuracy > 80) {
//           recommendations.push(`Try moving to the next level in ${category}.`);
//         }
    

//         if (accuracy > 80) {
//           strengths.push(level);
//         } else if (accuracy < 50) {
//           weaknesses.push(level);
//         }
//       });

//       if (strengths.length) {
//         comments.push(`The child is performing well in ${category} at ${strengths.join(", ")} level.`);
//       }
//       if (weaknesses.length) {
//         comments.push(`The child struggles with ${category} at ${weaknesses.join(", ")} level.`);
//       }
//       if (avoided) {
//         comments.push(`The child has not attempted ${category}, which may indicate a lack of confidence or interest.`);
//       }
//     });

//     res.status(200).json({ performance, comments,recommendations });

//   } catch (error) {
//     console.error("Error fetching performance data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Express Router
// const router = express.Router();
// router.get('/performance/:childId', getChildPerformance);
// export default router;

import express from 'express';
import Quizs from '../../models/maths/questionModel.js';

export const getChildPerformance = async (req, res) => {
  const { childId } = req.params;

  try {
    // Fetch quiz data for the child
    const quizData = await Quizs.find({ childId });

    if (!quizData.length) {
      return res.status(404).json({ message: "No quiz data found for this child." });
    }

    // Structure for category-wise performance tracking
    const performance = {};
    const recommendations = [];
    const comments = [];

    // Categories to track
    const categories = ["addition", "subtraction", "multiplication", "division"];
    const difficulties = ["beginner", "intermediate", "advanced"];

    // Initialize structure
    categories.forEach(category => {
      performance[category] = {};
      difficulties.forEach(level => {
        performance[category][level] = {
          correct: 0,
          incorrect: 0,
          total: 0,
          avgResponseTime: 0,
          attempts: 0
        };
      });
    });

    // Process quiz data
    quizData.forEach((quiz) => {
      const { category, difficulty, correctCount, incorrectCount, noOfQuestions,
        avgResponseTimeForSubLevel1, avgResponseTimeForSubLevel2,
        avgResponseTimeForSubLevel3, avgResponseTimeForSubLevel4 } = quiz;

      if (!performance[category]) return;

      // Update stats for the specific category and difficulty
      performance[category][difficulty].correct += correctCount;
      performance[category][difficulty].incorrect += incorrectCount;
      performance[category][difficulty].total += noOfQuestions;
      performance[category][difficulty].attempts += 1;

      const avgResponseTime = (avgResponseTimeForSubLevel1 + avgResponseTimeForSubLevel2 + avgResponseTimeForSubLevel3 + avgResponseTimeForSubLevel4) / 4;
      performance[category][difficulty].avgResponseTime = avgResponseTime;
    });

    // Generate comments and recommendations
    categories.forEach(category => {
      let attempted = false;
      let strengths = [];
      let weaknesses = [];
      
      difficulties.forEach(level => {
        const { correct, incorrect, total, avgResponseTime, attempts } = performance[category][level];

        if (attempts > 0) attempted = true; // Mark category as attempted

        if (total === 0) return; // Skip if no data for this level

        const accuracy = (correct / total) * 100;
        
        if (accuracy >= 80) {
          strengths.push(level);
        } else if (accuracy < 50) {
          weaknesses.push(level);
        }

        // Give recommendations based on accuracy and response time
        if (accuracy >= 80 && avgResponseTime < 5) {
          recommendations.push(`The child should try moving to the next level in ${category} as they perform well in ${level} level.`);
        } else if (accuracy < 50) {
          recommendations.push(`The child needs more practice in ${category} at ${level} level to improve accuracy.`);
        } else if (avgResponseTime > 10) {
          recommendations.push(`The child is taking longer to answer ${category} questions at ${level} level. Encourage quicker responses.`);
        }
      });

      // Add comments based on strengths and weaknesses
      if (strengths.length > 0) {
        comments.push(`The child is performing well in ${category} at ${strengths.join(", ")} level.`);
      }
      if (weaknesses.length > 0) {
        comments.push(`The child is struggling with ${category} at ${weaknesses.join(", ")} level and needs additional support.`);
      }
      if (!attempted) {
        comments.push(`The child has not attempted ${category} at any level, which may indicate a lack of confidence or interest.`);
      }
    });

    res.status(200).json({ performance, comments, recommendations });

  } catch (error) {
    console.error("Error fetching performance data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Express Router
const router = express.Router();
router.get('/performance/:childId', getChildPerformance);
export default router;
