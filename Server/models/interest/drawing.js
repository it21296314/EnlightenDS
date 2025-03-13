// import mongoose from 'mongoose';

// const DrawingSchema = new mongoose.Schema({
//   data: String, // Canvas data (base64)
//   timeSpent: Number, // Time spent in seconds
//   createdAt: { type: Date, default: Date.now },
// });

// const Drawing = mongoose.model('drawing', DrawingSchema);
// export default Drawing;

// import mongoose from "mongoose";

// const DrawingSchema = new mongoose.Schema({
//   title: String,  // 
//   data: String, 
//   timeSpent: Number, 
//   createdAt: { type: Date, default: Date.now },
// });

// const Drawing = mongoose.model("Drawing", DrawingSchema);
// export default Drawing;




import mongoose from "mongoose";

const DrawingSchema = new mongoose.Schema({
  title: String,
  data: String, 
  timeSpent: Number,
  similarityScore: { type: Number, default: null }, // ✅ Add similarity score
  createdAt: { type: Date, default: Date.now },
});

const Drawing = mongoose.model("Drawing", DrawingSchema);
export default Drawing;
