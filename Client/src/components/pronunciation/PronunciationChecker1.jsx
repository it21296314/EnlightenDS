import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PronunciationChecker1 = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [spokenWord, setSpokenWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const [results, setResults] = useState({ correct: 0, incorrect: 0 });

  const getRandomImages = (allImages) => {
    const shuffled = allImages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/get-images/${category}`)
      .then((response) => {
        const randomImages = getRandomImages(response.data.images);
        setImages(randomImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [category]);

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

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
        }));
      }).catch((error) => console.error("Error checking pronunciation:", error));
    };
  };

  const nextImage = () => {
    // Check if the user hasn't spoken anything for the current image
    if (!spokenWord) {
      setResults((prev) => ({
        ...prev,
        incorrect: prev.incorrect + 1,
      }));
    }

    if (currentImageIndex === images.length - 1) {
      axios.post("http://localhost:5000/save-results", {
        category,
        correct: results.correct,
        incorrect: results.incorrect,
      }).then(() => navigate("/dashboard"))
        .catch((error) => console.error("Error saving results:", error));
    } else {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
      setSpokenWord("");
      setFeedback("");
    }
  };

  return (
    <div>
      {images[currentImageIndex] && (
        <div>
          <img
            src={`http://localhost:5000${images[currentImageIndex].imageUrl}`}
            alt={images[currentImageIndex].word}
            onClick={() => {
              new Audio(`http://localhost:5000${images[currentImageIndex].audioUrl}`).play();
            }}
          />
          <button onClick={startRecording}>Record Pronunciation</button>
          <p>{spokenWord && `You said: ${spokenWord}`}</p>
          <p>{feedback}</p>
          <button onClick={nextImage}>
            {currentImageIndex === images.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PronunciationChecker1;
