

import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs";
import "./Detection.css";

function Detection() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef();

  const FACIAL_PART_COLORS = {
    jaw: "green",
    leftEye: "blue",
    rightEye: "red",
    mouth: "orange",
    nose: "cyan",
    brows: "magenta"
  };

  const FACIAL_PARTS = {
    jaw: Array.from({ length: 17 }, (_, i) => i),
    leftEye: [133, 173, 157, 158, 159, 160, 161, 246],
    rightEye: [362, 398, 384, 385, 386, 387, 388, 466],
    mouth: [78, 95, 88, 178, 87, 14, 317, 402, 318, 324],
    nose: [1, 2, 98, 327],
    brows: [65, 66, 107, 55, 52, 53, 285, 295, 282, 336, 296, 334]
  };

  const loadModelAndDetect = useCallback(async () => {
    const model = await faceLandmarksDetection.createDetector(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
      { runtime: "tfjs" }
    );

    const detect = async () => {
      if (!useCamera) return;
      if (!webcamRef.current || !canvasRef.current || webcamRef.current.video.readyState !== 4) {
        animationRef.current = requestAnimationFrame(detect);
        return;
      }

      const video = webcamRef.current.video;
      const predictions = await model.estimateFaces(video);

      // const ctx = canvasRef.current.getContext("2d");
      // if (!ctx) {
      //   animationRef.current = requestAnimationFrame(detect);
      //   return;
      // }
      if (!canvasRef.current) {
  animationRef.current = requestAnimationFrame(detect);
  return;
}

const ctx = canvasRef.current.getContext("2d");
if (!ctx) {
  animationRef.current = requestAnimationFrame(detect);
  return;
}


      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (predictions.length > 0) {
        predictions.forEach(pred => {
          Object.entries(FACIAL_PARTS).forEach(([part, indices]) => {
            indices.forEach((idx) => {
              const pt = pred.keypoints[idx];
              if (pt) {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 2, 0, 2 * Math.PI);
                ctx.fillStyle = FACIAL_PART_COLORS[part];
                ctx.fill();
              }
            });
          });
        });
      }

      animationRef.current = requestAnimationFrame(detect);
    };

    detect();
  }, [useCamera]);

  useEffect(() => {
    if (useCamera) {
      tf.ready().then(loadModelAndDetect);
    } else {
      cancelAnimationFrame(animationRef.current);
      if (webcamRef.current && webcamRef.current.stream) {
        webcamRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [useCamera, loadModelAndDetect]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setUseCamera(false);
      setResult(null);
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const capturedFile = new File([blob], "webcam.jpg", { type: "image/jpeg" });
        setFile(capturedFile);
        setPreviewUrl(URL.createObjectURL(capturedFile));
        setUseCamera(false);
        setResult(null);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(res.data);
      setPreviewUrl("http://127.0.0.1:5000/preview.jpg?" + new Date().getTime());
    } catch (error) {
      console.error("Error submitting:", error);
      setResult({ error: error.response?.data?.error || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detection-container">
      <div className="detection-wrapper">
        <div className="detection-header">
          <h1 className="detection-title">🧬 DS Landmark Detection</h1>
          <p className="detection-subtitle">Advanced facial analysis with AI-powered landmark detection</p>
        </div>

        <div className={`detection-content ${(!result && !loading) ? 'centered' : ''}`}>
          <div className="detection-left">
            <div className="control-panel">
              <form className="control-form" onSubmit={handleSubmit}>
                <div className="file-input-wrapper">
                  <input 
                    type="file" 
                    id="file-input"
                    className="file-input"
                    onChange={handleFileChange} 
                    accept="image/*" 
                  />
                  <label htmlFor="file-input" className="file-input-label">
                    📁 Choose Image
                  </label>
                </div>
                <div className="button-group">
                  {/* <button type="button" className="btn btn-camera" onClick={() => setUseCamera(true)}>📷 Use Camera</button> */}
                 <button
  type="button"
  className="btn btn-camera"
  onClick={() => setUseCamera(prev => !prev)}
>
  📷 Use Camera
</button>
                  <button type="submit" className="btn btn-submit" disabled={!file || loading}>⚡ Analyze</button>
                </div>
              </form>
            </div>

            {useCamera && (
              <div className="camera-container">
                <div className="camera-wrapper">
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="webcam"
                    videoConstraints={{ facingMode: "user" }}
                  />
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={300}
                    className="canvas-overlay"
                  />
                  <button onClick={handleCapture} className="capture-btn">📸 Capture</button>
                </div>
              </div>
            )}

            {previewUrl && !useCamera && (
              <div className="preview-section">
                <h3 className="preview-title">👁️ Preview</h3>
                <img src={previewUrl} alt="Preview" className="preview-image" />
              </div>
            )}
          </div>

          <div className="detection-right">
            {loading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
                Processing image...
              </div>
            )}

            {result && result.error && (
              <div className="error-message">❌ Error: {result.error}</div>
            )}

            {result && !useCamera && !result.error && (
              <>
                <div className={`prediction-result ${result.prediction === "DS" ? "prediction-ds" : "prediction-normal"}`}>
                  PREDICTION: {result.prediction.toUpperCase()} ({result.probability}%)
                </div>

                <div className="landmark-analysis-container">
                  <h3 className="preview-title">🎯 Landmark Analysis</h3>
                  <img src={previewUrl} alt="Landmark Preview" className="preview-image" />

                  <div className="landmark-legend">
                    <h4 className="legend-title">🎨 Landmark Colors</h4>
                    <ul className="legend-list">
                      <li className="legend-item"><span className="legend-dot" style={{ background: "green" }}></span> Jaw</li>
                      <li className="legend-item"><span className="legend-dot" style={{ background: "blue" }}></span> Left Eye</li>
                      <li className="legend-item"><span className="legend-dot" style={{ background: "red" }}></span> Right Eye</li>
                      <li className="legend-item"><span className="legend-dot" style={{ background: "orange" }}></span> Mouth</li>
                      <li className="legend-item"><span className="legend-dot" style={{ background: "cyan" }}></span> Nose</li>
                      <li className="legend-item"><span className="legend-dot" style={{ background: "magenta" }}></span> Brows</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detection;
