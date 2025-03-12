
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// // const QuizPage = () => {
// //   const { category, difficulty } = useParams();
// //   const [quizQuestions, setQuizQuestions] = useState([]);
// //   const [userAnswers, setUserAnswers] = useState({});
// //   const [score, setScore] = useState(null);
// //   const [showAnswers, setShowAnswers] = useState(false);

// //   useEffect(() => {
// //     const fetchQuizQuestions = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:3001/api/quizs/quiz/${category}/${difficulty}`);
// //         setQuizQuestions(response.data);
// //       } catch (error) {
// //         console.error('Error fetching quiz questions:', error);
// //       }
// //     };

// //     fetchQuizQuestions();
// //   }, [category, difficulty]);

// //   const handleInputChange = (questionIndex, value) => {
// //     setUserAnswers((prevAnswers) => ({
// //       ...prevAnswers,
// //       [questionIndex]: value,
// //     }));
// //   };

//   // const handleSubmit = () => {
//   //   // Calculate score
//   //   let correctAnswers = 0;

//   //   quizQuestions.forEach((question, index) => {
//   //     const userAnswer = parseFloat(userAnswers[index]); // Convert to number if needed
//   //     if (userAnswer === question.correctAnswer) {
//   //       correctAnswers++;
//   //     }
//   //   });

//   //   setScore((correctAnswers / quizQuestions.length) * 100); // Score as percentage
//   // };

// //   const handleShowAnswers = () => {
// //     setShowAnswers(true); // Show correct answers when the button is clicked
// //   };

// //   return (
// //     <div>
// //       <h1>Quiz - {category.charAt(0).toUpperCase() + category.slice(1)} ({difficulty})</h1>

// //       {score === null ? (
// //         <>
// //           {quizQuestions.length > 0 ? (
// //             <form>
// //               {quizQuestions.map((question, index) => (
// //                 <div key={index} style={{ marginBottom: '20px' }}>
// //                   <h3>Question {index + 1}:</h3>
// //                   <p>{question.question}</p>
// //                   <input
// //                     type="text"
// //                     value={userAnswers[index] || ''} // Pre-fill if user already answered
// //                     onChange={(e) => handleInputChange(index, e.target.value)}
// //                     placeholder="Enter your answer"
// //                   />
// //                 </div>
// //               ))}
// //               <button
// //                 type="button"
// //                 onClick={handleSubmit}
// //                 style={{
// //                   marginTop: '20px',
// //                   padding: '10px 20px',
// //                   backgroundColor: '#007BFF',
// //                   color: '#fff',
// //                   border: 'none',
// //                   cursor: 'pointer',
// //                 }}
// //               >
// //                 Submit
// //               </button>
// //             </form>
// //           ) : (
// //             <p>Loading questions...</p>
// //           )}
// //         </>
// //       ) : (
// //         <div>
// //           <h2>Your Score: {score}%</h2>
// //           <button
// //             onClick={handleShowAnswers}
// //             style={{
// //               marginTop: '20px',
// //               padding: '10px 20px',
// //               backgroundColor: '#28A745',
// //               color: '#fff',
// //               border: 'none',
// //               cursor: 'pointer',
// //             }}
// //           >
// //             Show Correct Answers
// //           </button>
// //           {showAnswers && (
// //             <div style={{ marginTop: '20px' }}>
// //               {quizQuestions.map((question, index) => (
// //                 <div key={index} style={{ marginBottom: '20px' }}>
// //                   <h3>Question {index + 1}:</h3>
// //                   <p>{question.question}</p>
// //                   <p>
// //                     <strong>Your Answer:</strong>{' '}
// //                     {userAnswers[index] !== undefined ? userAnswers[index] : 'Not Answered'}
// //                   </p>
// //                   <p>
// //                     <strong>Correct Answer:</strong> {question.correctAnswer}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default QuizPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import cheerGif from './img/cheer.gif';
// import cheerGif1 from './img/cheer1.gif';
// import cheerGif2 from './img/cheer2.gif';
// import cheerGif3 from './img/c.gif';
// import sadGif from './img/sad.gif';
// import './QuizPage.css';

// import { useLocation } from "react-router-dom";



// import { useNavigate } from "react-router-dom";
// const QuizPage = () => {
//   const { category, difficulty } = useParams();
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0); // State for tracking current question in slideshow

//   const location = useLocation();

//   const childId = location.state?.childId || localStorage.getItem("childId") || sessionStorage.getItem("childId");
//   useEffect(() => {
//     console.log("Location State:", location.state); // Check if childId exists in location.state
//     console.log("Child ID from State:", location.state?.childId);
//     console.log("Child ID from Session Storage:",  sessionStorage.getItem('childId'));
//     console.log("Final Child ID in State:", childId);
//   }, [location.state, childId]);
  
//  // Initialize navigate function

//   useEffect(() => {
//     console.log("Location State:", location.state); // Check if childId exists in location.state
//     console.log("Child ID from State:", location.state?.childId);
//     console.log("Child ID from Session Storage:",  sessionStorage.getItem('childId'));
//     console.log("Final Child ID in State:", childId);
//   }, [location.state, childId]);
  
//   const navigate = useNavigate(); // Initialize navigate function
//   useEffect(() => {
//     if (location.state?.childId) {
//       localStorage.setItem("childId", location.state.childId);
//       // or sessionStorage.setItem("childId", location.state.childId);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     const fetchQuizQuestions = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/api/quizs/quiz/${category}/${difficulty}`);
//         setQuizQuestions(response.data);
//       } catch (error) {
//         console.error('Error fetching quiz questions:', error);
//       }
//     };

//     fetchQuizQuestions();
//   }, [category, difficulty]);

//   const handleInputChange = (questionIndex, value) => {
//     setUserAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionIndex]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     // Calculate score
//     let correctAnswers = 0;
//     const startTime = Date.now(); // Capture quiz start time
  
//     quizQuestions.forEach((question, index) => {
//       const userAnswer = parseFloat(userAnswers[index]); // Convert to number if needed
//       if (userAnswer === question.correctAnswer) {
//         correctAnswers++;
//       }
//     });

//     const quizMark = (correctAnswers / quizQuestions.length) * 100;
//     const completionTime = (Date.now() - startTime) / 1000; // Time taken in seconds

//     setScore(quizMark); // Score as percentage

//     try {
//       await axios.post('http://localhost:3001/api/quizs/quiz/save', {
//         childId,
//         quizMark,
//         completionTime
//       });
  
//       console.log('Quiz result saved successfully');
//     } catch (error) {
//       console.error('Error saving quiz result:', error);
//     }
//   };

//   const handleShowAnswers = () => {
//     setShowAnswers(true); // Show correct answers when the button is clicked
//   };

//   const handleReloadDetails = () => {
//     setShowAnswers(false); // Hide slideshow and show other details
//     setCurrentIndex(0); // Reset slideshow to the first question
//   };

//   const goToNext = () => {
//     if (currentIndex < quizQuestions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const goToPrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleAnalyzeReadiness = async () => {
//     const childId = location.state?.childId || localStorage.getItem("childId") || sessionStorage.getItem("childId");

//     if (!childId) {
//         alert("No child data available. Please log in again.");
//         return;
//     }

//     try {
//         // Send a GET request with childId as a query parameter
//         const response = await axios.get(`http://localhost:3001/api/datapipeline/getModelData?childId=${childId}`);
//         console.log("Model Data:", response.data);
//         alert(`Prediction Result: ${JSON.stringify(response.data)}`);
//     } catch (error) {
//         console.error("Error analyzing readiness:", error);
//         alert("Failed to analyze readiness. Please try again.");
//     }
// };

//   return (
//     <div className='quizppp'>
// <br></br><br></br>
//       {score === null ? (
//         <>
//         {quizQuestions.length > 0 ? (
//           <form >
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr', // Two columns of equal width
//                 columnGap: '200px', // Spacing between columns and rows
//                 maxWidth: '1500px', // Adjust max width as needed
//                 margin: '0 auto',
//                marginLeft:'10%',
//                marginRight:'10%'
//               }}
//             >
//               {quizQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     marginBottom: '20px',
//                   }}
//                 >
//                   <h2
//                     style={{
//                       fontSize: '65px',
//                     }}
//                   >
//                     {question.question}
//                   </h2>
//                   <div
//                     style={{
//                       display: 'flex',
//                       width: '220px',
//                     }}
//                   >
//                     <input
//                       type="text"
//                       value={userAnswers[index] || ''} // Pre-fill if user already answered
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                       placeholder="Enter your answer"
//                       style={{
//                         fontSize: '20px',
//                         flex: '1',
                       
//                         width: '80px',
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={handleSubmit}
//              className="button1"
//              style={{
//               marginLeft:'40%',
              
//              }}
//             >
//               Submit
//             </button>
//           </form>
//         ) : (
//           <p>Loading questions...</p>
//         )}
//       </>
      
//       ) : showAnswers ?(

//         <div style={{ marginTop: '20px', textAlign: 'center' }}>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               maxWidth: '1200px',
//               margin: '0 auto',
//             }}
//           >
//             <button
//               onClick={goToPrevious}
//               disabled={currentIndex === 0}
//               style={{
//                 ...buttonStyle,
//                 flex: '0 0 auto',
//               }}
//             >
//               &#11164;
//             </button>

//             <div
//               style={{
//                 border: '1px solid #ddd',
//                 borderRadius: '10px',
//                 padding: '50px',
//                 boxShadow: '0 14px 18px rgba(0, 0, 0, 0.1)',
//                 backgroundColor: '#fff',
//                 flex: '1',
//                 margin: '0 20px',
//                 textAlign: 'center',
//                 marginBottom:'50px'
//               }}
//             >
//               <h2>Question {currentIndex + 1}:</h2>
//               <h2 style={{ fontSize: '150px' }}>{quizQuestions[currentIndex].question}</h2>
//               <h2 style={{ fontSize: '40px' }}>
//                 <strong>Your Answer:</strong>{' '}
//                 {userAnswers[currentIndex] !== undefined ? userAnswers[currentIndex] : 'Not Answered'}
//               </h2>
//               <h2 style={{ fontSize: '60px', color:'green' }}>
//                 <strong>Correct Answer:</strong> {quizQuestions[currentIndex].correctAnswer}
//               </h2>
//             </div>

//             <button
//               onClick={goToNext}
//               disabled={currentIndex === quizQuestions.length - 1}
//               style={{
//                 ...buttonStyle,
//                 flex: '0 0 auto',
//               }}
//             >
//               &#11166;
//             </button>
//           </div>
//           <button
//             onClick={handleReloadDetails}
//             className="button2"
//           >
//             Reload Details
//           </button>
//         </div>
//       ) : (




//         <div style={{ marginTop: '20px', textAlign: 'center' }}>
//   <h2
//     style={{
//       fontSize: '50px',
//     }}
//   >
//     Your Score is
//   </h2>
//   <h2
//     style={{
//       fontSize: '200px',
//     }}
//   >
//     {score}%
//   </h2>

//   {/* Display motivational message and GIF */}
//   <div >
//     {score <= 40 && (
//       <>
//         <h2 style={{ fontSize: '50px'}}>Don't worry, let's try again!</h2>
//         <img src={sadGif} alt="Cheering Animation" className="animation" />
//               </>
//     )}
//     {score > 40 && score <= 60 && (
//       <>
//         <h2 style={{ fontSize: '50px'}}>You are doing great, let's try again!</h2>
//         <img src={cheerGif3} alt="Cheering Animation" className="animation" />
//               </>
//     )}
//     {score > 60 && score <= 90 && (
//       <>
//         <h2 style={{ fontSize: '50px'}}>You are awesome, congratulations!</h2>
//         <img src={cheerGif2} alt="Cheering Animation" className="animation" />
//         </>
//     )}
//     {score === 100 && (
//       <>
//         <h2 style={{ fontSize: '50px'}}>You did it, perfect score!</h2>
//         <img src={cheerGif1} alt="Cheering Animation" className="animation" />
//         </>
//     )}
//   </div>

//   <button
//     onClick={handleShowAnswers}
//     className="button2"
//   >
//     Show Correct Answers
//     </button>

    
//   <button
//     onClick={handleAnalyzeReadiness}
//     className="button2"
//   >
//     Analyze Readiness
//   </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const buttonStyle = {
// fontSize: '60px',
// padding: '10px 20px',
// backgroundColor: 'white',
// color: 'black',
// border: 'none',
// cursor: 'pointer',
// marginTop: '20px',
// };

// export default QuizPage;

//methanin thami patan ganne code eka

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import cheerGif from './img/cheer.gif';
// import cheerGif1 from './img/cheer1.gif';
// import cheerGif2 from './img/cheer2.gif';
// import cheerGif3 from './img/c.gif';
// import sadGif from './img/sad.gif';
// import './QuizPage.css';
// import { useLocation } from "react-router-dom";



// import { useNavigate } from "react-router-dom";

// const QuizPage = () => {
//   const { category, difficulty } = useParams();
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0); // State for tracking current question in slideshow
//   const location = useLocation();
//   const [startTime, setStartTime] = useState(null);


//   const childId = location.state?.childId || localStorage.getItem("childId") || sessionStorage.getItem("childId");


  
//   useEffect(() => {
//     console.log("Location State:", location.state); // Check if childId exists in location.state
//     console.log("Child ID from State:", location.state?.childId);
//     console.log("Child ID from Session Storage:",  sessionStorage.getItem('childId'));
//     console.log("Final Child ID in State:", childId);
//   }, [location.state, childId]);
  
//   const navigate = useNavigate(); // Initialize navigate function

//   useEffect(() => {
//     if (location.state?.childId) {
//       localStorage.setItem("childId", location.state.childId);
//       // or sessionStorage.setItem("childId", location.state.childId);
//     }
//   }, [location.state]);
  
//   useEffect(() => {
//     const fetchQuizQuestions = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/api/quizs/quiz/${category}/${difficulty}`);
//         setQuizQuestions(response.data);
//         setStartTime(Date.now());//start tracking time when quiz loads
//       } catch (error) {
//         console.error('Error fetching quiz questions:', error);
//       }
//     };

//     fetchQuizQuestions();
//   }, [category, difficulty]);

//   const handleInputChange = (questionIndex, value) => {
//     setUserAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionIndex]: value,
//     }));
//   };

//   // import axios from 'axios';

//   const handleSubmit = async () => {
//     let correctAnswers = 0;
    
  
//     quizQuestions.forEach((question, index) => {
//       const userAnswer = parseFloat(userAnswers[index]);
//       if (userAnswer === question.correctAnswer) {
//         correctAnswers++;
//       }
//     });
  
//     const quizMark = (correctAnswers / quizQuestions.length) * 100;
//     const completionTime = (Date.now() - startTime) / 1000; // Time taken in seconds
  
//     setScore(quizMark);
  
//     try {
//       await axios.post('http://localhost:3001/api/quizs/quiz/save', {
//         childId,
//         quizMark,
//         completionTime
//       });
  
//       console.log('Quiz result saved successfully');
//     } catch (error) {
//       console.error('Error saving quiz result:', error);
//     }
//   };
  

//   const handleShowAnswers = () => {
//     setShowAnswers(true); // Show correct answers when the button is clicked
//   };

//   const handleReloadDetails = () => {
//     setShowAnswers(false); // Hide slideshow and show other details
//     setCurrentIndex(0); // Reset slideshow to the first question
//   };

//   const goToNext = () => {
//     if (currentIndex < quizQuestions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const goToPrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleAnalyzeReadiness = async () => {
//     const childId = location.state?.childId || localStorage.getItem("childId") || sessionStorage.getItem("childId");

//     if (!childId) {
//         alert("No child data available. Please log in again.");
//         return;
//     }

//     try {
//         // Send a GET request with childId as a query parameter
//         const response = await axios.get(`http://localhost:3001/api/datapipeline/getModelData?childId=${childId}`);
//         console.log("Model Data:", response.data);
//         alert(`Prediction Result: ${JSON.stringify(response.data)}`);
//     } catch (error) {
//         console.error("Error analyzing readiness:", error);
//         alert("Failed to analyze readiness. Please try again.");
//     }
// };

  

//   return (
//     <div className='quizppp'>
// <br></br><br></br>
//       {score === null ? (
//         <>
//         {quizQuestions.length > 0 ? (
//           <form >
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr', // Two columns of equal width
//                 columnGap: '200px', // Spacing between columns and rows
//                 maxWidth: '1500px', // Adjust max width as needed
//                 margin: '0 auto',
//                marginLeft:'10%',
//                marginRight:'10%'
//               }}
//             >
//               {quizQuestions.map((question, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     marginBottom: '20px',
//                   }}
//                 >
//                   <h2
//                     style={{
//                       fontSize: '65px',
//                     }}
//                   >
//                     {question.question}
//                   </h2>
//                   <div
//                     style={{
//                       display: 'flex',
//                       width: '220px',
//                     }}
//                   >
//                     <input
//                       type="text"
//                       value={userAnswers[index] || ''} // Pre-fill if user already answered
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                       placeholder="Enter your answer"
//                       style={{
//                         fontSize: '20px',
//                         flex: '1',
                       
//                         width: '80px',
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={handleSubmit}
//              className="button1"
//              style={{
//               marginLeft:'40%',
              
//              }}
//             >
//               Submit
//             </button>
//           </form>
//         ) : (
//           <p>Loading questions...</p>
//         )}
//       </>
      
//       ) : showAnswers ?(

//         <div style={{ marginTop: '20px', textAlign: 'center' }}>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               maxWidth: '1200px',
//               margin: '0 auto',
//             }}
//           >
//             <button
//               onClick={goToPrevious}
//               disabled={currentIndex === 0}
//               style={{
//                 ...buttonStyle,
//                 flex: '0 0 auto',
//               }}
//             >
//               &#11164;
//             </button>

//             <div
//               style={{
//                 border: '1px solid #ddd',
//                 borderRadius: '10px',
//                 padding: '50px',
//                 boxShadow: '0 14px 18px rgba(0, 0, 0, 0.1)',
//                 backgroundColor: '#fff',
//                 flex: '1',
//                 margin: '0 20px',
//                 textAlign: 'center',
//                 marginBottom:'50px'
//               }}
//             >
//               <h2>Question {currentIndex + 1}:</h2>
//               <h2 style={{ fontSize: '150px' }}>{quizQuestions[currentIndex].question}</h2>
//               <h2 style={{ fontSize: '40px' }}>
//                 <strong>Your Answer:</strong>{' '}
//                 {userAnswers[currentIndex] !== undefined ? userAnswers[currentIndex] : 'Not Answered'}
//               </h2>
//               <h2 style={{ fontSize: '60px', color:'green' }}>
//                 <strong>Correct Answer:</strong> {quizQuestions[currentIndex].correctAnswer}
//               </h2>
//             </div>

//             <button
//               onClick={goToNext}
//               disabled={currentIndex === quizQuestions.length - 1}
//               style={{
//                 ...buttonStyle,
//                 flex: '0 0 auto',
//               }}
//             >
//               &#11166;
//             </button>
//           </div>
//           <button
//             onClick={handleReloadDetails}
//             className="button2"
//           >
//             Reload Details
//           </button>
//         </div>
//       ) : (




//         <div style={{ marginTop: '20px', textAlign: 'center' }}>
//   <h2
//     style={{
//       fontSize: '50px',
//     }}
//   >
//     Your Score is
//   </h2>
//   <h2
//     style={{
//       fontSize: '200px',
//     }}
//   >
//     {score}%
//   </h2>

//   {/* Display motivational message and GIF */}
//   <div >
//     {score <= 40 && (
//       <>
//         <h2 style={{ fontSize: '50px'}}>Don't worry, let's try again!</h2>
//         <img src={sadGif} alt="Cheering Animation" className="animation" />
//               </>
//     )}
//     {score > 40 && score <= 60 && (
//       <>
//         <h2 style={{ fontSize: '50px'}}>You are doing great, let's try again!</h2>
//         <img src={cheerGif3} alt="Cheering Animation" className="animation" />
//               </>
//     )}
//     {score > 60 && score <= 90 && (
//       <>
//         <h2 style={{ fontSize: '50px'}}>You are awesome, congratulations!</h2>
//         <img src={cheerGif2} alt="Cheering Animation" className="animation" />
//         </>
//     )}
//     {score === 100 && (
//       <>
//         <h2 style={{ fontSize: '50px'}}>You did it, perfect score!</h2>
//         <img src={cheerGif1} alt="Cheering Animation" className="animation" />
//         </>
//     )}
//   </div>

//   <button
//   onClick={handleShowAnswers}
//   className="button2"
// >
//   Show Correct Answers
// </button>

// <button
//   onClick={handleAnalyzeReadiness}
//   className="button2"
// >
//   Analyze Readiness
// </button>

//         </div>
//       )}
//     </div>
//   );
// };

// const buttonStyle = {
// fontSize: '60px',
// padding: '10px 20px',
// backgroundColor: 'white',
// color: 'black',
// border: 'none',
// cursor: 'pointer',
// marginTop: '20px',
// };

// export default QuizPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import cheerGif from './img/cheer.gif';
import cheerGif1 from './img/cheer1.gif';
import cheerGif2 from './img/cheer2.gif';
import cheerGif3 from './img/c.gif';
import sadGif from './img/sad.gif';
import './QuizPage.css';
import { useLocation } from "react-router-dom";



import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { category, difficulty } = useParams();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // State for tracking current question in slideshow
  const location = useLocation();
  const [startTime, setStartTime] = useState(null);


  const childId = location.state?.childId || localStorage.getItem("childId") || sessionStorage.getItem("childId");

  //model data display
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const quizData = location.state?.quizData;
  
  useEffect(() => {
    console.log("Location State:", location.state); // Check if childId exists in location.state
    console.log("Child ID from State:", location.state?.childId);
    console.log("Child ID from Session Storage:",  sessionStorage.getItem('childId'));
    console.log("Final Child ID in State:", childId);
  }, [location.state, childId]);
  
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (location.state?.childId) {
      localStorage.setItem("childId", location.state.childId);
      // or sessionStorage.setItem("childId", location.state.childId);
    }
  }, [location.state]);
  
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/quizs/quiz/${category}/${difficulty}`);
        setQuizQuestions(response.data);
        setStartTime(Date.now());//start tracking time when quiz loads
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuizQuestions();
  }, [category, difficulty]);

  const handleInputChange = (questionIndex, value) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  // import axios from 'axios';

  const handleSubmit = async () => {
    let correctAnswers = 0;
    
  
    quizQuestions.forEach((question, index) => {
      const userAnswer = parseFloat(userAnswers[index]);
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
  
    const quizMark = (correctAnswers / quizQuestions.length) * 100;
    const completionTime = (Date.now() - startTime) / 1000; // Time taken in seconds
  
    setScore(quizMark);
  
    try {
      await axios.post('http://localhost:3001/api/quizs/quiz/save', {
        childId,
        category,
        difficulty,
        quizMark,
        completionTime
      });
  
      console.log('Quiz result saved successfully');
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };
  

  const handleShowAnswers = () => {
    setShowAnswers(true); // Show correct answers when the button is clicked
  };

  const handleReloadDetails = () => {
    setShowAnswers(false); // Hide slideshow and show other details
    setCurrentIndex(0); // Reset slideshow to the first question
  };

  const goToNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnalyzeReadiness = async () => {
     const childId = location.state?.childId || localStorage.getItem("childId") || sessionStorage.getItem("childId");
    setLoading(true);
    setError(null);
    setProgress(50);

        try {
            // Fetch data from getModelData API
            const response = await fetch(`http://localhost:3001/api/datapipeline/getModelData?childId=${childId}`);
            if (!response.ok) throw new Error('Failed to fetch model data');
            setProgress(50);

            const modelData = await response.json();

            // Send data to /predict API
            const predictResponse = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(modelData)
            });
            if (!predictResponse.ok) throw new Error('Prediction failed');
            setProgress(80);

            const predictionResult = await predictResponse.json();
            setProgress(100);

            // Update state
            // updateDashboard(predictionResult);
            setPrediction(predictionResult);
            setShowModal(true);

            navigate('/dashboard/math', { state: { prediction: predictionResult, childId, difficulty, category} });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setTimeout(() => setProgress(0), 1000); // Reset progress after completion
        }
};

  

  return (
    <div className='quizppp'>
<br></br><br></br>
      {score === null ? (
        <>
        {quizQuestions.length > 0 ? (
          <form >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr', // Two columns of equal width
                columnGap: '200px', // Spacing between columns and rows
                maxWidth: '1500px', // Adjust max width as needed
                margin: '0 auto',
               marginLeft:'10%',
               marginRight:'10%'
              }}
            >
              {quizQuestions.map((question, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '65px',
                    }}
                  >
                    {question.question}
                  </h2>
                  <div
                    style={{
                      display: 'flex',
                      width: '220px',
                    }}
                  >
                    <input
                      type="text"
                      value={userAnswers[index] || ''} // Pre-fill if user already answered
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder="Enter your answer"
                      style={{
                        fontSize: '20px',
                        flex: '1',
                       
                        width: '80px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
             className="button1"
             style={{
              marginLeft:'40%',
              
             }}
            >
              Submit
            </button>
          </form>
        ) : (
          <p>Loading questions...</p>
        )}
      </>
      
      ) : showAnswers ?(

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              style={{
                ...buttonStyle,
                flex: '0 0 auto',
              }}
            >
              &#11164;
            </button>

            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '50px',
                boxShadow: '0 14px 18px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                flex: '1',
                margin: '0 20px',
                textAlign: 'center',
                marginBottom:'50px'
              }}
            >
              <h2>Question {currentIndex + 1}:</h2>
              <h2 style={{ fontSize: '150px' }}>{quizQuestions[currentIndex].question}</h2>
              <h2 style={{ fontSize: '40px' }}>
                <strong>Your Answer:</strong>{' '}
                {userAnswers[currentIndex] !== undefined ? userAnswers[currentIndex] : 'Not Answered'}
              </h2>
              <h2 style={{ fontSize: '60px', color:'green' }}>
                <strong>Correct Answer:</strong> {quizQuestions[currentIndex].correctAnswer}
              </h2>
            </div>

            <button
              onClick={goToNext}
              disabled={currentIndex === quizQuestions.length - 1}
              style={{
                ...buttonStyle,
                flex: '0 0 auto',
              }}
            >
              &#11166;
            </button>
          </div>
          <button
            onClick={handleReloadDetails}
            className="button2"
          >
            Reload Details
          </button>
        </div>
      ) : (




        <div style={{ marginTop: '20px', textAlign: 'center' }}>
  <h2
    style={{
      fontSize: '50px',
    }}
  >
    Your Score is
  </h2>
  <h2
    style={{
      fontSize: '200px',
    }}
  >
    {score}%
  </h2>

  {/* Display motivational message and GIF */}
  <div >
    {score <= 40 && (
      <>
        <h2 style={{ fontSize: '50px'}}>Don't worry, let's try again!</h2>
        <img src={sadGif} alt="Cheering Animation" className="animation" />
              </>
    )}
    {score > 40 && score <= 60 && (
      <>
        <h2 style={{ fontSize: '50px'}}>You are doing great, let's try again!</h2>
        <img src={cheerGif3} alt="Cheering Animation" className="animation" />
              </>
    )}
    {score > 60 && score <= 90 && (
      <>
        <h2 style={{ fontSize: '50px'}}>You are awesome, congratulations!</h2>
        <img src={cheerGif2} alt="Cheering Animation" className="animation" />
        </>
    )}
    {score === 100 && (
      <>
        <h2 style={{ fontSize: '50px'}}>You did it, perfect score!</h2>
        <img src={cheerGif1} alt="Cheering Animation" className="animation" />
        </>
    )}
  </div>

  <button
  onClick={handleShowAnswers}
  className="button2"
>
  Show Correct Answers
</button>

 <div style={{ textAlign: 'center', padding: '20px' }}>
      <button
        onClick={handleAnalyzeReadiness}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Analyzing...' : 'Analyze Readiness'}
      </button>

      {/* Progress Bar */}
      {loading && (
        <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '5px', marginTop: '10px' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '8px',
              backgroundColor: '#28a745',
              borderRadius: '5px',
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </div>
      )}

      {/* Error Message */}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {/* Modal for Prediction Result */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <h3>Prediction Result</h3>
          <p>{JSON.stringify(prediction, null, 2)}</p>
          <button
            onClick={() => setShowModal(false)}
            style={{
              marginTop: '10px',
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>


        </div>
      )}
    </div>
  );
};

const buttonStyle = {
fontSize: '60px',
padding: '10px 20px',
backgroundColor: 'white',
color: 'black',
border: 'none',
cursor: 'pointer',
marginTop: '20px',
};

export default QuizPage;