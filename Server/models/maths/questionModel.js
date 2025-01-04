import express from 'express';
import mongoose from 'mongoose';

// Mongoose Schema and Model
const quizSchema = new mongoose.Schema({
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  noOfQuestions: { type: Number, required: true },
  correctCount: { type: Number, required: true },
  incorrectCount: { type: Number, required: true },
  noOfAttemptsInSubLevel1: { type: Number, default: 0 },
  noOfAttemptsInSubLevel2: { type: Number, default: 0 },
  noOfAttemptsInSubLevel3: { type: Number, default: 0 },
  noOfAttemptsInSubLevel4: { type: Number, default: 0 },
  noOfCorrectQuestionsInSubLevel1: { type: Number, default: 0 },
  noOfCorrectQuestionsInSubLevel2: { type: Number, default: 0 },
  noOfCorrectQuestionsInSubLevel3: { type: Number, default: 0 },
  noOfCorrectQuestionsInSubLevel4: { type: Number, default: 0 },
  avgResponseTimeForSubLevel1: { type: Number, default: 0 },
  avgResponseTimeForSubLevel2: { type: Number, default: 0 },
  avgResponseTimeForSubLevel3: { type: Number, default: 0 },
  avgResponseTimeForSubLevel4: { type: Number, default: 0 },
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;