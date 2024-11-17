import express from 'express';
import { createTest, getTests } from '../controllers/test.js';

const router = express.Router();

// Route to create a new test entry
router.post('/tests', createTest);

// Route to get all test entries
router.get('/tests', getTests);

export default router;
