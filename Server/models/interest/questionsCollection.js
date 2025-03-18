// // const mongoose = require("mongoose");
// import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

// const questionsCollection = new Schema({
//   questionCollectionId: { type: String, required: true },
//   category: { type: String, required: true },
//   subcategory: { type: String, required: true },
//   user: { type: String, required: true },
// });

// const QuestionsCollection = mongoose.model(
//   "questionsCollection",
//   questionsCollection
// );

// module.exports = { QuestionsCollection };

// // const mongoose = require("mongoose");
// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

// const questionsCollection = new Schema({
//   questionCollectionId: { type: String, required: true },
//   category: { type: String, required: true },
//   subcategory: { type: String, required: true },
//   user: { type: String, required: true },
// });

// const QuestionsCollection = mongoose.model(
//   "questionsCollection",
//   questionsCollection
// );

// module.exports = { QuestionsCollection };


//work 
// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const questionsCollectionSchema = new Schema({
//   questionCollectionId: { type: String, required: true },
//   category: { type: String, required: true },
//   subcategory: { type: String, required: true },
//   user: { type: String, required: true },
// });

// const QuestionsCollection = mongoose.model("QuestionsCollection", questionsCollectionSchema);
// export default QuestionsCollection;


import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionsCollectionSchema = new Schema({
  questionCollectionId: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  user: { type: String, required: true },
  numCorrect: { type: Number, default: 0 },  // ✅ Added to store correct answers
  numWrong: { type: Number, default: 0 },    // ✅ Added to store wrong answers
});

const QuestionsCollection = mongoose.model(
  "QuestionsCollection",
  questionsCollectionSchema
);

export default QuestionsCollection;
