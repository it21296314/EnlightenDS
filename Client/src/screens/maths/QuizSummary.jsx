import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './QuizSummary.css'
const QuizSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizData = location.state; // Retrieve the quiz data passed during navigation

  return (
    <div className="quiz-summary">
      <h1>Quiz Summary</h1>
      <p>Category: {quizData.category}</p>
      <p>Difficulty: {quizData.difficulty}</p>
      <p>Total Questions: {quizData.noOfQuestions}</p>
      <p>Correct Answers: {quizData.correctCount}</p>
      <p>Incorrect Answers: {quizData.incorrectCount}</p>
      <h3>Sub-Level Details:</h3>
      <ul>
        {[1, 2, 3, 4].map((level) => (
          <li key={level}>
            <strong>Sub-Level {level}:</strong>
            <p>Attempts: {quizData[`noOfAttemptsInSubLevel${level}`]}</p>
            <p>Correct Answers: {quizData[`noOfCorrectQuestionsInSubLevel${level}`]}</p>
            <p>Avg Response Time: {quizData[`avgResponseTimeForSubLevel${level}`].toFixed(2)}s</p>
          </li>
        ))}
      </ul>
      <button
        className="button1"
        onClick={() => navigate(`/quiz/${quizData.category}/${quizData.difficulty}`)}
      >
        Attempt Quiz
      </button>
    </div>
  );
};

export default QuizSummary;
