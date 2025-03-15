// // src/routes/questionRoutes.js
// import express from 'express';
// import { generateQuiz } from '../../controllers/maths/quizController.js';

// const router = express.Router();

// router.get('/quiz/:category/:difficulty', generateQuiz);

// export default router;


import express from 'express';
import { generateQuiz } from '../../controllers/maths/quizController.js';
import { getQuizProgress,saveQuizResult } from '../../controllers/maths/quizController.js';

const router = express.Router();

router.get('/quiz/:category/:difficulty', generateQuiz);
// Route to save quiz result
router.post('/quiz/save', saveQuizResult);
router.get("/progress/:childId", getQuizProgress);

export default router;
