import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './QuizSummary.css'
const QuizSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {quizData, childId} = location.state; // Retrieve the quiz data passed during navigation

  if (!quizData || !childId) {
    // Handle cases where quizData or childId might be missing (e.g. if navigation state is invalid)
    return <p>Unable to load quiz data. Please try again.</p>;
  }

  return (
    <div className="quiz-summary">
      <h1>Quiz Summary</h1>
     {/* <p><strong>Quiz ID:</strong> {quizData._id}</p> Display the ObjectId */}
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
      {/* <button
        className="button1"
        onClick={() => navigate(`/quiz/${quizData.category}/${quizData.difficulty}`, { state: { childId } })}
      >
        Attempt Quiz
      </button> */}
      <button
        className="button1"
        onClick={() => navigate(`/quiz/${quizData.category}/${quizData.difficulty}`, { state: { childId, quizData } })}
      >
        Attempt Quiz
      </button>

    </div>
  );
};

export default QuizSummary;
