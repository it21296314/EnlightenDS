// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import './QuizSummary.css'
// const QuizSummary = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const {quizData, childId} = location.state; // Retrieve the quiz data passed during navigation

//   if (!quizData || !childId) {
//     // Handle cases where quizData or childId might be missing (e.g. if navigation state is invalid)
//     return <p>Unable to load quiz data. Please try again.</p>;
//   }

//   return (
//     <div className="quiz-summary">
//       <h1>Quiz Summary</h1>

//       <p>Category: {quizData.category}</p>
//       <p>Difficulty: {quizData.difficulty}</p>
//       <p>Total Questions: {quizData.noOfQuestions}</p>
//       <p>Correct Answers: {quizData.correctCount}</p>
//       <p>Incorrect Answers: {quizData.incorrectCount}</p>
//       <h3>Sub-Level Details:</h3>
//       <ul>
//         {[1, 2, 3, 4].map((level) => (
//           <li key={level}>
//             <strong>Sub-Level {level}:</strong>
//             <p>Attempts: {quizData[`noOfAttemptsInSubLevel${level}`]}</p>
//             <p>Correct Answers: {quizData[`noOfCorrectQuestionsInSubLevel${level}`]}</p>
//             <p>Avg Response Time: {quizData[`avgResponseTimeForSubLevel${level}`].toFixed(2)}s</p>
//           </li>
//         ))}
//       </ul>
      
//       <button
//         className="button1"
//         onClick={() => navigate(`/quiz/${quizData.category}/${quizData.difficulty}`, { state: { childId, quizData } })}
//       >
//         Attempt Quiz
//       </button>

//     </div>
//   );
// };

// export default QuizSummary;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './QuizSummary.css';

const QuizSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {quizData, childId} = location.state; // Retrieve the quiz data passed during navigation

  if (!quizData || !childId) {
    // Handle cases where quizData or childId might be missing
    return (
      <div className="quiz-summary error-container">
        <div className="error-message">
          <h2>Oops!</h2>
          <p>We couldn't find your quiz results.</p>
          <button 
            className="button-primary"
            onClick={() => navigate('/')}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Calculate overall percentage
  const percentage = Math.round((quizData.correctCount / quizData.noOfQuestions) * 100);
  
  // Determine message based on performance
  let message = "";
  let emoji = "";
  if (percentage >= 90) {
    message = "Amazing job!";
    emoji = "🌟";
  } else if (percentage >= 70) {
    message = "Great work!";
    emoji = "😃";
  } else if (percentage >= 50) {
    message = "Good effort!";
    emoji = "👍";
  } else {
    message = "Keep practicing!";
    emoji = "🚀";
  }

  return (
    <div className="backkk">
    <div className="quiz-summary">
      <div className="summary-header">
        <p>Your Quiz Results {emoji}</p>
        <h2 className="message">{message}</h2>
      </div>

      <div className="score-container">
        <div className="score-circle">
          <div className="score-number">{percentage}%</div>
          <div className="score-text">Score</div>
        </div>
        
        <div className="quiz-facts">
          <div className="fact-item">
            <span className="fact-label">Quiz Type:</span>
            <span className="fact-value">{quizData.category}</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Level:</span>
            <span className="fact-value">{quizData.difficulty}</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Total Questions:</span>
            <span className="fact-value">{quizData.noOfQuestions}</span>
          </div>
          <div className="fact-item correct">
            <span className="fact-label">Correct:</span>
            <span className="fact-value">{quizData.correctCount}</span>
          </div>
          <div className="fact-item incorrect">
            <span className="fact-label">Incorrect:</span>
            <span className="fact-value">{quizData.incorrectCount}</span>
          </div>
        </div>
      </div>

      <div className="level-progress">
        <h3>Your Journey Through Levels</h3>
        
        <div className="level-cards">
          {[1, 2, 3, 4].map((level) => (
            <div key={level} className={`level-card level-${level}`}>
              <div className="level-header">Level {level}</div>
              <div className="level-stats">
                <div className="stat-row">
                  <span className="stat-icon">🎯</span>
                  <span className="stat-text">
                    {quizData[`noOfCorrectQuestionsInSubLevel${level}`]} correct
                  </span>
                </div>
                <div className="stat-row">
                  <span className="stat-icon">⏱️</span>
                  <span className="stat-text">
                    {quizData[`avgResponseTimeForSubLevel${level}`].toFixed(1)}s per question
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="action-buttons">
        <button
          className="button-primary"
          onClick={() => navigate(`/quiz/${quizData.category}/${quizData.difficulty}`, { state: { childId, quizData } })}
        >
          Attempt Quiz! 🎮
        </button>
        
        <button
          className="button-secondary"
          onClick={() => navigate('/dashboard', { state: { childId } })}
        >
          Back
        </button>
      </div>
    </div></div>
  );
};

export default QuizSummary;
