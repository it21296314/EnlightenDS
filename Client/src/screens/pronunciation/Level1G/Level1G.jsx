import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import ReactWebcam from "react-webcam";
import axios from "axios";
import "./Level1G.css";

function Level1G() {
  const [emotion, setEmotion] = useState("");
  const [movement, setMovement] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [win, setWin] = useState(false);

  const webcamRef = useRef(null);
  const audioRef = useRef(null); // Reference for background music
  const endpoint = 1000;

  // Character movement animation
  const characterAnimation = useSpring({
    transform: "scale(2.0)",
    left: `${movement}px`,
    config: { tension: 170, friction: 20 },
    immediate: isRunning,
  });

  // Background scrolling animation
  const backgroundAnimation = useSpring({
    transform: `translateX(-${movement / 2}px)`,
    config: { tension: 100, friction: 20 },
  });

  const captureEmotion = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      const response = await axios.post("http://127.0.0.1:5000/detect-emotion", {
        image: imageSrc,
      });
      const detectedEmotion = response.data.emotion;
      setEmotion(detectedEmotion);

      if (detectedEmotion === "Happy" && !gameOver && !win && movement < endpoint) {
        setIsRunning(true);
        setMovement((prev) => Math.min(prev + 7, endpoint));
      } else {
        setIsRunning(false);
      }
    } catch (error) {
      console.error("Error detecting emotion:", error);
    }
  };

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(captureEmotion, 100);
    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (gameOver || win) return;

    if (gameStarted) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setGameOver(true);
            setIsRunning(false);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [gameStarted, gameOver, win]);

  useEffect(() => {
    if (movement >= endpoint) {
      setWin(true);
      setIsRunning(false);
    }
  }, [movement]);

  // Start and stop background music when game starts/stops
  useEffect(() => {
    if (gameStarted && audioRef.current) {
      audioRef.current.play().catch((error) => console.log("Audio play error:", error));
    } else if (gameOver || win) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio
    }
  }, [gameStarted, gameOver, win]);

  const startGame = () => {
    setGameStarted(true);
    setTimer(60);
    setGameOver(false);
    setWin(false);
    setMovement(0);
  };

  return (
    <div className="game-container">
      {/* Background Music */}
      <audio ref={audioRef} src="/audio/background-music.mp3" loop />

      {/* Background Video */}
      <div className="background-wrapper">
        <animated.video className="background-video" style={backgroundAnimation} autoPlay loop muted>
          <source src="/videos/newgame4.mp4" type="video/mp4" />
        </animated.video>
        <animated.video className="background-video" style={backgroundAnimation} autoPlay loop muted>
          <source src="/videos/newgame4.mp4" type="video/mp4" />
        </animated.video>
      </div>

      {/* Game UI */}
      <div className="checker-container1">
        <h1>Level 1: Emotion-Based Running Game</h1>

        {/* Timer and Emotion Detection */}
        <div className="timer-emotion-container">
          <div className="button-container">
            <button className="start-end-btn" onClick={startGame}>Start</button>
          </div>

          {!win && !gameOver && (
            <div className="emotion-container1">
              <div className="smile-message1">
                {emotion === "Happy" ? "Running! 🏃" : (
                  <>
                    Smile!
                    <img src="/images/pronunciation/smile.gif" alt="Smile" className="smile-image" />
                  </>
                )}
              </div>

              <ReactWebcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{ width: 320, height: 240, facingMode: "user" }}
                style={{ border: "2px solid white", borderRadius: "5px" }}
              />
              <h3>Emotion: {emotion || "Not detected yet"}</h3>
            </div>
          )}
          <div className="timer1">{timer} S</div>
        </div>

        {/* Display Win or Game Over Message */}
        {win && (
          <div className="win-message1">
            <p>You Win! 🎉</p>
            <img src="/images/pronunciation/win.gif" alt="You Win!" />

          </div>
        )}

        {gameOver && (
          <div className="game-over-message1">
            <p>Try Again! </p>
            <img src="/images/pronunciation/sad.gif" alt="Game Over!" />

          </div>
        )}


        <div className="game-area1">
          {/* Animated Character */}
          {!win && !gameOver && (
            <animated.div className="character" style={characterAnimation}>
              <img src="/images/pronunciation/run.gif" alt="Running Character" className="character-img" />
            </animated.div>
          )}
        </div>


      </div>
    </div >
  );
}

export default Level1G;
