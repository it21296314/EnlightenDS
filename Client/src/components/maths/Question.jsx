import React, { useState } from "react";
import MathAnimation from "./MathAnimation";

const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "5 + 3 = ?",
    steps: ["Start with 5", "Add 3", "Answer: 8"],
  });

  return (
    <div>
      <h1>Question</h1>
      <MathAnimation
        question={currentQuestion.question}
        steps={currentQuestion.steps}
      />
    </div>
  );
};

export default Question;
