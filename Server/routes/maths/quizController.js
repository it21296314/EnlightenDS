// src/routes/questionRoutes.js
import express from 'express';
import { generateQuiz } from '../../controllers/maths/quizController.js';

const router = express.Router();

router.get('/quiz/:category/:difficulty', generateQuiz);

export default router;
