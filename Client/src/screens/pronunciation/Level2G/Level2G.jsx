import React, { useState, useEffect } from 'react';
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

  const endpoint = 1000;
  const animationProps = useSpring({
    left: `${movement}px`,
    config: { tension: 500, friction: 50 },
    immediate: isRunning,
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
    setGameStarted(true);
  };

  return (
    <div className="checker-container">
      <h1>Level 1: Emotion + Pronunciation Game</h1>
      <div className="timer">Time: {timer} seconds</div>
      <div className="game-area">
        <animated.div
          className="character"
          style={{
            position: 'absolute',
            top: '50px',
            ...animationProps,
          }}
        >
          <img
            src="/images/mario03.png"
            alt="Super Mario"
            style={{ width: '80px', height: '80px', objectFit: 'contain' }}
          />
        </animated.div>
      </div>

      {phase === 'emotion' && (
        <EmotionDetection onSmileDetected={handleSmileDetected} isActive={phase === 'emotion'} />
      )}

      {phase === 'pronunciation' && imageUrl && (
        <div className="pronunciation-container">
          <img src={imageUrl} alt={currentWord} className="word-image" />
          <WordPronunciation targetWord={currentWord} onPronunciationComplete={handlePronunciationCorrect} />
        </div>
      )}

      {win && <div className="win-message"><h2>You Win!</h2></div>}
      {gameOver && (
        <div className="game-over-message">
          <h2>Game Over!</h2>
          <button onClick={startGame} className="reset-btn">
            Restart Game
          </button>
        </div>
      )}
      {!win && !gameOver && !gameStarted && (
        <button onClick={startGame} className="start-btn">
          Start Game
        </button>
      )}
    </div>
  );
}

export default Level2G;
