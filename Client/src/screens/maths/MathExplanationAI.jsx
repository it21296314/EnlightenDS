import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { generateMathSteps } from "./AiMathSolver";
//import TextToSpeech from "./TextToSpeech.jsx"; // Ensure this is correctly implemented
//import {textToSpeech, stopSpeech} from "./textToSpeech";

const MathExplanationAI = ({ problem, onClose}) => {
  const explanationRef = useRef(null);
  const stepRefs = useRef([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [finalResponse, setFinalResponse] = useState("");
  const isMounted = useRef(true);
  const [finalText, setFinalText] = useState("");
  const [audioBase64, setAudioBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);


  useEffect(() => {
    setSteps([]); // Reset steps before fetching new ones
  if (loading) return; // Prevent duplicate fetches
  setLoading(true);

    const fetchSteps = async () => {
      const { steps, audioBase64 } = await generateMathSteps(problem);
      setSteps(steps);
      setAudioBase64(audioBase64);
      
      // Play audio if available
      if (audioBase64) {
        playAudioFromBase64(audioBase64);
      }
    };

    fetchSteps();

    return () => {
      isMounted.current = false;
      stopAudio(); // Stop audio when component unmounts
    };
  }, [problem]);

  // Function to play the base64 audio
  // const playAudioFromBase64 = (base64String) => {
  //   stopAudio(); // Stop any previous audio
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //     audioRef.current.currentTime = 0;
  //   }
  //   const audio = new Audio(`data:audio/mp3;base64,${base64String}`);
  //   audio.play();
  //   audioRef.current = audio
  // };

  const playAudioFromBase64 = (base64String) => {
    if (!base64String) return; // Prevent playing empty audio
  
    // Stop previous audio only if it's actually playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  
    const audio = new Audio(`data:audio/mp3;base64,${base64String}`);
    audioRef.current = audio;
  
    // Handle the play promise correctly to avoid errors
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => console.warn("Audio playback error:", error));
    }
  };
  


  // Function to stop audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  
    useEffect(() => {
    if (steps.length > 0) {
      animateStep(0);
    }
  }, [steps]);

  

  const animateStep = (index) => {
    if (index >= steps.length) return; // Stop when all steps are animated
  
    gsap.fromTo(
      stepRefs.current[index],
      { opacity: 0, y: -20, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1, 
        ease: "power3.out",
        onComplete: () => {
          setCurrentStep(index); // Highlight the current step
          if (index + 1 < steps.length) {
            setTimeout(() => animateStep(index + 1), 1500); // Delay before next step
          }
        }
      }
    );
  };
  

    return (
    <div className="fullscreen-explanation">
      <div className="explanation-content">
        <h2 className="problem-heading">Let's Solve: {problem}</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <p
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              className={`step ${index === currentStep ? "highlight" : ""}`}
            >
              {step}
            </p>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


export default MathExplanationAI;
// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { generateMathSteps } from "./AiMathSolver";
// import {textToSpeech} from "./textToSpeech";

// const MathExplanationAI = ({ problem, onClose }) => {
//   const [steps, setSteps] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const stepRefs = useRef([]);

//   useEffect(() => {
//     const fetchSteps = async () => {
//       const generatedSteps = await generateMathSteps(problem);
//       setSteps(generatedSteps);
//     };
//     fetchSteps();
//   }, [problem]);

//   useEffect(() => {
//     if (steps.length > 0) {
//       animateStep(0);
//     }
//   }, [steps]);

//   const animateStep = (index) => {
//     if (index < steps.length) {
//       gsap.fromTo(
//         stepRefs.current[index],
//         { opacity: 0, y: -20, scale: 0.9 },
//         { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
//           onComplete: () => {
//             textToSpeech(steps[index]); // AI voice reads step
//             setTimeout(() => animateStep(index + 1), 2500);
//           }
//         }
//       );
//       setCurrentStep(index);
//     }
//   };

//   return (
//     <div className="fullscreen-explanation">
//       <div className="explanation-content">
//         <h2 className="problem-heading">Let's Solve: {problem}</h2>
//         <div className="steps">
//           {steps.map((step, index) => (
//             <p
//               key={index}
//               ref={(el) => (stepRefs.current[index] = el)}
//               className={`step ${index === currentStep ? "highlight" : ""}`}
//             >
//               {step}
//             </p>
//           ))}
//         </div>
//         <button className="close-button" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default MathExplanationAI;
