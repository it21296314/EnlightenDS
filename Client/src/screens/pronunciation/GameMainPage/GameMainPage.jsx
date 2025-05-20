import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameMainPage.css';

const GameMainPage = () => {
  const navigate = useNavigate();

  const handleLevelClick = (level) => {
    // Navigate to the selected level route
    navigate(`/level${level}`);
  };

  return (
    <div className="game-container">
      <div className="stars-background">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="star" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="clouds">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="cloud" 
            style={{
              left: `${i * 20}%`,
              top: `${10 + Math.random() * 20}%`,
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <header className="game-header">
        <h1 className="game-title">Game Platform</h1>
        <div className="rainbow-underline"></div>
      </header>
      
      <main className="level-selection">
        <div className="level-card" onClick={() => handleLevelClick(1)}>
          <div className="level-number">1</div>
          <div className="level-icon">🏝️</div>
          <h2 className="level-title">Smile Racer</h2>
          <p className="level-description">Ready, set, SMILE! 😀 Every time you smile, your character runs faster.</p>
          <div className="level-button">Play Now!</div>
        </div>
        
        <div className="level-card" onClick={() => handleLevelClick(2)}>
          <div className="level-number">2</div>
          <div className="level-icon">🌋</div>
          <h2 className="level-title">Happy Talk</h2>
          <p className="level-description">Your smile powers the race! 😃 Run for 10 seconds by smiling, then get ready for a challenge.!</p>
          <div className="level-button">Play Now!</div>
        </div>
      </main>
      
      <div className="character">
        <div className="character-body"></div>
        <div className="character-eye eye-left"></div>
        <div className="character-eye eye-right"></div>
        <div className="character-mouth"></div>
      </div>
      
      <footer className="game-footer">
        <div className="footer-bubble">Choose your game!</div>
      </footer>
    </div>
  );
};

export default GameMainPage;