// // // src/components/TouchPiano.js
// // import React, { useState } from "react";
// // import axios from "axios";
// // import "./TouchPiano.css"; // Create a CSS file for styling the piano keys

// // const TouchPiano = () => {
// //   const [playedNotes, setPlayedNotes] = useState([]);

// //   // List of notes with frequencies or MIDI equivalents
// //   const notes = ["C", "D", "E", "F", "G", "A", "B"];

// //   const playNote = (note) => {
// //     const audio = new Audio(`/sounds/${note}.mp3`); // Add sound files in the public folder
// //     audio.play();
// //     setPlayedNotes((prev) => [...prev, note]);
// //   };

// //   const saveTune = async () => {
// //     try {
// //       const response = await axios.post("http://localhost:3001/save-tune ", {
// //         tuneName: "My Touch Tune",
// //         notes: playedNotes,
// //       });
// //       console.log(response.data.message);
// //     } catch (error) {
// //       console.error("Error saving tune:", error);
// //     }
// //   };

// //   return (
// //     <div className="piano-container">
// //       <h1>Touch Piano 🎹</h1>
// //       <div className="piano">
// //         {notes.map((note) => (
// //           <div
// //             key={note}
// //             className="key"
// //             onTouchStart={() => playNote(note)}
// //             onMouseDown={() => playNote(note)}
// //           >
// //             {note}
// //           </div>
// //         ))}
// //       </div>
// //       <button onClick={saveTune}>Save Tune</button>
// //     </div>
// //   );
// // };

// // export default TouchPiano;

// // src/components/TouchPiano.js



// // import React from "react";
// // import * as Tone from "tone";
// // import "./TouchPiano.css"; // Style the piano keys

// // const notes = [
// //   { note: "C", octave: 4 },
// //   { note: "C#", octave: 4 },
// //   { note: "D", octave: 4 },
// //   { note: "D#", octave: 4 },
// //   { note: "E", octave: 4 },
// //   { note: "F", octave: 4 },
// //   { note: "F#", octave: 4 },
// //   { note: "G", octave: 4 },
// //   { note: "G#", octave: 4 },
// //   { note: "A", octave: 4 },
// //   { note: "A#", octave: 4 },
// //   { note: "B", octave: 4 },
// //   { note: "C", octave: 5 },
  
// // ];

// // const TouchPiano = () => {
// //   const synth = new Tone.Synth().toDestination();

// //   const playNote = (note) => {
// //     synth.triggerAttackRelease(note, "8n");
// //   };

// //   return (
// // <div className="piano-container">
// // <h1 className="topic">Touch Piano 🎹</h1>
// //      <div className="piano">
// //        {notes.map((key, index) => (
// //         <div
// //           key={index}
// //           className={`key ${key.note.includes("#") ? "black" : "white"}`}
// //           onTouchStart={() => playNote(`${key.note}${key.octave}`)}
// //           onMouseDown={() => playNote(`${key.note}${key.octave}`)}
// //         >
// //           {key.note.includes("#") ? "" : key.note}
// //         </div>
// //       ))}
// //     </div>
// //     </div>
// //   );
// // };

// // export default TouchPiano;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import * as Tone from "tone";
// import "./TouchPiano.css"; // Ensure styles are applied

// const notes = [
//   { note: "C", octave: 4 },
//   { note: "C#", octave: 4 },
//   { note: "D", octave: 4 },
//   { note: "D#", octave: 4 },
//   { note: "E", octave: 4 },
//   { note: "F", octave: 4 },
//   { note: "F#", octave: 4 },
//   { note: "G", octave: 4 },
//   { note: "G#", octave: 4 },
//   { note: "A", octave: 4 },
//   { note: "A#", octave: 4 },
//   { note: "B", octave: 4 },
//   { note: "C", octave: 5 },
// ];


// const TouchPiano = ({ userId }) => {
//   const synth = new Tone.Synth().toDestination();
//   const [keyPressCount, setKeyPressCount] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);

//   const playNote = (note) => {
//     if (!startTime) setStartTime(Date.now()); // Start time on first key press
//     synth.triggerAttackRelease(note, "8n");
//     setKeyPressCount((prev) => prev + 1);
//   };

//   const stopPlaying = async () => {
//     if (!startTime) return; // If no key was pressed, don't save

//     const stopTime = Date.now();
//     setEndTime(stopTime);

//     const duration = stopTime - startTime; // Calculate duration in ms

//     // Send interaction data to backend
//     await axios.post("http://localhost:3001/api/piano/save-interaction", {
//       userId,
//       keyPressCount,
//       startTime,
//       endTime: stopTime,
//       duration,
//     });

//     alert(`Session Saved! Duration: ${duration / 1000}s, Key Presses: ${keyPressCount}`);

//     // Reset states
//     setStartTime(null);
//     setEndTime(null);
//     setKeyPressCount(0);
//   };

//   // Automatically save when user stops playing
//   useEffect(() => {
//     if (keyPressCount > 0) {
//       const timeout = setTimeout(stopPlaying, 5000); // Auto-save if no key pressed for 5s
//       return () => clearTimeout(timeout);
//     }
//   }, [keyPressCount]);

//   return (
//     <div className="piano-container">
//       <h1 className="topic">Touch Piano 🎹</h1>
//       <div className="piano">
//         {notes.map((key, index) => (
//           <div
//             key={index}
//             className={`key ${key.note.includes("#") ? "black" : "white"}`}
//             onTouchStart={() => playNote(`${key.note}${key.octave}`)}
//             onMouseDown={() => playNote(`${key.note}${key.octave}`)}
//           >
//             {key.note.includes("#") ? "" : key.note}
//           </div>
//         ))}
//       </div>
//       <p>Key Press Count: {keyPressCount}</p>
//       <button onClick={stopPlaying}>Save Attempt</button>
//     </div>
//   );
// };

// export default TouchPiano;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import * as Tone from "tone";
// import "./TouchPiano.css"; // Ensure styles are applied

// const notes = [
//   { note: "C", octave: 4 },
//   { note: "C#", octave: 4 },
//   { note: "D", octave: 4 },
//   { note: "D#", octave: 4 },
//   { note: "E", octave: 4 },
//   { note: "F", octave: 4 },
//   { note: "F#", octave: 4 },
//   { note: "G", octave: 4 },
//   { note: "G#", octave: 4 },
//   { note: "A", octave: 4 },
//   { note: "A#", octave: 4 },
//   { note: "B", octave: 4 },
//   { note: "C", octave: 5 },
// ];

// const TouchPiano = () => {
//   const synth = new Tone.Synth().toDestination();
//   const [keyPressCount, setKeyPressCount] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [totalInteractionTime, setTotalInteractionTime] = useState(0);
//   const userId = localStorage.getItem("userId");
//   // useEffect(() => {
//   //   const startSession = Date.now();
//   //   setStartTime(startSession);

//   //   return () => {
//   //     const endSession = Date.now();
//   //     setEndTime(endSession);
//   //     setTotalInteractionTime(endSession - startSession);
//   //   };
//   // }, []);

//   useEffect(() => {
//     let interval;
//     if (startTime) {
//       interval = setInterval(() => {
//         setTotalInteractionTime(Date.now() - startTime);
//       }, 100); // update every 100ms
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [startTime]);

//   const playNote = (note) => {
//     if (!startTime) setStartTime(Date.now());
//     synth.triggerAttackRelease(note, "8n");
//     setKeyPressCount((prev) => prev + 1);
//   };

//   const stopPlaying = async () => {
//     if (!startTime || keyPressCount === 0) return;

//     const stopTime = Date.now();
//     setEndTime(stopTime);

//     const duration = stopTime - startTime;

//     console.log("Sending Data:", {
//       userId,
//       keyPressCount,
//       startTime: new Date(startTime).toISOString(),
//       endTime: new Date(stopTime).toISOString(),
//       duration,
//       totalInteractionTime: totalInteractionTime / 1000,
//     });

//     try {
//       await axios.post("http://localhost:3001/api/piano/save-interaction", {
//         userId,
//         keyPressCount,
//         startTime: new Date(startTime).toISOString(),
//         endTime: new Date(stopTime).toISOString(),
//         duration,
//         totalInteractionTime: totalInteractionTime / 1000,
//       });

//       alert(`Session Saved! Duration: ${duration / 1000}s, Key Presses: ${keyPressCount}`);
//     } catch (error) {
//       console.error("Error saving interaction:", error);
//     }

//     setStartTime(null);
//     setEndTime(null);
//     setKeyPressCount(0);
//     setTotalInteractionTime(0);
//   };

//   // Auto-save if no key pressed for 5 seconds
//   useEffect(() => {
//     if (keyPressCount > 0) {
//       const timeout = setTimeout(stopPlaying, 5000);
//       return () => clearTimeout(timeout);
//     }
//   }, [keyPressCount]);

//   return (
//     <div className="piano-container">
//       <h1 className="topic">Touch Piano 🎹</h1>
//       <div className="piano">
//         {notes.map((key, index) => (
//           <div
//             key={index}
//             className={`key ${key.note.includes("#") ? "black" : "white"}`}
//             onTouchStart={() => playNote(`${key.note}${key.octave}`)}
//             onMouseDown={() => playNote(`${key.note}${key.octave}`)}
//           >
//             {key.note.includes("#") ? "" : key.note}
//           </div>
//         ))}
//       </div>
//       <p>Key Press Count: {keyPressCount}</p>
//       <p>Total Interaction Time: {totalInteractionTime / 1000}s</p>
//       <button onClick={stopPlaying}>Save Attempt</button>
//     </div>
//   );
// };

// export default TouchPiano;


import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import "./TouchPiano.css"; // Ensure styles are applied

const notes = [
  { note: "C", octave: 4, color: "#FF5252" },
  { note: "C#", octave: 4, color: "#000000" },
  { note: "D", octave: 4, color: "#FF9800" },
  { note: "D#", octave: 4, color: "#000000" },
  { note: "E", octave: 4, color: "#FFEB3B" },
  { note: "F", octave: 4, color: "#4CAF50" },
  { note: "F#", octave: 4, color: "#000000" },
  { note: "G", octave: 4, color: "#2196F3" },
  { note: "G#", octave: 4, color: "#000000" },
  { note: "A", octave: 4, color: "#9C27B0" },
  { note: "A#", octave: 4, color: "#000000" },
  { note: "B", octave: 4, color: "#E91E63" },
  { note: "C", octave: 5, color: "#FF5252" },
];

const encouragements = [
  "Great job! 👏",
  "Beautiful sound! 🎵",
  "Keep going! ⭐",
  "You're a musician! 🎹",
  "Fantastic! 🌈",
  "Amazing! 🎉",
  "Wonderful! 🌟",
];

const TouchPiano = () => {
  const synth = new Tone.Synth().toDestination();
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalInteractionTime, setTotalInteractionTime] = useState(0);
  const [activeKey, setActiveKey] = useState(null);
  const [feedback, setFeedback] = useState({ message: "", visible: false });
  const [showAchievement, setShowAchievement] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setTotalInteractionTime(Date.now() - startTime);
      }, 100); // update every 100ms
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime]);

  const showFeedbackMessage = () => {
    // Only show feedback every few key presses
    if (keyPressCount % 5 === 0 && keyPressCount > 0) {
      const randomIndex = Math.floor(Math.random() * encouragements.length);
      setFeedback({
        message: encouragements[randomIndex],
        visible: true,
      });
      
      // Hide the feedback after 2 seconds
      setTimeout(() => {
        setFeedback({ message: "", visible: false });
      }, 2000);
    }
    
    // Show achievement ribbon at 10 key presses
    if (keyPressCount === 10) {
      setShowAchievement(true);
      setTimeout(() => {
        setShowAchievement(false);
      }, 5000);
    }
  };

  const playNote = (note, index) => {
    if (!startTime) setStartTime(Date.now());
    synth.triggerAttackRelease(note, "8n");
    setKeyPressCount((prev) => prev + 1);
    setActiveKey(index);
    setTimeout(() => setActiveKey(null), 300); // Remove active state after 300ms
    showFeedbackMessage();
  };

  const stopPlaying = async () => {
    if (!startTime || keyPressCount === 0) return;

    const stopTime = Date.now();
    setEndTime(stopTime);

    const duration = stopTime - startTime;

    console.log("Sending Data:", {
      userId,
      keyPressCount,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(stopTime).toISOString(),
      duration,
      totalInteractionTime: totalInteractionTime / 1000,
    });

    try {
        await axios.post("http://localhost:3001/api/piano/save-interaction", {
        userId,
        keyPressCount,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(stopTime).toISOString(),
        duration,
        totalInteractionTime: totalInteractionTime / 1000,
      });

      // Show success message
      setFeedback({
        message: "Session Saved! 🎉",
        visible: true,
      });
      
      setTimeout(() => {
        setFeedback({ message: "", visible: false });
      }, 2000);
    } catch (error) {
      console.error("Error saving interaction:", error);
    }

    setStartTime(null);
    setEndTime(null);
    setKeyPressCount(0);
    setTotalInteractionTime(0);
    setShowAchievement(false);
  };

  // Auto-save if no key pressed for 5 seconds
  useEffect(() => {
    if (keyPressCount > 0) {
      const timeout = setTimeout(stopPlaying, 5000);
      return () => clearTimeout(timeout);
    }
  }, [keyPressCount]);

  // Get a fun emoji based on the number of key presses
  const getEmoji = () => {
    if (keyPressCount === 0) return "🎹";
    if (keyPressCount < 5) return "🎵";
    if (keyPressCount < 10) return "🎶";
    if (keyPressCount < 15) return "🎼";
    if (keyPressCount < 20) return "🎸";
    return "🌟";
  };

  return (
    <div className="piano-container">
      {/* Decorative Background Elements */}
      <div className="decorative-element">🎵</div>
      <div className="decorative-element">🎶</div>
      <div className="decorative-element">🎼</div>
      <div className="decorative-element">🎹</div>

      {/* Achievement Ribbon */}
      {showAchievement && <div className="achievement-ribbon"></div>}

      {/* Feedback Message */}
      {feedback.visible && (
        <div className={`feedback ${feedback.visible ? 'visible' : ''}`}
             style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          {feedback.message}
        </div>
      )}

      <h1>Touch Piano <span className="piano-graphic">{getEmoji()}</span></h1>
      
      {/* Introduction */}
      <div className="introduction">
        <p>Welcome to the musical piano! Press the keys to make beautiful sounds.</p>
        <p>How many notes can you play?</p>
      </div>
      
      {/* Instruction Cards */}
      <div className="instruction-cards">
        <div className="instruction-card">
          <span style={{fontSize: '28px'}}>👆</span>
          <p>Touch a key</p>
        </div>
        <div className="instruction-card">
          <span style={{fontSize: '28px'}}>👂</span>
          <p>Listen to the sound</p>
        </div>
        <div className="instruction-card">
          <span style={{fontSize: '28px'}}>🎵</span>
          <p>Make music!</p>
        </div>
      </div>
      
      <div className="piano">
        {notes.map((key, index) => (
          <div
            key={index}
            className={`key ${key.note.includes("#") ? "black" : "white"} ${activeKey === index ? "active" : ""}`}
            data-note={key.note.charAt(0)}
            onTouchStart={() => playNote(`${key.note}${key.octave}`, index)}
            onMouseDown={() => playNote(`${key.note}${key.octave}`, index)}
            style={key.note.includes("#") ? {} : { borderBottomColor: key.color }}
          >
            {key.note.includes("#") ? key.note : key.note}
          </div>
        ))}
      </div>
      
      <div className="stats-container">
        <p>Key Press Count: {keyPressCount}</p>
        <p>Total Interaction Time: {(totalInteractionTime / 1000).toFixed(2)}s</p>
      </div>
      
      <button className="save-button" onClick={stopPlaying}>
        Save Attempt
      </button>
    </div>
  );
};

export default TouchPiano;
