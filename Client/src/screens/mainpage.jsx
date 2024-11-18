import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/LevelSelection'); // Adjust the path to match your route for the Level Selection Page
  };

  return (
    <div className="main-page">
      <h1 className="main-title">Welcome to EnlightenDS</h1>
      <button className="start-button" onClick={handleNavigate}>
        Maths
      </button>
      <button className="start-button" >
        SADEE
      </button>
      <button className="start-button" >
        SENU
      </button>
      <button className="start-button" >
        DILSHI
      </button>
    </div>
  );
};

export default MainPage;
