import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PronunciationChecker.css"; // Import the CSS

const PronunciationChecker = () => {
  const [imageData, setImageData] = useState(null);
  const [spokenWord, setSpokenWord] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-image");
      setImageData(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const playAudio = async () => {
    if (imageData?.audioUrl) {
      const audio = new Audio(`http://localhost:5000${imageData.audioUrl}`);
      audio.play();
    }
  };

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenWord(transcript);

      try {
        const response = await axios.post(
          "http://localhost:5000/check-pronunciation",
          {
            word: imageData.word,
            spokenWord: transcript,
          }
        );
        setFeedback(response.data.message);
      } catch (error) {
        console.error("Error checking pronunciation:", error);
      }
    };

    recognition.onerror = (event) => {
      alert("Error occurred while recording.");
    };
  };

  const loadNextWord = async () => {
    fetchImage();
    setSpokenWord("");
    setFeedback("");
  };

  return (
    <div className="pronunciation-checker">
      <h1>Pronunciation Checker</h1>
      {imageData && (
        <>
          <img
            src={`http://localhost:5000${imageData.imageUrl}`}
            alt={imageData.word}
            className="word-image"
            onClick={playAudio}
          />
          <h2>Word: {imageData.word}</h2>
          <div className="button-container">
            <button className="record-button" onClick={startRecording}>
              Record Pronunciation
            </button>
            <button className="next-word-button" onClick={loadNextWord}>
              Next Word
            </button>
          </div>
          <div className="feedback-container">
            <h3>{spokenWord && `You said: ${spokenWord}`}</h3>
            <h3>{feedback}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default PronunciationChecker;
