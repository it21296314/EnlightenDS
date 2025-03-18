import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SpeechPracticeSession.css";

const SpeechPracticeSession = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [spokenWord, setSpokenWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const [results, setResults] = useState({ correct: 0, incorrect: 0, incorrectWords: [] });
  const [startTime, setStartTime] = useState(Date.now());
  const [userId] = useState(Math.floor(Math.random() * 10000) + 1);
  const [quizNumber] = useState(Math.floor(Math.random() * 5) + 1);

  const getRandomImages = (allImages) => {
    return allImages.sort(() => 0.5 - Math.random()).slice(0, 5);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/get-images/${category}`)
      .then((response) => {
        setImages(getRandomImages(response.data.images));
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [category]);

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    setFeedback("");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenWord(transcript);

      const currentImage = images[currentImageIndex];
      axios.post("http://localhost:5000/check-pronunciation", {
        word: currentImage.word,
        spokenWord: transcript,
      }).then((response) => {
        const isCorrect = response.data.isCorrect;
        setFeedback(response.data.message);
        setResults((prev) => ({
          correct: prev.correct + (isCorrect ? 1 : 0),
          incorrect: prev.incorrect + (isCorrect ? 0 : 1),
          incorrectWords: isCorrect ? prev.incorrectWords : [...prev.incorrectWords, currentImage.word]
        }));
      }).catch((error) => console.error("Error checking pronunciation:", error));
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setFeedback("Sorry, there was an error with the speech recognition. Please try again.");
    };
  };

  const nextImage = () => {
    if (!spokenWord) {
      setResults((prev) => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        incorrectWords: [...prev.incorrectWords, images[currentImageIndex].word]
      }));
    }

    if (currentImageIndex === images.length - 1) {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000) + " seconds";

      const totalAttempts = results.correct + results.incorrect;
      const marksPercentage = totalAttempts > 0 ? (results.correct / totalAttempts) * 100 : 0;

      const submissionData = {
        user_id: userId,
        category,
        correct_count: results.correct,
        incorrect_count: results.incorrect,
        marks_percentage: marksPercentage.toFixed(2),
        time_spent: timeSpent,
        incorrect_words: results.incorrectWords
      };

      axios.post("http://localhost:5000/save-results", submissionData)
        .then(() => navigate("/dashboard"))
        .catch((error) => console.error("Error saving results:", error));
    } else {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
      setSpokenWord("");
      setFeedback("");
    }
  };

  if (images.length === 0) {
    return (
      <div className="speech-practice-container">
        <div className="speech-practice-header">
          <h1>Loading Pronunciation Practice</h1>
          <p>Please wait while we prepare your practice session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`speech-practice-container quiz-${quizNumber}`}>
      <div className="speech-practice-header">
        <h1>Pronunciation Quiz</h1>
        <p>Category: {category}</p>
      </div>
      {images[currentImageIndex] && (
        <div>

          <div className="speech-practice-progress">
            {images.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentImageIndex ? 'active' : ''} ${index < currentImageIndex ? 'completed' : ''}`}
              />
            ))}
          </div>
          <div className="speech-practice-progress-xx">

            <div className="speech-practice-image-container">
              <img
                className="speech-practice-word-image"
                src={`http://localhost:5000${images[currentImageIndex].imageUrl}`}
                alt={images[currentImageIndex].word}
                onClick={() => new Audio(`http://localhost:5000${images[currentImageIndex].audioUrl}`).play()}
              />
              <span className="speech-practice-audio-hint">Click image to hear pronunciation</span>
            </div>
            <div className="feedback-header-xx">
              {(spokenWord || feedback) && (
                <div className="speech-practice-output">
                  {spokenWord && <div className="speech-practice-user-speech">You said: {spokenWord}</div>}
                  {feedback && (
                    <div className={`speech-practice-feedback ${feedback.includes("Correct") ? "correct" : "incorrect"}`}>
                      {feedback}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
          <div className="speech-practice-controls">
            <button className="speech-practice-record-btn" onClick={startRecording}>
              Record Pronunciation
            </button>
            <button className="speech-practice-next-btn" onClick={nextImage}>
              {currentImageIndex === images.length - 1 ? "Finish" : "Next"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default SpeechPracticeSession;