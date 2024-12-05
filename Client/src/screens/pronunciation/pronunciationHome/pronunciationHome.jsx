import React from "react";
import { useNavigate } from "react-router-dom";
import "./pronunciationHome.css";

function PronunciationHome() {
  const navigate = useNavigate();

  const handleBeginnerClick = () => {
    navigate("/beginner-category");
  };

  return (
    <div className="pronunciationHome">
      <h1>Pronunciation Platform</h1>
      <div className="button-container">
        <button
          className="big-button beginner"
          onClick={handleBeginnerClick}
        >
          Beginner
        </button>
        <button
          className="big-button advanced"
          onClick={() => navigate("/pronunciation/checker/advanced")}
        >
          Advanced
        </button>
      </div>
    </div>
  );
}

export default PronunciationHome;
