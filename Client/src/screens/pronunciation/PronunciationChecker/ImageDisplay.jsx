import React from "react";
import PropTypes from "prop-types"; // For prop validation

const ImageDisplay = ({ image }) => {
  // Function to play reference audio
  const playAudio = () => {
    const audio = new Audio(`http://localhost:5000${image.audio}`);
    audio.play();
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      {/* Display the image */}
      <img
        src={`http://localhost:5000${image.path}`}
        alt={image.name}
        width="300"
        onClick={playAudio} // Play audio when the image is clicked
        style={{ cursor: "pointer", borderRadius: "10px" }}
      />

      {/* Display the word */}
      <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
        Pronounce the word: {image.name}
      </p>

      {/* Displaying the audio controls */}
      <audio controls style={{ marginTop: "10px" }}>
        <source src={`http://localhost:5000${image.audio}`} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

// Prop validation
ImageDisplay.propTypes = {
  image: PropTypes.shape({
    path: PropTypes.string.isRequired, // Image path
    audio: PropTypes.string.isRequired, // Audio path
    name: PropTypes.string.isRequired, // Name of the word
  }).isRequired,
};

export default ImageDisplay;
