import React from 'react';
import { Link } from 'react-router-dom';
import './MainPronunciation.css';

const MainPronunciation = () => {
  return (
    <div className="pronunciation-container">
      <header className="pronunciation-header">
        <h1>Pronunciation Platform</h1>
        
      </header>
      
      <div className="card-container">
        <div className="card">
          <div className="card-icon">
            <i className="microphone-icon">🎤</i>
          </div>
          <h2>Practice Platform</h2>
          <p>Practice pronunciation with real-time feedback and guided exercises</p>
          <ul>
            <li>Record and compare your speech</li>
            <li>Get personalized recommendations</li>
            <li>Learn with native speaker examples</li>
          </ul>
          <Link to="/pro" className="card-button">Start Practice</Link>
        </div>
        
        <div className="card">
          <div className="card-icon">
            <i className="quiz-icon">📝</i>
          </div>
          <h2>Pronunciation Quiz</h2>
          <p>Test your pronunciation skills with our comprehensive quizzes</p>
          <ul>
            <li>Multiple difficulty levels</li>
            <li>Focus on specific sound patterns</li>
            <li>Track your improvement over time</li>
          </ul>
          <Link to="/categories" className="card-button">Take Quiz</Link>
        </div>
        
        <div className="card">
          <div className="card-icon">
            <i className="dashboard-icon">📊</i>
          </div>
          <h2>Dashboard</h2>
          <p>Monitor your progress and see your pronunciation journey</p>
          <ul>
            <li>Detailed statistics and analytics</li>
            <li>Pronunciation history tracking</li>
            <li>Personalized improvement recommendations</li>
          </ul>
          <Link to="/dashboard" className="card-button">View Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default MainPronunciation;