import React, { useState, useRef } from "react";
import PropTypes from "prop-types"; // For prop validation

const Recorder = ({ setAudioFile }) => {
  const [isRecording, setIsRecording] = useState(false); // State for recording status
  const [audioBlob, setAudioBlob] = useState(null); // State for the recorded audio blob
  const mediaRecorderRef = useRef(null); // Ref to persist the MediaRecorder instance

  // Start recording audio
  const startRecording = () => {
    setIsRecording(true); // Set recording state to true

    // Request access to the microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        // Create a new MediaRecorder instance
        mediaRecorderRef.current = new MediaRecorder(stream);
        const chunks = []; // Array to store audio chunks

        // Push audio data into chunks
        mediaRecorderRef.current.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        // On stop, create a Blob from chunks and update states
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          setAudioBlob(blob); // Set the recorded audio blob
          setAudioFile(blob); // Pass the blob to the parent component
        };

        // Start recording
        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error); // Log errors
        alert("Microphone access is required to record audio."); // Notify the user
        setIsRecording(false); // Reset recording state
      });
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      setIsRecording(false); // Set recording state to false
      mediaRecorderRef.current.stop(); // Stop the recording
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      {/* Start/Stop Recording Button */}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: isRecording ? "#dc3545" : "#28a745", // Red for stop, green for start
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {/* Audio Playback */}
      {audioBlob && (
        <audio
          src={URL.createObjectURL(audioBlob)} // Create an object URL for the Blob
          controls
          style={{ display: "block", marginTop: "20px" }}
        >
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

// Prop validation
Recorder.propTypes = {
  setAudioFile: PropTypes.func.isRequired, // Function to handle the recorded audio Blob
};

export default Recorder;
