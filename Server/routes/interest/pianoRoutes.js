// // const express = require("express");
// // const PianoAttempt = require("../models/PianoAttempt");

// import express from "express";
// import PianoAttempt from "../../models/interest/PianoAttempt.js";

// const router = express.Router();

// // ✅ Save piano interaction attempt
// router.post("/save-attempt", async (req, res) => {
//   try {
//     const { userId, keySequence, interactionTime } = req.body;

//     if (!userId || !keySequence || interactionTime == null) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ Validate attempt conditions
//     let validAttempt = false;
//     const validSequences = [
//       ["C", "D", "E"], // Example valid patterns (can be more)
//       ["G", "A", "B"],
//     ];

//     if (
//       interactionTime >= 5 && 
//       interactionTime <= 20 && 
//       validSequences.some((seq) => JSON.stringify(seq) === JSON.stringify(keySequence))
//     ) {
//       validAttempt = true;
//     }

//     // ✅ Save to DB
//     const newAttempt = new PianoAttempt({ userId, keySequence, interactionTime, validAttempt });
//     await newAttempt.save();

//     res.status(201).json({ message: "Piano attempt saved successfully", validAttempt });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // module.exports = router;
// export default router; 



// import express from "express";
// import PianoAttempt from "../../models/interest/PianoAttempt.js";

// const router = express.Router();

// // ✅ Save piano interaction attempt with logging
// // router.post("/save-attempt", async (req, res) => {
// //   try {
// //     console.log("🔹 Received data:", req.body); // Debugging log

// //     const { userId, keySequence, interactionTime } = req.body;

// //     if (!userId || !keySequence || interactionTime == null) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     // ✅ Validate attempt conditions
// //     let validAttempt = false;
// //     const validSequences = [
// //       ["C", "D", "E"], // Example valid patterns
// //       ["G", "A", "B"],
// //     ];

// //     if (
// //       interactionTime >= 5 &&
// //       interactionTime <= 20 &&
// //       validSequences.some((seq) => JSON.stringify(seq) === JSON.stringify(keySequence))
// //     ) {
// //       validAttempt = true;
// //     }

// //     // ✅ Save to MongoDB
// //     const newAttempt = new PianoAttempt({
// //       userId,
// //       keySequence,
// //       interactionTime,
// //       validAttempt,
// //     });

// //     await newAttempt.save();

// //     console.log("✅ Attempt saved to MongoDB:", newAttempt);
// //     res.status(201).json({ message: "Piano attempt saved successfully", validAttempt });
// //   } catch (error) {
// //     console.error("❌ Error saving attempt:", error);
// //     res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // });

// router.post("/save-attempt", async (req, res) => {
//   try {
//     console.log("🔹 Received request body:", req.body); // Debugging log

//     const { userId, keySequence, interactionTime } = req.body;

//     if (!userId || !keySequence || interactionTime == null) {
//       console.log("⚠️ Missing fields");
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ Validate attempt conditions
//     let validAttempt = false;
//     const validSequences = [
//       ["C", "D", "E"],
//       ["G", "A", "B"],
//     ];

//     if (
//       interactionTime >= 5 &&
//       interactionTime <= 20 &&
//       validSequences.some((seq) => JSON.stringify(seq) === JSON.stringify(keySequence))
//     ) {
//       validAttempt = true;
//     }

//     // ✅ Save to MongoDB
//     const newAttempt = new PianoAttempt({
//       userId,
//       keySequence,
//       interactionTime,
//       validAttempt,
//     });

//     await newAttempt.save();

//     console.log("✅ Attempt saved:", newAttempt);
//     res.status(201).json({ message: "Piano attempt saved successfully", validAttempt });
//   } catch (error) {
//     console.error("❌ Error saving attempt:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });


// export default router;



// import express from "express";
// // import PianoInteraction from "../../models/interest/PianoInteraction.js";
// import PianoInteraction from "../../models/interest/PianoInteraction.js";


// const router = express.Router();

// // // Save piano interaction
// // router.post("/save-interaction", async (req, res) => {
// //   try {
// //     const { userId, keyPressCount, startTime, endTime, duration } = req.body;

// //     const interaction = new PianoInteraction({
// //       userId,
// //       keyPressCount,
// //       startTime,
// //       endTime,
// //       duration,
// //     });

// //     await interaction.save();
// //     res.status(201).json({ message: "Interaction saved successfully!", interaction });
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to save interaction." });
// //   }
// // });

// // Save piano interaction
// router.post("/save-interaction", async (req, res) => {
//   try {
//     const { userId, keyPressCount, startTime, endTime, duration } = req.body;

//     if (!userId || !startTime || !endTime || !duration) {
//       return res.status(400).json({ error: "Missing required fields!" });
//     }

//     const interaction = new PianoInteraction({
//       userId,
//       keyPressCount,
//       startTime,
//       endTime,
//       duration,
//     });

//     await interaction.save();
//     res.status(201).json({ message: "Interaction saved successfully!", interaction });
//   } catch (error) {
//     console.error("Error saving interaction:", error);  // Print the error in console
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// });

// // Get user piano interactions
// router.get("/interactions/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const interactions = await PianoInteraction.find({ userId });

//     res.status(200).json(interactions);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch interactions." });
//   }
// });

// export default router;



import express from "express";
// import PianoInteraction from "../../models/interest/PianoInteraction.js";
import PianoInteraction from "../../models/interest/PianoInteraction.js";


const router = express.Router();

// // Save piano interaction
// router.post("/save-interaction", async (req, res) => {
//   try {
//     const { userId, keyPressCount, startTime, endTime, duration } = req.body;

//     const interaction = new PianoInteraction({
//       userId,
//       keyPressCount,
//       startTime,
//       endTime,
//       duration,
//     });

//     await interaction.save();
//     res.status(201).json({ message: "Interaction saved successfully!", interaction });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save interaction." });
//   }
// });

// Save piano interaction
router.post("/save-interaction", async (req, res) => {
  try {
    const { userId, keyPressCount, startTime, endTime, duration, totalInteractionTime } = req.body;
//totalInteractionTime
    if (!userId || !startTime || !endTime || !duration) {
      return res.status(400).json({ error: "Missing required fields!" });
    }

    const interaction = new PianoInteraction({
      userId,
      keyPressCount,
      startTime,
      endTime,
      duration,
      totalInteractionTime,
    });

    await interaction.save();
    res.status(201).json({ message: "Interaction saved successfully!", interaction });
  } catch (error) {
    console.error("Error saving interaction:", error);  // Print the error in console
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Get user piano interactions
router.get("/interactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const interactions = await PianoInteraction.find({ userId });

    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch interactions." });
  }
});

export default router;
