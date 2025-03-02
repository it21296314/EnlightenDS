// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const AiMathSolver = ({ problem }) => {
// //   const [explanation, setExplanation] = useState("");

// //   useEffect(() => {
// //     if (!problem) return;

// //     const fetchExplanation = async () => {
// //       try {
// //         const response = await axios.post("http://127.0.0.1:8000/solve-math", { problem });
// //         setExplanation(response.data.explanation);
// //       } catch (error) {
// //         console.error("Error fetching AI explanation:", error);
// //         setExplanation("Failed to generate explanation.");
// //       }
// //     };

// //     fetchExplanation();
// //   }, [problem]);

// //   return (
// //     <div>
// //       <h3>AI Math Solver</h3>
// //       <p><strong>Problem:</strong> {problem}</p>
// //       <p><strong>Explanation:</strong> {explanation || "Generating explanation..."}</p>
// //     </div>
// //   );
// // };

// // export default AiMathSolver;
// // import axios from "axios";

// // export const generateMathSteps = async (problem) => {
// //   try {
// //     // Check if response exists in sessionStorage
// //     const cachedResponse = sessionStorage.getItem(`mathSteps-${problem}`);
// //     if (cachedResponse) {
// //       return JSON.parse(cachedResponse);
// //     }

// //   try {
// //     const response = await axios.post("http://127.0.0.1:8000/solve-math", { problem });
// //     const explanation = response.data.explanation;

// //     // Split explanation into steps (assuming the response is a long paragraph)
// //     return explanation.split(". ").map((step) => step.trim() + ".");
// //     sessionStorage.setItem(`mathSteps-${problem}`, JSON.stringify(steps));
// //   return steps;

// // }catch (error) {
// //   console.error("Error fetching AI explanation:", error);
// //   return ["Failed to generate explanation. Please try again."];
// // }
// // };
// // import axios from "axios";

// // export const generateMathSteps = async (problem) => {
// //   try {
// //     // Check if response exists in sessionStorage
// //     const cachedResponse = sessionStorage.getItem(`mathSteps-${problem}`);
// //     if (cachedResponse) {
// //       return JSON.parse(cachedResponse);
// //     }

// //     const response = await axios.post("http://127.0.0.1:8000/solve-math-tts", { problem });
// //     const explanation = response.data.explanation;

// //     const steps = explanation.split(". ").map((step) => step.trim() + ".");

// //     // Save response to prevent different results in the same session
// //     sessionStorage.setItem(`mathSteps-${problem}`, JSON.stringify(steps));

// //     return steps;
// //   } catch (error) {
// //     console.error("Error fetching AI explanation:", error);
// //     return ["Failed to generate explanation. Please try again."];
// //   }
// // };

// // import axios from "axios";

// // export const generateMathSteps = async (problem) => {
// //   try {
// //     // Check if response exists in sessionStorage
// //     const cachedResponse = sessionStorage.getItem(`mathSteps-${problem}`);
// //     if (cachedResponse) {
// //       return JSON.parse(cachedResponse);
// //     }

// //     const response = await axios.post("http://127.0.0.1:8000/solve-math-tts", { problem });

// //     const explanation = response.data.explanation;
// //     const audioBase64 = response.data.audio; // Extract audio from backend response

// //     const steps = explanation.split(". ").map((step) => step.trim() + ".");

// //     // Save response to session storage
// //     sessionStorage.setItem(
// //       `mathSteps-${problem}`,
// //       JSON.stringify({ steps, audioBase64 }) // Store both steps and audio
// //     );

// //     return { steps, audioBase64 };
// //   } catch (error) {
// //     console.error("Error fetching AI explanation:", error);
// //     return { steps: ["Failed to generate explanation. Please try again."], audioBase64: null };
// //   }
// // };

// // import axios from "axios";

// // export const generateMathSteps = async (problem) => {
// //   try {
// //     // Check if response exists in sessionStorage
// //     const cachedResponse = sessionStorage.getItem(`mathSteps-${problem}`);
// //     console.log("Checking session storage for:", `mathSteps-${problem}`);
    
// //     if (cachedResponse) {
// //       console.log("Using cached response:", JSON.parse(cachedResponse));
// //       return JSON.parse(cachedResponse); // Return cached data
// //     }

// //     console.log("Fetching new explanation for:", problem);
// //     const response = await axios.post("http://127.0.0.1:8000/solve-math-tts", { problem });

// //     const explanation = response.data.explanation;
// //     const audioBase64 = response.data.audio; // Extract audio from backend response

// //     const steps = explanation.split(". ").map((step) => step.trim() + ".");

// //     // Save response to session storage
// //     sessionStorage.setItem(
// //       `mathSteps-${problem}`,
// //       JSON.stringify({ steps, audioBase64 })
// //     );

// //     console.log("Stored in sessionStorage:", { steps, audioBase64 });

// //     return { steps, audioBase64 };
// //   } catch (error) {
// //     console.error("Error fetching AI explanation:", error);
// //     return { steps: ["Failed to generate explanation. Please try again."], audioBase64: null };
// //   }
// // };
// import axios from "axios";

// export const generateMathSteps = async (problem) => {
//   try {
//     const storageKey = `mathSteps-${problem}`;
    
//     // Check if response exists in sessionStorage (to avoid quota issues)
//     const cachedResponse = sessionStorage.getItem(storageKey);
//     if (cachedResponse) {
//       return JSON.parse(cachedResponse);
//     }

//     console.log("Fetching new explanation for:", problem);
    
//     // Prevent duplicate requests
//     if (window.fetchingMathSteps) {
//       console.log("Duplicate request blocked:", problem);
//       return { steps: ["Loading..."], audioBase64: null };
//     }
//     window.fetchingMathSteps = true;

//     const response = await axios.post("http://127.0.0.1:8008/solve-math-tts", { problem });

//     window.fetchingMathSteps = false; // Reset fetch flag

//     const explanation = response.data.explanation;
//     const audioBase64 = response.data.audio; // Extract audio from backend response

//     const steps = explanation.split(". ").map((step) => step.trim() + ".");

//     // Try saving to sessionStorage, catch potential errors
//     try {
//       sessionStorage.setItem(storageKey, JSON.stringify({ steps, audioBase64 }));
//     } catch (error) {
//       console.warn("Storage quota exceeded, unable to cache response.");
//     }

//     return { steps, audioBase64 };
//   } catch (error) {
//     console.error("Error fetching AI explanation:", error);
//     window.fetchingMathSteps = false;
//     return { steps: ["Failed to generate explanation. Please try again."], audioBase64: null };
//   }
// };

import axios from "axios";

export const generateMathSteps = async (problem) => {
  try {
    // Check if response exists in sessionStorage
    const cachedResponse = sessionStorage.getItem(`mathSteps-${problem}`);
    console.log("Checking sessionStorage for:", `mathSteps-${problem}`);

    if (cachedResponse) {
      console.log("Using cached response:", JSON.parse(cachedResponse));
      return JSON.parse(cachedResponse); // Return cached data
    }

    console.log("Fetching new explanation for:", problem);
    
    // Prevent duplicate requests
    if (window.fetchingMathSteps) {
      console.log("Duplicate request blocked:", problem);
      return { steps: ["Loading..."], audioBase64: null };
    }
    window.fetchingMathSteps = true;

    const response = await axios.post("http://127.0.0.1:8008/solve-math-tts", { problem });

    window.fetchingMathSteps = false; // Reset fetch flag

    const explanation = response.data.explanation;
    const audioBase64 = response.data.audio; // Extract audio from backend response

    const steps = explanation.split(". ").map((step) => step.trim() + ".");

    // Save response to sessionStorage
    sessionStorage.setItem(
      `mathSteps-${problem}`,
      JSON.stringify({ steps, audioBase64 })
    );

    console.log("Stored in sessionStorage:", { steps, audioBase64 });

    return { steps, audioBase64 };
  } catch (error) {
    console.error("Error fetching AI explanation:", error);
    window.fetchingMathSteps = false; // Reset fetch flag in case of failure
    return { steps: ["Failed to generate explanation. Please try again."], audioBase64: null };
  }
};
