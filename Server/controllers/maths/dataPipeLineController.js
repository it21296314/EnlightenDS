// // // // import express from 'express';
// // // // import mongoose from 'mongoose';
// // // // import Quiz from '../../models/maths/questionModel.js';
// // // // import QuizResult from '../../models/maths/QuizResult.js';
// // // // import Child from '../../models/child.js';

// // // // const router = express.Router();

// // // // router.get('/getModelData', async (req, res) => {
// // // //     const childId = req.query.childId || req.session.childId || req.user?.childId;  // Get childId from query, session, or user (if logged in)

// // // //     if (!childId) {
// // // //         return res.status(400).json({ error: "Child ID is required" });
// // // //     }

// // // //     try {
// // // //         // Ensure childId is a valid ObjectId before using it in the query
// // // //         const objectId = new mongoose.Types.ObjectId(childId);

// // // //         // Fetch only the most recent quiz result for the given child
// // // //         const data = await Quiz.aggregate([
// // // //             { $match: { childId: objectId } }, // Filter by childId (use ObjectId here)
// // // //             {
// // // //                 $lookup: {
// // // //                     from: "children", 
// // // //                     localField: "childId",
// // // //                     foreignField: "_id",
// // // //                     as: "childData"
// // // //                 }
// // // //             },
// // // //             { $unwind: "$childData" },

// // // //             {
// // // //                 $lookup: {
// // // //                     from: "quizresults", 
// // // //                     localField: "childId",
// // // //                     foreignField: "childId",
// // // //                     as: "quizResults"
// // // //                 }
// // // //             },
// // // //             { $sort: { "createdAt": -1 } }, // Sort by most recent
// // // //             {
// // // //                 $group: {
// // // //                     _id: "$childId",
// // // //                     childData: { $first: "$childData" },
// // // //                     quiz: { $first: "$$ROOT" },
// // // //                     quizResults: { $push: "$quizResults" }
// // // //                 }
// // // //             },
// // // //             {
// // // //                 $project: {
// // // //                     age: "$childData.age",
// // // //                     gender: "$childData.gender",
// // // //                     category: "$quiz.category",
// // // //                     difficulty: "$quiz.difficulty",
// // // //                     quizMark: { $arrayElemAt: ["$quizResults.quizMark", 0] },
// // // //                     quizCompletionTime: { $arrayElemAt: ["$quizResults.completionTime", 0] }
// // // //                 }
// // // //             }
// // // //         ]);

// // // //         if (data.length === 0) {
// // // //             return res.status(404).json({ error: "No data found for the given child" });
// // // //         }

// // // //         res.json(data); // Send the most recent quiz result for the given child
// // // //     } catch (error) {
// // // //         console.error("Error fetching model data:", error);
// // // //         res.status(500).json({ error: "Internal Server Error" });
// // // //     }
// // // // });

// // // // export default router;
// // // import express from 'express';
// // // import mongoose from 'mongoose';
// // // import Quiz from '../../models/maths/questionModel.js';
// // // import QuizResult from '../../models/maths/QuizResult.js';
// // // import Child from '../../models/child.js';

// // // const router = express.Router();

// // // router.get('/getModelData', async (req, res) => {
// // //     const childId = req.query.childId || req.session.childId || req.user?.childId;  // Get childId from query, session, or user (if logged in)

// // //     if (!childId) {
// // //         return res.status(400).json({ error: "Child ID is required" });
// // //     }

// // //     try {
// // //         // Ensure childId is a valid ObjectId before using it in the query
// // //         const objectId = new mongoose.Types.ObjectId(childId);

// // //         // Fetch only the most recent quiz result for the given child
// // //         const data = await Quiz.aggregate([
// // //             { $match: { childId: objectId } }, // Filter by childId (use ObjectId here)
// // //             {
// // //                 $lookup: {
// // //                     from: "children", 
// // //                     localField: "childId",
// // //                     foreignField: "_id",
// // //                     as: "childData"
// // //                 }
// // //             },
// // //             { $unwind: "$childData" },

// // //             {
// // //                 $lookup: {
// // //                     from: "quizresults", 
// // //                     localField: "childId",
// // //                     foreignField: "childId",
// // //                     as: "quizResults"
// // //                 }
// // //             },
// // //             { $sort: { "createdAt": -1 } }, // Sort by most recent
// // //             {
// // //                 $group: {
// // //                     _id: "$childId",
// // //                     childData: { $first: "$childData" },
// // //                     quiz: { $first: "$$ROOT" },
// // //                     quizResults: { $push: "$quizResults" }
// // //                 }
// // //             },
// // //             {
// // //                 $project: {
// // //                     age: "$childData.age",
// // //                     gender: "$childData.gender",
// // //                     category: "$quiz.category",
// // //                     difficulty: "$quiz.difficulty",
// // //                     noOfQuestions: { $size: "$quizResults.questions" }, // Assuming questions are in quizResults
// // //                     correctCount: { $sum: "$quizResults.correctCount" },
// // //                     incorrectCount: { $sum: "$quizResults.incorrectCount" },
// // //                     noOfAttemptsInSubLevel1: { $sum: "$quizResults.subLevel1.attempts" },
// // //                     noOfAttemptsInSubLevel2: { $sum: "$quizResults.subLevel2.attempts" },
// // //                     noOfAttemptsInSubLevel3: { $sum: "$quizResults.subLevel3.attempts" },
// // //                     noOfAttemptsInSubLevel4: { $sum: "$quizResults.subLevel4.attempts" },
// // //                     noOfCorrectQuestionsInSubLevel1: { $sum: "$quizResults.subLevel1.correctCount" },
// // //                     noOfCorrectQuestionsInSubLevel2: { $sum: "$quizResults.subLevel2.correctCount" },
// // //                     noOfCorrectQuestionsInSubLevel3: { $sum: "$quizResults.subLevel3.correctCount" },
// // //                     noOfCorrectQuestionsInSubLevel4: { $sum: "$quizResults.subLevel4.correctCount" },
// // //                     avgResponseTimeForSubLevel1: { $avg: "$quizResults.subLevel1.responseTime" },
// // //                     avgResponseTimeForSubLevel2: { $avg: "$quizResults.subLevel2.responseTime" },
// // //                     avgResponseTimeForSubLevel3: { $avg: "$quizResults.subLevel3.responseTime" },
// // //                     avgResponseTimeForSubLevel4: { $avg: "$quizResults.subLevel4.responseTime" },
// // //                     quizCompletionTime: { $arrayElemAt: ["$quizResults.completionTime", 0] } // Get the first quiz result completion time
// // //                 }
// // //             }
// // //         ]);

// // //         if (data.length === 0) {
// // //             return res.status(404).json({ error: "No data found for the given child" });
// // //         }

// // //         // Send the most recent quiz result for the given child
// // //         res.json(data);
// // //     } catch (error) {
// // //         console.error("Error fetching model data:", error);
// // //         res.status(500).json({ error: "Internal Server Error" });
// // //     }
// // // });

// // // export default router;
// // import express from 'express';
// // import mongoose from 'mongoose';
// // import Quiz from '../../models/maths/questionModel.js';
// // import QuizResult from '../../models/maths/QuizResult.js';
// // import Child from '../../models/child.js';

// // const router = express.Router();

// // router.get('/getModelData', async (req, res) => {
// //     const childId = req.query.childId || req.session.childId || req.user?.childId;  // Get childId from query or session or user (if logged in)

// //     if (!childId) {
// //         return res.status(400).json({ error: "Child ID is required" });
// //     }

// //     try {
// //         // Fetch the required data for the given child
// //         const data = await Quiz.aggregate([
// //             { $match: { childId: mongoose.Types.ObjectId(childId) } }, // Filter by childId
// //             {
// //                 $lookup: {
// //                     from: "children", 
// //                     localField: "childId",
// //                     foreignField: "_id",
// //                     as: "childData"
// //                 }
// //             },
// //             { $unwind: "$childData" },

// //             {
// //                 $lookup: {
// //                     from: "quizresults", 
// //                     localField: "childId",
// //                     foreignField: "childId",
// //                     as: "quizResults"
// //                 }
// //             },
// //             { $sort: { "createdAt": -1 } }, // Sort by most recent
// //             {
// //                 $group: {
// //                     _id: "$childId",
// //                     childData: { $first: "$childData" },
// //                     quiz: { $first: "$$ROOT" },
// //                     quizResults: { $push: "$quizResults" }
// //                 }
// //             },
// //             {
// //                 $project: {
// //                     age: "$childData.age",
// //                     gender: "$childData.gender",
// //                     category: "$quiz.category",
// //                     difficulty: "$quiz.difficulty",
// //                     // Add quiz result details
// //                     noOfQuestions: { $size: "$quizResults.questions" }, // Assuming questions are in quizResults
// //                     correctCount: { $sum: "$quizResults.correctCount" },
// //                     incorrectCount: { $sum: "$quizResults.incorrectCount" },
// //                     noOfAttemptsInSubLevel1: { $sum: "$quizResults.subLevel1.attempts" },
// //                     noOfAttemptsInSubLevel2: { $sum: "$quizResults.subLevel2.attempts" },
// //                     noOfAttemptsInSubLevel3: { $sum: "$quizResults.subLevel3.attempts" },
// //                     noOfAttemptsInSubLevel4: { $sum: "$quizResults.subLevel4.attempts" },
// //                     noOfCorrectQuestionsInSubLevel1: { $sum: "$quizResults.subLevel1.correctCount" },
// //                     noOfCorrectQuestionsInSubLevel2: { $sum: "$quizResults.subLevel2.correctCount" },
// //                     noOfCorrectQuestionsInSubLevel3: { $sum: "$quizResults.subLevel3.correctCount" },
// //                     noOfCorrectQuestionsInSubLevel4: { $sum: "$quizResults.subLevel4.correctCount" },
// //                     avgResponseTimeForSubLevel1: { $avg: "$quizResults.subLevel1.responseTime" },
// //                     avgResponseTimeForSubLevel2: { $avg: "$quizResults.subLevel2.responseTime" },
// //                     avgResponseTimeForSubLevel3: { $avg: "$quizResults.subLevel3.responseTime" },
// //                     avgResponseTimeForSubLevel4: { $avg: "$quizResults.subLevel4.responseTime" },
// //                     quizCompletionTime: { $arrayElemAt: ["$quizResults.completionTime", 0] } // Get the first quiz result completion time
// //                 }
// //             }
// //         ]);

// //         res.json(data); // Send the data
// //     } catch (error) {
// //         console.error("Error fetching model data:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // export default router;
// import express from 'express';
// import mongoose from 'mongoose';
// import Quiz from '../../models/maths/questionModel.js';
// import QuizResult from '../../models/maths/QuizResult.js';
// import Child from '../../models/child.js';

// const router = express.Router();

// // router.get('/getModelData', async (req, res) => {
// //     const childId = req.query.childId || req.session.childId || req.user?.childId;  // Get childId from query or session or user (if logged in)

// //     if (!childId) {
// //         return res.status(400).json({ error: "Child ID is required" });
// //     }

// //     try {
// //         // Fetch the required data for the given child
// //         const data = await Quiz.aggregate([
// //             { $match: { childId: new mongoose.Types.ObjectId(childId) } }, // Use 'new' to instantiate ObjectId
// //             {
// //                 $lookup: {
// //                     from: "children", 
// //                     localField: "childId",
// //                     foreignField: "_id",
// //                     as: "childData"
// //                 }
// //             },
// //             { $unwind: "$childData" },

// //             {
// //                 $lookup: {
// //                     from: "quizresults", 
// //                     localField: "childId",
// //                     foreignField: "childId",
// //                     as: "quizResults"
// //                 }
// //             },
// //             { $sort: { "createdAt": -1 } }, // Sort by most recent
// //             {
// //                 $group: {
// //                     _id: "$childId",
// //                     childData: { $first: "$childData" },
// //                     quiz: { $first: "$$ROOT" },
// //                     quizResults: { $push: "$quizResults" }
// //                 }
// //             },
// //             {
// //                 $project: {
// //                     age: "$childData.age",
// //                     gender: "$childData.gender",
// //                     category: "$quiz.category",
// //                     difficulty: "$quiz.difficulty",
// //                     // Add quiz result details
// //                     noOfQuestions: { $size: "$quizResults.questions" }, // Assuming questions are in quizResults
// //                     correctCount: { $sum: "$quizResults.correctCount" },
// //                     incorrectCount: { $sum: "$quizResults.incorrectCount" },
// //                     noOfAttemptsInSubLevel1: { $sum: "$quizResults.subLevel1.attempts" },
// //                     noOfAttemptsInSubLevel2: { $sum: "$quizResults.subLevel2.attempts" },
// //                     noOfAttemptsInSubLevel3: { $sum: "$quizResults.subLevel3.attempts" },
// //                     noOfAttemptsInSubLevel4: { $sum: "$quizResults.subLevel4.attempts" },
// //                     noOfCorrectQuestionsInSubLevel1: { $sum: "$quizResults.subLevel1.correctCount" },
// //                     noOfCorrectQuestionsInSubLevel2: { $sum: "$quizResults.subLevel2.correctCount" },
// //                     noOfCorrectQuestionsInSubLevel3: { $sum: "$quizResults.subLevel3.correctCount" },
// //                     noOfCorrectQuestionsInSubLevel4: { $sum: "$quizResults.subLevel4.correctCount" },
// //                     avgResponseTimeForSubLevel1: { $avg: "$quizResults.subLevel1.responseTime" },
// //                     avgResponseTimeForSubLevel2: { $avg: "$quizResults.subLevel2.responseTime" },
// //                     avgResponseTimeForSubLevel3: { $avg: "$quizResults.subLevel3.responseTime" },
// //                     avgResponseTimeForSubLevel4: { $avg: "$quizResults.subLevel4.responseTime" },
// //                     quizCompletionTime: { $arrayElemAt: ["$quizResults.completionTime", 0] } // Get the first quiz result completion time
// //                 }
// //             }
// //         ]);

// //         res.json(data); // Send the data
// //     } catch (error) {
// //         console.error("Error fetching model data:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // export default router;

// router.get('/getModelData', async (req, res) => {
//     const childId = req.query.childId || req.session.childId || req.user?.childId;  

//     if (!childId) {
//         return res.status(400).json({ error: "Child ID is required" });
//     }

//     try {
//         const data = await Quiz.aggregate([
//             { $match: { childId: new mongoose.Types.ObjectId(childId) } },
            
//             // Join child details
//             {
//                 $lookup: {
//                     from: "children",
//                     localField: "childId",
//                     foreignField: "_id",
//                     as: "childData"
//                 }
//             },
//             { $unwind: "$childData" },

//             // Join quiz results
//             {
//                 $lookup: {
//                     from: "quizresults",
//                     localField: "childId",
//                     foreignField: "childId",
//                     as: "quizResults"
//                 }
//             },

//             // Unwind quizResults for aggregation
//             { $unwind: { path: "$quizResults", preserveNullAndEmptyArrays: true } },

//             {
//                 $group: {
//                     _id: "$childId",
//                     childData: { $first: "$childData" },
//                     category: { $first: "$category" },
//                     difficulty: { $first: "$difficulty" },
//                     totalQuestions: { $sum: { $size: { $ifNull: ["$quizResults.questions", []] } } },
//                     correctCount: { $sum: { $ifNull: ["$quizResults.correctCount", 0] } },
//                     incorrectCount: { $sum: { $ifNull: ["$quizResults.incorrectCount", 0] } },
                    
//                     noOfAttemptsInSubLevels: {
//                         $sum: {
//                             $add: [
//                                 { $ifNull: ["$quizResults.subLevel1.attempts", 0] },
//                                 { $ifNull: ["$quizResults.subLevel2.attempts", 0] },
//                                 { $ifNull: ["$quizResults.subLevel3.attempts", 0] },
//                                 { $ifNull: ["$quizResults.subLevel4.attempts", 0] }
//                             ]
//                         }
//                     },
//                     correctSubLevels: {
//                         $sum: {
//                             $add: [
//                                 { $ifNull: ["$quizResults.subLevel1.correctCount", 0] },
//                                 { $ifNull: ["$quizResults.subLevel2.correctCount", 0] },
//                                 { $ifNull: ["$quizResults.subLevel3.correctCount", 0] },
//                                 { $ifNull: ["$quizResults.subLevel4.correctCount", 0] }
//                             ]
//                         }
//                     },
//                     avgResponseTimeSubLevels: {
//                         $avg: {
//                             $add: [
//                                 { $ifNull: ["$quizResults.subLevel1.responseTime", 0] },
//                                 { $ifNull: ["$quizResults.subLevel2.responseTime", 0] },
//                                 { $ifNull: ["$quizResults.subLevel3.responseTime", 0] },
//                                 { $ifNull: ["$quizResults.subLevel4.responseTime", 0] }
//                             ]
//                         }
//                     },
//                     quizCompletionTime: { $first: "$quizResults.completionTime" }
//                 }
//             },
//             {
//                 $project: {
//                     age: "$childData.age",
//                     gender: "$childData.gender",
//                     category: 1,
//                     difficulty: 1,
//                     totalQuestions: 1,
//                     correctCount: 1,
//                     incorrectCount: 1,
//                     noOfAttemptsInSubLevels: 1,
//                     correctSubLevels: 1,
//                     avgResponseTimeSubLevels: 1,
//                     quizCompletionTime: 1
//                 }
//             }
//         ]);

//         res.json(data);
//     } catch (error) {
//         console.error("Error fetching model data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// export default router;

import express from 'express';
import mongoose from 'mongoose';
import Quiz from '../../models/maths/questionModel.js';
import QuizResult from '../../models/maths/QuizResult.js';
import Child from '../../models/child.js';

const router = express.Router();

router.get('/getModelData', async (req, res) => {
    const childId = req.query.childId || req.session.childId || req.user?.childId;

    if (!childId) {
        return res.status(400).json({ error: "Child ID is required" });
    }

    try {
        // Fetch child, quiz, and quiz result data
        const data = await Quiz.aggregate([
            { $match: { childId: new mongoose.Types.ObjectId(childId) } }, // Match child's quiz data
            { $sort: { createdAt: -1 } }, // Get latest quiz entry
            { $limit: 1 },

            // Lookup child data
            {
                $lookup: {
                    from: "children", // Ensure this matches your actual MongoDB collection name
                    localField: "childId",
                    foreignField: "_id",
                    as: "childData"
                }
            },
            { $unwind: "$childData" },

            // Lookup quiz results data
            {
                // $lookup: {
                //     from: "quizresults", // Ensure this matches your actual collection name
                //     localField: "childId",
                //     foreignField: "childId",
                //     as: "quizResults"
                // }
                $lookup: {
                    from: "quizresults",
                    let: { childId: "$childId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$childId", "$$childId"] } } },
                        { $sort: { createdAt: -1 } },
                        { $limit: 1 }
                    ],
                    as: "quizResults"
                }
            },
            //{ $unwind: { path: "$quizResults", preserveNullAndEmptyArrays: true } }, // Avoid errors if no results exist
            { $unwind: { path: "$quizResults", preserveNullAndEmptyArrays: true, includeArrayIndex: "quizIndex" } },


            // Group and structure final data
            {
            $project: {
                _id: 0,
                age: "$childData.age",
                gender: "$childData.gender",
                category: "$category",
                difficulty: "$difficulty",
                noofquestions: "$noOfQuestions",
                correctcount: "$correctCount",
                incorrectcount: "$incorrectCount",
                noofattemptinquestionsinsublevel1: "$noOfAttemptsInSubLevel1",
                noofattemptinquestionsinsublevel2: "$noOfAttemptsInSubLevel2",
                noofattemptinquestionsinsublevel3: "$noOfAttemptsInSubLevel3",
                noofattemptinquestionsinsublevel4: "$noOfAttemptsInSubLevel4",
                noofcorrectquestionsinsublevel1: "$noOfCorrectQuestionsInSubLevel1",
                noofcorrectquestionsinsublevel2: "$noOfCorrectQuestionsInSubLevel2",
                noofcorrectquestionsinsublevel3: "$noOfCorrectQuestionsInSubLevel3",
                noofcorrectquestionsinsublevel4: "$noOfCorrectQuestionsInSubLevel4",
                avrgresponsetimeforsublevel1questions: "$avgResponseTimeForSubLevel1",
                avrgresponsetimeforsublevel2questions: "$avgResponseTimeForSubLevel2",
                avrgresponsetimeforsublevel3questions: "$avgResponseTimeForSubLevel3",
                avrgresponsetimeforsublevel4questions: "$avgResponseTimeForSubLevel4",
                quizmark: "$quizResults.quizMark",
                quizcompletationtime: {
                    $ifNull: ["$quizResults.completionTime", 0]  // Default to 0 if completionTime is not found
                  }
                }
            }
        ]);

        res.json(data.length > 0 ? data[0] : { message: "No data found" });
    } catch (error) {
        console.error("Error fetching model data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
