import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

const BallCountingAnimation = () => {
  const [balls, setBalls] = useState(Array(5).fill(null));
  const [counting, setCounting] = useState(false);

  const addBalls = () => {
    setCounting(true);
    const newBalls = [...balls, ...Array(3).fill(null)];
    setBalls(newBalls);

    setTimeout(() => {
      speakCount(newBalls.length);
    }, 1000);
  };

  const speakCount = (total) => {
    let count = 1;
    const synth = window.speechSynthesis;

    const sayNumber = () => {
      if (count <= total) {
        const utterance = new SpeechSynthesisUtterance(count.toString());
        synth.speak(utterance);
        count++;
        setTimeout(sayNumber, 1000);
      } else {
        setCounting(false);
      }
    };

    sayNumber();
  };

  useEffect(() => {
    gsap.fromTo(
      ".ball",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2 }
    );
  }, [balls]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Let's Count!</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {balls.map((_, index) => (
          <div
            key={index}
            className="ball"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: index < 5 ? "blue" : "red",
              display: "inline-block",
            }}
          />
        ))}
      </div>
      <br />
      <button
        onClick={addBalls}
        disabled={counting}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#28A745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Add More Balls
      </button>
    </div>
  );
};

export default BallCountingAnimation;
