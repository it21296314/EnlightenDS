import express from 'express';
import mongoose from 'mongoose';

const performanceHistorySchema = new mongoose.Schema({
    childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
    category: String,
    difficulty: String,
    correctCount: Number,
    incorrectCount: Number,
    avgResponseTime: Number,
    date: { type: Date, default: Date.now }
  });
  
  export default mongoose.model('PerformanceHistory', performanceHistorySchema);
  