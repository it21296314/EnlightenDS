import express from "express";
import Questions from "../../models/interest/questions.js";
import QuestionsCollection from "../../models/interest/questionsCollection.js";
import UserScore from "../../models/interest/userScore.js";
import generateQuizzes from "../../utils/generateQuiz.js";

const router = express.Router();

// ✅ Fix: Use router.post() instead of app.post()
router.post("/generate-quizzes", async (req, res) => {
  try {
    const { category, subcategory, userId } = req.body;
    await generateQuizzes(category, subcategory, userId);
    res.status(200).json({ message: "Quizzes generated successfully." });
  } catch (error) {
    console.error("Error generating quizzes:", error);
    res.status(500).json({ error: error.message });
  }
});


// ✅ Fix: Use router.get() instead of app.get()
router.get("/mycollections/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching collections for userId:", userId);

    const questionCollections = await QuestionsCollection.find({
      user: userId,
    });

    console.log("Found collections:", questionCollections);

    if (!questionCollections || questionCollections.length === 0) {
      console.log(
        "No collections found for user. Checking if any collections exist in the database..."
      );
      const allCollections = await QuestionsCollection.find({});
      console.log("Total collections in database:", allCollections.length);
      if (allCollections.length > 0) {
        console.log("Sample collection:", allCollections[0]);
      }
    }

    res.json(questionCollections);
  } catch (error) {
    console.error("Error fetching question collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/quiz/:questionCollectionId", async (req, res) => {
  try {
    const { questionCollectionId } = req.params;
    const questions = await Questions.find({
      questionCollection: questionCollectionId,
    });
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/save-score", async (req, res) => {
  try {
    const { userId, questionCollectionId, numCorrect, numWrong, totalTimeSpent } = req.body;

    console.log("Received data:", {
      userId,
      questionCollectionId,
      numCorrect,
      numWrong,
      totalTimeSpent
    });

    // Validate inputs
    if (!userId || !questionCollectionId || numCorrect === undefined || numWrong === undefined || totalTimeSpent === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert values to appropriate types
    const userScoreData = {
      user: userId,
      questionCollection: questionCollectionId,
      numCorrect: Number(numCorrect) || 0,
      numWrong: Number(numWrong) || 0,
      totalTimeSpent: Number(totalTimeSpent) || 0
    };

    console.log("Processed data:", userScoreData);

    // Create new user score
    const userScore = new UserScore(userScoreData);

    console.log("Attempting to save userScore:", userScore);

    await userScore.save();
    res.status(200).json({ message: "Score saved successfully", userScore });
  } catch (error) {
    console.error("Error saving score:", error);
    // Send more detailed error information
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message,
      validationErrors: error.errors
    });
  }
});

export default router;




// import express from "express";
// import generateQuizzes from "../../utils/generateQuiz.js";
// import QuestionsCollection from "../../models/interest/questionsCollection.js";
// import Questions from "../../models/interest/questions.js";

// const router = express.Router();

// // ✅ Fix: Use router.post() instead of app.post()
// router.post("/generate-quizzes", async (req, res) => {
//   try {
//     const { category, subcategory, userId } = req.body;
//     await generateQuizzes(category, subcategory, userId);
//     res.status(200).json({ message: "Quizzes generated successfully." });
//   } catch (error) {
//     console.error("Error generating quizzes:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Fix: Use router.get() instead of app.get()
// router.get("/mycollections/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log("Fetching collections for userId:", userId);

//     const questionCollections = await QuestionsCollection.find({
//       user: userId,
//     });

//     console.log("Found collections:", questionCollections);

//     if (!questionCollections || questionCollections.length === 0) {
//       console.log(
//         "No collections found for user. Checking if any collections exist in the database..."
//       );
//       const allCollections = await QuestionsCollection.find({});
//       console.log("Total collections in database:", allCollections.length);
//       if (allCollections.length > 0) {
//         console.log("Sample collection:", allCollections[0]);
//       }
//     }

//     res.json(questionCollections);
//   } catch (error) {
//     console.error("Error fetching question collections:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.get("/quiz/:questionCollectionId", async (req, res) => {
//   try {
//     const { questionCollectionId } = req.params;
//     const questions = await Questions.find({
//       questionCollection: questionCollectionId,
//     });
//     res.json(questions);
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/update-results", async (req, res) => {
//   try {
//     const { questionCollectionId, numCorrect, numWrong } = req.body;

//     // Validate inputs
//     if (!questionCollectionId) {
//       return res.status(400).json({ error: "questionCollectionId is required" });
//     }

//     // Update the collection with the new scores
//     const updatedCollection = await QuestionsCollection.findOneAndUpdate(
//       { _id: questionCollectionId },
//       { numCorrect, numWrong },
//       { new: true }
//     );

//     if (!updatedCollection) {
//       return res.status(404).json({ error: "Question collection not found" });
//     }

//     res.status(200).json({ message: "Results updated successfully", updatedCollection });
//   } catch (error) {
//     console.error("Error updating results:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;