import mongoose from "mongoose";

const userScoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    questionCollection: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    numCorrect: {
      type: Number,
      required: true,
      min: 0
    },
    numWrong: {
      type: Number,
      required: true,
      min: 0
    },
    totalTimeSpent: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true,
    strict: false,
    _id: true
  }
);

// Add a pre-save middleware to ensure numbers are properly converted
userScoreSchema.pre('save', function(next) {
  if (typeof this.numCorrect !== 'number') this.numCorrect = Number(this.numCorrect);
  if (typeof this.numWrong !== 'number') this.numWrong = Number(this.numWrong);
  if (typeof this.totalTimeSpent !== 'number') this.totalTimeSpent = Number(this.totalTimeSpent);
  next();
});

const UserScore = mongoose.model("UserScore", userScoreSchema);

export default UserScore; 