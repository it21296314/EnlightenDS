// // Save drawing
// // import express from 'express';
// // const router = express.Router();
// import drawing from '../../models/interest/drawing.js';

// app.post('/api/drawing', async (req, res) => {
//     const { data, timeSpent } = req.body;
  
//     try {
//       const newDrawing = new drawing({ data, timeSpent });
//       await newDrawing.save();
//       res.status(201).json(newDrawing);
//     } catch (err) {
//       res.status(500).json({ message: 'Failed to save drawing' });
//     }
//   });
// //   export default router;



// working one

// import express from "express";
// import Drawing from "../../models/interest/drawing.js"; // ✅ Corrected import

// const router = express.Router();

// // Save a drawing
// router.post("/", async (req, res) => {
//   const { data, timeSpent } = req.body;

//   try {
//     const newDrawing = new Drawing({ data, timeSpent }); // ✅ Capitalized `Drawing`
//     await newDrawing.save();
//     res.status(201).json(newDrawing);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to save drawing" });
//   }
// });

// // Get all drawings
// router.get("/", async (req, res) => {
//   try {
//     const drawings = await Drawing.find().sort({ createdAt: -1 });
//     res.json(drawings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawings", error });
//   }
// });

// export default router; // ✅ Export the router properly





// import express from "express";
// import Drawing from "../../models/interest/drawing.js";

// const router = express.Router();
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Save a drawing
// router.post("/", async (req, res) => {
//   const { title, data, timeSpent } = req.body;

//   if (!title || !data) {
//     return res.status(400).json({ message: "Title and drawing data are required" });
//   }

//   try {
//     const newDrawing = new Drawing({ title, data, timeSpent });
//     await newDrawing.save();
//     res.status(201).json(newDrawing);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to save drawing", error: err.message });
//   }
// });

// // Get all drawings
// router.get("/", async (req, res) => {
//   try {
//     const drawings = await Drawing.find().sort({ createdAt: -1 });
//     res.json(drawings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawings", error });
//   }
// });

// // Get a single random drawing from the database
// router.get("/random", async (req, res) => {
//   try {
//     const count = await Drawing.countDocuments();
//     const randomIndex = Math.floor(Math.random() * count);
//     const drawing = await Drawing.findOne().skip(randomIndex);
    
//     if (!drawing) {
//       return res.status(404).json({ message: "No drawings found" });
//     }

//     res.json(drawing);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawing", error });
//   }
// });
// // Compare drawings using Gemini AI
// router.post("/compare", async (req, res) => {
//   const { originalImage, userImage } = req.body;

//   if (!originalImage || !userImage) {
//     return res.status(400).json({ message: "Both images are required for comparison" });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

//     const prompt = "Compare these two images and provide a similarity score between 0 to 100.";
//     const result = await model.generateContent([
//       prompt,
//       { inlineData: { mimeType: "image/png", data: originalImage.split(",")[1] } },
//       { inlineData: { mimeType: "image/png", data: userImage.split(",")[1] } }
//     ]);

//     const similarityScore = result.response.text().match(/\d+/)[0];

//     res.json({ similarityScore });
//   } catch (error) {
//     res.status(500).json({ message: "Error comparing images", error: error.message });
//   }
// });

// export default router;



// working one
// import express from "express";
// import Drawing from "../../models/interest/drawing.js";
// import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Correct Import
// import dotenv from "dotenv";

// dotenv.config(); // ✅ Load environment variables

// const router = express.Router();
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // ✅ Fix ReferenceError

// // Save a drawing
// router.post("/", async (req, res) => {
//   const { title, data, timeSpent } = req.body;

//   if (!title || !data) {
//     return res.status(400).json({ message: "Title and drawing data are required" });
//   }

//   try {
//     const newDrawing = new Drawing({ title, data, timeSpent });
//     await newDrawing.save();
//     res.status(201).json(newDrawing);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to save drawing", error: err.message });
//   }
// });

// // Get all drawings
// router.get("/", async (req, res) => {
//   try {
//     const drawings = await Drawing.find().sort({ createdAt: -1 });
//     res.json(drawings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawings", error });
//   }
// });

// // Get a single random drawing from the database
// router.get("/random", async (req, res) => {
//   try {
//     const count = await Drawing.countDocuments();
//     const randomIndex = Math.floor(Math.random() * count);
//     const drawing = await Drawing.findOne().skip(randomIndex);
    
//     if (!drawing) {
//       return res.status(404).json({ message: "No drawings found" });
//     }

//     res.json(drawing);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawing", error });
//   }
// });

// // Compare drawings using Gemini AI
// router.post("/compare", async (req, res) => {
//   const { originalImage, userImage } = req.body;

//   if (!originalImage || !userImage) {
//     return res.status(400).json({ message: "Both images are required for comparison" });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

//     const prompt = "Compare these two images and provide a similarity score between 0 to 100.";
//     const result = await model.generateContent([
//       prompt,
//       { inlineData: { mimeType: "image/png", data: originalImage.split(",")[1] } },
//       { inlineData: { mimeType: "image/png", data: userImage.split(",")[1] } }
//     ]);

//     const similarityScore = result.response.text().match(/\d+/)[0];

//     res.json({ similarityScore });
//   } catch (error) {
//     res.status(500).json({ message: "Error comparing images", error: error.message });
//   }
// });

// export default router;





// work one
// import express from "express";
// import Drawing from "../../models/interest/drawing.js";
// import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Correct Import
// import dotenv from "dotenv";

// dotenv.config(); // ✅ Load environment variables

// const router = express.Router();
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // ✅ Fix ReferenceError

// // Save a drawing
// router.post("/", async (req, res) => {
//   const { title, data, timeSpent } = req.body;

//   if (!title || !data) {
//     return res.status(400).json({ message: "Title and drawing data are required" });
//   }

//   try {
//     const newDrawing = new Drawing({ title, data, timeSpent });
//     await newDrawing.save();
//     res.status(201).json(newDrawing);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to save drawing", error: err.message });
//   }
// });

// // Get all drawings
// router.get("/", async (req, res) => {
//   try {
//     const drawings = await Drawing.find().sort({ createdAt: -1 });
//     res.json(drawings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawings", error });
//   }
// });

// // Get a single random drawing from the database
// router.get("/random", async (req, res) => {
//   try {
//     const count = await Drawing.countDocuments();
//     const randomIndex = Math.floor(Math.random() * count);
//     const drawing = await Drawing.findOne().skip(randomIndex);
    
//     if (!drawing) {
//       return res.status(404).json({ message: "No drawings found" });
//     }

//     res.json(drawing);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawing", error });
//   }
// });

// // Compare drawings using Gemini AI
// router.post("/compare", async (req, res) => {
//   const { originalImage, userImage } = req.body;

//   if (!originalImage || !userImage) {
//     return res.status(400).json({ message: "Both images are required for comparison" });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

//     const prompt = "Compare these two images and provide a similarity score between 0 to 100.";
//     const result = await model.generateContent([
//       prompt,
//       { inlineData: { mimeType: "image/png", data: originalImage.split(",")[1] } },
//       { inlineData: { mimeType: "image/png", data: userImage.split(",")[1] } }
//     ]);

// // Extract response text safely
// const responseText = result.response.text();
// const similarityScore = parseInt(responseText.match(/\d+/)?.[0] || "0", 10);

// if (isNaN(similarityScore)) {
//   return res.status(500).json({ message: "Error parsing similarity score from Gemini API." });
// }

// // ✅ Save comparison result in MongoDB
// const newComparison = new Drawing({
//   title: "Comparison Result",
//   data: userImage,
//   timeSpent: 0,
//   similarityScore, // ✅ Store the score
// });

// await newComparison.save();

// res.json({ similarityScore });
// } catch (error) {
// console.error("Error comparing images:", error);
// res.status(500).json({ message: "Error comparing images", error: error.message });
// }

  
// });

// export default router;





// import express from "express";
// import Drawing from "../../models/interest/drawing.js";
// import OpenAI from "openai";  // ✅ Use OpenAI API
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // ✅ Use OpenAI API Key

// // Save a drawing
// router.post("/", async (req, res) => {
//   const { title, data, timeSpent } = req.body;

//   if (!title || !data) {
//     return res.status(400).json({ message: "Title and drawing data are required" });
//   }

//   try {
//     const newDrawing = new Drawing({ title, data, timeSpent });
//     await newDrawing.save();
//     res.status(201).json(newDrawing);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to save drawing", error: err.message });
//   }
// });

// // Get all drawings
// router.get("/", async (req, res) => {
//   try {
//     const drawings = await Drawing.find().sort({ createdAt: -1 });
//     res.json(drawings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawings", error });
//   }
// });

// // Get a random drawing
// router.get("/random", async (req, res) => {
//   try {
//     const count = await Drawing.countDocuments();
//     const randomIndex = Math.floor(Math.random() * count);
//     const drawing = await Drawing.findOne().skip(randomIndex);
    
//     if (!drawing) {
//       return res.status(404).json({ message: "No drawings found" });
//     }

//     res.json(drawing);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawing", error });
//   }
// });

// // Compare drawings using OpenAI
// router.post("/compare", async (req, res) => {
//   const { originalImage, userImage } = req.body;

//   if (!originalImage || !userImage) {
//     return res.status(400).json({ message: "Both images are required for comparison" });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4-vision-preview",
//       messages: [
//         { role: "system", content: "You are an AI that compares two images and gives a similarity score between 0 and 100." },
//         { role: "user", content: "Compare these two images and provide a similarity score." },
//         { role: "user", content: [{ type: "image_url", image_url: originalImage }] },
//         { role: "user", content: [{ type: "image_url", image_url: userImage }] }
//       ],
//       max_tokens: 50
//     });

//     // Extract the similarity score from OpenAI response
//     const responseText = response.choices[0]?.message?.content || "0";
//     const similarityScore = parseInt(responseText.match(/\d+/)?.[0] || "0", 10);

//     if (isNaN(similarityScore)) {
//       return res.status(500).json({ message: "Error parsing similarity score from OpenAI response." });
//     }

//     // ✅ Save comparison result in MongoDB
//     const newComparison = new Drawing({
//       title: "Comparison Result",
//       data: userImage,
//       timeSpent: 0,
//       similarityScore, // ✅ Store the score
//     });

//     await newComparison.save();

//     res.json({ similarityScore });
//   } catch (error) {
//     console.error("Error comparing images:", error);
//     res.status(500).json({ message: "Error comparing images", error: error.message });
//   }
// });

// export default router;



// import express from "express";
// import Drawing from "../../models/interest/drawing.js";
// import OpenAI from "openai";  // ✅ Use OpenAI API
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // ✅ Use OpenAI API Key



// // Save a drawing
// router.post("/", async (req, res) => {
//   const { title, data, timeSpent } = req.body;

//   if (!title || !data) {
//     return res.status(400).json({ message: "Title and drawing data are required" });
//   }

//   try {
//     const newDrawing = new Drawing({ title, data, timeSpent });
//     await newDrawing.save();
//     res.status(201).json(newDrawing);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to save drawing", error: err.message });
//   }
// });

// // Get all drawings
// router.get("/", async (req, res) => {
//   try {
//     const drawings = await Drawing.find().sort({ createdAt: -1 });
//     res.json(drawings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawings", error });
//   }
// });

// // Get a random drawing
// router.get("/random", async (req, res) => {
//   try {
//     const count = await Drawing.countDocuments();
//     const randomIndex = Math.floor(Math.random() * count);
//     const drawing = await Drawing.findOne().skip(randomIndex);
    
//     if (!drawing) {
//       return res.status(404).json({ message: "No drawings found" });
//     }

//     res.json(drawing);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drawing", error });
//   }
// });

// // Compare drawings using OpenAI
// router.post("/compare", async (req, res) => {
//   const { originalImage, userImage } = req.body;

//   if (!originalImage || !userImage) {
//     return res.status(400).json({ message: "Both images are required for comparison" });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4-vision-preview",
//       messages: [
//         { role: "system", content: "You are an AI that compares two images and gives a similarity score between 0 and 100." },
//         { role: "user", content: "Compare these two images and provide a similarity score." },
//         { role: "user", content: [{ type: "image_url", image_url: originalImage }] },
//         { role: "user", content: [{ type: "image_url", image_url: userImage }] }
//       ],
//       max_tokens: 50
//     });

//     // Extract the similarity score from OpenAI response
//     const responseText = response.choices[0]?.message?.content || "0";
//     const similarityScore = parseInt(responseText.match(/\d+/)?.[0] || "0", 10);

//     if (isNaN(similarityScore)) {
//       return res.status(500).json({ message: "Error parsing similarity score from OpenAI response." });
//     }

//     // ✅ Save comparison result in MongoDB
//     const newComparison = new Drawing({
//       title: "Comparison Result",
//       data: userImage,
//       timeSpent: 0,
//       similarityScore, // ✅ Store the score
//     });

//     await newComparison.save(); // ✅ Store comparison in MongoDB

//     res.json({ similarityScore }); // ✅ Send score back to frontend
//   } catch (error) {
//     console.error("Error comparing images:", error);
//     res.status(500).json({ message: "Error comparing images", error: error.message });
//   }
// });

// export default router;


import express from "express";
import Drawing from "../../models/interest/drawing.js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Save drawing
router.post("/", async (req, res) => {
  const { title, data, timeSpent } = req.body;

  try {
    const newDrawing = new Drawing({ title, data, timeSpent });
    await newDrawing.save();
    res.status(201).json(newDrawing);
  } catch (err) {
    res.status(500).json({ message: "Failed to save drawing", error: err.message });
  }
});

// Get random drawing
router.get("/random", async (req, res) => {
  try {
    const count = await Drawing.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const drawing = await Drawing.findOne().skip(randomIndex);
    res.json(drawing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drawing", error });
  }
});

// // Compare drawings
// router.post("/compare", async (req, res) => {
//   const { originalImage, userImage } = req.body;
//   const similarityScore = Math.floor(Math.random() * 100);
//   res.json({ similarityScore });
// });

// // Compare drawings using OpenAI
// router.post("/compare", async (req, res) => {
//   const { originalImage, userImage } = req.body;

//   if (!originalImage || !userImage) {
//     return res.status(400).json({ message: "Both images are required for comparison" });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4-vision-preview",
//       messages: [
//         { role: "system", content: "You are an AI that compares two images and gives a similarity score between 0 and 100." },
//         { role: "user", content: "Compare these two images and provide a similarity score." },
//         { role: "user", content: [{ type: "image_url", image_url: originalImage }] },
//         { role: "user", content: [{ type: "image_url", image_url: userImage }] }
//       ],
//       max_tokens: 50
//     });

//     // Extract the similarity score from OpenAI response
//     const responseText = response.choices[0]?.message?.content || "0";
//     const similarityScore = parseInt(responseText.match(/\d+/)?.[0] || "0", 10);

//     if (isNaN(similarityScore)) {
//       return res.status(500).json({ message: "Error parsing similarity score from OpenAI response." });
//     }

//     // ✅ Save comparison result in MongoDB
//     const newComparison = new Drawing({
//       title: "Comparison Result",
//       data: userImage,
//       timeSpent: 0,
//       similarityScore, // ✅ Store the score
//     });

//     await newComparison.save(); // ✅ Store comparison in MongoDB

//     res.json({ similarityScore }); // ✅ Send score back to frontend
//   } catch (error) {
//     console.error("Error comparing images:", error);
//     res.status(500).json({ message: "Error comparing images", error: error.message });
//   }
// });


router.post("/compare", async (req, res) => {
  const { originalImage, userImage, totalDrawingTime } = req.body;

  if (!originalImage || !userImage) {
    return res.status(400).json({ message: "Both images are required for comparison" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an advanced AI specializing in **hand-drawn image analysis**. Your task is to compare two provided images and return a **realistic similarity score** between **0 (completely different)** and **100 (identical)**, along with a detailed explanation."
        },
        {
          role: "user",
          content: "I will provide two images in Base64 format. These images are digital brush drawings. The first image is the reference drawing, and the second image is the student's attempt. The **drawing must be inside the white canvas area** for valid evaluation."
        },
        {
          role: "user",
          content: "**IMPORTANT**:\n- If the student's drawing is outside the canvas (white box), the score should be low.\n- If only parts of the drawing match, provide a proportional score.\n- If the drawing is entirely different, return a very low similarity score.\n- If the strokes, color, and positioning are almost identical, return a high similarity score."
        },
        {
          role: "user",
          content: `### Image 1 (Reference Drawing):\n${originalImage}`
        },
        {
          role: "user",
          content: `### Image 2 (Student's Drawing):\n${userImage}`
        },
        {
          role: "user",
          content: "**Comparison Criteria:**\n- **Shape Alignment**: Are the strokes inside the correct position in the white canvas?\n- **Stroke Accuracy**: Are the brush strokes following the same path?\n- **Color Consistency**: Are the colors matching the reference image?\n- **Canvas Boundary Check**: Ensure the drawing is inside the white canvas."
        },
        {
          role: "user",
          content: "**Respond in the following JSON format:**\n\n```json\n{\n  \"similarityScore\": [integer],\n  \"explanation\": \"[brief explanation of the comparison]\"\n}\n```\n\n**Example Response:**\n\n```json\n{\n  \"similarityScore\": 42,\n  \"explanation\": \"The student's drawing is outside the expected area, making it difficult to compare accurately. Some strokes align with the reference image, but most are misplaced.\"\n}\n```"
        }
      ],
      max_tokens: 100
    });



    // Extract the similarity score from OpenAI response
    const responseText = response.choices[0]?.message?.content || "0";
    console.info("[ GPT-4o Full Response] ===>", JSON.stringify(response, null, 2));

    // Extract similarity score
    console.info("[ GPT-4o Response Text] ===>", responseText);
    const similarityScore = parseInt(responseText.match(/\d+/)?.[0] || "0", 10);

    if (isNaN(similarityScore)) {
      return res.status(500).json({ message: "Error parsing similarity score from OpenAI response." });
    }

    // ✅ Save comparison result in MongoDB
    const newComparison = new Drawing({
      title: "Comparison Result",
      data: userImage,
      timeSpent: totalDrawingTime,
      similarityScore, // ✅ Store the score
    });

    await newComparison.save(); // ✅ Store comparison in MongoDB

    res.json({ similarityScore }); // ✅ Send score back to frontend
  } catch (error) {
    console.error("Error comparing images:", error);
    res.status(500).json({ message: "Error comparing images", error: error.message });
  }
});
export default router;
