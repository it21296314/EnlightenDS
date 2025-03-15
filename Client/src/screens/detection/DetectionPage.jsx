// import React, { useState } from 'react';
// import './DetectionPage.css'; // Styles file (see below)
// import axios from 'axios';

// const DetectionPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setPrediction(null); // Reset prediction on new upload
//     }
//   };

//   const checkDownSyndrome = async () => {
//     if (!selectedImage) {
//       alert('Please upload an image first!');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append('image', selectedImage);

//     try {
//       const response = await axios.post('http://localhost:5000/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       const { prediction: pred, probability, symptoms } = response.data;
//       setPrediction({ label: pred, prob: probability, symptoms });
//     } catch (error) {
//       console.error('Error detecting Down Syndrome:', error);
//       setPrediction({ label: 'Error', prob: 0, symptoms: ['Check connection or try again'] });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="detection-container">
//       <header className="header">
//         <h1>Let’s Check Your Smile! <span role="img" aria-label="smiley">😊</span></h1>
//         <img src="/path/to/character.png" alt="Friendly Scout" className="header-character" />
//       </header>

//       <main className="main-content">
//         <div className="upload-section">
//           <label className="upload-button">
//             Upload Photo
//             <input type="file" accept="image/*" onChange={handleImageUpload} />
//           </label>
//           {selectedImage && (
//             <div className="preview">
//               <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="preview-image" />
//             </div>
//           )}
//           <button
//             className="check-button"
//             onClick={checkDownSyndrome}
//             disabled={loading || !selectedImage}
//           >
//             {loading ? 'Checking...' : 'Check Now'}
//           </button>
//         </div>

//         {prediction && (
//           <div className="result-section">
//             <h2>Result: {prediction.label}</h2>
//             <p>Confidence: {(prediction.prob * 100).toFixed(2)}%</p>
//             {prediction.symptoms.length > 0 && (
//               <div>
//                 <h3>Possible Symptoms:</h3>
//                 <ul>
//                   {prediction.symptoms.map((symptom, index) => (
//                     <li key={index}>{symptom}</li>
//                   ))}
//                 </ul>
//                 <p>Please consult a healthcare professional for a diagnosis.</p>
//               </div>
//             )}
//             <img
//               src={`/path/to/${prediction.label === 'Healthy' ? 'happy' : 'support'}.png`}
//               alt={prediction.label === 'Healthy' ? 'Happy Character' : 'Support Character'}
//               className="result-character"
//             />
//           </div>
//         )}
//       </main>

//       <footer className="footer">
//         <div className="flower"></div>
//         <div className="flower"></div>
//         <div className="tree"></div>
//       </footer>
//     </div>
//   );
// };

// export default DetectionPage;








// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import './DetectionPage.css';

// // Import your assets here
// import happyCharacter from 'Client/public/images/detection/happy.jpg';
// import supportCharacter from 'Client/public/images/detection/happy.jpg';
// // You may want to add more appropriate images later

// const DetectionPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [useWebcam, setUseWebcam] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [webcamLoading, setWebcamLoading] = useState(false);
//   const [symptoms, setSymptoms] = useState([]);
  
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Symptoms information
//   const downSyndromeSymptoms = [
//     "Flattened facial features",
//     "Small head and ears",
//     "Short neck",
//     "Protruding tongue",
//     "Upward slanting eyes",
//     "Unusually shaped or positioned ears",
//     "Poor muscle tone"
//   ];

//   useEffect(() => {
//     // Clean up webcam on component unmount
//     return () => {
//       if (cameraActive) {
//         stopWebcam();
//       }
//     };
//   }, [cameraActive]);

//   const startWebcam = async () => {
//     setWebcamLoading(true);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: "user" } 
//       });
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.onloadedmetadata = () => {
//           videoRef.current.play();
//           setWebcamLoading(false);
//         };
//         setCameraActive(true);
//         setUseWebcam(true);
//         setSelectedImage(null);
//         setPrediction(null);
//       }
//     } catch (error) {
//       console.error("Error accessing webcam:", error);
//       alert("Unable to access webcam. Please make sure you've granted permission or try another browser.");
//       setWebcamLoading(false);
//     }
//   };

//   const stopWebcam = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//     }
//   };

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
      
//       // Set canvas dimensions to match video
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
      
//       // Draw current video frame to canvas
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       // Convert canvas to blob/file
//       canvas.toBlob((blob) => {
//         const capturedImage = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
//         setSelectedImage(capturedImage);
//         setUseWebcam(false);
//         setCameraActive(false); // Add this line to properly update state
//         stopWebcam();
//       }, 'image/jpeg', 0.95);
//     }
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setPrediction(null);
//       setUseWebcam(false);
//       if (cameraActive) {
//         stopWebcam();
//       }
//     }
//   };

//   const checkDownSyndrome = async () => {
//     if (!selectedImage && !cameraActive) {
//       alert('Please upload an image or activate webcam first!');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
    
//     // If using webcam and no image captured yet, capture now
//     if (cameraActive) {
//       captureImage();
//       // Small delay to ensure capture completes
//       await new Promise(resolve => setTimeout(resolve, 500));
//     }

//     formData.append('image', selectedImage);

//     try {
//       const response = await axios.post('http://localhost:5000/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
      
//       const { prediction: pred, confidence } = response.data;
      
//       // Set appropriate symptoms based on prediction
//       const relevantSymptoms = pred.includes("Down Syndrome") 
//         ? downSyndromeSymptoms 
//         : ["No Down Syndrome indicators detected"];
      
//       setPrediction({ 
//         label: pred, 
//         prob: confidence,
//         symptoms: relevantSymptoms
//       });
//     } catch (error) {
//       console.error('Error detecting Down Syndrome:', error);
//       setPrediction({ 
//         label: 'Error', 
//         prob: 0, 
//         symptoms: ['Check connection or try again'] 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetDetection = () => {
//     setSelectedImage(null);
//     setPrediction(null);
//     if (cameraActive) {
//       stopWebcam();
//     }
//     setUseWebcam(false);
//     setCameraActive(false); // Add this line to properly reset camera state
//     // Clear any previous file selection
//     if (document.querySelector('.file-input')) {
//       document.querySelector('.file-input').value = '';
//     }
//   };

//   return (
//     <div className="detection-container">
//       <header className="detection-header">
//         <div className="header-content">
//           <h1 className="main-title">Down Syndrome Facial Detection</h1>
//           <p className="subtitle">Upload a photo or use your webcam for analysis</p>
//         </div>
//       </header>

//       <main className="detection-main">
//         <div className="detection-card">
//           <div className="detection-options">
//             <button 
//               className={`option-button ${!useWebcam && !cameraActive ? 'active' : ''}`}
//               onClick={() => {
//                 resetDetection();
//                 setUseWebcam(false);
//                 setCameraActive(false);
//               }}
//             >
//               <i className="fas fa-upload"></i>
//               Upload Photo
//             </button>
//             <button 
//               className={`option-button ${useWebcam || cameraActive ? 'active' : ''}`}
//               onClick={() => {
//                 resetDetection();
//                 // Small delay to ensure clean state before starting webcam
//                 setTimeout(() => {
//                   setUseWebcam(true);
//                   startWebcam();
//                 }, 100);
//               }}
//             >
//               <i className="fas fa-camera"></i>
//               Use Webcam
//             </button>
//           </div>

//           <div className="detection-content">
//             {!useWebcam && !cameraActive && !selectedImage && (
//               <div className="upload-zone">
//                 <label className="file-input-label">
//                   <input 
//                     type="file" 
//                     accept="image/*" 
//                     onChange={handleImageUpload} 
//                     className="file-input" 
//                   />
//                   <div className="upload-placeholder">
//                     <i className="fas fa-cloud-upload-alt"></i>
//                     <p>Drag & drop your image or click to browse</p>
//                   </div>
//                 </label>
//               </div>
//             )}

//             {useWebcam && webcamLoading && (
//               <div className="webcam-loading">
//                 <div className="loading-spinner"></div>
//                 <p>Starting camera...</p>
//               </div>
//             )}

//             {useWebcam && !webcamLoading && cameraActive && (
//               <div className="webcam-container">
//                 <video 
//                   ref={videoRef} 
//                   autoPlay 
//                   playsInline
//                   muted
//                   className="webcam-video"
//                 />
//                 <div className="webcam-controls">
//                   <button 
//                     className="webcam-button capture"
//                     onClick={captureImage}
//                   >
//                     <i className="fas fa-camera"></i>
//                     Capture Photo
//                   </button>
//                   <button 
//                     className="webcam-button stop"
//                     onClick={() => {
//                       stopWebcam();
//                       setUseWebcam(false);
//                       setCameraActive(false);
//                     }}
//                   >
//                     <i className="fas fa-stop-circle"></i>
//                     Stop Camera
//                   </button>
//                 </div>
//                 <canvas ref={canvasRef} style={{ display: 'none' }} />
//               </div>
//             )}

//             {selectedImage && !useWebcam && !cameraActive && (
//               <div className="image-preview">
//                 <img 
//                   src={URL.createObjectURL(selectedImage)} 
//                   alt="Preview" 
//                   className="preview-img" 
//                 />
//                 <button 
//                   className="remove-image-btn"
//                   onClick={resetDetection}
//                 >
//                   <i className="fas fa-times"></i>
//                 </button>
//               </div>
//             )}

//             {(selectedImage || (useWebcam && cameraActive)) && !loading && !prediction && (
//               <div className="action-buttons">
//                 <button 
//                   className="analyze-button"
//                   onClick={checkDownSyndrome}
//                   disabled={loading}
//                 >
//                   <i className="fas fa-search"></i>
//                   {loading ? 'Analyzing...' : 'Analyze Face'}
//                 </button>
//               </div>
//             )}

//             {loading && (
//               <div className="loading-container">
//                 <div className="loading-spinner"></div>
//                 <p>Analyzing facial features...</p>
//               </div>
//             )}

//             {prediction && (
//               <div className="results-container">
//                 <div className={`result-card ${prediction.label.includes("Down Syndrome") ? "positive" : "negative"}`}>
//                   <div className="result-header">
//                     <h2>Detection Results</h2>
//                     <div className="confidence-meter">
//                       <div 
//                         className="confidence-fill" 
//                         style={{ width: `${prediction.prob * 100}%` }}
//                       ></div>
//                       <span className="confidence-text">{(prediction.prob * 100).toFixed(1)}% confidence</span>
//                     </div>
//                   </div>
                  
//                   <div className="result-body">
//                     <div className="result-message">
//                       <h3>{prediction.label}</h3>
//                       <p className="disclaimer">
//                         This is an automated analysis and should not replace professional medical evaluation.
//                       </p>
//                     </div>
                    
//                     <div className="symptoms-list">
//                       <h4>Detected Features:</h4>
//                       <ul>
//                         {prediction.symptoms.map((symptom, index) => (
//                           <li key={index}>{symptom}</li>
//                         ))}
//                       </ul>
//                     </div>
                    
//                     <div className="character-image">
//                       <img 
//                         src={prediction.label.includes("Down Syndrome") ? supportCharacter : happyCharacter} 
//                         alt="Character" 
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="result-footer">
//                     <button 
//                       className="restart-button"
//                       onClick={resetDetection}
//                     >
//                       <i className="fas fa-redo"></i>
//                       Try Another Photo
//                     </button>
//                     {prediction.label.includes("Down Syndrome") && (
//                       <button className="info-button">
//                         <i className="fas fa-info-circle"></i>
//                         Learn More About Down Syndrome
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <footer className="detection-footer">
//         <p>This tool is for educational purposes only. Please consult with healthcare professionals for medical diagnosis.</p>
//       </footer>
//     </div>
//   );
// };

// export default DetectionPage;




// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import './DetectionPage.css';

// // Import your assets here
// import happyCharacter from 'Client/public/images/detection/happy.jpg';
// import supportCharacter from 'Client/public/images/detection/happy.jpg';
// // You may want to add more appropriate images later

// const DetectionPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [useWebcam, setUseWebcam] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [webcamLoading, setWebcamLoading] = useState(false);
//   const [symptoms, setSymptoms] = useState([]);
//   const [cameraError, setCameraError] = useState('');
  
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Symptoms information
//   const downSyndromeSymptoms = [
//     "Flattened facial features",
//     "Small head and ears",
//     "Short neck",
//     "Protruding tongue",
//     "Upward slanting eyes",
//     "Unusually shaped or positioned ears",
//     "Poor muscle tone"
//   ];

//   useEffect(() => {
//     // Clean up webcam on component unmount
//     return () => {
//       if (cameraActive) {
//         stopWebcam();
//       }
//     };
//   }, [cameraActive]);

//   // Added for debugging camera access
//   useEffect(() => {
//     async function checkCameraAvailability() {
//       try {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(device => device.kind === 'videoinput');
//         console.log('Available video devices:', videoDevices);
//       } catch (error) {
//         console.error('Error checking camera availability:', error);
//       }
//     }
//     checkCameraAvailability();
//   }, []);

//   const startWebcam = async () => {
//     setCameraError('');
//     setWebcamLoading(true);
    
//     try {
//       console.log("Attempting to access webcam...");
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: "user" } 
//       });
      
//       console.log("Webcam access granted, setting up video");
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
        
//         videoRef.current.onloadedmetadata = () => {
//           console.log("Video metadata loaded, playing video");
//           videoRef.current.play()
//             .then(() => {
//               console.log("Webcam video playing successfully");
//               setWebcamLoading(false);
//               setCameraActive(true);
//               setUseWebcam(true);
//               setSelectedImage(null);
//               setPrediction(null);
//             })
//             .catch(err => {
//               console.error("Error playing video:", err);
//               setCameraError('Failed to play webcam stream. Please try again.');
//               setWebcamLoading(false);
//             });
//         };
        
//         videoRef.current.onerror = (err) => {
//           console.error("Video element error:", err);
//           setCameraError('Video element encountered an error');
//           setWebcamLoading(false);
//         };
//       } else {
//         console.error("Video reference is null");
//         setCameraError('Video element not available');
//         setWebcamLoading(false);
//       }
//     } catch (error) {
//       console.error("Error accessing webcam:", error);
//       let errorMessage = 'Unable to access webcam. ';
      
//       if (error.name === 'NotAllowedError') {
//         errorMessage += 'Camera access was denied. Please check your browser permissions.';
//       } else if (error.name === 'NotFoundError') {
//         errorMessage += 'No camera detected on this device.';
//       } else if (error.name === 'NotReadableError') {
//         errorMessage += 'Camera is already in use by another application.';
//       } else {
//         errorMessage += 'Please make sure you\'ve granted permission or try another browser.';
//       }
      
//       setCameraError(errorMessage);
//       setWebcamLoading(false);
//     }
//   };

//   const stopWebcam = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       console.log("Stopping webcam streams");
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//       setUseWebcam(false);
//     }
//   };

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
      
//       // Set canvas dimensions to match video
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
      
//       console.log("Capturing image from webcam", video.videoWidth, video.videoHeight);
      
//       // Draw current video frame to canvas
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       // Convert canvas to blob/file
//       canvas.toBlob((blob) => {
//         console.log("Image captured successfully", blob);
//         const capturedImage = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
//         setSelectedImage(capturedImage);
//         setUseWebcam(false);
//         setCameraActive(false);
//         stopWebcam();
//       }, 'image/jpeg', 0.95);
//     } else {
//       console.error("Video or canvas reference not available for capture");
//     }
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("File selected:", file.name);
//       setSelectedImage(file);
//       setPrediction(null);
//       setUseWebcam(false);
//       if (cameraActive) {
//         stopWebcam();
//       }
//     }
//   };

//   const checkDownSyndrome = async () => {
//     if (!selectedImage && !cameraActive) {
//       alert('Please upload an image or activate webcam first!');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
    
//     // If using webcam and no image captured yet, capture now
//     if (cameraActive) {
//       captureImage();
//       // Small delay to ensure capture completes
//       await new Promise(resolve => setTimeout(resolve, 500));
//     }

//     formData.append('image', selectedImage);

//     try {
//       console.log("Sending image for analysis");
//       const response = await axios.post('http://localhost:5000/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
      
//       const { prediction: pred, confidence } = response.data;
//       console.log("Received prediction:", pred, "with confidence:", confidence);
      
//       // Set appropriate symptoms based on prediction
//       const relevantSymptoms = pred.includes("Down Syndrome") 
//         ? downSyndromeSymptoms 
//         : ["No Down Syndrome indicators detected"];
      
//       setPrediction({ 
//         label: pred, 
//         prob: confidence,
//         symptoms: relevantSymptoms
//       });
//     } catch (error) {
//       console.error('Error detecting Down Syndrome:', error);
//       setPrediction({ 
//         label: 'Error', 
//         prob: 0, 
//         symptoms: ['Check connection or try again'] 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetDetection = () => {
//     console.log("Resetting detection state");
//     setSelectedImage(null);
//     setPrediction(null);
//     setCameraError('');
    
//     if (cameraActive) {
//       stopWebcam();
//     }
    
//     setUseWebcam(false);
//     setCameraActive(false);
//     setWebcamLoading(false);
    
//     // Clear any previous file selection
//     if (document.querySelector('.file-input')) {
//       document.querySelector('.file-input').value = '';
//     }
//   };

//   return (
//     <div className="detection-container">
//       <header className="detection-header">
//         <div className="header-content">
//           <h1 className="main-title">Down Syndrome Facial Detection</h1>
//           <p className="subtitle">Upload a photo or use your webcam for analysis</p>
//         </div>
//       </header>

//       <main className="detection-main">
//         <div className="detection-card">
//           <div className="detection-options">
//             <button 
//               className={`option-button ${!useWebcam && !cameraActive ? 'active' : ''}`}
//               onClick={() => {
//                 resetDetection();
//                 setUseWebcam(false);
//                 setCameraActive(false);
//               }}
//             >
//               <i className="fas fa-upload"></i>
//               Upload Photo
//             </button>
//             <button 
//               className={`option-button ${useWebcam || cameraActive ? 'active' : ''}`}
//               onClick={() => {
//                 resetDetection();
//                 // Small delay to ensure clean state before starting webcam
//                 setTimeout(() => {
//                   setUseWebcam(true);
//                   startWebcam();
//                 }, 100);
//               }}
//             >
//               <i className="fas fa-camera"></i>
//               Use Webcam
//             </button>
//           </div>

//           <div className="detection-content">
//             {!useWebcam && !cameraActive && !selectedImage && (
//               <div className="upload-zone">
//                 <label className="file-input-label">
//                   <input 
//                     type="file" 
//                     accept="image/*" 
//                     onChange={handleImageUpload} 
//                     className="file-input" 
//                   />
//                   <div className="upload-placeholder">
//                     <i className="fas fa-cloud-upload-alt"></i>
//                     <p>Drag & drop your image or click to browse</p>
//                   </div>
//                 </label>
//               </div>
//             )}

//             {useWebcam && webcamLoading && (
//               <div className="webcam-loading">
//                 <div className="loading-spinner"></div>
//                 <p>Starting camera...</p>
//               </div>
//             )}

//             {cameraError && (
//               <div className="camera-error">
//                 <i className="fas fa-exclamation-circle"></i>
//                 <p>{cameraError}</p>
//                 <button 
//                   className="retry-button"
//                   onClick={() => {
//                     setCameraError('');
//                     setTimeout(() => startWebcam(), 500);
//                   }}
//                 >
//                   <i className="fas fa-redo"></i>
//                   Retry
//                 </button>
//               </div>
//             )}

//             {useWebcam && !webcamLoading && cameraActive && (
//               <div className="webcam-container">
//                 <video 
//                   ref={videoRef} 
//                   autoPlay 
//                   playsInline
//                   muted
//                   className="webcam-video"
//                 />
//                 <div className="webcam-controls">
//                   <button 
//                     className="webcam-button capture"
//                     onClick={captureImage}
//                   >
//                     <i className="fas fa-camera"></i>
//                     Capture Photo
//                   </button>
//                   <button 
//                     className="webcam-button stop"
//                     onClick={() => {
//                       stopWebcam();
//                       setUseWebcam(false);
//                       setCameraActive(false);
//                     }}
//                   >
//                     <i className="fas fa-stop-circle"></i>
//                     Stop Camera
//                   </button>
//                 </div>
//                 <canvas ref={canvasRef} style={{ display: 'none' }} />
//               </div>
//             )}

//             {selectedImage && !useWebcam && !cameraActive && (
//               <div className="image-preview">
//                 <img 
//                   src={URL.createObjectURL(selectedImage)} 
//                   alt="Preview" 
//                   className="preview-img" 
//                 />
//                 <button 
//                   className="remove-image-btn"
//                   onClick={resetDetection}
//                 >
//                   <i className="fas fa-times"></i>
//                 </button>
//               </div>
//             )}

//             {(selectedImage || (useWebcam && cameraActive)) && !loading && !prediction && (
//               <div className="action-buttons">
//                 <button 
//                   className="analyze-button"
//                   onClick={checkDownSyndrome}
//                   disabled={loading}
//                 >
//                   <i className="fas fa-search"></i>
//                   {loading ? 'Analyzing...' : 'Analyze Face'}
//                 </button>
//               </div>
//             )}

//             {loading && (
//               <div className="loading-container">
//                 <div className="loading-spinner"></div>
//                 <p>Analyzing facial features...</p>
//               </div>
//             )}

//             {prediction && (
//               <div className="results-container">
//                 <div className={`result-card ${prediction.label.includes("Down Syndrome") ? "positive" : "negative"}`}>
//                   <div className="result-header">
//                     <h2>Detection Results</h2>
//                     <div className="confidence-meter">
//                       <div 
//                         className="confidence-fill" 
//                         style={{ width: `${prediction.prob * 100}%` }}
//                       ></div>
//                       <span className="confidence-text">{(prediction.prob * 100).toFixed(1)}% confidence</span>
//                     </div>
//                   </div>
                  
//                   <div className="result-body">
//                     <div className="result-message">
//                       <h3>{prediction.label}</h3>
//                       <p className="disclaimer">
//                         This is an automated analysis and should not replace professional medical evaluation.
//                       </p>
//                     </div>
                    
//                     <div className="symptoms-list">
//                       <h4>Detected Features:</h4>
//                       <ul>
//                         {prediction.symptoms.map((symptom, index) => (
//                           <li key={index}>{symptom}</li>
//                         ))}
//                       </ul>
//                     </div>
                    
//                     <div className="character-image">
//                       <img 
//                         src={prediction.label.includes("Down Syndrome") ? supportCharacter : happyCharacter} 
//                         alt="Character" 
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="result-footer">
//                     <button 
//                       className="restart-button"
//                       onClick={resetDetection}
//                     >
//                       <i className="fas fa-redo"></i>
//                       Try Another Photo
//                     </button>
//                     {prediction.label.includes("Down Syndrome") && (
//                       <button className="info-button">
//                         <i className="fas fa-info-circle"></i>
//                         Learn More About Down Syndrome
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>




















// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import './DetectionPage.css';

// // Import your assets here
// import happyCharacter from 'Client/public/images/detection/happy.jpg';
// import supportCharacter from 'Client/public/images/detection/happy.jpg';
// // You may want to add more appropriate images later

// const DetectionPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [useWebcam, setUseWebcam] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [webcamLoading, setWebcamLoading] = useState(false);
//   const [symptoms, setSymptoms] = useState([]);
//   const [cameraError, setCameraError] = useState('');
  
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Symptoms information
//   const downSyndromeSymptoms = [
//     "Flattened facial features",
//     "Small head and ears",
//     "Short neck",
//     "Protruding tongue",
//     "Upward slanting eyes",
//     "Unusually shaped or positioned ears",
//     "Poor muscle tone"
//   ];

//   useEffect(() => {
//     // Clean up webcam on component unmount
//     return () => {
//       if (cameraActive) {
//         stopWebcam();
//       }
//     };
//   }, [cameraActive]);

//   // Log when video ref is updated
//   useEffect(() => {
//     console.log("Video ref current value:", videoRef.current);
//   }, []);

//   // Added for debugging camera access
//   useEffect(() => {
//     async function checkCameraAvailability() {
//       try {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(device => device.kind === 'videoinput');
//         console.log('Available video devices:', videoDevices);
//       } catch (error) {
//         console.error('Error checking camera availability:', error);
//       }
//     }
//     checkCameraAvailability();
//   }, []);

//   const startWebcam = async () => {
//     setCameraError('');
//     setWebcamLoading(true);
    
//     try {
//       console.log("Attempting to access webcam...");
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: "user" } 
//       });
      
//       console.log("Webcam access granted, setting up video");
      
//       // Check if videoRef.current exists
//       if (!videoRef.current) {
//         console.error("Video reference is null");
//         setCameraError('Video element not found. Please try again or refresh the page.');
//         setWebcamLoading(false);
//         return;
//       }
      
//       videoRef.current.srcObject = stream;
      
//       videoRef.current.onloadedmetadata = () => {
//         console.log("Video metadata loaded, playing video");
//         videoRef.current.play()
//           .then(() => {
//             console.log("Webcam video playing successfully");
//             setWebcamLoading(false);
//             setCameraActive(true);
//             setUseWebcam(true);
//             setSelectedImage(null);
//             setPrediction(null);
//           })
//           .catch(err => {
//             console.error("Error playing video:", err);
//             setCameraError('Failed to play webcam stream. Please try again.');
//             setWebcamLoading(false);
//           });
//       };
      
//       videoRef.current.onerror = (err) => {
//         console.error("Video element error:", err);
//         setCameraError('Video element encountered an error');
//         setWebcamLoading(false);
//       };
//     } catch (error) {
//       console.error("Error accessing webcam:", error);
//       let errorMessage = 'Unable to access webcam. ';
      
//       if (error.name === 'NotAllowedError') {
//         errorMessage += 'Camera access was denied. Please check your browser permissions.';
//       } else if (error.name === 'NotFoundError') {
//         errorMessage += 'No camera detected on this device.';
//       } else if (error.name === 'NotReadableError') {
//         errorMessage += 'Camera is already in use by another application.';
//       } else {
//         errorMessage += 'Please make sure you\'ve granted permission or try another browser.';
//       }
      
//       setCameraError(errorMessage);
//       setWebcamLoading(false);
//     }
//   };

//   const stopWebcam = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       console.log("Stopping webcam streams");
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//       setUseWebcam(false);
//     }
//   };

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
      
//       // Set canvas dimensions to match video
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
      
//       console.log("Capturing image from webcam", video.videoWidth, video.videoHeight);
      
//       // Draw current video frame to canvas
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
//       // Convert canvas to blob/file
//       canvas.toBlob((blob) => {
//         console.log("Image captured successfully", blob);
//         const capturedImage = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
//         setSelectedImage(capturedImage);
//         setUseWebcam(false);
//         setCameraActive(false);
//         stopWebcam();
//       }, 'image/jpeg', 0.95);
//     } else {
//       console.error("Video or canvas reference not available for capture");
//     }
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("File selected:", file.name);
//       setSelectedImage(file);
//       setPrediction(null);
//       setUseWebcam(false);
//       if (cameraActive) {
//         stopWebcam();
//       }
//     }
//   };

//   const checkDownSyndrome = async () => {
//     if (!selectedImage && !cameraActive) {
//       alert('Please upload an image or activate webcam first!');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
    
//     // If using webcam and no image captured yet, capture now
//     if (cameraActive) {
//       captureImage();
//       // Small delay to ensure capture completes
//       await new Promise(resolve => setTimeout(resolve, 500));
//     }

//     formData.append('image', selectedImage);

//     try {
//       console.log("Sending image for analysis");
//       const response = await axios.post('http://localhost:5000/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
      
//       const { prediction: pred, confidence } = response.data;
//       console.log("Received prediction:", pred, "with confidence:", confidence);
      
//       // Set appropriate symptoms based on prediction
//       const relevantSymptoms = pred.includes("Down Syndrome") 
//         ? downSyndromeSymptoms 
//         : ["No Down Syndrome indicators detected"];
      
//       setPrediction({ 
//         label: pred, 
//         prob: confidence,
//         symptoms: relevantSymptoms
//       });
//     } catch (error) {
//       console.error('Error detecting Down Syndrome:', error);
//       setPrediction({ 
//         label: 'Error', 
//         prob: 0, 
//         symptoms: ['Check connection or try again'] 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetDetection = () => {
//     console.log("Resetting detection state");
//     setSelectedImage(null);
//     setPrediction(null);
//     setCameraError('');
    
//     if (cameraActive) {
//       stopWebcam();
//     }
    
//     setUseWebcam(false);
//     setCameraActive(false);
//     setWebcamLoading(false);
    
//     // Clear any previous file selection
//     if (document.querySelector('.file-input')) {
//       document.querySelector('.file-input').value = '';
//     }
//   };

//   return (
//     <div className="detection-container">
//       <header className="detection-header">
//         <div className="header-content">
//           <h1 className="main-title">Down Syndrome Facial Detection</h1>
//           <p className="subtitle">Upload a photo or use your webcam for analysis</p>
//         </div>
//       </header>

//       <main className="detection-main">
//         <div className="detection-card">
//           <div className="detection-options">
//             <button 
//               className={`option-button ${!useWebcam && !cameraActive ? 'active' : ''}`}
//               onClick={() => {
//                 resetDetection();
//                 setUseWebcam(false);
//                 setCameraActive(false);
//               }}
//             >
//               <i className="fas fa-upload"></i>
//               Upload Photo
//             </button>
//             <button 
//               className={`option-button ${useWebcam || cameraActive ? 'active' : ''}`}
//               onClick={() => {
//                 resetDetection();
//                 // Directly set useWebcam and start webcam without timeout
//                 setUseWebcam(true);
//                 // Small delay to ensure state is updated
//                 requestAnimationFrame(() => {
//                   startWebcam();
//                 });
//               }}
//             >
//               <i className="fas fa-camera"></i>
//               Use Webcam
//             </button>
//           </div>

//           <div className="detection-content">
//             {!useWebcam && !cameraActive && !selectedImage && (
//               <div className="upload-zone">
//                 <label className="file-input-label">
//                   <input 
//                     type="file" 
//                     accept="image/*" 
//                     onChange={handleImageUpload} 
//                     className="file-input" 
//                   />
//                   <div className="upload-placeholder">
//                     <i className="fas fa-cloud-upload-alt"></i>
//                     <p>Drag & drop your image or click to browse</p>
//                   </div>
//                 </label>
//               </div>
//             )}

//             {useWebcam && webcamLoading && (
//               <div className="webcam-loading">
//                 <div className="loading-spinner"></div>
//                 <p>Starting camera...</p>
//               </div>
//             )}

//             {cameraError && (
//               <div className="camera-error">
//                 <i className="fas fa-exclamation-circle"></i>
//                 <p>{cameraError}</p>
//                 <button 
//                   className="retry-button"
//                   onClick={() => {
//                     setCameraError('');
//                     // Use requestAnimationFrame instead of setTimeout
//                     requestAnimationFrame(() => {
//                       startWebcam();
//                     });
//                   }}
//                 >
//                   <i className="fas fa-redo"></i>
//                   Retry
//                 </button>
//               </div>
//             )}

//             {useWebcam && !webcamLoading && cameraActive && (
//               <div className="webcam-container">
//                 <video 
//                   ref={videoRef} 
//                   autoPlay 
//                   playsInline
//                   muted
//                   className="webcam-video"
//                 />
//                 <div className="webcam-controls">
//                   <button 
//                     className="webcam-button capture"
//                     onClick={captureImage}
//                   >
//                     <i className="fas fa-camera"></i>
//                     Capture Photo
//                   </button>
//                   <button 
//                     className="webcam-button stop"
//                     onClick={() => {
//                       stopWebcam();
//                       setUseWebcam(false);
//                       setCameraActive(false);
//                     }}
//                   >
//                     <i className="fas fa-stop-circle"></i>
//                     Stop Camera
//                   </button>
//                 </div>
//                 <canvas ref={canvasRef} style={{ display: 'none' }} />
//               </div>
//             )}

//             {selectedImage && !useWebcam && !cameraActive && (
//               <div className="image-preview">
//                 <img 
//                   src={URL.createObjectURL(selectedImage)} 
//                   alt="Preview" 
//                   className="preview-img" 
//                 />
//                 <button 
//                   className="remove-image-btn"
//                   onClick={resetDetection}
//                 >
//                   <i className="fas fa-times"></i>
//                 </button>
//               </div>
//             )}

//             {(selectedImage || (useWebcam && cameraActive)) && !loading && !prediction && (
//               <div className="action-buttons">
//                 <button 
//                   className="analyze-button"
//                   onClick={checkDownSyndrome}
//                   disabled={loading}
//                 >
//                   <i className="fas fa-search"></i>
//                   {loading ? 'Analyzing...' : 'Analyze Face'}
//                 </button>
//               </div>
//             )}

//             {loading && (
//               <div className="loading-container">
//                 <div className="loading-spinner"></div>
//                 <p>Analyzing facial features...</p>
//               </div>
//             )}

//             {prediction && (
//               <div className="results-container">
//                 <div className={`result-card ${prediction.label.includes("Down Syndrome") ? "positive" : "negative"}`}>
//                   <div className="result-header">
//                     <h2>Detection Results</h2>
//                     <div className="confidence-meter">
//                       <div 
//                         className="confidence-fill" 
//                         style={{ width: `${prediction.prob * 100}%` }}
//                       ></div>
//                       <span className="confidence-text">{(prediction.prob * 100).toFixed(1)}% confidence</span>
//                     </div>
//                   </div>
                  
//                   <div className="result-body">
//                     <div className="result-message">
//                       <h3>{prediction.label}</h3>
//                       <p className="disclaimer">
//                         This is an automated analysis and should not replace professional medical evaluation.
//                       </p>
//                     </div>
                    
//                     <div className="symptoms-list">
//                       <h4>Detected Features:</h4>
//                       <ul>
//                         {prediction.symptoms.map((symptom, index) => (
//                           <li key={index}>{symptom}</li>
//                         ))}
//                       </ul>
//                     </div>
                    
//                     <div className="character-image">
//                       <img 
//                         src={prediction.label.includes("Down Syndrome") ? supportCharacter : happyCharacter} 
//                         alt="Character" 
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="result-footer">
//                     <button 
//                       className="restart-button"
//                       onClick={resetDetection}
//                     >
//                       <i className="fas fa-redo"></i>
//                       Try Another Photo
//                     </button>
//                     {prediction.label.includes("Down Syndrome") && (
//                       <button className="info-button">
//                         <i className="fas fa-info-circle"></i>
//                         Learn More About Down Syndrome
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <footer className="detection-footer">
//         <p>This tool is for educational purposes only. Please consult with healthcare professionals for medical diagnosis.</p>
//       </footer>
//     </div>
//   );
// };

// export default DetectionPage;






import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './DetectionPage.css';

// Import your assets here
import happyCharacter from 'Client/public/images/detection/happy.jpg';
import supportCharacter from 'Client/public/images/detection/happy.jpg';
// You may want to add more appropriate images later

const DetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [webcamLoading, setWebcamLoading] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [cameraError, setCameraError] = useState('');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Symptoms information
  const downSyndromeSymptoms = [
    "Flattened facial features",
    "Small head and ears",
    "Short neck",
    "Protruding tongue",
    "Upward slanting eyes",
    "Unusually shaped or positioned ears",
    "Poor muscle tone"
  ];

  useEffect(() => {
    // Clean up webcam on component unmount
    return () => {
      if (cameraActive) {
        stopWebcam();
      }
    };
  }, [cameraActive]);

  // Log when video ref is updated
  useEffect(() => {
    console.log("Video ref current value:", videoRef.current);
  }, []);

  // Added for debugging camera access
  useEffect(() => {
    async function checkCameraAvailability() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Available video devices:', videoDevices);
      } catch (error) {
        console.error('Error checking camera availability:', error);
      }
    }
    checkCameraAvailability();
  }, []);

  const startWebcam = async () => {
    setCameraError('');
    setWebcamLoading(true);
    
    try {
      console.log("Attempting to access webcam...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      
      console.log("Webcam access granted, setting up video");
      
      // Check if videoRef.current exists
      if (!videoRef.current) {
        console.error("Video reference is null");
        setCameraError('Video element not found. Please try again or refresh the page.');
        setWebcamLoading(false);
        return;
      }
      
      videoRef.current.srcObject = stream;
      
      videoRef.current.onloadedmetadata = () => {
        console.log("Video metadata loaded, playing video");
        videoRef.current.play()
          .then(() => {
            console.log("Webcam video playing successfully");
            setWebcamLoading(false);
            setCameraActive(true);
            setUseWebcam(true);
            setSelectedImage(null);
            setPrediction(null);
          })
          .catch(err => {
            console.error("Error playing video:", err);
            setCameraError('Failed to play webcam stream. Please try again.');
            setWebcamLoading(false);
          });
      };
      
      videoRef.current.onerror = (err) => {
        console.error("Video element error:", err);
        setCameraError('Video element encountered an error');
        setWebcamLoading(false);
      };
    } catch (error) {
      console.error("Error accessing webcam:", error);
      let errorMessage = 'Unable to access webcam. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Camera access was denied. Please check your browser permissions.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera detected on this device.';
      } else if (error.name === 'NotReadableError') {
        errorMessage += 'Camera is already in use by another application.';
      } else {
        errorMessage += 'Please make sure you\'ve granted permission or try another browser.';
      }
      
      setCameraError(errorMessage);
      setWebcamLoading(false);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      console.log("Stopping webcam streams");
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
      setUseWebcam(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      console.log("Capturing image from webcam", video.videoWidth, video.videoHeight);
      
      // Draw current video frame to canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob/file
      canvas.toBlob((blob) => {
        console.log("Image captured successfully", blob);
        const capturedImage = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
        setSelectedImage(capturedImage);
        setUseWebcam(false);
        setCameraActive(false);
        stopWebcam();
      }, 'image/jpeg', 0.95);
    } else {
      console.error("Video or canvas reference not available for capture");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      setSelectedImage(file);
      setPrediction(null);
      setUseWebcam(false);
      if (cameraActive) {
        stopWebcam();
      }
    }
  };

  const checkDownSyndrome = async () => {
    if (!selectedImage && !cameraActive) {
      alert('Please upload an image or activate webcam first!');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    
    // If using webcam and no image captured yet, capture now
    if (cameraActive) {
      captureImage();
      // Small delay to ensure capture completes
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    formData.append('image', selectedImage);

    try {
      console.log("Sending image for analysis");
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      const { prediction: pred, confidence } = response.data;
      console.log("Received prediction:", pred, "with confidence:", confidence);
      
      // Set appropriate symptoms based on prediction
      const relevantSymptoms = pred.includes("Down Syndrome") 
        ? downSyndromeSymptoms 
        : ["No Down Syndrome indicators detected"];
      
      setPrediction({ 
        label: pred, 
        prob: confidence,
        symptoms: relevantSymptoms
      });
    } catch (error) {
      console.error('Error detecting Down Syndrome:', error);
      setPrediction({ 
        label: 'Error', 
        prob: 0, 
        symptoms: ['Check connection or try again'] 
      });
    } finally {
      setLoading(false);
    }
  };

  const resetDetection = () => {
    console.log("Resetting detection state");
    setSelectedImage(null);
    setPrediction(null);
    setCameraError('');
    
    if (cameraActive) {
      stopWebcam();
    }
    
    setUseWebcam(false);
    setCameraActive(false);
    setWebcamLoading(false);
    
    // Clear any previous file selection
    if (document.querySelector('.file-input')) {
      document.querySelector('.file-input').value = '';
    }
  };

  return (
    <div className="detection-container">
      <header className="detection-header">
        <div className="header-content">
          <h1 className="main-title">Down Syndrome Facial Detection</h1>
          <p className="subtitle">Upload a photo or use your webcam for analysis</p>
        </div>
      </header>

      <main className="detection-main">
        <div className="detection-card">
          <div className="detection-options">
            <button 
              className={`option-button ${!useWebcam && !cameraActive ? 'active' : ''}`}
              onClick={() => {
                resetDetection();
                setUseWebcam(false);
                setCameraActive(false);
              }}
            >
              <i className="fas fa-upload"></i>
              Upload Photo
            </button>
            <button 
              className={`option-button ${useWebcam || cameraActive ? 'active' : ''}`}
              onClick={() => {
                resetDetection();
                // Directly set useWebcam and start webcam without timeout
                setUseWebcam(true);
                // Small delay to ensure state is updated
                requestAnimationFrame(() => {
                  startWebcam();
                });
              }}
            >
              <i className="fas fa-camera"></i>
              Use Webcam
            </button>
          </div>

          <div className="detection-content">
            {!useWebcam && !cameraActive && !selectedImage && (
              <div className="upload-zone">
                <label className="file-input-label">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="file-input" 
                  />
                  <div className="upload-placeholder">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Drag & drop your image or click to browse</p>
                  </div>
                </label>
              </div>
            )}

            {useWebcam && webcamLoading && (
              <div className="webcam-loading">
                <div className="loading-spinner"></div>
                <p>Starting camera...</p>
              </div>
            )}

            {cameraError && (
              <div className="camera-error">
                <i className="fas fa-exclamation-circle"></i>
                <p>{cameraError}</p>
                <button 
                  className="retry-button"
                  onClick={() => {
                    setCameraError('');
                    // Use requestAnimationFrame instead of setTimeout
                    requestAnimationFrame(() => {
                      startWebcam();
                    });
                  }}
                >
                  <i className="fas fa-redo"></i>
                  Retry
                </button>
              </div>
            )}

            {useWebcam && !webcamLoading && cameraActive && (
              <div className="webcam-container">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  muted
                  className="webcam-video"
                />
                <div className="webcam-controls">
                  <button 
                    className="webcam-button capture"
                    onClick={captureImage}
                  >
                    <i className="fas fa-camera"></i>
                    Capture Photo
                  </button>
                  <button 
                    className="webcam-button stop"
                    onClick={() => {
                      stopWebcam();
                      setUseWebcam(false);
                      setCameraActive(false);
                    }}
                  >
                    <i className="fas fa-stop-circle"></i>
                    Stop Camera
                  </button>
                </div>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
              </div>
            )}

            {selectedImage && !useWebcam && !cameraActive && (
              <div className="image-preview">
                <img 
                  src={URL.createObjectURL(selectedImage)} 
                  alt="Preview" 
                  className="preview-img" 
                />
                <button 
                  className="remove-image-btn"
                  onClick={resetDetection}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}

            {(selectedImage || (useWebcam && cameraActive)) && !loading && !prediction && (
              <div className="action-buttons">
                <button 
                  className="analyze-button"
                  onClick={checkDownSyndrome}
                  disabled={loading}
                >
                  <i className="fas fa-search"></i>
                  {loading ? 'Analyzing...' : 'Analyze Face'}
                </button>
              </div>
            )}

            {loading && (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Analyzing facial features...</p>
              </div>
            )}

            {prediction && (
              <div className="results-container">
                <div className={`result-card ${prediction.label.includes("Down Syndrome") ? "positive" : "negative"}`}>
                  <div className="result-header">
                    <h2>Detection Results</h2>
                    <div className="confidence-meter">
                      <div 
                        className="confidence-fill" 
                        style={{ width: `${prediction.prob * 100}%` }}
                      ></div>
                      <span className="confidence-text">{(prediction.prob * 100).toFixed(1)}% confidence</span>
                    </div>
                  </div>
                  
                  <div className="result-body">
                    <div className="result-message">
                      <h3>{prediction.label}</h3>
                      <p className="disclaimer">
                        This is an automated analysis and should not replace professional medical evaluation.
                      </p>
                    </div>
                    
                    <div className="symptoms-list">
                      <h4>Detected Features:</h4>
                      <ul>
                        {prediction.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="character-image">
                      <img 
                        src={prediction.label.includes("Down Syndrome") ? supportCharacter : happyCharacter} 
                        alt="Character" 
                      />
                    </div>
                  </div>
                  
                  <div className="result-footer">
                    <button 
                      className="restart-button"
                      onClick={resetDetection}
                    >
                      <i className="fas fa-redo"></i>
                      Try Another Photo
                    </button>
                    {prediction.label.includes("Down Syndrome") && (
                      <button className="info-button">
                        <i className="fas fa-info-circle"></i>
                        Learn More About Down Syndrome
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="detection-footer">
        <p>This tool is for educational purposes only. Please consult with healthcare professionals for medical diagnosis.</p>
      </footer>
    </div>
  );
};

export default DetectionPage;
