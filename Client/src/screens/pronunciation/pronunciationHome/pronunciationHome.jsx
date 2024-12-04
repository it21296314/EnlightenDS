
import React from "react";
import "./pronunciationHome.css";

function pronunciationHome() {
  return (
    <div className="pronunciationHome">
      <h1>Pronunciation Practice</h1>
      <div className="button-container">
        <button className="big-button beginner">Beginner</button>
        <button className="big-button advanced">Advanced</button>
      </div>
    </div>
  );
}

export default pronunciationHome;
