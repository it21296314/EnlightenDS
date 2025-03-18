import React from "react";
import { useNavigate } from "react-router-dom";
import "./pronunciationHome.css";

function PronunciationHome() {
  const navigate = useNavigate();

  const handleBeginnerClick = () => {
    navigate("/beginner-category");
  };

  return (
    <div className="pronunciation-home-wrapper">
      <div className="pronunciation-home-header">
        <h1>Practice Platform</h1>
      </div>
      
      <div className="pronunciation-home-buttons">
        <button
          className="pronunciation-home-btn beginner-home-btn"
          onClick={handleBeginnerClick}
        >
          Non-gamified
        </button>
        <button
          className="pronunciation-home-btn advanced-home-btn"
          onClick={() => navigate("/level1")}
        >
          Gamified
        </button>
      </div>
    </div>
  );
}

export default PronunciationHome;
