import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import EmotionDetection from './EmotionDetection.jsx';
import WordPronunciation from './WordPronunciation.jsx';
import './Level2G.css';

function Level2G() {
  const [phase, setPhase] = useState('emotion'); // 'emotion' or 'pronunciation'
  const [movement, setMovement] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pronunciationCorrect, setPronunciationCorrect] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [emotion, setEmotion] = useState("");

  const audioRef = useRef(null);
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

  useEffect(() => {
    if (!gameStarted || timer <= 0) {
      if (timer <= 0) setGameOver(true);
      setIsRunning(false);
      return;
    }

    if (!gameOver && !win) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, timer, gameOver, win]);

  useEffect(() => {
    if (gameOver || win) return;

    if (phase === 'emotion') {
      const phaseTimer = setTimeout(() => {
        setPhase('pronunciation');
        setPronunciationCorrect(false);
        fetchRandomImage(); // Fetch a new image when switching to pronunciation phase
      }, 10000);

      return () => clearTimeout(phaseTimer);
    }
  }, [phase, gameOver, win]);

  useEffect(() => {
    if (movement >= endpoint) {
      setWin(true);
      setIsRunning(false);
    }
  }, [movement]);

  const handleSmileDetected = (isSmiling) => {
    if (phase === 'emotion' && isSmiling && !gameOver && !win) {
      setIsRunning(true);
      setMovement((prev) => Math.min(prev + 20, endpoint));
    } else {
      setIsRunning(false);
    }
  };

  const handlePronunciationCorrect = (isCorrect) => {
    if (phase === 'pronunciation') {
      if (isCorrect) {
        setPronunciationCorrect(true);
        setPhase('emotion');
      } else {
        setPronunciationCorrect(false);
      }
    }
  };

  const fetchRandomImage = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-random-image");
      const data = await response.json();

      if (data.imageUrl && data.word) {
        setCurrentWord(data.word);

        // Ensure correct image path
        const fullImageUrl = data.imageUrl.startsWith("/")
          ? `http://localhost:5000${data.imageUrl}` // Serve from backend
          : data.imageUrl; // Use as-is if full URL

        setImageUrl(fullImageUrl);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const startGame = () => {
    setPhase('emotion');
    setMovement(0);
    setTimer(60);
    setGameOver(false);
    setWin(false);
    setPronunciationCorrect(false);
    setGameStarted(true); // Ensure this is set to true
  };

  return (
    <div className='l2g-game-container'>
      {/* Background Music */}
      <audio ref={audioRef} src="/audio/background-music.mp3" loop />

      {/* Background Video */}
      <div className="l2g-background-wrapper">
        <animated.video className="l2g-background-video" style={backgroundAnimation} autoPlay loop muted>
          <source src="/videos/newgame4.mp4" type="video/mp4" />
        </animated.video>
        <animated.video className="l2g-background-video" style={backgroundAnimation} autoPlay loop muted>
          <source src="/videos/newgame4.mp4" type="video/mp4" />
        </animated.video>
      </div>

      <div className="l2g-checker-container">
       

        <div className='l2g-timer-emotion-container'>
          <div className="l2g-button-container">
            <button className="l2g-start-end-btn" onClick={startGame}>Start</button>
          </div>

          {!win && !gameOver && (
            <div className="l2g-emotion-container">
              {phase === 'pronunciation' && imageUrl && (
                <div className="l2g-pronunciation-container">
                  <img src={imageUrl} alt={currentWord} className="l2g-word-image" />
                  <WordPronunciation targetWord={currentWord} onPronunciationComplete={handlePronunciationCorrect} />
                </div>
              )}
              {phase !== 'pronunciation' && (
                <div className="l2g-smile-message">
                  {emotion === "Happy" ? "Running! 🏃" : (
                    <>
                      Smile!
                      <img src="/images/pronunciation/smile.gif" alt="Smile" className="l2g-smile-image" />
                    </>
                  )}
                </div>
              )}

              {phase === 'emotion' && (
                <EmotionDetection onSmileDetected={handleSmileDetected} isActive={phase === 'emotion'} />
              )}
            </div>
          )}

          <div className="l2g-timer">{timer} S</div>
        </div>

        {/* Display Win or Game Over Message */}
        {win && (
          <div className="l2g-win-message">
            <p>You Win! 🎉</p>
            <img src="/images/pronunciation/win.gif" alt="You Win!" />
          </div>
        )}

        {gameOver && (
          <div className="l2g-game-over-message">
            <p>Try Again! </p>
            <img src="/images/pronunciation/sad.gif" alt="Game Over!" />
          </div>
        )}

        <div className="l2g-game-area">
          {/* Animated Character */}
          {!win && !gameOver && (
            <animated.div className="l2g-character" style={characterAnimation}>
              <img src="/images/pronunciation/run.gif" alt="Running Character" className="l2g-character-img" />
            </animated.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Level2G;