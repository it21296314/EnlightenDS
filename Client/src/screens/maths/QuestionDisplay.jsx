
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionDisplay = () => {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();

  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (questionCount < 5) {
      fetchQuestion();
    }
  }, [category, difficulty, questionCount]);

  const fetchQuestion = async () => {
    try {
      console.log(`Fetching question number: ${questionCount + 1}`);
      const response = await axios.get(`http://localhost:3001/api/questions/generate/${category}/${difficulty}`);
      setQuestionData(response.data);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleSubmit = () => {
    if (userAnswer.trim() === '') return; // Prevent empty submissions

    setIsAnswered(true); // Mark as answered
  };

  const handleNextQuestion = () => {
    setIsAnswered(false); // Reset answer state
    setUserAnswer(''); // Clear input
    setQuestionCount((prevCount) => prevCount + 1);
  };

  const isCorrect = questionData && parseFloat(userAnswer) === parseFloat(questionData.correctAnswer);

  return (
    <div>
      {questionData && !isAnswered ? (
        <>
          <h1>Category: {category}</h1>
          <h2>Difficulty Level: {difficulty}</h2>
          <p>{questionData.question}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <>
          <h1>{isCorrect ? 'Correct!' : 'Wrong!'}</h1>
          {!isCorrect && <p>Correct Answer: {questionData?.correctAnswer}</p>}
          {questionCount < 5 ? (
            <button onClick={handleNextQuestion}>Next Question</button>
          ) : (
            <button onClick={() => navigate(`/quiz/${category}/${difficulty}`)}>Attempt Quiz</button>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionDisplay;
