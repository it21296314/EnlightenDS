
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const { category, difficulty } = useParams();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/quizs/quiz/${category}/${difficulty}`);
        setQuizQuestions(response.data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuizQuestions();
  }, [category, difficulty]);

  const handleInputChange = (questionIndex, value) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;

    quizQuestions.forEach((question, index) => {
      const userAnswer = parseFloat(userAnswers[index]); // Convert to number if needed
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    setScore((correctAnswers / quizQuestions.length) * 100); // Score as percentage
  };

  const handleShowAnswers = () => {
    setShowAnswers(true); // Show correct answers when the button is clicked
  };

  return (
    <div>
      <h1>Quiz - {category.charAt(0).toUpperCase() + category.slice(1)} ({difficulty})</h1>

      {score === null ? (
        <>
          {quizQuestions.length > 0 ? (
            <form>
              {quizQuestions.map((question, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <h3>Question {index + 1}:</h3>
                  <p>{question.question}</p>
                  <input
                    type="text"
                    value={userAnswers[index] || ''} // Pre-fill if user already answered
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder="Enter your answer"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </form>
          ) : (
            <p>Loading questions...</p>
          )}
        </>
      ) : (
        <div>
          <h2>Your Score: {score}%</h2>
          <button
            onClick={handleShowAnswers}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#28A745',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Show Correct Answers
          </button>
          {showAnswers && (
            <div style={{ marginTop: '20px' }}>
              {quizQuestions.map((question, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <h3>Question {index + 1}:</h3>
                  <p>{question.question}</p>
                  <p>
                    <strong>Your Answer:</strong>{' '}
                    {userAnswers[index] !== undefined ? userAnswers[index] : 'Not Answered'}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong> {question.correctAnswer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
