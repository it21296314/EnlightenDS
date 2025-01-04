// const express = require('express');
// const router = express.Router();
// const generateQuestion = require('../../utils/questionGenerator.js');

// // Generate a question dynamically
// router.get('/generate/:difficulty', (req, res) => {
//   const { difficulty } = req.params;

//   try {
//     const question = generateQuestion(difficulty);
//     res.status(200).json(question);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;

import express from 'express';
import { generateQuestionHandler, saveQuizData } from '../../controllers/maths/questionController.js';
const router = express.Router();

router.get('/generate/:category/:difficulty/:subLevel', generateQuestionHandler);
router.post('/quiz', saveQuizData);

export default router;




