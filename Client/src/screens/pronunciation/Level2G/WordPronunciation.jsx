import React, { useState } from 'react';
import './WordPronunciation.css';

function WordPronunciation({ targetWord, onPronunciationComplete }) {
  const [recognizedWord, setRecognizedWord] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const startPronunciation = () => {
    setFeedback('');
    setRecognizedWord('');
    setIsListening(true);
    
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      setRecognizedWord(transcript); // Update state with the recognized word
      
      if (transcript === targetWord.toLowerCase()) {
        setFeedback('Correct! Well done!');
        onPronunciationComplete(true); // Notify parent that pronunciation is correct
      } else {
        setFeedback('Incorrect. Try again.');
        onPronunciationComplete(false); // Notify parent to retry
      }
      setIsListening(false);
    };
    
    recognition.onerror = (err) => {
      console.error('Speech recognition error:', err);
      setFeedback('Error occurred during pronunciation. Please try again.');
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
  };
  
  const playWordAudio = () => {
    const utterance = new SpeechSynthesisUtterance(targetWord);
    utterance.lang = 'en-US';
    const voices = window.speechSynthesis.getVoices();
    const childFriendlyVoice = voices.find(voice => voice.name.includes('Google UK English Female')) || voices[0];
    utterance.voice = childFriendlyVoice;
    utterance.pitch = 1.5; // Higher pitch for a more child-friendly tone
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <div className="candy-speech-box">
      <h3 className="gummy-word-title">
        Word: {targetWord}
      </h3>
      
      <p className="speech-result-text">
        What you said: <span>{recognizedWord ? recognizedWord : "..."}</span>
      </p>
      
      <button className="speak-now-button" onClick={startPronunciation} disabled={isListening}>
        {isListening ? "Listening..." : "Start Pronunciation"}
      </button>
      
      <p className="pronunciation-result">{feedback}</p>
      
      <button className="listen-sound-button" onClick={playWordAudio}>🔊 Play Word</button>
    </div>
  );
}

export default WordPronunciation;