// // import React, { useEffect, useRef, useState } from "react";
// // import { gsap } from "gsap";
// // import { generateMathSteps } from "./AiMathSolver";
// // //import TextToSpeech from "./TextToSpeech.jsx"; // Ensure this is correctly implemented
// // //import {textToSpeech, stopSpeech} from "./textToSpeech";

// // const MathExplanationAI = ({ problem, onClose}) => {
// //   const explanationRef = useRef(null);
// //   const stepRefs = useRef([]);
// //   const [steps, setSteps] = useState([]);
// //   const [currentStep, setCurrentStep] = useState(0);
// //   const [finalResponse, setFinalResponse] = useState("");
// //   const isMounted = useRef(true);
// //   const [finalText, setFinalText] = useState("");
// //   const [audioBase64, setAudioBase64] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const audioRef = useRef(null);


// //   useEffect(() => {
// //     setSteps([]); // Reset steps before fetching new ones
// //   if (loading) return; // Prevent duplicate fetches
// //   setLoading(true);

// //     const fetchSteps = async () => {
// //       const { steps, audioBase64 } = await generateMathSteps(problem);
// //       setSteps(steps);
// //       setAudioBase64(audioBase64);
      
// //       // Play audio if available
// //       if (audioBase64) {
// //         playAudioFromBase64(audioBase64);
// //       }
// //     };

// //     fetchSteps();

// //     return () => {
// //       isMounted.current = false;
// //       stopAudio(); // Stop audio when component unmounts
// //     };
// //   }, [problem]);

// //   // Function to play the base64 audio
// //   // const playAudioFromBase64 = (base64String) => {
// //   //   stopAudio(); // Stop any previous audio
// //   //   if (audioRef.current) {
// //   //     audioRef.current.pause();
// //   //     audioRef.current.currentTime = 0;
// //   //   }
// //   //   const audio = new Audio(`data:audio/mp3;base64,${base64String}`);
// //   //   audio.play();
// //   //   audioRef.current = audio
// //   // };

// //   const playAudioFromBase64 = (base64String) => {
// //     if (!base64String) return; // Prevent playing empty audio
  
// //     // Stop previous audio only if it's actually playing
// //     if (audioRef.current) {
// //       audioRef.current.pause();
// //       audioRef.current.currentTime = 0;
// //     }
  
// //     const audio = new Audio(`data:audio/mp3;base64,${base64String}`);
// //     audioRef.current = audio;
  
// //     // Handle the play promise correctly to avoid errors
// //     const playPromise = audio.play();
// //     if (playPromise !== undefined) {
// //       playPromise.catch((error) => console.warn("Audio playback error:", error));
// //     }
// //   };
  


// //   // Function to stop audio
// //   const stopAudio = () => {
// //     if (audioRef.current) {
// //       audioRef.current.pause();
// //       audioRef.current.currentTime = 0;
// //     }
// //   };

  
// //     useEffect(() => {
// //     if (steps.length > 0) {
// //       animateStep(0);
// //     }
// //   }, [steps]);

  

// //   const animateStep = (index) => {
// //     if (index >= steps.length) return; // Stop when all steps are animated
  
// //     gsap.fromTo(
// //       stepRefs.current[index],
// //       { opacity: 0, y: -20, scale: 0.9 },
// //       { 
// //         opacity: 1, 
// //         y: 0, 
// //         scale: 1, 
// //         duration: 1, 
// //         ease: "power3.out",
// //         onComplete: () => {
// //           setCurrentStep(index); // Highlight the current step
// //           if (index + 1 < steps.length) {
// //             setTimeout(() => animateStep(index + 1), 1500); // Delay before next step
// //           }
// //         }
// //       }
// //     );
// //   };
  

// //     return (
// //     <div className="fullscreen-explanation">
// //       <div className="explanation-content">
// //         <h2 className="problem-heading">Let's Solve: {problem}</h2>
// //         <div className="steps">
// //           {steps.map((step, index) => (
// //             <p
// //               key={index}
// //               ref={(el) => (stepRefs.current[index] = el)}
// //               className={`step ${index === currentStep ? "highlight" : ""}`}
// //             >
// //               {step}
// //             </p>
// //           ))}
// //         </div>
// //         <button className="close-button" onClick={onClose}>Close</button>
// //       </div>
// //     </div>
// //   );
// // };


// // export default MathExplanationAI;
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { gsap } from "gsap";
// // // import { generateMathSteps } from "./AiMathSolver";
// // // import {textToSpeech} from "./textToSpeech";

// // // const MathExplanationAI = ({ problem, onClose }) => {
// // //   const [steps, setSteps] = useState([]);
// // //   const [currentStep, setCurrentStep] = useState(0);
// // //   const stepRefs = useRef([]);

// // //   useEffect(() => {
// // //     const fetchSteps = async () => {
// // //       const generatedSteps = await generateMathSteps(problem);
// // //       setSteps(generatedSteps);
// // //     };
// // //     fetchSteps();
// // //   }, [problem]);

// // //   useEffect(() => {
// // //     if (steps.length > 0) {
// // //       animateStep(0);
// // //     }
// // //   }, [steps]);

// // //   const animateStep = (index) => {
// // //     if (index < steps.length) {
// // //       gsap.fromTo(
// // //         stepRefs.current[index],
// // //         { opacity: 0, y: -20, scale: 0.9 },
// // //         { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
// // //           onComplete: () => {
// // //             textToSpeech(steps[index]); // AI voice reads step
// // //             setTimeout(() => animateStep(index + 1), 2500);
// // //           }
// // //         }
// // //       );
// // //       setCurrentStep(index);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fullscreen-explanation">
// // //       <div className="explanation-content">
// // //         <h2 className="problem-heading">Let's Solve: {problem}</h2>
// // //         <div className="steps">
// // //           {steps.map((step, index) => (
// // //             <p
// // //               key={index}
// // //               ref={(el) => (stepRefs.current[index] = el)}
// // //               className={`step ${index === currentStep ? "highlight" : ""}`}
// // //             >
// // //               {step}
// // //             </p>
// // //           ))}
// // //         </div>
// // //         <button className="close-button" onClick={onClose}>Close</button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MathExplanationAI;


// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { generateMathSteps } from "./AiMathSolver";

// const MathExplanationAI = ({ problem, onClose}) => {
//   const explanationRef = useRef(null);
//   const stepRefs = useRef([]);
//   const [steps, setSteps] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [finalResponse, setFinalResponse] = useState("");
//   const isMounted = useRef(true);
//   const [finalText, setFinalText] = useState("");
//   const [audioBase64, setAudioBase64] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const audioRef = useRef(null);


//   useEffect(() => {
//     setSteps([]); // Reset steps before fetching new ones
//   if (loading) return; // Prevent duplicate fetches
//   setLoading(true);

//     const fetchSteps = async () => {
//       const { steps, audioBase64 } = await generateMathSteps(problem);
//       setSteps(steps);
//       setAudioBase64(audioBase64);
      
//       // Play audio if available
//       if (audioBase64) {
//         playAudioFromBase64(audioBase64);
//       }
//     };

//     fetchSteps();

//     return () => {
//       isMounted.current = false;
//       stopAudio(); // Stop audio when component unmounts
//     };
//   }, [problem]);

//   const playAudioFromBase64 = (base64String) => {
//     if (!base64String) return; // Prevent playing empty audio
  
//     // Stop previous audio only if it's actually playing
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
  
//     const audio = new Audio(`data:audio/mp3;base64,${base64String}`);
//     audioRef.current = audio;
  
//     // Handle the play promise correctly to avoid errors
//     const playPromise = audio.play();
//     if (playPromise !== undefined) {
//       playPromise.catch((error) => console.warn("Audio playback error:", error));
//     }
//   };

//   // Function to stop audio
//   const stopAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//   };

  
//     useEffect(() => {
//     if (steps.length > 0) {
//       animateStep(0);
//     }
//   }, [steps]);

  

//   const animateStep = (index) => {
//     if (index >= steps.length) return; // Stop when all steps are animated
  
//     gsap.fromTo(
//       stepRefs.current[index],
//       { opacity: 0, y: -20, scale: 0.9 },
//       { 
//         opacity: 1, 
//         y: 0, 
//         scale: 1, 
//         duration: 1, 
//         ease: "power3.out",
//         onComplete: () => {
//           setCurrentStep(index); // Highlight the current step
//           if (index + 1 < steps.length) {
//             setTimeout(() => animateStep(index + 1), 1500); // Delay before next step
//           }
//         }
//       }
//     );
//   };
  

//     return (
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

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { generateMathSteps } from "./AiMathSolver";
import ex from './img/ex.jpg';
import cheer from './img/cheer1.gif'
const MathExplanationAI = ({ problem, onClose }) => {
  const explanationRef = useRef(null);
  const stepRefs = useRef([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [audioBase64, setAudioBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setSteps([]); // Reset steps before fetching new ones
    if (loading) return; // Prevent duplicate fetches
    setLoading(true);

    const fetchSteps = async () => {
      try {
        const { steps, audioBase64 } = await generateMathSteps(problem);
        
        // Make steps more child-friendly
        const childFriendlySteps = steps.map(step => makeChildFriendly(step));
        
        setSteps(childFriendlySteps);
        setAudioBase64(audioBase64);
        setLoading(false);
        
        // Play audio if available
        if (audioBase64) {
          playAudioFromBase64(audioBase64);
        }
      } catch (error) {
        console.log("Error fetching steps:", error);
        setLoading(false);
      }
    };

    fetchSteps();

    return () => {
      stopAudio(); // Stop audio when component unmounts
    };
  }, [problem]);

  // Function to make text more child-friendly
  const makeChildFriendly = (text) => {
    // Replace complex terms with simpler ones
    let friendly = text
      .replace(/calculate/gi, "find")
      .replace(/therefore/gi, "so")
      .replace(/consequently/gi, "which means")
      .replace(/subsequently/gi, "next")
      .replace(/we obtain/gi, "we get")
      .replace(/approximate/gi, "about")
      .replace(/imagine/gi, "think")
      .replace(/proceed to/gi, "let's");
    
    // Add encouraging phrases to some steps
    const encouragements = [
      "Great job! ",
      "You're doing awesome! ",
      "Keep going! ",
      "You've got this! ",
      "Super work! "
    ];
    
    // Add encouragement to approximately 1/3 of steps
    if (Math.random() < 0.3) {
      const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
      friendly = randomEncouragement + friendly;
    }
    
    return friendly;
  };

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
    if (index >= steps.length) {
      // Show confetti when all steps are complete
      setShowConfetti(true);
      return;
    }
  
    gsap.fromTo(
      stepRefs.current[index],
      { opacity: 0, y: -20, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1, 
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          setCurrentStep(index); // Highlight the current step
          if (index + 1 < steps.length) {
            setTimeout(() => animateStep(index + 1), 2000); // Longer delay for kids to read
          }
        }
      }
    );
  };

  // Simple confetti effect
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    const confettiPieces = [];
    for (let i = 0; i < 50; i++) {
      const left = `${Math.random() * 100}%`;
      const animationDelay = `${Math.random() * 3}s`;
      const size = `${Math.random() * 10 + 5}px`;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      
      confettiPieces.push(
        <div 
          key={i}
          className="confetti-piece"
          style={{
            left,
            animationDelay,
            width: size,
            height: size,
            backgroundColor: color,
            position: 'absolute',
            top: '-10px',
            zIndex: 10,
            animation: 'fall 3s linear forwards'
          }}
        />
      );
    }
    
    return <div className="confetti-container">{confettiPieces}</div>;
  };

  return (
    <div 
      className="fullscreen-explanation" 
      style={{
        backgroundImage: `url(${ex})`,
        backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '20px',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.37)',
        fontFamily: 'Comic Sans MS, cursive, sans-serif'
      }}
    >
       
      {renderConfetti()}
      <div className="explanation-content" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '30px' }}>
        <h2 
          className="problem-heading" 
          style={{ 
            color: '#4a4a4a',
            textAlign: 'center',
            fontSize: '1.8rem',
            marginBottom: '20px',
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '10px',
            borderRadius: '12px'
          }}
        >
          Let's solve this together: {problem}
        </h2>
        <div 
      style={{
        backgroundImage: `url(${cheer})`,
        backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  
      }}
    ></div>
        {loading ? (
          <div className="loading-container" style={{ textAlign: 'center', margin: '40px 0' }}>
            <div className="loading-animation" style={{ 
              width: '50px', 
              height: '50px', 
              border: '5px solid #f3f3f3',
              borderTop: '5px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>Getting our math brain ready...</p>
          </div>
        ) : (
          <div className="steps" style={{ marginBottom: '20px' }}>
            {steps.map((step, index) => (
              <p
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                style={{
                  opacity: 0,
                  backgroundColor: index === currentStep ? 'rgba(255, 255, 220, 0.9)' : 'rgba(255, 255, 255, 0.7)',
                  padding: '15px',
                  borderRadius: '12px',
                  marginBottom: '15px',
                  fontSize: '1.2rem',
                  color:'black',
                  lineHeight: '1.5',
                  boxShadow: index === currentStep ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                  transition: 'all 0.3s ease',
                  border: index === currentStep ? '2px solid #FFD700' : 'none'
                }}
              >
                <span style={{ fontWeight: index === currentStep ? 'bold' : 'normal' }}>
                  {step}
                </span>
              </p>
            ))}
          </div>
        )}
        
        {showConfetti && (
          <div 
            className="celebration-message" 
            style={{
              textAlign: 'center',
              fontSize: '1.5rem',
              color: '#4a4a4a',
              marginBottom: '20px',
              animation: 'bounce 1s infinite',
              fontWeight: 'bold'
            }}
          >
            Woohoo! You solved it! 🎉
          </div>
        )}
        
        <button 
          className="close-button" 
          onClick={onClose} 
          style={{
            background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '25px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'block',
            margin: '0 auto',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Done Learning!
        </button>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes fall {
            0% { transform: translateY(-10px) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default MathExplanationAI;