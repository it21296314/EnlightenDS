

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  correctAnswer: { type: String, required: true },
  questionId: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  optionA: { type: String, required: true },
  optionB: { type: String, required: true },
  optionC: { type: String, required: true },
  optionD: { type: String, required: true },
  question: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  user: { type: String, required: true },
  questionCollection: { type: Schema.Types.ObjectId, ref: "QuestionCollection", required: true },
});

const Questions = mongoose.model("Questions", questionsSchema);
export default Questions;

