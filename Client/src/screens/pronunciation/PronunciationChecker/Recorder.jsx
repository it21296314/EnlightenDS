import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Recorder = ({ setAudioFile }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null); // NEW: Ref to the audio element

  // Set volume after blob is available
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 2.0; // Max volume (range is 0.0 to 1.0)
    }
  }, [audioBlob]);

  const startRecording = () => {
    setIsRecording(true);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          setAudioBlob(blob);
          setAudioFile(blob);
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
        alert("Microphone access is required to record audio.");
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: isRecording ? "#dc3545" : "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioBlob && (
        <audio
          ref={audioRef} // NEW: attach ref
          src={URL.createObjectURL(audioBlob)}
          controls
          style={{ display: "block", marginTop: "20px" }}
        >
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

Recorder.propTypes = {
  setAudioFile: PropTypes.func.isRequired,
};

export default Recorder;
