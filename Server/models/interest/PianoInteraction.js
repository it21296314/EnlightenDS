// // const mongoose = require("mongoose");
// import mongoose from "mongoose";

// const TuneSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   notes: { type: [String], required: true }, // Array of notes (e.g., ["C4", "E4", "G4"])
// });

// // module.exports = mongoose.model("Tune", TuneSchema);
// const Tune = mongoose.model("Tune", TuneSchema);
// export default Tune;


// import mongoose from "mongoose";

// const PianoInteractionSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   keyPressCount: { type: Number, required: true },
//   startTime: { type: Date, required: true },
//   endTime: { type: Date, required: true },
//   duration: { type: Number, required: true }, // Duration in milliseconds
// });

// const PianoInteraction = mongoose.model("PianoInteraction", PianoInteractionSchema);
// export default PianoInteraction;


import mongoose from "mongoose";

const PianoInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  keyPressCount: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // Duration in milliseconds
  totalInteractionTime: { type: Number, required: true }, // Interaction time in seconds
});

const PianoInteraction = mongoose.model("PianoInteraction", PianoInteractionSchema);
export default PianoInteraction;
