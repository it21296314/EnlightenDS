import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PronunciationChecker.css"; // Import the CSS

const PronunciationChecker = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [spokenWord, setSpokenWord] = useState("");
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/categories");
            setCategories(response.data.categories);
            if (response.data.categories.length > 0) {
                setSelectedCategory(response.data.categories[0]);
                fetchImages(response.data.categories[0]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

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

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        fetchImages(category);
        setSpokenWord("");
        setFeedback("");
    };

    const currentImage = images[currentImageIndex];

    return (
        <div className="checker-container">
            <h1 className="checker-title">Pronunciation Checker</h1>

            <div className="category-selector">
                <label htmlFor="category-select" className="category-label">
                    Select Category:
                </label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="category-dropdown"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {currentImage && (
                <>
                    <img
                        src={`http://localhost:5000${currentImage.imageUrl}`}
                        alt={currentImage.word}
                        className="image-display"
                        onClick={playAudio}
                    />
                    <h2 className="word-title">Word: {currentImage.word}</h2>
                    <div className="button-group">
                        <button className="btn record-btn" onClick={startRecording}>
                            Record Pronunciation
                        </button>
                        <button className="btn next-btn" onClick={loadNextImage}>
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
