// // src/components/DrawingCanvas.js
// import axios from "axios";
// import React, { useRef, useState ,useEffect ,fetchDrawings } from "react";
// import "./DrawingCanvas.css"; // Add styles for the canvas
 

// const DrawingCanvas = () => {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);

//   const startDrawing = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;
//     ctxRef.current.beginPath();
//     ctxRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = e.nativeEvent;
//     ctxRef.current.lineTo(offsetX, offsetY);
//     ctxRef.current.stroke();
//   };

//   const finishDrawing = () => {
//     ctxRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const saveDrawing = async () => {
//     const canvas = canvasRef.current;
//     const image = canvas.toDataURL("image/png");

//     try {
//       const response = await axios.post("http://localhost:3001/save-drawing", {
//         image,
//       });
//       console.log(response.data.message);
//     } catch (error) {
//       console.error("Error saving drawing:", error);
//     }
//   };


//   React.useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = 800;
//     canvas.height = 500;

//     const ctx = canvas.getContext("2d");
//     ctx.lineCap = "round";
//     ctx.lineWidth = 5;
//     ctx.strokeStyle = "black";
//     ctxRef.current = ctx;
//   }, []);

//   return (
//     <div className="drawing-container">
//       <h1>Drawing and Painting Platform 🎨</h1>
//       <canvas
//         ref={canvasRef}
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={finishDrawing}
//         onMouseLeave={finishDrawing}
//       ></canvas>
//       <div className="controls">
//         <button onClick={clearCanvas}>Clear</button>
//         <button onClick={saveDrawing}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default DrawingCanvas;


//---------------------

// import React, { useRef, useState, useEffect } from 'react';
// import axios from 'axios';
// import './DrawingCanvas.css';

// function DrawingCanvas() {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [drawings, setDrawings] = useState([]);

//   // Fetch saved drawings on load
//   useEffect(() => {
//     const fetchDrawings = async () => {
//       try {
//         const response = await axios.get('http://localhost:8070/api/drawings');
//         setDrawings(response.data);
//       } catch (error) {
//         console.error('Error fetching drawings:', error);
//       }
//     };
//     fetchDrawings();
//   }, []);

//   // Initialize canvas
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = 800;
//     canvas.height = 400;
//     ctx.lineCap = 'round';
//     ctx.lineWidth = 5;
//     ctx.strokeStyle = 'black';
//     ctxRef.current = ctx;

//     // Start tracking time
//     setStartTime(Date.now());
//   }, []);

//   // Start Drawing
//   const startDrawing = (e) => {
//     ctxRef.current.beginPath();
//     ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//     setIsDrawing(true);
//   };

//   // Draw on Canvas
//   const draw = (e) => {
//     if (!isDrawing) return;
//     ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//     ctxRef.current.stroke();
//   };

//   // Stop Drawing
//   const stopDrawing = () => {
//     ctxRef.current.closePath();
//     setIsDrawing(false);
//   };

//   // Clear Canvas
//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   // Save Drawing
//   const saveDrawing = async () => {
//     const canvas = canvasRef.current;
//     const dataURL = canvas.toDataURL(); // Convert canvas to base64
//     const duration = Math.floor((Date.now() - startTime) / 1000); // Time in seconds

//     try {
//       const response = await axios.post('http://localhost:8070/api/drawings', {
//         data: dataURL,
//         duration,
//       });
//       setDrawings([response.data, ...drawings]);
//     } catch (error) {
//       console.error('Error saving drawing:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1 className="topic">Drawing and Painting Platform</h1>

//       {/* Drawing Canvas */}
//       <canvas
//         ref={canvasRef}
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//         style={{ border: '1px solid black', cursor: 'crosshair' }}
//       ></canvas>

//       {/* Controls */}
//       <div className="controls">
//         <button onClick={clearCanvas}>Clear</button>
//         <button onClick={saveDrawing}>Save</button>
//       </div>

//       {/* Saved Drawings */}
//       <div className="saved-drawings">
//         <h2>Saved Drawings</h2>
//         {drawings.map((drawing) => (
//           <div key={drawing._id}>
//             <img src={drawing.data} alt="Saved Drawing" style={{ width: '200px' }} />
//             <p>Time spent: {drawing.duration} seconds</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DrawingCanvas;


import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import './DrawingCanvas.css';

function DrawingCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;

    // Start time tracking
    setStartTime(Date.now());

    return () => {
      // Calculate duration on component unmount
      setDuration(Math.floor((Date.now() - startTime) / 1000));
    };
  }, [color, lineWidth, startTime]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL(); // Get image as base64 string
    const title = prompt('Enter a title for your drawing:');
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await axios.post('http://localhost:5000/api/drawings', {
        title,
        data: dataURL,
        duration: timeSpent,
      });
      alert('Drawing saved successfully!');
    } catch (error) {
      console.error('Error saving drawing:', error);
    }
  };

  const selectEraser = () => {
    setColor('#FFFFFF'); // White color for eraser
    setLineWidth(20); // Wider stroke for erasing
  };

  return (
    <div className="App">
      <h1>Drawing and Painting Platform</h1>

      {/* Drawing Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: '1px solid black', cursor: 'crosshair' }}
      ></canvas>

      {/* Controls */}
      <div className="controls">
        <SketchPicker
          color={color}
          onChange={(updatedColor) => setColor(updatedColor.hex)}
        />
        <div>
          <label>Brush Size: </label>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(e.target.value)}
          />
        </div>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={selectEraser}>Eraser</button>
        <button onClick={saveDrawing}>Save</button>
      </div>
    </div>
  );
}

export default DrawingCanvas;
