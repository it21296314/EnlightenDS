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
  const [results, setResults] = useState({ correct: 0, incorrect: 0, incorrectWords: [] });
  const [startTime, setStartTime] = useState(Date.now());
  const [userId] = useState(Math.floor(Math.random() * 10000) + 1);

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

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/generate-report?user_id=${userId}&format=pdf`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Feedback_Report_${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div>
      {images[currentImageIndex] && (
        <div>
          <img
            src={`http://localhost:5000${images[currentImageIndex].imageUrl}`}
            alt={images[currentImageIndex].word}
            onClick={() => new Audio(`http://localhost:5000${images[currentImageIndex].audioUrl}`).play()}
          />
          <button onClick={startRecording}>Record Pronunciation</button>
          <p>{spokenWord && `You said: ${spokenWord}`}</p>
          <p>{feedback}</p>
          <button onClick={nextImage}>
            {currentImageIndex === images.length - 1 ? "Finish" : "Next"}
          </button>
          {currentImageIndex === images.length - 1 && (
            <button onClick={handleDownloadPDF}>Download Report</button>
          )}
        </div>
      )}
    </div>
  );
};

export default PronunciationChecker1;