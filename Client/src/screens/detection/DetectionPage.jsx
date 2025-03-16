


































//NICE UI


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

//   // Function to calculate inverse probability
//   const calculateInverseProbability = (probability) => {
//     return (100 - probability * 100).toFixed(1);
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
                      
//                       {/* Display probabilities */}
//                       <div className="probability-container">
//                         <p className="down-syndrome-probability">
//                           <strong>Probability of having Down Syndrome:</strong> {(prediction.prob * 100).toFixed(1)}%
//                         </p>
                        
//                         {/* Only show the probability of NOT having Down Syndrome when it's not detected */}
//                         {!prediction.label.includes("Down Syndrome") && (
//                           <p className="down-syndrome-probability">
//                             <strong>Probability of not having Down Syndrome:</strong> {calculateInverseProbability(prediction.prob)}%
//                           </p>
//                         )}
//                       </div>
                      
//                       <p className="disclaimer">
//                         This is an automated analysis and should not replace professional medical evaluation.
//                       </p>
//                     </div>
                    
//                     {/* Only show symptoms list when Down Syndrome is detected */}
//                     {prediction.label.includes("Down Syndrome") && (
//                       <div className="symptoms-list">
//                         <h4>Detected Features:</h4>
//                         <ul>
//                           {prediction.symptoms.map((symptom, index) => (
//                             <li key={index}>{symptom}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
                    
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








//CORRECT ONEEE



// import React, { useState, useRef, useCallback } from 'react';
// import ReactWebcam from 'react-webcam';
// import axios from 'axios';
// import './DetectionPage.css';

// // Import your assets here
// import happyCharacter from 'Client/public/images/detection/happy.jpg';
// import supportCharacter from 'Client/public/images/detection/happy.jpg';

// const DetectionPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('upload');
//   const webcamRef = useRef(null);

//   const downSyndromeSymptoms = [
//     "Flattened facial features",
//     "Small head and ears",
//     "Short neck",
//     "Protruding tongue",
//     "Upward slanting eyes",
//     "Unusually shaped or positioned ears",
//     "Poor muscle tone"
//   ];

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setCapturedImage(null);
//       setPrediction(null);
//     }
//   };

//   const captureImage = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setCapturedImage(imageSrc);
//       setSelectedImage(null);
//       setPrediction(null);
//     }
//   }, [webcamRef]);

//   const checkDownSyndrome = async (image) => {
//     if (!image) {
//       alert('Please upload or capture an image first!');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();

//     if (image instanceof File) {
//       formData.append('image', image);
//     } else {
//       const blob = await fetch(image).then(res => res.blob());
//       formData.append('image', blob, 'captured_image.jpg');
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
      
//       const { prediction: pred, confidence } = response.data;
//       const relevantSymptoms = pred === "Down Syndrome Detected" 
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
//     setCapturedImage(null);
//     setPrediction(null);
//     if (document.querySelector('.file-input')) {
//       document.querySelector('.file-input').value = '';
//     }
//   };

//   return (
//     <div className="detection-page">
//       {/* Header with purple background */}
//       <header className="header">
//         <h1>Down Syndrome Facial Detection</h1>
//         <p>Upload a photo or use your webcam for analysis</p>
//       </header>

//       {/* Main content area */}
//       <main className="main-content">
//         <div className="card">
//           {/* Tabs */}
//           <div className="tabs">
//             <button 
//               className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
//               onClick={() => setActiveTab('upload')}
//             >
//               <span className="tab-icon">📁</span> Upload Photo
//             </button>
//             <button 
//               className={`tab ${activeTab === 'webcam' ? 'active' : ''}`}
//               onClick={() => setActiveTab('webcam')}
//             >
//               <span className="tab-icon">📹</span> Use Webcam
//             </button>
//           </div>

//           {/* Tab content */}
//           <div className="tab-content">
//             {activeTab === 'upload' && (
//               <div className="upload-content">
//                 {!selectedImage && (
//                   <label className="upload-area">
//                     <input 
//                       type="file" 
//                       accept="image/*" 
//                       onChange={handleImageUpload} 
//                       className="file-input" 
//                     />
//                     <div className="upload-placeholder">
//                       <p>Drag & drop your image or click to browse</p>
//                     </div>
//                   </label>
//                 )}

//                 {selectedImage && (
//                   <div className="image-preview">
//                     <img 
//                       src={URL.createObjectURL(selectedImage)} 
//                       alt="Preview" 
//                       className="preview-img" 
//                     />
//                     <button className="remove-button" onClick={resetDetection}>
//                       Remove
//                     </button>
//                     <button className="analyze-button" onClick={() => checkDownSyndrome(selectedImage)}>
//                       Analyze Face
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'webcam' && (
//               <div className="webcam-content">
//                 <ReactWebcam 
//                   ref={webcamRef} 
//                   screenshotFormat="image/jpeg" 
//                   className="webcam" 
//                 />
                
//                 {!capturedImage ? (
//                   <button className="capture-button" onClick={captureImage}>
//                     Capture Image
//                   </button>
//                 ) : (
//                   <div className="image-preview">
//                     <img 
//                       src={capturedImage} 
//                       alt="Captured" 
//                       className="preview-img" 
//                     />
//                     <button className="remove-button" onClick={resetDetection}>
//                       Remove
//                     </button>
//                     <button className="analyze-button" onClick={() => checkDownSyndrome(capturedImage)}>
//                       Analyze Face
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {loading && (
//               <div className="loading">
//                 <div className="spinner"></div>
//                 <p>Analyzing facial features...</p>
//               </div>
//             )}

//             {prediction && (
//               <div className="results">
//                 <h3>Detection Result: {prediction.label}</h3>
//                 <p>Confidence: {(prediction.prob * 100).toFixed(1)}%</p>
//                 <ul className="symptoms-list">
//                   {prediction.symptoms.map((symptom, index) => (
//                     <li key={index}>{symptom}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <footer className="footer">
//         <p>This tool is for educational purposes only. Please consult with healthcare professionals for medical diagnosis.</p>
//       </footer>
//     </div>
//   );
// };

// export default DetectionPage;
























//SINGLE OPTION



// import React, { useState } from 'react';
// import axios from 'axios';
// import './DetectionPage.css';

// // Import your assets here
// import happyCharacter from 'Client/public/images/detection/happy.jpg';
// import supportCharacter from 'Client/public/images/detection/happy.jpg';

// const DetectionPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

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

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setPrediction(null);
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
      
//       const { prediction: pred, confidence } = response.data;
      
//       // Set appropriate symptoms based on prediction
//       const relevantSymptoms = pred === "Down Syndrome Detected" 
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
//     // Clear any previous file selection
//     if (document.querySelector('.file-input')) {
//       document.querySelector('.file-input').value = '';
//     }
//   };

//   // Function to calculate inverse probability
//   const calculateInverseProbability = (probability) => {
//     return (100 - probability * 100).toFixed(1);
//   };

//   return (
//     <div className="detection-container">
//       <header className="detection-header">
//         <div className="header-content">
//           <h1 className="main-title">Down Syndrome Facial Detection</h1>
//           <p className="subtitle">Upload a photo for analysis</p>
//         </div>
//       </header>

//       <main className="detection-main">
//         <div className="detection-card">
//           <div className="detection-content">
//             {!selectedImage && (
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

//             {selectedImage && (
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

//             {selectedImage && !loading && !prediction && (
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
//                 <div className={`result-card ${prediction.label === "Down Syndrome Detected" ? "positive" : "negative"}`}>
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
                      
//                       {/* Display probabilities */}
//                       <div className="probability-container">
//                         <p className="down-syndrome-probability">
//                           <strong>Probability of having Down Syndrome:</strong> {(prediction.prob * 100).toFixed(1)}%
//                         </p>
                        
//                         {/* Only show the probability of NOT having Down Syndrome when it's not detected */}
//                         {prediction.label !== "Down Syndrome Detected" && (
//                           <p className="down-syndrome-probability">
//                             <strong>Probability of not having Down Syndrome:</strong> {calculateInverseProbability(prediction.prob)}%
//                           </p>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Only show symptoms list when Down Syndrome is detected */}
//                     {prediction.label === "Down Syndrome Detected" && (
//                       <div className="symptoms-list">
//                         <h4>Detected Features:</h4>
//                         <ul>
//                           {prediction.symptoms.map((symptom, index) => (
//                             <li key={index}>{symptom}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
                    
//                     <div className="character-image">
//                       <img 
//                         src={prediction.label === "Down Syndrome Detected" ? supportCharacter : happyCharacter} 
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
//                     {prediction.label === "Down Syndrome Detected" && (
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
















//correct code with probability

import React, { useState, useRef, useCallback } from 'react';
import ReactWebcam from 'react-webcam';
import axios from 'axios';
import './DetectionPage.css';

// Import your assets here
import happyCharacter from 'Client/public/images/detection/happy.jpg';
import supportCharacter from 'Client/public/images/detection/happy.jpg';

const DetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const webcamRef = useRef(null);

  const downSyndromeSymptoms = [
    "Flattened facial features",
    "Small head and ears",
    "Short neck",
    "Protruding tongue",
    "Upward slanting eyes",
    "Unusually shaped or positioned ears",
    "Poor muscle tone"
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setCapturedImage(null);
      setPrediction(null);
    }
  };

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setSelectedImage(null);
      setPrediction(null);
    }
  }, [webcamRef]);

  const checkDownSyndrome = async (image) => {
    if (!image) {
      alert('Please upload or capture an image first!');
      return;
    }

    setLoading(true);
    const formData = new FormData();

    if (image instanceof File) {
      formData.append('image', image);
    } else {
      const blob = await fetch(image).then(res => res.blob());
      formData.append('image', blob, 'captured_image.jpg');
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      const { prediction: pred, confidence } = response.data;
      const dsPercentage = (confidence * 100).toFixed(1);
      const nonDsPercentage = (100 - dsPercentage).toFixed(1);
      
      setPrediction({ 
        label: pred, 
        dsProb: parseFloat(dsPercentage),
        nonDsProb: parseFloat(nonDsPercentage),
        symptoms: pred === "Down Syndrome Detected" ? downSyndromeSymptoms : []
      });
    } catch (error) {
      console.error('Error detecting Down Syndrome:', error);
      setPrediction({ 
        label: 'Error', 
        dsProb: 0,
        nonDsProb: 100,
        symptoms: ['Check connection or try again'] 
      });
    } finally {
      setLoading(false);
    }
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setCapturedImage(null);
    setPrediction(null);
    if (document.querySelector('.file-input')) {
      document.querySelector('.file-input').value = '';
    }
  };

  return (
    <div className="detection-page">
      {/* Header with purple background */}
      <header className="header">
        <h1>Down Syndrome Facial Detection</h1>
        <p>Upload a photo or use your webcam for analysis</p>
      </header>

      {/* Main content area */}
      <main className="main-content">
        <div className="card">
          {!prediction ? (
            <>
              {/* Tabs */}
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  <span className="tab-icon">📁</span> Upload Photo
                </button>
                <button 
                  className={`tab ${activeTab === 'webcam' ? 'active' : ''}`}
                  onClick={() => setActiveTab('webcam')}
                >
                  <span className="tab-icon">📹</span> Use Webcam
                </button>
              </div>

              {/* Tab content */}
              <div className="tab-content">
                {activeTab === 'upload' && (
                  <div className="upload-content">
                    {!selectedImage && (
                      <label className="upload-area">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="file-input" 
                        />
                        <div className="upload-placeholder">
                          <p>Drag & drop your image or click to browse</p>
                        </div>
                      </label>
                    )}

                    {selectedImage && !loading && (
                      <div className="image-preview">
                        <img 
                          src={URL.createObjectURL(selectedImage)} 
                          alt="Preview" 
                          className="preview-img" 
                        />
                        <div className="action-buttons">
                          <button className="remove-button" onClick={resetDetection}>
                            Remove
                          </button>
                          <button className="analyze-button" onClick={() => checkDownSyndrome(selectedImage)}>
                            Analyze Face
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'webcam' && (
                  <div className="webcam-content">
                    <ReactWebcam 
                      ref={webcamRef} 
                      screenshotFormat="image/jpeg" 
                      className="webcam" 
                    />
                    
                    {!capturedImage ? (
                      <button className="capture-button" onClick={captureImage}>
                        Capture Image
                      </button>
                    ) : !loading ? (
                      <div className="image-preview">
                        <img 
                          src={capturedImage} 
                          alt="Captured" 
                          className="preview-img" 
                        />
                        <div className="action-buttons">
                          <button className="remove-button" onClick={resetDetection}>
                            Remove
                          </button>
                          <button className="analyze-button" onClick={() => checkDownSyndrome(capturedImage)}>
                            Analyze Face
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                {loading && (
                  <div className="loading">
                    <div className="spinner"></div>
                    <p>Analyzing facial features...</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="results-page">
              <h2 className="results-title">Detection Results</h2>
              <div className="results-progress-bar">
                <div className="progress-filled" style={{ width: `${prediction.dsProb}%` }}></div>
              </div>
              
              <div className="results-content">
                <div className="results-text">
                  <h3 className="detection-result">{prediction.label}</h3>
                  
                  <div className="probability-section">
                    <p className="probability-label">Probability of having Down Syndrome:</p>
                    <p className="probability-value">{prediction.dsProb}%</p>
                  </div>
                  
                  <div className="probability-section">
                    <p className="probability-label">Probability of not having Down Syndrome:</p>
                    <p className="probability-value">{prediction.nonDsProb}%</p>
                  </div>
                </div>
                
                <div className="results-image">
                  <img 
                    src={prediction.label === "Down Syndrome Detected" ? supportCharacter : happyCharacter} 
                    alt="Character" 
                    className="character-img" 
                  />
                </div>
              </div>
              
              <button className="try-another-button" onClick={resetDetection}>
                Try Another Photo
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>This tool is for educational purposes only. Please consult with healthcare professionals for medical diagnosis.</p>
      </footer>
    </div>
  );
};

export default DetectionPage;


































//WEBCAM WROKING

// import React, { useState, useRef, useCallback } from 'react';
// import ReactWebcam from 'react-webcam';
// import axios from 'axios';
// import './DetectionPage.css';

// // Import your assets here
// import happyCharacter from 'Client/public/images/detection/happy.jpg';
// import supportCharacter from 'Client/public/images/detection/happy.jpg';

// const DetectionPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const webcamRef = useRef(null);

//   const downSyndromeSymptoms = [
//     "Flattened facial features",
//     "Small head and ears",
//     "Short neck",
//     "Protruding tongue",
//     "Upward slanting eyes",
//     "Unusually shaped or positioned ears",
//     "Poor muscle tone"
//   ];

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setCapturedImage(null);
//       setPrediction(null);
//     }
//   };

//   const captureImage = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setCapturedImage(imageSrc);
//       setSelectedImage(null);
//       setPrediction(null);
//     }
//   }, [webcamRef]);

//   const checkDownSyndrome = async (image) => {
//     if (!image) {
//       alert('Please upload or capture an image first!');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();

//     if (image instanceof File) {
//       formData.append('image', image);
//     } else {
//       const blob = await fetch(image).then(res => res.blob());
//       formData.append('image', blob, 'captured_image.jpg');
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
      
//       const { prediction: pred, confidence } = response.data;
//       const relevantSymptoms = pred === "Down Syndrome Detected" 
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
//     setCapturedImage(null);
//     setPrediction(null);
//     if (document.querySelector('.file-input')) {
//       document.querySelector('.file-input').value = '';
//     }
//   };

//   return (
//     <div className="detection-container">
//       <header className="detection-header">
//         <div className="header-content">
//           <h1 className="main-title">Down Syndrome Facial Detection</h1>
//           <p className="subtitle">Upload or capture a photo for analysis</p>
//         </div>
//       </header>

//       <main className="detection-main">
//         <div className="detection-card">
//           <div className="detection-content">
//             <div className="webcam-container">
//               <ReactWebcam ref={webcamRef} screenshotFormat="image/jpeg" className="webcam-feed" />
//               <button onClick={captureImage} className="capture-btn">Capture Image</button>
//             </div>
            
//             {!selectedImage && !capturedImage && (
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

//             {(selectedImage || capturedImage) && (
//               <div className="image-preview">
//                 <img 
//                   src={selectedImage ? URL.createObjectURL(selectedImage) : capturedImage} 
//                   alt="Preview" 
//                   className="preview-img" 
//                 />
//                 <button className="remove-image-btn" onClick={resetDetection}>
//                   <i className="fas fa-times"></i>
//                 </button>
//               </div>
//             )}

//             {(selectedImage || capturedImage) && !loading && !prediction && (
//               <div className="action-buttons">
//                 <button className="analyze-button" onClick={() => checkDownSyndrome(selectedImage || capturedImage)}>
//                   <i className="fas fa-search"></i>
//                   Analyze Face
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
//                 <h3>Detection Result: {prediction.label}</h3>
//                 <p>Confidence: {(prediction.prob * 100).toFixed(1)}%</p>
//                 <ul>
//                   {prediction.symptoms.map((symptom, index) => (
//                     <li key={index}>{symptom}</li>
//                   ))}
//                 </ul>
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
















