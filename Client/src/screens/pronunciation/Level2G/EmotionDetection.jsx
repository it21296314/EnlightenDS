import React, { useEffect, useState } from 'react';
import ReactWebcam from 'react-webcam';
import axios from 'axios';

function EmotionDetection({ onSmileDetected, isActive }) {
  const webcamRef = React.useRef(null);
  const [detectedEmotion, setDetectedEmotion] = useState(''); // State to store the detected emotion
  
  const captureEmotion = async () => {
    if (!isActive || !webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      const response = await axios.post('http://127.0.0.1:5000/detect-emotion', { image: imageSrc });
      const emotion = response.data.emotion;
      setDetectedEmotion(emotion); // Update the detected emotion
      
      // Trigger the parent handler if a smile is detected
      if (emotion === 'Happy') {
        onSmileDetected(true);
      } else {
        onSmileDetected(false);
      }
    } catch (error) {
      console.error('Error detecting emotion:', error);
    }
  };
  
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(captureEmotion, 500); // Check emotion every 500ms
    return () => clearInterval(interval);
  }, [isActive]);
  
  return (
    <div className="emotion-detection-container">
      <ReactWebcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 320, height: 240, facingMode: 'user' }}
        className="emotion-detection-webcam"
      />
      <p className="emotion-detection-status">
        Detected Emotion: <strong className="emotion-detection-result">{detectedEmotion || '...'}</strong>
      </p>
    </div>
  );
}

export default EmotionDetection;