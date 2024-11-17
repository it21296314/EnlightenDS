import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NextQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Destructure category and difficulty from location.state
  const { category, difficulty } = location.state || {};

  useEffect(() => {
    // Ensure both category and difficulty are present
    if (category && difficulty) {
      navigate(`/questions/${category}/${difficulty}`);
    } else {
      console.error("Category or Difficulty is missing in state.");
    }
  }, [category, difficulty, navigate]);

  return <div>Loading next question...</div>;
};

export default NextQuestion;
