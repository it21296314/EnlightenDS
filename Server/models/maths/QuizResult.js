import mongoose from 'mongoose';

const QuizResultSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child', // Reference to the Child collection
    required: true
  },
  quizMark: {
    type: Number,
    required: true
  },
  completionTime: {
    type: Number, // Time in seconds or milliseconds
    required: true
  },
  difficulty: {
    type: String, // e.g., 'Easy', 'Medium', 'Hard'
    required: true
  },
  category: {
    type: String, // e.g., 'Math', 'Reading', 'Memory'
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('QuizResult', QuizResultSchema);
