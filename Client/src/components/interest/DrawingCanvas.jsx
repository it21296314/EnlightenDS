// // // // src/components/DrawingCanvas.js
// // // import axios from "axios";
// // // import React, { useRef, useState ,useEffect ,fetchDrawings } from "react";
// // // import "./DrawingCanvas.css"; // Add styles for the canvas
 

// // // const DrawingCanvas = () => {
// // //   const canvasRef = useRef(null);
// // //   const ctxRef = useRef(null);
// // //   const [isDrawing, setIsDrawing] = useState(false);

// // //   const startDrawing = (e) => {
// // //     const { offsetX, offsetY } = e.nativeEvent;
// // //     ctxRef.current.beginPath();
// // //     ctxRef.current.moveTo(offsetX, offsetY);
// // //     setIsDrawing(true);
// // //   };

// // //   const draw = (e) => {
// // //     if (!isDrawing) return;
// // //     const { offsetX, offsetY } = e.nativeEvent;
// // //     ctxRef.current.lineTo(offsetX, offsetY);
// // //     ctxRef.current.stroke();
// // //   };

// // //   const finishDrawing = () => {
// // //     ctxRef.current.closePath();
// // //     setIsDrawing(false);
// // //   };

// // //   const clearCanvas = () => {
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas.getContext("2d");
// // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //   };

// // //   const saveDrawing = async () => {
// // //     const canvas = canvasRef.current;
// // //     const image = canvas.toDataURL("image/png");

// // //     try {
// // //       const response = await axios.post("http://localhost:3001/save-drawing", {
// // //         image,
// // //       });
// // //       console.log(response.data.message);
// // //     } catch (error) {
// // //       console.error("Error saving drawing:", error);
// // //     }
// // //   };


// // //   React.useEffect(() => {
// // //     const canvas = canvasRef.current;
// // //     canvas.width = 800;
// // //     canvas.height = 500;

// // //     const ctx = canvas.getContext("2d");
// // //     ctx.lineCap = "round";
// // //     ctx.lineWidth = 5;
// // //     ctx.strokeStyle = "black";
// // //     ctxRef.current = ctx;
// // //   }, []);

// // //   return (
// // //     <div className="drawing-container">
// // //       <h1>Drawing and Painting Platform 🎨</h1>
// // //       <canvas
// // //         ref={canvasRef}
// // //         onMouseDown={startDrawing}
// // //         onMouseMove={draw}
// // //         onMouseUp={finishDrawing}
// // //         onMouseLeave={finishDrawing}
// // //       ></canvas>
// // //       <div className="controls">
// // //         <button onClick={clearCanvas}>Clear</button>
// // //         <button onClick={saveDrawing}>Save</button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DrawingCanvas;


// // //---------------------

// // // import React, { useRef, useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import './DrawingCanvas.css';

// // // function DrawingCanvas() {
// // //   const canvasRef = useRef(null);
// // //   const ctxRef = useRef(null);
// // //   const [isDrawing, setIsDrawing] = useState(false);
// // //   const [startTime, setStartTime] = useState(null);
// // //   const [drawings, setDrawings] = useState([]);

// // //   // Fetch saved drawings on load
// // //   useEffect(() => {
// // //     const fetchDrawings = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:8070/api/drawings');
// // //         setDrawings(response.data);
// // //       } catch (error) {
// // //         console.error('Error fetching drawings:', error);
// // //       }
// // //     };
// // //     fetchDrawings();
// // //   }, []);

// // //   // Initialize canvas
// // //   useEffect(() => {
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas.getContext('2d');
// // //     canvas.width = 800;
// // //     canvas.height = 400;
// // //     ctx.lineCap = 'round';
// // //     ctx.lineWidth = 5;
// // //     ctx.strokeStyle = 'black';
// // //     ctxRef.current = ctx;

// // //     // Start tracking time
// // //     setStartTime(Date.now());
// // //   }, []);

// // //   // Start Drawing
// // //   const startDrawing = (e) => {
// // //     ctxRef.current.beginPath();
// // //     ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
// // //     setIsDrawing(true);
// // //   };

// // //   // Draw on Canvas
// // //   const draw = (e) => {
// // //     if (!isDrawing) return;
// // //     ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
// // //     ctxRef.current.stroke();
// // //   };

// // //   // Stop Drawing
// // //   const stopDrawing = () => {
// // //     ctxRef.current.closePath();
// // //     setIsDrawing(false);
// // //   };

// // //   // Clear Canvas
// // //   const clearCanvas = () => {
// // //     const canvas = canvasRef.current;
// // //     ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
// // //   };

// // //   // Save Drawing
// // //   const saveDrawing = async () => {
// // //     const canvas = canvasRef.current;
// // //     const dataURL = canvas.toDataURL(); // Convert canvas to base64
// // //     const duration = Math.floor((Date.now() - startTime) / 1000); // Time in seconds

// // //     try {
// // //       const response = await axios.post('http://localhost:8070/api/drawings', {
// // //         data: dataURL,
// // //         duration,
// // //       });
// // //       setDrawings([response.data, ...drawings]);
// // //     } catch (error) {
// // //       console.error('Error saving drawing:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="App">
// // //       <h1 className="topic">Drawing and Painting Platform</h1>

// // //       {/* Drawing Canvas */}
// // //       <canvas
// // //         ref={canvasRef}
// // //         onMouseDown={startDrawing}
// // //         onMouseMove={draw}
// // //         onMouseUp={stopDrawing}
// // //         onMouseLeave={stopDrawing}
// // //         style={{ border: '1px solid black', cursor: 'crosshair' }}
// // //       ></canvas>

// // //       {/* Controls */}
// // //       <div className="controls">
// // //         <button onClick={clearCanvas}>Clear</button>
// // //         <button onClick={saveDrawing}>Save</button>
// // //       </div>

// // //       {/* Saved Drawings */}
// // //       <div className="saved-drawings">
// // //         <h2>Saved Drawings</h2>
// // //         {drawings.map((drawing) => (
// // //           <div key={drawing._id}>
// // //             <img src={drawing.data} alt="Saved Drawing" style={{ width: '200px' }} />
// // //             <p>Time spent: {drawing.duration} seconds</p>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default DrawingCanvas;


// // import React, { useRef, useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { SketchPicker } from 'react-color';
// // import './DrawingCanvas.css';

// // function DrawingCanvas() {
// //   const canvasRef = useRef(null);
// //   const ctxRef = useRef(null);
// //   const [isDrawing, setIsDrawing] = useState(false);
// //   const [color, setColor] = useState('#000000');
// //   const [lineWidth, setLineWidth] = useState(5);
// //   const [startTime, setStartTime] = useState(null);
// //   const [duration, setDuration] = useState(0);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     canvas.width = window.innerWidth * 0.8;
// //     canvas.height = window.innerHeight * 0.6;
// //     const ctx = canvas.getContext('2d');
// //     ctx.lineCap = 'round';
// //     ctx.strokeStyle = color;
// //     ctx.lineWidth = lineWidth;
// //     ctxRef.current = ctx;

// //     // Start time tracking
// //     setStartTime(Date.now());

// //     return () => {
// //       // Calculate duration on component unmount
// //       setDuration(Math.floor((Date.now() - startTime) / 1000));
// //     };
// //   }, [color, lineWidth, startTime]);

// //   const startDrawing = (e) => {
// //     const { offsetX, offsetY } = e.nativeEvent;
// //     ctxRef.current.beginPath();
// //     ctxRef.current.moveTo(offsetX, offsetY);
// //     setIsDrawing(true);
// //   };

// //   const draw = (e) => {
// //     if (!isDrawing) return;
// //     const { offsetX, offsetY } = e.nativeEvent;
// //     ctxRef.current.lineTo(offsetX, offsetY);
// //     ctxRef.current.stroke();
// //   };

// //   const stopDrawing = () => {
// //     ctxRef.current.closePath();
// //     setIsDrawing(false);
// //   };

// //   const clearCanvas = () => {
// //     const canvas = canvasRef.current;
// //     const ctx = ctxRef.current;
// //     ctx.clearRect(0, 0, 10, canvas.width, canvas.height);
// //   };

// //   const saveDrawing = async () => {
// //     const canvas = canvasRef.current;
// //     const dataURL = canvas.toDataURL(); // Get image as base64 string
// //     const title = prompt('Enter a title for your drawing:');
// //     const timeSpent = Math.floor((Date.now() - startTime) / 1000);

// //     try {
// //       const response = await axios.post('http://localhost:3001/api/drawings', {
// //         title,
// //         data: dataURL,
// //         duration: timeSpent,
// //       });
// //       alert('Drawing saved successfully!');
// //     } catch (error) {
// //       console.error('Error saving drawing:', error);
// //     }
// //   };

// //   const selectEraser = () => {
// //     setColor('#FFFFFF'); // White color for eraser
// //     setLineWidth(20); // Wider stroke for erasing
// //   };

// //   return (
// //     <div className="bodyq1">
// //     <div className="App">
// //       <h1>Drawing and Painting Platform</h1>

// //       {/* Drawing Canvas */}
// //       <canvas
// //         ref={canvasRef}
// //         onMouseDown={startDrawing}
// //         onMouseMove={draw}
// //         onMouseUp={stopDrawing}
// //         onMouseLeave={stopDrawing}
// //         style={{ border: '1px solid black', cursor: 'crosshair', background:'white', width:'1250px', height:'550px' }}
// //       ></canvas>

// //       {/* Controls */}
// //       <div className="controls">
// //         <SketchPicker
// //           color={color}
// //           onChange={(updatedColor) => setColor(updatedColor.hex) }
// //         />
// //         <div className="blush">
// //         <div >
// //           <label>Brush Size: </label>
// //           <input
// //             type="range"
// //             min="1"
// //             max="20"
// //             value={lineWidth}
            
// //             onChange={(e) => setLineWidth(e.target.value)}
// //           />
// //         </div>
// //         <button onClick={clearCanvas}>Clear</button>
// //         {/* <button onClick={clearCanvas} className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%",  width: "auto", paddingLeft:"100", fontWeight: "700" }}>
// //         Clear
// //           </button>
// //           <button onClick={selectEraser} className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "1%", width:"5px", fontWeight: "700" }}>
// //           Eraser
// //           </button>
// //           <button onClick={saveDrawing} className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "1%", width:"5px", fontWeight: "700", marginLeft:"100" }}>
// //           Save
// //           </button> */}
// //         <button onClick={selectEraser}>Eraser</button>
// //         <button onClick={saveDrawing}>Save</button>
// //       </div>
// //       </div>
// //     </div>
// //     </div>
// //   );
// // }

// // export default DrawingCanvas;

// //working one

// // import React, { useRef, useState, useEffect } from "react";
// // import axios from "axios";
// // import { SketchPicker } from "react-color";
// // import "./DrawingCanvas.css";

// // function DrawingCanvas() {
// //   const canvasRef = useRef(null);
// //   const ctxRef = useRef(null);
// //   const [isDrawing, setIsDrawing] = useState(false);
// //   const [color, setColor] = useState("#000000");
// //   const [lineWidth, setLineWidth] = useState(5);
// //   const [isEraser, setIsEraser] = useState(false); // ✅ Track if eraser is active
// //   const [startTime, setStartTime] = useState(Date.now());

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     canvas.width = window.innerWidth * 0.8;
// //     canvas.height = window.innerHeight * 0.6;
// //     const ctx = canvas.getContext("2d");
// //     ctx.lineCap = "round";
// //     ctx.strokeStyle = color;
// //     ctx.lineWidth = lineWidth;
// //     ctxRef.current = ctx;
// //   }, [color, lineWidth]);

// //   const startDrawing = (e) => {
// //     const { offsetX, offsetY } = e.nativeEvent;
// //     ctxRef.current.beginPath();
// //     ctxRef.current.moveTo(offsetX, offsetY);
// //     ctxRef.current.strokeStyle = isEraser ? "#FFFFFF" : color; // ✅ Apply eraser color or brush color
// //     ctxRef.current.lineWidth = lineWidth;
// //     setIsDrawing(true);
// //   };

// //   const draw = (e) => {
// //     if (!isDrawing) return;
// //     const { offsetX, offsetY } = e.nativeEvent;
// //     ctxRef.current.lineTo(offsetX, offsetY);
// //     ctxRef.current.stroke();
// //   };

// //   const stopDrawing = () => {
// //     ctxRef.current.closePath();
// //     setIsDrawing(false);
// //   };

// //   const clearCanvas = () => {
// //     const canvas = canvasRef.current;
// //     const ctx = ctxRef.current;
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //   };

// //   const saveDrawing = async () => {
// //     const canvas = canvasRef.current;
// //     const dataURL = canvas.toDataURL(); // Convert to Base64
// //     const title = prompt("Enter a title for your drawing:");

// //     if (!title) {
// //       alert("Title is required to save the drawing.");
// //       return;
// //     }

// //     const timeSpent = Math.floor((Date.now() - startTime) / 1000);

// //     try {
// //       await axios.post("http://localhost:3001/api/drawing", {
// //         title,
// //         data: dataURL,
// //         timeSpent,
// //       });
// //       alert("Drawing saved successfully!");
// //     } catch (error) {
// //       console.error("Error saving drawing:", error);
// //     }
// //   };

// //   // const selectEraser = () => {
// //   //   setColor("#FFFFFF"); // White color for eraser
// //   //   setLineWidth(20); // Wider stroke for erasing
// //   const toggleEraser = () => {
// //     setColor("#FFFFFF"); // White color for eraser
// //     setIsEraser(!isEraser);
// //     setLineWidth(20); // Wider stroke for erasing

// //   };

// //   return (
// //     <div className="bodyq1">
// //     <div className="App">
// //       <h1>Drawing and Painting Platform</h1>
// //       <canvas
// //         ref={canvasRef}
// //         onMouseDown={startDrawing}
// //         onMouseMove={draw}
// //         onMouseUp={stopDrawing}
// //         onMouseLeave={stopDrawing}
// //         style={{
// //           border: "1px solid black",
// //           cursor: "crosshair",
// //           background: "white",
// //           width: "1250px",
// //           height: "550px",
// //         }}
// //       ></canvas>

// //       <div className="controls">
// //         <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
// //         <div>
// //           <label>Brush Size: </label>
// //           <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
// //         </div>
// //         <button onClick={clearCanvas}>Clear</button>
// //         <button onClick={toggleEraser} style={{ backgroundColor: isEraser ? "red" : "gray" }}>
// //           {isEraser ? "Eraser On" : "Eraser Off"}
// //         </button>
// //         <button onClick={saveDrawing}>Save</button>
// //       </div>
// //     </div>
// //     </div>
// //   );
// // }

// // export default DrawingCanvas;





// // import React, { useRef, useState, useEffect } from "react";
// // import axios from "axios";
// // import { SketchPicker } from "react-color";
// // import "./DrawingCanvas.css";

// // function DrawingCanvas() {
// //   const canvasRef = useRef(null);
// //   const ctxRef = useRef(null);
// //   const [isDrawing, setIsDrawing] = useState(false);
// //   const [color, setColor] = useState("#000000");
// //   const [lineWidth, setLineWidth] = useState(5);
// //   const [isEraser, setIsEraser] = useState(false); // ✅ Track if eraser is active
// //   const [startTime, setStartTime] = useState(Date.now());
// //   const [referenceDrawing, setReferenceDrawing] = useState(null);


// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     canvas.width = window.innerWidth * 0.8;
// //     canvas.height = window.innerHeight * 0.6;
// //     const ctx = canvas.getContext("2d");
// //     ctx.lineCap = "round";
// //     ctx.strokeStyle = color;
// //     ctx.lineWidth = lineWidth;
// //     ctxRef.current = ctx;
// //   }, [color, lineWidth]);

// //   useEffect(() => {
// //     const fetchRandomDrawing = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:3001/api/drawing/random");
// //         setReferenceDrawing(response.data);
// //       } catch (error) {
// //         console.error("Error fetching reference drawing:", error);
// //       }
// //     };
  
// //     fetchRandomDrawing();
// //   }, []);
  
// //   const startDrawing = (e) => {
// //     const { offsetX, offsetY } = e.nativeEvent;
// //     ctxRef.current.beginPath();
// //     ctxRef.current.moveTo(offsetX, offsetY);
// //     ctxRef.current.strokeStyle = isEraser ? "#FFFFFF" : color; // ✅ Apply eraser color or brush color
// //     ctxRef.current.lineWidth = lineWidth;
// //     setIsDrawing(true);
// //   };

// //   const draw = (e) => {
// //     if (!isDrawing) return;
// //     const { offsetX, offsetY } = e.nativeEvent;
// //     ctxRef.current.lineTo(offsetX, offsetY);
// //     ctxRef.current.stroke();
// //   };

// //   const stopDrawing = () => {
// //     ctxRef.current.closePath();
// //     setIsDrawing(false);
// //   };

// //   const clearCanvas = () => {
// //     const canvas = canvasRef.current;
// //     const ctx = ctxRef.current;
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //   };

// //   const saveDrawing = async () => {
// //     const canvas = canvasRef.current;
// //     const dataURL = canvas.toDataURL(); // Convert to Base64
// //     const title = prompt("Enter a title for your drawing:");

// //     if (!title) {
// //       alert("Title is required to save the drawing.");
// //       return;
// //     }

// //     const timeSpent = Math.floor((Date.now() - startTime) / 1000);

// //     try {
// //       await axios.post("http://localhost:3001/api/drawing", {
// //         title,
// //         data: dataURL,
// //         timeSpent,
// //       });
// //       alert("Drawing saved successfully!");
// //     } catch (error) {
// //       console.error("Error saving drawing:", error);
// //     }
// //   };

// //   // const selectEraser = () => {
// //   //   setColor("#FFFFFF"); // White color for eraser
// //   //   setLineWidth(20); // Wider stroke for erasing
// //   const toggleEraser = () => {
// //     setColor("#FFFFFF"); // White color for eraser
// //     setIsEraser(!isEraser);
// //     setLineWidth(20); // Wider stroke for erasing

// //   };

// //   // const compareWithReference = async () => {
// //   //   if (!referenceDrawing) {
// //   //     alert("No reference drawing found.");
// //   //     return;
// //   //   }
  
// //   //   const canvas = canvasRef.current;
// //   //   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64
  
// //   //   try {
// //   //     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
// //   //       originalImage: referenceDrawing.data,
// //   //       userImage: userDrawingData,
// //   //     });
  
// //   //     alert(`Similarity Score: ${response.data.similarityScore}`);
// //   //   } catch (error) {
// //   //     console.error("Error comparing images:", error);
// //   //   }
// //   // };



// // //   const [similarityScore, setSimilarityScore] = useState(null); // ✅ Store score in state

// // // const compareWithReference = async () => {
// // //   if (!referenceDrawing) {
// // //     alert("No reference drawing found.");
// // //     return;
// // //   }

// // //   const canvas = canvasRef.current;
// // //   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64

// // //   try {
// // //     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
// // //       originalImage: referenceDrawing.data,
// // //       userImage: userDrawingData,
// // //     });

// // //     setSimilarityScore(response.data.similarityScore); // ✅ Update UI
// // //   } catch (error) {
// // //     console.error("Error comparing images:", error);
// // //   }
// // // };


// // const [similarityScore, setSimilarityScore] = useState(null); // ✅ Store score in state

// // const compareWithReference = async () => {
// //   if (!referenceDrawing) {
// //     alert("No reference drawing found.");
// //     return;
// //   }

// //   const canvas = canvasRef.current;
// //   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64

// //   try {
// //     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
// //       originalImage: referenceDrawing.data,
// //       userImage: userDrawingData,
// //     });

// //     setSimilarityScore(response.data.similarityScore); // ✅ Update UI
// //   } catch (error) {
// //     console.error("Error comparing images:", error);
// //   }
// // };

  

// //   return (
// //     // <div className="bodyq1">
// //     // <div className="App">
// //     //   <h1>Drawing and Painting Platform</h1>
// //     //   <canvas
// //     //     ref={canvasRef}
// //     //     onMouseDown={startDrawing}
// //     //     onMouseMove={draw}
// //     //     onMouseUp={stopDrawing}
// //     //     onMouseLeave={stopDrawing}
// //     //     style={{
// //     //       border: "1px solid black",
// //     //       cursor: "crosshair",
// //     //       background: "white",
// //     //       width: "1250px",
// //     //       height: "550px",
// //     //     }}
// //     //   ></canvas>

// //     //   <div className="controls">
// //     //     <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
// //     //     <div>
// //     //       <label>Brush Size: </label>
// //     //       <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
// //     //     </div>
// //     //     <button onClick={clearCanvas}>Clear</button>
// //     //     <button onClick={toggleEraser} style={{ backgroundColor: isEraser ? "red" : "gray" }}>
// //     //       {isEraser ? "Eraser On" : "Eraser Off"}
// //     //     </button>
// //     //     <button onClick={saveDrawing}>Save</button>
// //     //   </div>
// //     // </div>
// //     // </div>
// //     <div className="bodyq1">
// //   <div className="App">
// //     <h1>Drawing and Painting Platform</h1>
    
// //     <div className="canvas-container">
// //       {/* Left Side: Reference Drawing */}
// //       {referenceDrawing && (
// //         <div className="reference-container">
// //           <h3>Reference Image</h3>
// //           <img src={referenceDrawing.data} alt="Reference" className="reference-image" />
// //         </div>
// //       )}

// //       {/* Right Side: Drawing Canvas */}
// //       <div>
// //         <canvas
// //           ref={canvasRef}
// //           onMouseDown={startDrawing}
// //           onMouseMove={draw}
// //           onMouseUp={stopDrawing}
// //           onMouseLeave={stopDrawing}
// //           style={{
// //             border: "1px solid black",
// //             cursor: "crosshair",
// //             background: "white",
// //             width: "800px",
// //             height: "550px",
// //           }}
// //         ></canvas>

// //         <div className="controls">
// //           <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
// //           <div>
// //             <label>Brush Size: </label>
// //             <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
// //           </div>
// //           <button onClick={clearCanvas}>Clear</button>
// //           <button onClick={toggleEraser} style={{ backgroundColor: isEraser ? "red" : "gray" }}>
// //             {isEraser ? "Eraser On" : "Eraser Off"}
// //           </button>
// //           <button onClick={saveDrawing}>Save</button>
// //           <button onClick={compareWithReference}>Compare</button>
         

// // {/* ✅ Show Similarity Score in UI */}
// // {similarityScore !== null && (
// //   <div className="score-display">
// //     <h3>Similarity Score: {similarityScore}%</h3>
// //   </div>
// // )}


          
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // </div>

// //   );
// // }

// // export default DrawingCanvas;








// import React, { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import { SketchPicker } from "react-color";
// import "./DrawingCanvas.css";

// function DrawingCanvas() {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [color, setColor] = useState("#000000");
//   const [lineWidth, setLineWidth] = useState(5);
//   const [isEraser, setIsEraser] = useState(false); // ✅ Track if eraser is active
//   const [startTime, setStartTime] = useState(Date.now());
//   const [referenceDrawing, setReferenceDrawing] = useState(null);


//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth * 0.8;
//     canvas.height = window.innerHeight * 0.6;
//     const ctx = canvas.getContext("2d");
//     ctx.lineCap = "round";
//     ctx.strokeStyle = color;
//     ctx.lineWidth = lineWidth;
//     ctxRef.current = ctx;
//   }, [color, lineWidth]);

//   useEffect(() => {
//     const fetchRandomDrawing = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/drawing/random");
//         setReferenceDrawing(response.data);
//       } catch (error) {
//         console.error("Error fetching reference drawing:", error);
//       }
//     };
  
//     fetchRandomDrawing();
//   }, []);
  
//   const startDrawing = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;
//     ctxRef.current.beginPath();
//     ctxRef.current.moveTo(offsetX, offsetY);
//     ctxRef.current.strokeStyle = isEraser ? "#FFFFFF" : color; // ✅ Apply eraser color or brush color
//     ctxRef.current.lineWidth = lineWidth;
//     setIsDrawing(true);
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = e.nativeEvent;
//     ctxRef.current.lineTo(offsetX, offsetY);
//     ctxRef.current.stroke();
//   };

//   const stopDrawing = () => {
//     ctxRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = ctxRef.current;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const saveDrawing = async () => {
//     const canvas = canvasRef.current;
//     const dataURL = canvas.toDataURL(); // Convert to Base64
//     const title = prompt("Enter a title for your drawing:");

//     if (!title) {
//       alert("Title is required to save the drawing.");
//       return;
//     }

//     const timeSpent = Math.floor((Date.now() - startTime) / 1000);

//     try {
//       await axios.post("http://localhost:3001/api/drawing", {
//         title,
//         data: dataURL,
//         timeSpent,
//       });
//       alert("Drawing saved successfully!");
//     } catch (error) {
//       console.error("Error saving drawing:", error);
//     }
//   };

//   // const selectEraser = () => {
//   //   setColor("#FFFFFF"); // White color for eraser
//   //   setLineWidth(20); // Wider stroke for erasing
//   const toggleEraser = () => {
//     setColor("#FFFFFF"); // White color for eraser
//     setIsEraser(!isEraser);
//     setLineWidth(20); // Wider stroke for erasing

//   };

//   // const compareWithReference = async () => {
//   //   if (!referenceDrawing) {
//   //     alert("No reference drawing found.");
//   //     return;
//   //   }
  
//   //   const canvas = canvasRef.current;
//   //   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64
  
//   //   try {
//   //     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
//   //       originalImage: referenceDrawing.data,
//   //       userImage: userDrawingData,
//   //     });
  
//   //     alert(`Similarity Score: ${response.data.similarityScore}`);
//   //   } catch (error) {
//   //     console.error("Error comparing images:", error);
//   //   }
//   // };



// //   const [similarityScore, setSimilarityScore] = useState(null); // ✅ Store score in state

// // const compareWithReference = async () => {
// //   if (!referenceDrawing) {
// //     alert("No reference drawing found.");
// //     return;
// //   }

// //   const canvas = canvasRef.current;
// //   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64

// //   try {
// //     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
// //       originalImage: referenceDrawing.data,
// //       userImage: userDrawingData,
// //     });

// //     setSimilarityScore(response.data.similarityScore); // ✅ Update UI
// //   } catch (error) {
// //     console.error("Error comparing images:", error);
// //   }
// // };


// // const [similarityScore, setSimilarityScore] = useState(null); // ✅ Store score in state

// // const compareWithReference = async () => {
// //   if (!referenceDrawing) {
// //     alert("No reference drawing found.");
// //     return;
// //   }

// //   const canvas = canvasRef.current;
// //   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64

// //   try {
// //     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
// //       originalImage: referenceDrawing.data,
// //       userImage: userDrawingData,
// //     });

// //     setSimilarityScore(response.data.similarityScore); // ✅ Update UI
// //   } catch (error) {
// //     console.error("Error comparing images:", error);
// //   }
// // };

// const [similarityScore, setSimilarityScore] = useState(null); // ✅ Store score in state

// const compareWithReference = async () => {
//   if (!referenceDrawing) {
//     alert("No reference drawing found.");
//     return;
//   }

//   const canvas = canvasRef.current;
//   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64

//   try {
//     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
//       originalImage: referenceDrawing.data,
//       userImage: userDrawingData,
//     });

//     if (response.data.similarityScore !== undefined) {
//       setSimilarityScore(response.data.similarityScore); // ✅ Update UI
//     } else {
//       alert("Error getting similarity score.");
//     }
//   } catch (error) {
//     console.error("Error comparing images:", error);
//   }
// };


  

//   return (
//     // <div className="bodyq1">
//     // <div className="App">
//     //   <h1>Drawing and Painting Platform</h1>
//     //   <canvas
//     //     ref={canvasRef}
//     //     onMouseDown={startDrawing}
//     //     onMouseMove={draw}
//     //     onMouseUp={stopDrawing}
//     //     onMouseLeave={stopDrawing}
//     //     style={{
//     //       border: "1px solid black",
//     //       cursor: "crosshair",
//     //       background: "white",
//     //       width: "1250px",
//     //       height: "550px",
//     //     }}
//     //   ></canvas>

//     //   <div className="controls">
//     //     <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
//     //     <div>
//     //       <label>Brush Size: </label>
//     //       <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
//     //     </div>
//     //     <button onClick={clearCanvas}>Clear</button>
//     //     <button onClick={toggleEraser} style={{ backgroundColor: isEraser ? "red" : "gray" }}>
//     //       {isEraser ? "Eraser On" : "Eraser Off"}
//     //     </button>
//     //     <button onClick={saveDrawing}>Save</button>
//     //   </div>
//     // </div>
//     // </div>
//     <div className="bodyq1">
//   <div className="App">
//     <h1>Drawing and Painting Platform</h1>
    
//     <div className="canvas-container">
//       {/* Left Side: Reference Drawing */}
//       {referenceDrawing && (
//         <div className="reference-container">
//           <h3>Reference Image</h3>
//           <img src={referenceDrawing.data} alt="Reference" className="reference-image" />
//         </div>
//       )}

//       {/* Right Side: Drawing Canvas */}
//       <div>
//         <canvas
//           ref={canvasRef}
//           onMouseDown={startDrawing}
//           onMouseMove={draw}
//           onMouseUp={stopDrawing}
//           onMouseLeave={stopDrawing}
//           style={{
//             border: "1px solid black",
//             cursor: "crosshair",
//             background: "white",
//             width: "800px",
//             height: "550px",
//           }}
//         ></canvas>

//         <div className="controls">
//           <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
//           <div>
//             <label>Brush Size: </label>
//             <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
//           </div>
//           <button onClick={clearCanvas}>Clear</button>
//           <button onClick={toggleEraser} style={{ backgroundColor: isEraser ? "red" : "gray" }}>
//             {isEraser ? "Eraser On" : "Eraser Off"}
//           </button>
//           <button onClick={saveDrawing}>Save</button>
//           <button onClick={compareWithReference}>Compare</button>

// {/* ✅ Show Similarity Score in UI */}
// {similarityScore !== null && (
//   <div className="score-display">
//     <h3>Similarity Score: {similarityScore}%</h3>
//   </div>

// )}


          
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// }

// export default DrawingCanvas;


// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { SketchPicker } from "react-color";
// import "./DrawingCanvas.css";

// function DrawingCanvas() {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [color, setColor] = useState("#000000");
//   const [lineWidth, setLineWidth] = useState(5);
//   const [isEraser, setIsEraser] = useState(false); // ✅ Track if eraser is active
//   const [startTime, setStartTime] = useState(Date.now());
//   const [referenceDrawing, setReferenceDrawing] = useState(null);
//   const [drawingStartTime, setDrawingStartTime] = useState(null);
// const [totalDrawingTime, setTotalDrawingTime] = useState(0);


//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth * 0.8;
//     canvas.height = window.innerHeight * 0.6;
//     const ctx = canvas.getContext("2d");
//     ctx.lineCap = "round";
//     ctx.strokeStyle = color;
//     ctx.lineWidth = lineWidth;
//     ctxRef.current = ctx;
//   }, [color, lineWidth]);

//   useEffect(() => {
//     const fetchRandomDrawing = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/drawing/random");
//         setReferenceDrawing(response.data);
//       } catch (error) {
//         console.error("Error fetching reference drawing:", error);
//       }
//     };
  
//     fetchRandomDrawing();
//   }, []);
  
//   // const startDrawing = (e) => {
//   //   const { offsetX, offsetY } = e.nativeEvent;
//   //   ctxRef.current.beginPath();
//   //   ctxRef.current.moveTo(offsetX, offsetY);
//   //   ctxRef.current.strokeStyle = isEraser ? "#FFFFFF" : color; // ✅ Apply eraser color or brush color
//   //   ctxRef.current.lineWidth = lineWidth;
//   //   setIsDrawing(true);
//   // };

//   const startDrawing = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;
//     ctxRef.current.beginPath();
//     ctxRef.current.moveTo(offsetX, offsetY);
//     ctxRef.current.strokeStyle = isEraser ? "#FFFFFF" : color;
//     ctxRef.current.lineWidth = lineWidth;
//     setIsDrawing(true);
//     if (!drawingStartTime) {
//         setDrawingStartTime(Date.now());
//       }
//   };
  

//   // const draw = (e) => {
//   //   if (!isDrawing) return;
//   //   const { offsetX, offsetY } = e.nativeEvent;
//   //   ctxRef.current.lineTo(offsetX, offsetY);
//   //   ctxRef.current.stroke();
//   // };

//   // const stopDrawing = () => {
//   //   ctxRef.current.closePath();
//   //   setIsDrawing(false);
//   // };

//   const draw = (e) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = e.nativeEvent;
//     ctxRef.current.lineTo(offsetX, offsetY);
//     ctxRef.current.stroke();
//   };
  
//   const stopDrawing = () => {
//     ctxRef.current.closePath();
//     setIsDrawing(false);
//     if (drawingStartTime) {
//       const timeSpent = (Date.now() - drawingStartTime) / 1000;
//       setTotalDrawingTime(prevTime => prevTime + timeSpent);
//       setDrawingStartTime(null);
//         }
//   };

//   // const clearCanvas = () => {
//   //   const canvas = canvasRef.current;
//   //   const ctx = ctxRef.current;
//   //   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = ctxRef.current;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };


//   const saveDrawing = async () => {
//     const canvas = canvasRef.current;
//     const dataURL = canvas.toDataURL(); // Convert to Base64
//     const title = prompt("Enter a title for your drawing:");

//     if (!title) {
//       alert("Title is required to save the drawing.");
//       return;
//     }

//     const timeSpent = Math.floor((Date.now() - startTime) / 1000);

//     try {
//       await axios.post("http://localhost:3001/api/drawing", {
//         title,
//         data: dataURL,
//         timeSpent,
//       });
//       alert("Drawing saved successfully!");
//     } catch (error) {
//       console.error("Error saving drawing:", error);
//     }
//   };

//   // const selectEraser = () => {
//   //   setColor("#FFFFFF"); // White color for eraser
//   //   setLineWidth(20); // Wider stroke for erasing
//   const toggleEraser = () => {
//     setColor("#FFFFFF"); // White color for eraser
//     setIsEraser(!isEraser);
//     setLineWidth(20); // Wider stroke for erasing

//   };

//   // const compareWithReference = async () => {
//   //   if (!referenceDrawing) {
//   //     alert("No reference drawing found.");
//   //     return;
//   //   }
  
//   //   const canvas = canvasRef.current;
//   //   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64
  
//   //   try {
//   //     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
//   //       originalImage: referenceDrawing.data,
//   //       userImage: userDrawingData,
//   //     });
  
//   //     alert(`Similarity Score: ${response.data.similarityScore}`);
//   //   } catch (error) {
//   //     console.error("Error comparing images:", error);
//   //   }
//   // };



// //   const [similarityScore, setSimilarityScore] = useState(null); // ✅ Store score in state

// // const compareWithReference = async () => {
// //   if (!referenceDrawing) {
// //     alert("No reference drawing found.");
// //     return;
// //   }

// //   const canvas = canvasRef.current;
// //   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64

// //   try {
// //     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
// //       originalImage: referenceDrawing.data,
// //       userImage: userDrawingData,
// //     });

// //     setSimilarityScore(response.data.similarityScore); // ✅ Update UI
// //   } catch (error) {
// //     console.error("Error comparing images:", error);
// //   }
// // };


// // const [similarityScore, setSimilarityScore] = useState(null); // ✅ Store score in state

// // const compareWithReference = async () => {
// //   if (!referenceDrawing) {
// //     alert("No reference drawing found.");
// //     return;
// //   }

// //   const canvas = canvasRef.current;
// //   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64

// //   try {
// //     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
// //       originalImage: referenceDrawing.data,
// //       userImage: userDrawingData,
// //     });

// //     setSimilarityScore(response.data.similarityScore); // ✅ Update UI
// //   } catch (error) {
// //     console.error("Error comparing images:", error);
// //   }
// // };

// const [similarityScore, setSimilarityScore] = useState(null); // ✅ Store score in state

// const compareWithReference = async () => {
//   if (!referenceDrawing) {
//     alert("No reference drawing found.");
//     return;
//   }

//   const canvas = canvasRef.current;
//   const userDrawingData = canvas.toDataURL(); // Convert user's drawing to Base64

//   try {
//     const response = await axios.post("http://localhost:3001/api/drawing/compare", {
//       originalImage: referenceDrawing.data,
//       userImage: userDrawingData,
//     });

//     if (response.data.similarityScore !== undefined) {
//       setSimilarityScore(response.data.similarityScore); // ✅ Update UI
//     } else {
//       alert("Error getting similarity score.");
//     }
//   } catch (error) {
//     console.error("Error comparing images:", error);
//   }
// };


  

//   return (
//     // <div className="bodyq1">
//     // <div className="App">
//     //   <h1>Drawing and Painting Platform</h1>
//     //   <canvas
//     //     ref={canvasRef}
//     //     onMouseDown={startDrawing}
//     //     onMouseMove={draw}
//     //     onMouseUp={stopDrawing}
//     //     onMouseLeave={stopDrawing}
//     //     style={{
//     //       border: "1px solid black",
//     //       cursor: "crosshair",
//     //       background: "white",
//     //       width: "1250px",
//     //       height: "550px",
//     //     }}
//     //   ></canvas>

//     //   <div className="controls">
//     //     <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
//     //     <div>
//     //       <label>Brush Size: </label>
//     //       <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
//     //     </div>
//     //     <button onClick={clearCanvas}>Clear</button>
//     //     <button onClick={toggleEraser} style={{ backgroundColor: isEraser ? "red" : "gray" }}>
//     //       {isEraser ? "Eraser On" : "Eraser Off"}
//     //     </button>
//     //     <button onClick={saveDrawing}>Save</button>
//     //   </div>
//     // </div>
//     // </div>
//     <div className="bodyq1">
//   <div className="App">
//     <h1>Drawing and Painting Platform</h1>
    
//     <div className="canvas-container">
//       {/* Left Side: Reference Drawing */}
//       {referenceDrawing && (
//         <div className="reference-container">
//           <h3>Reference Image</h3>
//           <img src={referenceDrawing.data} alt="Reference" className="reference-image" />
//         </div>
//       )}

//       {/* Right Side: Drawing Canvas */}
//       <div>
//         <canvas
//           ref={canvasRef}
//           onMouseDown={startDrawing}
//           onMouseMove={draw}
//           onMouseUp={stopDrawing}
//           onMouseLeave={stopDrawing}
//           style={{
//             border: "1px solid black",
//             cursor: "crosshair",
//             background: "white",
//             width: "800px",
//             height: "550px",
//           }}
//         ></canvas>

//         <div className="controls">
//           <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
//           <div>
//             <label>Brush Size: </label>
//             <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
//           </div>
//           <button onClick={clearCanvas}>Clear</button>
//           <button onClick={toggleEraser} style={{ backgroundColor: isEraser ? "red" : "gray" }}>
//             {isEraser ? "Eraser On" : "Eraser Off"}
//           </button>
//           <button onClick={saveDrawing}>Save</button>
//           <button onClick={compareWithReference}>Compare</button>
//           {/* <div className="score-display">
//     <h3>Similarity Score: {similarityScore}%</h3>
//   </div> */}

// {/* ✅ Show Similarity Score in UI */}
// {similarityScore !== null && (
//   <div className="score-display">
//     <h3>Similarity Score: {similarityScore}%</h3>
//   </div>

// )}
// <div className="time-display"> 
//   <h3>Total Drawing Time:  {totalDrawingTime.toFixed(2)}  sec</h3>
// </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// }

// export default DrawingCanvas;



import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import "./DrawingCanvas.css";

function DrawingCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [referenceDrawing, setReferenceDrawing] = useState(null);
  const [drawingStartTime, setDrawingStartTime] = useState(null);
  const [totalDrawingTime, setTotalDrawingTime] = useState(0);
  const [similarityScore, setSimilarityScore] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedTool, setSelectedTool] = useState('brush');
  const [showBrushSize, setShowBrushSize] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [color, lineWidth]);

  // Fetch reference drawing
  useEffect(() => {
    const fetchRandomDrawing = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/drawing/random");
        setReferenceDrawing(response.data);
      } catch (error) {
        console.error("Error fetching reference drawing:", error);
      }
    };
    fetchRandomDrawing();
  }, []);
  
  // const startDrawing = (e) => {
  //   const { offsetX, offsetY } = e.nativeEvent;
  //   ctxRef.current.beginPath();
  //   ctxRef.current.moveTo(offsetX, offsetY);
  //   ctxRef.current.strokeStyle = isEraser ? "#FFFFFF" : color; // ✅ Apply eraser color or brush color
  //   ctxRef.current.lineWidth = lineWidth;
  //   setIsDrawing(true);
  // };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    ctxRef.current.strokeStyle = isEraser ? "#FFFFFF" : color;
    ctxRef.current.lineWidth = lineWidth;
    setIsDrawing(true);
    if (!drawingStartTime) {
      setDrawingStartTime(Date.now());
    }
  };
  

  // const draw = (e) => {
  //   if (!isDrawing) return;
  //   const { offsetX, offsetY } = e.nativeEvent;
  //   ctxRef.current.lineTo(offsetX, offsetY);
  //   ctxRef.current.stroke();
  // };

  // const stopDrawing = () => {
  //   ctxRef.current.closePath();
  //   setIsDrawing(false);
  // };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    if (drawingStartTime) {
      const timeSpent = (Date.now() - drawingStartTime) / 1000;
      setTotalDrawingTime(prevTime => prevTime + timeSpent);
      setDrawingStartTime(null);
    }
  };

  // const clearCanvas = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = ctxRef.current;
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  // };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    const title = prompt("Give your drawing a fun name! 🎨");

    if (!title) {
      alert("Please give your drawing a name! 😊");
      return;
    }

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      await axios.post("http://localhost:3001/api/drawing", {
        title,
        data: dataURL,
        timeSpent,
      });
      alert("Yay! Your drawing is saved! 🎉");
    } catch (error) {
      console.error("Error saving drawing:", error);
    }
  };

  const compareWithReference = async () => {
    if (!referenceDrawing) {
      alert("Oops! No picture to compare with! 🖼️");
      return;
    }

    const canvas = canvasRef.current;
    const userDrawingData = canvas.toDataURL();

    try {
      const response = await axios.post("http://localhost:3001/api/drawing/compare", {
        originalImage: referenceDrawing.data,
        userImage: userDrawingData,
        totalDrawingTime: totalDrawingTime,
      });

      if (response.data.similarityScore !== undefined) {
        setSimilarityScore(response.data.similarityScore);
      } else {
        alert("Oops! Something went wrong! 😅");
      }
    } catch (error) {
      console.error("Error comparing images:", error);
    }
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
    setColor(isEraser ? "#000000" : "#FFFFFF");
    setLineWidth(isEraser ? 5 : 20);
    setSelectedTool(isEraser ? 'brush' : 'eraser');
  };

  return (
    <div className="drawing-app">
      <div className="app-header">
        <h1 className="app-title">🎨 Fun Drawing Time! 🎨</h1>
      </div>

      <div className="main-container">
        {/* Top Section with Reference and Tools */}
        <div className="top-section">
          {referenceDrawing && (
            <div className="reference-box">
              <h3>Draw this fun picture! 🖼️</h3>
              <img src={referenceDrawing.data} alt="Reference" className="reference-image" />
            </div>
          )}
          
          <div className="tools-box">
            <div className="tool-buttons">
              <button 
                className={`tool-button ${selectedTool === 'brush' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTool('brush');
                  setIsEraser(false);
                  setColor("#000000");
                  setLineWidth(5);
                }}
              >
                🖌️ Brush
              </button>
              <button 
                className={`tool-button ${selectedTool === 'eraser' ? 'active' : ''}`}
                onClick={toggleEraser}
              >
                🧹 Eraser
              </button>
              <button 
                className="tool-button"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                🎨 Colors
              </button>
              <button 
                className="tool-button"
                onClick={() => setShowBrushSize(!showBrushSize)}
              >
                📏 Size
              </button>
            </div>

            {showColorPicker && (
              <div className="color-picker-popup">
                <SketchPicker 
                  color={color} 
                  onChange={(updatedColor) => setColor(updatedColor.hex)}
                  className="color-picker"
                />
              </div>
            )}

            {showBrushSize && (
              <div className="brush-size-popup">
                <label>Brush Size: </label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={lineWidth} 
                  onChange={(e) => setLineWidth(e.target.value)}
                  className="brush-slider"
                />
              </div>
            )}
          </div>
        </div>

        {/* Drawing Canvas */}
        <div className="canvas-section">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="drawing-canvas"
          ></canvas>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={clearCanvas} className="action-button clear">
              🗑️ Clear
            </button>
            <button onClick={saveDrawing} className="action-button save">
              💾 Save
            </button>
            <button onClick={compareWithReference} className="action-button compare">
              ⭐ Compare
            </button>
          </div>

          {/* Score and Time Display */}
          <div className="info-display">
            {similarityScore !== null && (
              <div className="score-box">
                <h3>Your Score: {similarityScore}% ⭐</h3>
              </div>
            )}
            <div className="time-box">
              <h3>Time: {totalDrawingTime.toFixed(1)}s ⏱️</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawingCanvas;