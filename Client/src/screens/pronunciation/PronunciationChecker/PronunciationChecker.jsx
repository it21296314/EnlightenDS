import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./PronunciationChecker.css"; // Import the CSS 

const PronunciationChecker = () => {
    const { category } = useParams(); 
    const navigate = useNavigate(); 
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [spokenWord, setSpokenWord] = useState("");
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        fetchImages(category); 
    }, [category]); 

    const fetchImages = async (category) => {
        try {
            const response = await axios.get(`http://localhost:5000/get-images/${category}`);
            setImages(response.data.images);
            setCurrentImageIndex(0); 
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const playAudio = async () => {
        const currentImage = images[currentImageIndex];
        if (currentImage?.audioUrl) {
            const audio = new Audio(`http://localhost:5000${currentImage.audioUrl}`);
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
                const currentImage = images[currentImageIndex];
                const response = await axios.post("http://localhost:5000/check-pronunciation", {
                    word: currentImage.word,
                    spokenWord: transcript,
                });
                setFeedback(response.data.message);
            } catch (error) {
                console.error("Error checking pronunciation:", error);
            }
        };

        recognition.onerror = (event) => {
            alert("Error occurred while recording.");
        };
    };

    const loadNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setSpokenWord("");
        setFeedback("");
    };

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const currentImage = images[currentImageIndex];

    return (
        <div className="checker-container">
            <button className="btn back-btn" onClick={handleBack}>
                Back
            </button>
            {currentImage && (
                <div className="content-container">
                    <div className="left-side">
                        <div className="image-container">
                            <img
                                src={`http://localhost:5000${currentImage.imageUrl}`}
                                alt={currentImage.word}
                                className="image-display"
                                onClick={playAudio}
                            />
                            <div className="click-me">Click Me!</div>
                        </div>
                    </div>

                    <div className="right-side">
                        <h2 className="word-title">Word: {currentImage.word}</h2>

                        <div className="feedback-container">
                            <h3>{spokenWord && `You said: ${spokenWord}`}</h3>
                            <h3>{feedback}</h3>
                        </div>
                        <div className="button-group">
                            <button className="btn record-btn" onClick={startRecording}>
                                Record Pronunciation
                            </button>
                            <button className="btn next-btn" onClick={loadNextImage}>
                                Next Word
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PronunciationChecker;
