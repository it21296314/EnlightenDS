// // src/components/TouchPiano.js
// import React, { useState } from "react";
// import axios from "axios";
// import "./TouchPiano.css"; // Create a CSS file for styling the piano keys

// const TouchPiano = () => {
//   const [playedNotes, setPlayedNotes] = useState([]);

//   // List of notes with frequencies or MIDI equivalents
//   const notes = ["C", "D", "E", "F", "G", "A", "B"];

//   const playNote = (note) => {
//     const audio = new Audio(`/sounds/${note}.mp3`); // Add sound files in the public folder
//     audio.play();
//     setPlayedNotes((prev) => [...prev, note]);
//   };

//   const saveTune = async () => {
//     try {
//       const response = await axios.post("http://localhost:3001/save-tune ", {
//         tuneName: "My Touch Tune",
//         notes: playedNotes,
//       });
//       console.log(response.data.message);
//     } catch (error) {
//       console.error("Error saving tune:", error);
//     }
//   };

//   return (
//     <div className="piano-container">
//       <h1>Touch Piano 🎹</h1>
//       <div className="piano">
//         {notes.map((note) => (
//           <div
//             key={note}
//             className="key"
//             onTouchStart={() => playNote(note)}
//             onMouseDown={() => playNote(note)}
//           >
//             {note}
//           </div>
//         ))}
//       </div>
//       <button onClick={saveTune}>Save Tune</button>
//     </div>
//   );
// };

// export default TouchPiano;

// src/components/TouchPiano.js



// import React from "react";
// import * as Tone from "tone";
// import "./TouchPiano.css"; // Style the piano keys

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

//   const playNote = (note) => {
//     synth.triggerAttackRelease(note, "8n");
//   };

//   return (
// <div className="piano-container">
// <h1 className="topic">Touch Piano 🎹</h1>
//      <div className="piano">
//        {notes.map((key, index) => (
//         <div
//           key={index}
//           className={`key ${key.note.includes("#") ? "black" : "white"}`}
//           onTouchStart={() => playNote(`${key.note}${key.octave}`)}
//           onMouseDown={() => playNote(`${key.note}${key.octave}`)}
//         >
//           {key.note.includes("#") ? "" : key.note}
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default TouchPiano;

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Tone from "tone";
import "./TouchPiano.css"; // Ensure styles are applied

const notes = [
  { note: "C", octave: 4 },
  { note: "C#", octave: 4 },
  { note: "D", octave: 4 },
  { note: "D#", octave: 4 },
  { note: "E", octave: 4 },
  { note: "F", octave: 4 },
  { note: "F#", octave: 4 },
  { note: "G", octave: 4 },
  { note: "G#", octave: 4 },
  { note: "A", octave: 4 },
  { note: "A#", octave: 4 },
  { note: "B", octave: 4 },
  { note: "C", octave: 5 },
];


const TouchPiano = ({ userId }) => {
  const synth = new Tone.Synth().toDestination();
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const playNote = (note) => {
    if (!startTime) setStartTime(Date.now()); // Start time on first key press
    synth.triggerAttackRelease(note, "8n");
    setKeyPressCount((prev) => prev + 1);
  };

  const stopPlaying = async () => {
    if (!startTime) return; // If no key was pressed, don't save

    const stopTime = Date.now();
    setEndTime(stopTime);

    const duration = stopTime - startTime; // Calculate duration in ms

    // Send interaction data to backend
    await axios.post("http://localhost:3001/api/piano/save-interaction", {
      userId,
      keyPressCount,
      startTime,
      endTime: stopTime,
      duration,
    });

    alert(`Session Saved! Duration: ${duration / 1000}s, Key Presses: ${keyPressCount}`);

    // Reset states
    setStartTime(null);
    setEndTime(null);
    setKeyPressCount(0);
  };

  // Automatically save when user stops playing
  useEffect(() => {
    if (keyPressCount > 0) {
      const timeout = setTimeout(stopPlaying, 5000); // Auto-save if no key pressed for 5s
      return () => clearTimeout(timeout);
    }
  }, [keyPressCount]);

  return (
    <div className="piano-container">
      <h1 className="topic">Touch Piano 🎹</h1>
      <div className="piano">
        {notes.map((key, index) => (
          <div
            key={index}
            className={`key ${key.note.includes("#") ? "black" : "white"}`}
            onTouchStart={() => playNote(`${key.note}${key.octave}`)}
            onMouseDown={() => playNote(`${key.note}${key.octave}`)}
          >
            {key.note.includes("#") ? "" : key.note}
          </div>
        ))}
      </div>
      <p>Key Press Count: {keyPressCount}</p>
      <button onClick={stopPlaying}>Save Attempt</button>
    </div>
  );
};

export default TouchPiano;
