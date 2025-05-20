
// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // import './QuestionDisplay.css'; // Import your CSS file

// // // // // // const QuestionDisplay = () => {
// // // // // //   const { category, difficulty } = useParams();
// // // // // //   const navigate = useNavigate();

// // // // // //   const [questionData, setQuestionData] = useState(null);
// // // // // //   const [userAnswer, setUserAnswer] = useState('');
// // // // // //   const [questionCount, setQuestionCount] = useState(0);
// // // // // //   const [isAnswered, setIsAnswered] = useState(false);
// // // // // //   const [answerResults, setAnswerResults] = useState([]); // Track correct/incorrect answers

// // // // // //   useEffect(() => {
// // // // // //     if (questionCount < 5) {
// // // // // //       fetchQuestion();
// // // // // //     }
// // // // // //   }, [category, difficulty, questionCount]);

// // // // // //   const fetchQuestion = async () => {
// // // // // //     try {
// // // // // //       console.log(`Fetching question number: ${questionCount + 1}`);
// // // // // //       const response = await axios.get(`http://localhost:3001/api/questions/generate/${category}/${difficulty}`);
// // // // // //       setQuestionData(response.data);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching question:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = () => {
// // // // // //     if (userAnswer.trim() === '') return; // Prevent empty submissions

// // // // // //     setIsAnswered(true); // Mark as answered

// // // // // //     const isCorrect = questionData && parseFloat(userAnswer) === parseFloat(questionData.correctAnswer);
// // // // // //     setAnswerResults((prevResults) => {
// // // // // //       const updatedResults = [...prevResults];
// // // // // //       updatedResults[questionCount] = isCorrect;
// // // // // //       return updatedResults;
// // // // // //     });
// // // // // //   };

// // // // // //   const handleNextQuestion = () => {
// // // // // //     setIsAnswered(false); // Reset answer state
// // // // // //     setUserAnswer(''); // Clear input
// // // // // //     setQuestionCount((prevCount) => prevCount + 1);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className='question-container'>
// // // // // //      <QuestionCountDisplay currentCount={questionCount} answerResults={answerResults} />
     
// // // // // //       {questionData && !isAnswered ? (
// // // // // //         <>
// // // // // //           <p className='question11'>{questionData.question} = ?</p>
// // // // // //           <h2>Type your answer here</h2>
// // // // // //           <input
// // // // // //             type="text"
// // // // // //             value={userAnswer}
// // // // // //             onChange={(e) => setUserAnswer(e.target.value)}
// // // // // //           /> <br></br>
// // // // // //           <button className='button1' onClick={handleSubmit}>Submit</button>
           
// // // // // //         </>
// // // // // //       ) : (
// // // // // //         <>
// // // // // //           <h1>{answerResults[questionCount] ? 'Correct!' : 'Wrong!'}</h1>
// // // // // //           {!answerResults[questionCount] && <p>Correct Answer: {questionData?.correctAnswer}</p>}
// // // // // //           {questionCount < 5 ? (
// // // // // //             <button className='button2' onClick={handleNextQuestion}>Next Question</button>
// // // // // //           ) : (
// // // // // //             <button className='button3' onClick={() => navigate(`/quiz/${category}/${difficulty}`)}>Attempt Quiz</button>
// // // // // //           )}
// // // // // //         </>
// // // // // //       )}
      
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const QuestionCountDisplay = ({ currentCount, answerResults }) => {
// // // // // //   return (
// // // // // //     <div className='question-count-display'>
// // // // // //       {Array(20).fill(null).map((_, index) => (
// // // // // //         <div
// // // // // //           key={index}
// // // // // //           className={`question-box ${answerResults[index] === true ? 'correct' : answerResults[index] === false ? 'wrong' : ''}`}
// // // // // //         >
// // // // // //           {index + 1}
// // // // // //         </div>
// // // // // //       ))}
      
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default QuestionDisplay;


// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import './QuestionDisplay.css'; // Import your CSS file

// // // // import cheerGif from './img/cheer.gif'; // Add your cheering animation
// // // // import sadGif from './img/sad.gif';    
// // // // import background1 from './img/background1.png'
// // // // import background2 from './img/background2.png'
// // // // import background3 from './img/background3.png'
// // // // import background4 from './img/background4.png'
// // // // import background5 from './img/background5.png'
// // // // import background6 from './img/background6.png'
// // // // import background7 from './img/background7.png'
// // // // import background8 from './img/background8.png'
// // // // import background9 from './img/background9.png'
// // // // import background10 from './img/background10.png'
// // // // import background11 from './img/background11.png'
// // // // import background12 from './img/background12.png'

// // // // const positiveMessages = [
// // // //   'You are awesome!',
// // // //   'Incredible work!',
// // // //   'Fantastic job!',
// // // //   'Great thinking!',
// // // //   'Keep it up!',
// // // //   'Brilliant!',
// // // // ];

// // // // const motivationalMessages = [
// // // //   "Don't worry, let's try again!",
// // // //   'Keep going, you’ll get it!',
// // // //   'No problem, you can do this!',
// // // //   'Mistakes are just learning opportunities!',
// // // //   "Don't give up!",
// // // //   'Stay positive and try again!',
// // // // ];


// // // // const QuestionDisplay = () => {
// // // //   const { category, difficulty } = useParams();
// // // //   const navigate = useNavigate();

// // // //   const [questionData, setQuestionData] = useState(null);
// // // //   const [userAnswer, setUserAnswer] = useState('');
// // // //   const [questionCount, setQuestionCount] = useState(0);
// // // //   const [isAnswered, setIsAnswered] = useState(false);
// // // //   const [answerResults, setAnswerResults] = useState([]); // Track correct/incorrect answers
// // // //   const [correctCount, setCorrectCount] = useState(0);
// // // //   const [incorrectCount, setIncorrectCount] = useState(0);
// // // //   const [message, setMessage] = useState('');

// // // //   const getBackgroundImage = (category, difficulty) => {
// // // //     if (category === 'addition') {
// // // //       switch (difficulty) {
// // // //         case 'beginner':
// // // //           return background1;
// // // //         case 'intermediate':
// // // //           return background2;
// // // //         case 'advanced':
// // // //           return background3;
// // // //         default:
// // // //           return null;
// // // //       }
// // // //     } else if (category === 'multiplication') {
// // // //       switch (difficulty) {
// // // //         case 'beginner':
// // // //           return background7;
// // // //         case 'intermediate':
// // // //           return background8;
// // // //         case 'advanced':
// // // //           return background9;
// // // //         default:
// // // //           return null;
// // // //       }
// // // //     } else if (category === 'subtraction') {
// // // //       switch (difficulty) {
// // // //         case 'beginner':
// // // //           return background4;
// // // //         case 'intermediate':
// // // //           return background5;
// // // //         case 'advanced':
// // // //           return background6;
// // // //         default:
// // // //           return null;
// // // //       }
// // // //     } else if (category === 'division') {
// // // //       switch (difficulty) {
// // // //         case 'beginner':
// // // //           return background10;
// // // //         case 'intermediate':
// // // //           return background11;
// // // //         case 'advanced':
// // // //           return background12;
// // // //         default:
// // // //           return null;
// // // //       }
// // // //     }
// // // //     return null;
// // // //   };
  
// // // //   useEffect(() => {
// // // //     if (questionCount < 5) {
// // // //       fetchQuestion();
// // // //     }
// // // //   }, [category, difficulty, questionCount]);

// // // //   const fetchQuestion = async () => {
// // // //     try {
// // // //       console.log(`Fetching question number: ${questionCount + 1}`);
// // // //       const response = await axios.get(`http://localhost:3001/api/questions/generate/${category}/${difficulty}`);
// // // //       setQuestionData(response.data);
// // // //     } catch (error) {
// // // //       console.error('Error fetching question:', error);
// // // //     }
// // // //   };



// // // //   const handleSubmit = () => {
// // // //     if (userAnswer.trim() === '') return; // Prevent empty submissions

// // // //     setIsAnswered(true); // Mark as answered

// // // //     const isCorrect = questionData && parseFloat(userAnswer) === parseFloat(questionData.correctAnswer);
// // // //     setAnswerResults((prevResults) => {
// // // //       const updatedResults = [...prevResults];
// // // //       updatedResults[questionCount] = isCorrect;
// // // //       return updatedResults;
// // // //     });

// // // //     // Update correct or incorrect count and set a message
// // // //     if (isCorrect) {
// // // //       setCorrectCount((prev) => {
// // // //         const newCount = prev + 1;
// // // //         setMessage(positiveMessages[newCount - 1] || shuffleMessages(positiveMessages));
// // // //         return newCount;
// // // //       });
// // // //     } else {
// // // //       setIncorrectCount((prev) => {
// // // //         const newCount = prev + 1;
// // // //         setMessage(motivationalMessages[newCount - 1] || shuffleMessages(motivationalMessages));
// // // //         return newCount;
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleNextQuestion = () => {
// // // //     setIsAnswered(false); // Reset answer state
// // // //     setUserAnswer(''); // Clear input
// // // //     setQuestionCount((prevCount) => prevCount + 1);
// // // //     setMessage(''); 
// // // //   };

// // // //   // Function to shuffle messages if predefined ones are used up
// // // //   const shuffleMessages = (messages) => {
// // // //     return messages[Math.floor(Math.random() * messages.length)];
// // // //   };

// // // // return (
// // // //   <div
// // // //     className="question-page"
// // // //     style={{
// // // //       backgroundImage: `url(${getBackgroundImage(category, difficulty)})`,
// // // //       backgroundSize: 'cover',
// // // //       backgroundPosition: 'center',
// // // //       backgroundRepeat: 'no-repeat',
// // // //     }}
// // // //   >
// // // //     <div className="question-container">
// // // //       {questionData && !isAnswered ? (
// // // //         <>
// // // //           <p className="question11">{questionData.question}</p>
// // // //           <h2>Type your answer here</h2>
// // // //           <input
// // // //             type="text"
// // // //             value={userAnswer}
// // // //             onChange={(e) => setUserAnswer(e.target.value)}
// // // //           />{' '}
// // // //           <br />
// // // //           <button className="button1" onClick={handleSubmit}>
// // // //             Submit
// // // //           </button>
// // // //         </>
// // // //       ) : (
// // // //         <div className='feedbackpage'>
// // // //           <h1
// // // //             style={{
// // // //               color: answerResults[questionCount] ? 'green' : 'red',
// // // //               fontSize: '100px',
// // // //               fontWeight: 'bold',
// // // //             }}
// // // //           >
// // // //             {answerResults[questionCount] ? 'Correct!!' : 'Wrong!!'}
// // // //           </h1>
// // // //           <div className="animation-container">
// // // //             {answerResults[questionCount] ? (
// // // //               <img src={cheerGif} alt="Cheering Animation" className="animation" />
// // // //             ) : (
// // // //               <img src={sadGif} alt="Sad Animation" className="animation" />
// // // //             )}
// // // //           </div>
// // // //           <h2 className="message-display">{message}</h2>
// // // //           {!answerResults[questionCount] && (
// // // //             <h1>Correct Answer: {questionData?.correctAnswer}</h1>
// // // //           )}
// // // //           {questionCount < 5 ? (
// // // //             <button className="button1" onClick={handleNextQuestion}>
// // // //               Next
// // // //             </button>
// // // //           ) : (
// // // //             <button
// // // //               className="button1"
// // // //               onClick={() => navigate(`/quiz/${category}/${difficulty}`)}
// // // //             >
// // // //               Attempt Quiz
// // // //             </button>
// // // //           )}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //     <QuestionCountDisplay
// // // //       currentCount={questionCount}
// // // //       answerResults={answerResults}
// // // //     />
// // // //   </div>
// // // // );
// // // // };


// // // // const QuestionCountDisplay = ({ currentCount, answerResults }) => {
// // // //   return (
// // // //     <div className='question-count-grid'>
// // // //       <h2>Answered Questions</h2>
// // // //       <div>
// // // //       </div>
// // // //       <div></div>
// // // //       {Array(15).fill(null).map((_, index) => (
// // // //         <div
// // // //           key={index}
// // // //           className={`question-box ${answerResults[index] === true ? 'correct' : answerResults[index] === false ? 'wrong' : ''}`}
// // // //         >
// // // //           {index + 1}
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default QuestionDisplay;


// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import './QuestionDisplay.css';

// // // import cheerGif from './img/cheer.gif';
// // // import sadGif from './img/sad.gif';
// // // import background1 from './img/background1.png';
// // // import background2 from './img/background2.png';
// // // import background3 from './img/background3.png';
// // // import background4 from './img/background4.png';
// // // import background5 from './img/background5.png';
// // // import background6 from './img/background6.png';
// // // import background7 from './img/background7.png';
// // // import background8 from './img/background8.png';
// // // import background9 from './img/background9.png';
// // // import background10 from './img/background10.png';
// // // import background11 from './img/background11.png';
// // // import background12 from './img/background12.png';

// // // const positiveMessages = [
// // //   'You are awesome!',
// // //   'Incredible work!',
// // //   'Fantastic job!',
// // //   'Great thinking!',
// // //   'Keep it up!',
// // //   'Brilliant!',
// // // ];

// // // const motivationalMessages = [
// // //   "Don't worry, let's try again!",
// // //   'Keep going, you’ll get it!',
// // //   'No problem, you can do this!',
// // //   'Mistakes are just learning opportunities!',
// // //   "Don't give up!",
// // //   'Stay positive and try again!',
// // // ];

// // // const QuestionDisplay = () => {
// // //   const { category, difficulty } = useParams();
// // //   const navigate = useNavigate();

// // //   const [questionData, setQuestionData] = useState(null);
// // //   const [userAnswer, setUserAnswer] = useState('');
// // //   const [questionCount, setQuestionCount] = useState(0);
// // //   const [isAnswered, setIsAnswered] = useState(false);
// // //   const [answerResults, setAnswerResults] = useState([]);
// // //   const [correctCount, setCorrectCount] = useState(0);
// // //   const [incorrectCount, setIncorrectCount] = useState(0);
// // //   const [message, setMessage] = useState('');
// // //   const [currentSubLevel, setCurrentSubLevel] = useState(1); // Track the current sub-level

// // //   const getBackgroundImage = (category, difficulty) => {
// // //     if (category === 'addition') {
// // //       switch (difficulty) {
// // //         case 'beginner':
// // //           return background1;
// // //         case 'intermediate':
// // //           return background2;
// // //         case 'advanced':
// // //           return background3;
// // //         default:
// // //           return null;
// // //       }
// // //     } else if (category === 'multiplication') {
// // //       switch (difficulty) {
// // //         case 'beginner':
// // //           return background7;
// // //         case 'intermediate':
// // //           return background8;
// // //         case 'advanced':
// // //           return background9;
// // //         default:
// // //           return null;
// // //       }
// // //     } else if (category === 'subtraction') {
// // //       switch (difficulty) {
// // //         case 'beginner':
// // //           return background4;
// // //         case 'intermediate':
// // //           return background5;
// // //         case 'advanced':
// // //           return background6;
// // //         default:
// // //           return null;
// // //       }
// // //     } else if (category === 'division') {
// // //       switch (difficulty) {
// // //         case 'beginner':
// // //           return background10;
// // //         case 'intermediate':
// // //           return background11;
// // //         case 'advanced':
// // //           return background12;
// // //         default:
// // //           return null;
// // //       }
// // //     }
// // //     return null;
// // //   };

// // //   useEffect(() => {
// // //     if (questionCount < 5) {
// // //       fetchQuestion();
// // //     }
// // //   }, [category, difficulty, questionCount, currentSubLevel]);

// // //   const fetchQuestion = async () => {
// // //     try {
// // //       console.log(`Fetching question in sub-level: ${currentSubLevel}`);
// // //       const response = await axios.get(
// // //         `http://localhost:3001/api/questions/generate/${category}/${difficulty}/${currentSubLevel}`
// // //       );
// // //       setQuestionData(response.data);
// // //     } catch (error) {
// // //       console.error('Error fetching question:', error);
// // //     }
// // //   };

// // //   const handleSubmit = () => {
// // //     if (userAnswer.trim() === '') return; // Prevent empty submissions

// // //     setIsAnswered(true); // Mark as answered

// // //     const isCorrect = questionData && parseFloat(userAnswer) === parseFloat(questionData.correctAnswer);
// // //     setAnswerResults((prevResults) => {
// // //       const updatedResults = [...prevResults];
// // //       updatedResults[questionCount] = isCorrect;
// // //       return updatedResults;
// // //     });

// // //     if (isCorrect) {
// // //       setCorrectCount((prev) => prev + 1);
// // //       setMessage(shuffleMessages(positiveMessages));

// // //       // Increase sub-level (if not at max)
// // //       setCurrentSubLevel((prevLevel) => Math.min(prevLevel + 1, 4));
// // //     } else {
// // //       setIncorrectCount((prev) => prev + 1);
// // //       setMessage(shuffleMessages(motivationalMessages));

// // //       // Keep sub-level the same
// // //     }
// // //   };

// // //   const handleNextQuestion = () => {
// // //     setIsAnswered(false); // Reset answer state
// // //     setUserAnswer(''); // Clear input
// // //     setQuestionCount((prevCount) => prevCount + 1);
// // //     setMessage('');
// // //   };

// // //   const shuffleMessages = (messages) => {
// // //     return messages[Math.floor(Math.random() * messages.length)];
// // //   };

// // //   return (
// // //     <div
// // //       className="question-page"
// // //       style={{
// // //         backgroundImage: `url(${getBackgroundImage(category, difficulty)})`,
// // //         backgroundSize: 'cover',
// // //         backgroundPosition: 'center',
// // //         backgroundRepeat: 'no-repeat',
// // //       }}
// // //     >
// // //       <div className="question-container">
// // //         {questionData && !isAnswered ? (
// // //           <>
// // //             <p className="question11">{questionData.question}</p>
// // //             <h2>Type your answer here</h2>
// // //             <input
// // //               type="text"
// // //               value={userAnswer}
// // //               onChange={(e) => setUserAnswer(e.target.value)}
// // //             />{' '}
// // //             <br />
// // //             <button className="button1" onClick={handleSubmit}>
// // //               Submit
// // //             </button>
// // //           </>
// // //         ) : (
// // //           <div className="feedbackpage">
// // //             <h1
// // //               style={{
// // //                 color: answerResults[questionCount] ? 'green' : 'red',
// // //                 fontSize: '100px',
// // //                 fontWeight: 'bold',
// // //               }}
// // //             >
// // //               {answerResults[questionCount] ? 'Correct!!' : 'Wrong!!'}
// // //             </h1>
// // //             <div className="animation-container">
// // //               {answerResults[questionCount] ? (
// // //                 <img src={cheerGif} alt="Cheering Animation" className="animation" />
// // //               ) : (
// // //                 <img src={sadGif} alt="Sad Animation" className="animation" />
// // //               )}
// // //             </div>
// // //             <h2 className="message-display">{message}</h2>
// // //             {!answerResults[questionCount] && (
// // //               <h1>Correct Answer: {questionData?.correctAnswer}</h1>
// // //             )}
// // //             {questionCount < 5 ? (
// // //               <button className="button1" onClick={handleNextQuestion}>
// // //                 Next
// // //               </button>
// // //             ) : (
// // //               <button
// // //                 className="button1"
// // //                 onClick={() => navigate(`/quiz/${category}/${difficulty}`)}
// // //               >
// // //                 Attempt Quiz
// // //               </button>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>
// // //       <QuestionCountDisplay
// // //         currentCount={questionCount}
// // //         answerResults={answerResults}
// // //       />
// // //     </div>
// // //   );
// // // };



// // // const QuestionCountDisplay = ({ currentCount, answerResults }) => {
// // //   return (
// // //     <div className='question-count-grid'>
// // //       <h2>Answered Questions</h2>
// // //       <div>
// // //       </div>
// // //       <div></div>
// // //       {Array(15).fill(null).map((_, index) => (
// // //         <div
// // //           key={index}
// // //           className={`question-box ${answerResults[index] === true ? 'correct' : answerResults[index] === false ? 'wrong' : ''}`}
// // //         >
// // //           {index + 1}
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default QuestionDisplay;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import './QuestionDisplay.css';

// // import cheerGif from './img/cheer.gif';
// // import sadGif from './img/sad.gif';
// // import background1 from './img/background1.png';
// // import background2 from './img/background2.png';
// // import background3 from './img/background3.png';
// // import background4 from './img/background4.png';
// // import background5 from './img/background5.png';
// // import background6 from './img/background6.png';
// // import background7 from './img/background7.png';
// // import background8 from './img/background8.png';
// // import background9 from './img/background9.png';
// // import background10 from './img/background10.png';
// // import background11 from './img/background11.png';
// // import background12 from './img/background12.png';

// // const positiveMessages = [
// //   'You are awesome!',
// //   'Incredible work!',
// //   'Fantastic job!',
// //   'Great thinking!',
// //   'Keep it up!',
// //   'Brilliant!',
// // ];

// // const motivationalMessages = [
// //   "Don't worry, let's try again!",
// //   'Keep going, you’ll get it!',
// //   'No problem, you can do this!',
// //   'Mistakes are just learning opportunities!',
// //   "Don't give up!",
// //   'Stay positive and try again!',
// // ];

// // const QuestionDisplay = () => {
// //   const { category, difficulty } = useParams();
// //   const navigate = useNavigate();

// //   const [questionData, setQuestionData] = useState(null);
// //   const [userAnswer, setUserAnswer] = useState('');
// //   const [questionCount, setQuestionCount] = useState(0);
// //   const [isAnswered, setIsAnswered] = useState(false);
// //   const [answerResults, setAnswerResults] = useState([]);
// //   const [correctCount, setCorrectCount] = useState(0);
// //   const [incorrectCount, setIncorrectCount] = useState(0);
// //   const [message, setMessage] = useState('');
// //   const [currentSubLevel, setCurrentSubLevel] = useState(1); // Track the current sub-level
// //   const [subLevelStats, setSubLevelStats] = useState({
// //     attempts: [0, 0, 0, 0], // Tracks attempts for sublevels 1-4
// //     correctAnswers: [0, 0, 0, 0], // Tracks correct answers for sublevels 1-4
// //     responseTimes: [[], [], [], []], // Tracks response times for sublevels 1-4
// //   });
// //   const [startTime, setStartTime] = useState(null); // Tracks the time when a question is displayed
  
// //   const getBackgroundImage = (category, difficulty) => {
// //     if (category === 'addition') {
// //       switch (difficulty) {
// //         case 'beginner':
// //           return background1;
// //         case 'intermediate':
// //           return background2;
// //         case 'advanced':
// //           return background3;
// //         default:
// //           return null;
// //       }
// //     } else if (category === 'multiplication') {
// //       switch (difficulty) {
// //         case 'beginner':
// //           return background7;
// //         case 'intermediate':
// //           return background8;
// //         case 'advanced':
// //           return background9;
// //         default:
// //           return null;
// //       }
// //     } else if (category === 'subtraction') {
// //       switch (difficulty) {
// //         case 'beginner':
// //           return background4;
// //         case 'intermediate':
// //           return background5;
// //         case 'advanced':
// //           return background6;
// //         default:
// //           return null;
// //       }
// //     } else if (category === 'division') {
// //       switch (difficulty) {
// //         case 'beginner':
// //           return background10;
// //         case 'intermediate':
// //           return background11;
// //         case 'advanced':
// //           return background12;
// //         default:
// //           return null;
// //       }
// //     }
// //     return null;
// //   };

// //   useEffect(() => {
// //     if (questionCount < 14) {
// //       fetchQuestion();
// //     }
// //   }, [category, difficulty, questionCount, currentSubLevel]);

// //   useEffect(() => {
// //     // Record start time when a new question is fetched
// //     setStartTime(Date.now());
// //   }, [questionData]);
  
// //   const fetchQuestion = async () => {
// //     try {
// //       console.log(`Fetching question in sub-level: ${currentSubLevel}`);
// //       const response = await axios.get(
// //         `http://localhost:3001/api/questions/generate/${category}/${difficulty}/${currentSubLevel}`
// //       );
// //       setQuestionData(response.data);
// //     } catch (error) {
// //       console.error('Error fetching question:', error);
// //     }
// //   };

// //   const handleSubmit = () => {
// //     if (userAnswer.trim() === '') return; // Prevent empty submissions

// //     setIsAnswered(true); // Mark as answered

// //     const isCorrect = questionData && parseFloat(userAnswer) === parseFloat(questionData.correctAnswer);
// //     const endTime = Date.now(); // Capture end time
// //   const responseTime = (endTime - startTime) / 1000; // Convert to seconds
   
// //   setSubLevelStats((prevStats) => {
// //     const subLevelIndex = currentSubLevel - 1; // Sublevel is 1-based, array is 0-based

// //     const updatedAttempts = [...prevStats.attempts];
// //     const updatedCorrectAnswers = [...prevStats.correctAnswers];
// //     const updatedResponseTimes = [...prevStats.responseTimes];

// //     // Increment attempts for the current sublevel
// //     updatedAttempts[subLevelIndex] += 1;

// //     // Increment correct answers if correct
// //     if (isCorrect) {
// //       updatedCorrectAnswers[subLevelIndex] += 1;
// //     }

// //     // Add response time to the respective sublevel
// //     updatedResponseTimes[subLevelIndex].push(responseTime);

// //     return {
// //       attempts: updatedAttempts,
// //       correctAnswers: updatedCorrectAnswers,
// //       responseTimes: updatedResponseTimes,
// //     };
// //   });

// //     setAnswerResults((prevResults) => {
// //       const updatedResults = [...prevResults];
// //       updatedResults[questionCount] = isCorrect;
// //       return updatedResults;
// //     });

// //     if (isCorrect) {
// //       setCorrectCount((prev) => prev + 1);
// //       setMessage(shuffleMessages(positiveMessages));

// //       // Increase sub-level (if not at max)
// //       setCurrentSubLevel((prevLevel) => Math.min(prevLevel + 1, 4));
// //     } else {
// //       setIncorrectCount((prev) => prev + 1);
// //       setMessage(shuffleMessages(motivationalMessages));

// //       // Keep sub-level the same
// //     }
// //     setIsAnswered(true);
// //   };

// //   const handleNextQuestion = () => {
// //     setIsAnswered(false); // Reset answer state
// //     setUserAnswer(''); // Clear input
// //     setQuestionCount((prevCount) => prevCount + 1);
// //     setMessage('');
// //   };

// //   // const handleNextQuestion = async () => {
// //   //   if (questionCount === 14) {
// //   //     await saveQuizData();
// //   //     navigate(`/quiz-summary/${category}/${difficulty}`);
// //   //   } else {
// //   //     setIsAnswered(false);
// //   //     setUserAnswer('');
// //   //     setQuestionCount((prevCount) => prevCount + 1);
// //   //     setMessage('');
// //   //   }
// //   // };


// //   const shuffleMessages = (messages) => {
// //     return messages[Math.floor(Math.random() * messages.length)];
// //   };

// //   const handleFinalSubmit = async () => {
// //     const avgResponseTimes = subLevelStats.responseTimes.map(
// //       (times) => (times.reduce((a, b) => a + b, 0) / times.length) || 0
// //     );
// //     const quizData = {
// //       category,
// //       difficulty,
// //       noOfQuestions: questionCount + 1,
// //       correctCount,
// //       incorrectCount,
// //       noOfAttemptsInSubLevel1: subLevelStats.attempts[0],
// //       noOfAttemptsInSubLevel2: subLevelStats.attempts[1],
// //       noOfAttemptsInSubLevel3: subLevelStats.attempts[2],
// //       noOfAttemptsInSubLevel4: subLevelStats.attempts[3],
// //       noOfCorrectQuestionsInSubLevel1: subLevelStats.correctAnswers[0],
// //       noOfCorrectQuestionsInSubLevel2: subLevelStats.correctAnswers[1],
// //       noOfCorrectQuestionsInSubLevel3: subLevelStats.correctAnswers[2],
// //       noOfCorrectQuestionsInSubLevel4: subLevelStats.correctAnswers[3],
// //       avgResponseTimeForSubLevel1: avgResponseTimes[0],
// //       avgResponseTimeForSubLevel2: avgResponseTimes[1],
// //       avgResponseTimeForSubLevel3: avgResponseTimes[2],
// //       avgResponseTimeForSubLevel4: avgResponseTimes[3],
// //     };

// //     try {
// //       await axios.post('http://localhost:3001/api/questions/quiz', quizData);
// //       console.log('Quiz data saved successfully');
// //       // Navigate to summary page and pass the quiz data
// //     navigate('/quiz-summary', { state: quizData });
// //     } catch (error) {
// //       console.error('Error saving quiz data:', error);
// //     }
// //   };

// //   return (
// //     <div
// //       className="question-page"
// //       style={{
// //         backgroundImage: `url(${getBackgroundImage(category, difficulty)})`,
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center',
// //         backgroundRepeat: 'no-repeat',
// //       }}
// //     >
// //       <div className="question-container">
// //         {questionData && !isAnswered ? (
// //           <>
// //             <p className="question11">{questionData.question}</p>
// //             <h2>Type your answer here</h2>
// //             <input
// //               type="text"
// //               value={userAnswer}
// //               onChange={(e) => setUserAnswer(e.target.value)}
// //             />{' '}
// //             <br />
// //             <button className="button1" onClick={handleSubmit}>
// //               Submit
// //             </button>
// //           </>
// //         ) : (
// //           <div className="feedbackpage">
// //             <h1
// //               style={{
// //                 color: answerResults[questionCount] ? 'green' : 'red',
// //                 fontSize: '100px',
// //                 fontWeight: 'bold',
// //                 marginTop:'10px'
// //               }}
// //             >
// //               {answerResults[questionCount] ? 'Correct!!' : 'Wrong!!'}
// //             </h1>
// //             <div className="animation-container">
// //               {answerResults[questionCount] ? (
// //                 <img src={cheerGif} alt="Cheering Animation" className="animation" />
// //               ) : (
// //                 <img src={sadGif} alt="Sad Animation" className="animation" />
// //               )}
// //             </div>
// //             <h2 className="message-display">{message}</h2>
// //             {!answerResults[questionCount] && (
// //               <h1 style={{marginTop:'10px'}}>Correct Answer: {questionData?.correctAnswer}</h1>
// //             )}
// //             {questionCount < 14 ? (
// //               <button className="button1111" onClick={handleNextQuestion}>
// //                 Next
// //               </button>
// //             ) : (
// //               // <button
// //               //   className="button1"
// //               //   onClick={() => navigate(`/quiz/${category}/${difficulty}`)}
// //               // >
// //               //   Attempt Quiz
// //               // </button>
// //               <button className="button1111" onClick={handleFinalSubmit}>
// //     Submit
// //   </button>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //       <QuestionCountDisplay
// //         currentCount={questionCount}
// //         answerResults={answerResults}
// //       />
// //     </div>
// //   );
// // };



// // const QuestionCountDisplay = ({ currentCount, answerResults }) => {
// //   return (
// //     <div className='question-count-grid'>
// //       <h2>Answered Questions</h2>
// //       <div>
// //       </div>
// //       <div></div>
// //       {Array(15).fill(null).map((_, index) => (
// //         <div
// //           key={index}
// //           className={`question-box ${answerResults[index] === true ? 'correct' : answerResults[index] === false ? 'wrong' : ''}`}
// //         >
// //           {index + 1}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default QuestionDisplay;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import './QuestionDisplay.css';
// import cheerGif from './img/cheer.gif';
// import sadGif from './img/sad.gif';
// import background1 from './img/background1.png';
// import background2 from './img/background2.png';
// import background3 from './img/background3.png';
// import background4 from './img/background4.png';
// import background5 from './img/background5.png';
// import background6 from './img/background6.png';
// import background7 from './img/background7.png';
// import background8 from './img/background8.png';
// import background9 from './img/background9.png';
// import background10 from './img/background10.png';
// import background11 from './img/background11.png';
// import background12 from './img/background12.png';

// import MathExplanationAI from './MathExplanationAI'; // Import the MathExplanation component

// const positiveMessages = [
//   'You are awesome!',
//   'Incredible work!',
//   'Fantastic job!',
//   'Great thinking!',
//   'Keep it up!',
//   'Brilliant!',
// ];

// const motivationalMessages = [
//   "Don't worry, let's try again!",
//   'Keep going, you’ll get it!',
//   'No problem, you can do this!',
//   'Mistakes are just learning opportunities!',
//   "Don't give up!",
//   'Stay positive and try again!',
// ];

// const QuestionDisplay = () => {
//   const { category, difficulty } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const childId = location.state?.childId; // Access the childId passed A231in the stat


//   const [questionData, setQuestionData] = useState(null);
//   const [userAnswer, setUserAnswer] = useState('');
//   const [questionCount, setQuestionCount] = useState(0);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [answerResults, setAnswerResults] = useState([]);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [incorrectCount, setIncorrectCount] = useState(0);
//   const [message, setMessage] = useState('');
//   const [currentSubLevel, setCurrentSubLevel] = useState(1); // Track the current sub-level
//   const [subLevelStats, setSubLevelStats] = useState({
//     attempts: [0, 0, 0, 0], // Tracks attempts for sublevels 1-4
//     correctAnswers: [0, 0, 0, 0], // Tracks correct answers for sublevels 1-4
//     responseTimes: [[], [], [], []], // Tracks response times for sublevels 1-4
//   });
//   const [startTime, setStartTime] = useState(null); // Tracks the time when a question is displayed
//   //const [showExplanation, setShowExplanation] = useState(false);
//   const [showExplanation, setShowExplanation] = useState(false);

//   const getBackgroundImage = (category, difficulty) => {
//     if (category === 'addition') {
//       switch (difficulty) {
//         case 'beginner':
//           return background1;
//         case 'intermediate':
//           return background2;
//         case 'advanced':
//           return background3;
//         default:
//           return null;
//       }
//     } else if (category === 'multiplication') {
//       switch (difficulty) {
//         case 'beginner':
//           return background7;
//         case 'intermediate':
//           return background8;
//         case 'advanced':
//           return background9;
//         default:
//           return null;
//       }
//     } else if (category === 'subtraction') {
//       switch (difficulty) {
//         case 'beginner':
//           return background4;
//         case 'intermediate':
//           return background5;
//         case 'advanced':
//           return background6;
//         default:
//           return null;
//       }
//     } else if (category === 'division') {
//       switch (difficulty) {
//         case 'beginner':
//           return background10;
//         case 'intermediate':
//           return background11;
//         case 'advanced':
//           return background12;
//         default:
//           return null;
//       }
//     }
//     return null;
//   };

//   useEffect(() => {
//     if (questionCount < 14) {
//       fetchQuestion();
//     }
//   }, [category, difficulty, questionCount, currentSubLevel]);

//   useEffect(() => {
//     // Record start time when a new question is fetched
//     setStartTime(Date.now());
//   }, [questionData]);
  
//   const fetchQuestion = async () => {
//     try {
//       console.log(`Fetching question in sub-level: ${currentSubLevel}`);
//       const response = await axios.get(
//         `http://localhost:3001/api/questions/generate/${category}/${difficulty}/${currentSubLevel}`
//       );
//       setQuestionData(response.data);
//     } catch (error) {
//       console.error('Error fetching question:', error);
//     }
//   };

//   const handleSubmit = () => {
//     if (userAnswer.trim() === '') return; // Prevent empty submissions

//     setIsAnswered(true); // Mark as answered

//     const isCorrect = questionData && parseFloat(userAnswer) === parseFloat(questionData.correctAnswer);
//     const endTime = Date.now(); // Capture end time
//     const responseTime = (endTime - startTime) / 1000; // Convert to seconds
   
//     setSubLevelStats((prevStats) => {
//       const subLevelIndex = currentSubLevel - 1; // Sublevel is 1-based, array is 0-based

//       const updatedAttempts = [...prevStats.attempts];
//       const updatedCorrectAnswers = [...prevStats.correctAnswers];
//       const updatedResponseTimes = [...prevStats.responseTimes];

//       // Increment attempts for the current sublevel
//       updatedAttempts[subLevelIndex] += 1;

//       // Increment correct answers if correct
//       if (isCorrect) {
//         updatedCorrectAnswers[subLevelIndex] += 1;
//       }

//       // Add response time to the respective sublevel
//       updatedResponseTimes[subLevelIndex].push(responseTime);

//       return {
//         attempts: updatedAttempts,
//         correctAnswers: updatedCorrectAnswers,
//         responseTimes: updatedResponseTimes,
//       };
//     });

//     setAnswerResults((prevResults) => {
//       const updatedResults = [...prevResults];
//       updatedResults[questionCount] = isCorrect;
//       return updatedResults;
//     });

//     if (isCorrect) {
//       setCorrectCount((prev) => prev + 1);
//       setMessage(shuffleMessages(positiveMessages));

//       // Increase sub-level (if not at max)
//       setCurrentSubLevel((prevLevel) => Math.min(prevLevel + 1, 4));
//     } else {
//       setShowExplanation(true); // Show AI Explanation if answer is wrong
//       setIncorrectCount((prev) => prev + 1);
//       setMessage(shuffleMessages(motivationalMessages));

//       // Keep sub-level the same
//     }
//     setIsAnswered(true);
//   };

//   const handleNextQuestion = () => {
//     setIsAnswered(false); // Reset answer state
//     setUserAnswer(''); // Clear input
//     setQuestionCount((prevCount) => prevCount + 1);
//     setMessage('');
//     setShowExplanation(false);//Reset the explanation state

//   };

//   const shuffleMessages = (messages) => {
//     return messages[Math.floor(Math.random() * messages.length)];
//   };

//   // const handleFinalSubmit = async () => {
//   //   const avgResponseTimes = subLevelStats.responseTimes.map(
//   //     (times) => (times.reduce((a, b) => a + b, 0) / times.length) || 0
//   //   );
//   //   const quizData = {
//   //     category,
//   //     difficulty,
//   //     noOfQuestions: questionCount + 1,
//   //     correctCount,
//   //     incorrectCount,
//   //     noOfAttemptsInSubLevel1: subLevelStats.attempts[0],
//   //     noOfAttemptsInSubLevel2: subLevelStats.attempts[1],
//   //     noOfAttemptsInSubLevel3: subLevelStats.attempts[2],
//   //     noOfAttemptsInSubLevel4: subLevelStats.attempts[3],
//   //     noOfCorrectQuestionsInSubLevel1: subLevelStats.correctAnswers[0],
//   //     noOfCorrectQuestionsInSubLevel2: subLevelStats.correctAnswers[1],
//   //     noOfCorrectQuestionsInSubLevel3: subLevelStats.correctAnswers[2],
//   //     noOfCorrectQuestionsInSubLevel4: subLevelStats.correctAnswers[3],
//   //     avgResponseTimeForSubLevel1: avgResponseTimes[0],
//   //     avgResponseTimeForSubLevel2: avgResponseTimes[1],
//   //     avgResponseTimeForSubLevel3: avgResponseTimes[2],
//   //     avgResponseTimeForSubLevel4: avgResponseTimes[3],
//   //     childId // Explicitly add childId
//   //   };


//   //   try {
//   //     const response = await axios.post('http://localhost:3001/api/questions/quiz', quizData);
//   //     console.log('Backend response:', response.data); // Debug backend response

//   //     // Ensure childId is still available
//   //     console.log('Navigating with:', { state: { quizData, childId } });

//   //     navigate('/quiz-summary', { state: { quizData, childId } });
//   //   } catch (error) {
//   //     console.error('Error saving quiz data:', error.response ? error.response.data : error.message);
//   //   }
//   // };

//   const handleFinalSubmit = async () => {
//     const avgResponseTimes = subLevelStats.responseTimes.map(
//       (times) => (times.reduce((a, b) => a + b, 0) / times.length) || 0
//     );

//     try {
//       const response = await axios.post('http://localhost:3001/api/questions/quiz', {
//         category,
//         difficulty,
//         noOfQuestions: questionCount + 1,
//         correctCount,
//         incorrectCount,
//         noOfAttemptsInSubLevel1: subLevelStats.attempts[0],
//         noOfAttemptsInSubLevel2: subLevelStats.attempts[1],
//         noOfAttemptsInSubLevel3: subLevelStats.attempts[2],
//         noOfAttemptsInSubLevel4: subLevelStats.attempts[3],
//         noOfCorrectQuestionsInSubLevel1: subLevelStats.correctAnswers[0],
//         noOfCorrectQuestionsInSubLevel2: subLevelStats.correctAnswers[1],
//         noOfCorrectQuestionsInSubLevel3: subLevelStats.correctAnswers[2],
//         noOfCorrectQuestionsInSubLevel4: subLevelStats.correctAnswers[3],
//         avgResponseTimeForSubLevel1: avgResponseTimes[0],
//         avgResponseTimeForSubLevel2: avgResponseTimes[1],
//         avgResponseTimeForSubLevel3: avgResponseTimes[2],
//         avgResponseTimeForSubLevel4: avgResponseTimes[3],
//         childId // Explicitly add childId
//       });

//       console.log('Backend response:', response.data); // Debug backend response

//       const quizData = response.data; // Assign backend response to quizData

//       // Ensure childId is included
//       console.log('Navigating with:', { state: { quizData, childId } });

//       navigate('/quiz-summary', { state: { quizData, childId } });
//     } catch (error) {
//       console.error('Error saving quiz data:', error.response ? error.response.data : error.message);
//     }
// };


//   return (
//     <div
//       className="question-page"
//       style={{
//         backgroundImage: `url(${getBackgroundImage(category, difficulty)})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="question-container">
//         {questionData && !isAnswered ? (
//           <>
//             <p className="question11">{questionData.question}</p>
//             <h2>Type your answer here</h2>
//             <input
//               type="text"
//               value={userAnswer}
//               onChange={(e) => setUserAnswer(e.target.value)}
//             />{' '}
//             <br />
//             <button className="button1" onClick={handleSubmit}>
//               Submit
//             </button>
//           </>
//         ) : (
//           <div className="feedbackpage">
//             <h1
//               style={{
//                 color: answerResults[questionCount] ? 'green' : 'red',
//                 fontSize: '100px',
//                 fontWeight: 'bold',
//                 marginTop: '10px',
//               }}
//             >
//               {answerResults[questionCount] ? 'Correct!!' : 'Wrong!!'}
//             </h1>
//             <div className="animation-container">
//               {answerResults[questionCount] ? (
//                 <img src={cheerGif} alt="Cheering Animation" className="animation" />
//               ) : (
//                 <img src={sadGif} alt="Sad Animation" className="animation" />
//               )}
//             </div>
//             <h2 className="message-display">{message}</h2>

//             {!answerResults[questionCount] && (
//   <>
//     <h1 style={{ marginTop: '10px' }}>Correct Answer: {questionData?.correctAnswer}</h1>
    
//     {/* Show AI-based math explanation when answer is incorrect */}
//     {/* {showExplanation && (
//       <MathExplanationAI problem={questionData?.question} />
//     )} */}
//           <button className="show-explanation-btn" onClick={() => setShowExplanation(true)}>
//         Show Explanation
//       </button>

//       {showExplanation && (
//         <MathExplanationAI problem={questionData?.question} onClose={() => setShowExplanation(false)} />
//       )}
//   </>
// )}

//             {questionCount < 14 ? (
//               <button className="button1111" onClick={handleNextQuestion}>
//                 Next
//               </button>
//             ) : (
//               <button className="button1111" onClick={handleFinalSubmit}>
//                 Submit
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//       <QuestionCountDisplay
//         currentCount={questionCount}
//         answerResults={answerResults}
//       />
//     </div>
//   );
// };

// const QuestionCountDisplay = ({ currentCount, answerResults }) => {
//   return (
//     <div className='question-count-grid'>
//       <h2>Answered Questions</h2>
//       <div>
//       </div>
//       <div></div>
//       {Array(15).fill(null).map((_, index) => (
//         <div
//           key={index}
//           className={`question-box ${answerResults[index] === true ? 'correct' : answerResults[index] === false ? 'wrong' : ''}`}
//         >
//           {index + 1} 
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuestionDisplay;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './QuestionDisplay.css';
import cheerGif from './img/cheer.gif';
import sadGif from './img/sad.gif';
import background1 from './img/background1.png';
import background2 from './img/background2.png';
import background3 from './img/background3.png';
import background4 from './img/background4.png';
import background5 from './img/background5.png';
import background6 from './img/background6.png';
import background7 from './img/background7.png';
import background8 from './img/background8.png';
import background9 from './img/background9.png';
import background10 from './img/background10.png';
import background11 from './img/background11.png';
import background12 from './img/background12.png';

import MathExplanationAI from './MathExplanationAI'; // Import the MathExplanation component

const positiveMessages = [
  'You are awesome!',
  'Incredible work!',
  'Fantastic job!',
  'Great thinking!',
  'Keep it up!',
  'Brilliant!',
];

const motivationalMessages = [
  "Don't worry, let's try again!",
  'Keep going, you’ll get it!',
  'No problem, you can do this!',
  'Mistakes are just learning opportunities!',
  "Don't give up!",
  'Stay positive and try again!',
];

const QuestionDisplay = () => {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const childId = location.state?.childId; // Access the childId passed A231in the stat


  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerResults, setAnswerResults] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [message, setMessage] = useState('');
  const [currentSubLevel, setCurrentSubLevel] = useState(1); // Track the current sub-level
  const [subLevelStats, setSubLevelStats] = useState({
    attempts: [0, 0, 0, 0], // Tracks attempts for sublevels 1-4
    correctAnswers: [0, 0, 0, 0], // Tracks correct answers for sublevels 1-4
    responseTimes: [[], [], [], []], // Tracks response times for sublevels 1-4
  });
  const [startTime, setStartTime] = useState(null); // Tracks the time when a question is displayed
  //const [showExplanation, setShowExplanation] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

 

  // Inside your component:
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
  // Start timer when a new question is displayed
  useEffect(() => {
    if (questionData && !isAnswered) {
      setTimer(0);
      setTimerActive(true);
    }
  }, [questionData]);
  
  // Timer logic
  useEffect(() => {
    let interval;
    
    if (timerActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  

  const getBackgroundImage = (category, difficulty) => {
    if (category === 'addition') {
      switch (difficulty) {
        case 'beginner':
          return background1;
        case 'intermediate':
          return background2;
        case 'advanced':
          return background3;
        default:
          return null;
      }
    } else if (category === 'multiplication') {
      switch (difficulty) {
        case 'beginner':
          return background7;
        case 'intermediate':
          return background8;
        case 'advanced':
          return background9;
        default:
          return null;
      }
    } else if (category === 'subtraction') {
      switch (difficulty) {
        case 'beginner':
          return background4;
        case 'intermediate':
          return background5;
        case 'advanced':
          return background6;
        default:
          return null;
      }
    } else if (category === 'division') {
      switch (difficulty) {
        case 'beginner':
          return background10;
        case 'intermediate':
          return background11;
        case 'advanced':
          return background12;
        default:
          return null;
      }
    }
    return null;
  };

  useEffect(() => {
    if (questionCount < 14) {
      fetchQuestion();
    }
  }, [category, difficulty, questionCount, currentSubLevel]);

  useEffect(() => {
    // Record start time when a new question is fetched
    setStartTime(Date.now());
  }, [questionData]);
  
  const fetchQuestion = async () => {
    try {
      console.log(`Fetching question in sub-level: ${currentSubLevel}`);
      const response = await axios.get(
        `http://localhost:3001/api/questions/generate/${category}/${difficulty}/${currentSubLevel}`
      );
      setQuestionData(response.data);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleSubmit = () => {
    if (userAnswer.trim() === '') return; // Prevent empty submissions

    setIsAnswered(true); // Mark as answered
    setTimerActive(false);

    const isCorrect = questionData && parseFloat(userAnswer) === parseFloat(questionData.correctAnswer);
    const endTime = Date.now(); // Capture end time
    const responseTime = (endTime - startTime) / 1000; // Convert to seconds
   
    setSubLevelStats((prevStats) => {
      const subLevelIndex = currentSubLevel - 1; // Sublevel is 1-based, array is 0-based

      const updatedAttempts = [...prevStats.attempts];
      const updatedCorrectAnswers = [...prevStats.correctAnswers];
      const updatedResponseTimes = [...prevStats.responseTimes];

      // Increment attempts for the current sublevel
      updatedAttempts[subLevelIndex] += 1;

      // Increment correct answers if correct
      if (isCorrect) {
        updatedCorrectAnswers[subLevelIndex] += 1;
      }

      // Add response time to the respective sublevel
      updatedResponseTimes[subLevelIndex].push(responseTime);

      return {
        attempts: updatedAttempts,
        correctAnswers: updatedCorrectAnswers,
        responseTimes: updatedResponseTimes,
      };
    });

    setAnswerResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults[questionCount] = isCorrect;
      return updatedResults;
    });

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setMessage(shuffleMessages(positiveMessages));

      // Increase sub-level (if not at max)
      setCurrentSubLevel((prevLevel) => Math.min(prevLevel + 1, 4));
    } else {
      setShowExplanation(true); // Show AI Explanation if answer is wrong
      setIncorrectCount((prev) => prev + 1);
      setMessage(shuffleMessages(motivationalMessages));

      // Keep sub-level the same
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false); // Reset answer state
    setUserAnswer(''); // Clear input
    setQuestionCount((prevCount) => prevCount + 1);
    setMessage('');
    setShowExplanation(false);//Reset the explanation state

  };

  const shuffleMessages = (messages) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleFinalSubmit = async () => {
    const avgResponseTimes = subLevelStats.responseTimes.map(
      (times) => (times.reduce((a, b) => a + b, 0) / times.length) || 0
    );

    try {
      const response = await axios.post('http://localhost:3001/api/questions/quiz', {
        category,
        difficulty,
        noOfQuestions: questionCount + 1,
        correctCount,
        incorrectCount,
        noOfAttemptsInSubLevel1: subLevelStats.attempts[0],
        noOfAttemptsInSubLevel2: subLevelStats.attempts[1],
        noOfAttemptsInSubLevel3: subLevelStats.attempts[2],
        noOfAttemptsInSubLevel4: subLevelStats.attempts[3],
        noOfCorrectQuestionsInSubLevel1: subLevelStats.correctAnswers[0],
        noOfCorrectQuestionsInSubLevel2: subLevelStats.correctAnswers[1],
        noOfCorrectQuestionsInSubLevel3: subLevelStats.correctAnswers[2],
        noOfCorrectQuestionsInSubLevel4: subLevelStats.correctAnswers[3],
        avgResponseTimeForSubLevel1: avgResponseTimes[0],
        avgResponseTimeForSubLevel2: avgResponseTimes[1],
        avgResponseTimeForSubLevel3: avgResponseTimes[2],
        avgResponseTimeForSubLevel4: avgResponseTimes[3],
        childId // Explicitly add childId
      });

      console.log('Backend response:', response.data); // Debug backend response

      const quizData = response.data; // Assign backend response to quizData

      // Ensure childId is included
      console.log('Navigating with:', { state: { quizData, childId } });

      navigate('/quiz-summary', { state: { quizData, childId } });
    } catch (error) {
      console.error('Error saving quiz data:', error.response ? error.response.data : error.message);
    }
};


  return (
    <div
      className="question-page"
      style={{
        backgroundImage: `url(${getBackgroundImage(category, difficulty)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
  

      <div className="question-container">
        {questionData && !isAnswered ? (
          <>
          <div className="timer-display"
          style={{
           
            position: 'absolute',
    top: '70px',
    left: '100px',
    backgroundColor: 'rgba(255, 255, 255,0.92)',
    padding: '10px 15px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    zIndex: 10
          }}>
          {formatTime(timer)}
        </div>
            <p className="question11">{questionData.question}</p>
            <h2>Type your answer here</h2>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />{' '}
            <br />
            <button className="button1" onClick={handleSubmit}>
              Submit
            </button>
          </>
        ) : (
          <div className="feedbackpage">
            <h1
              style={{
                color: answerResults[questionCount] ? 'green' : 'red',
                fontSize: '100px',
                fontWeight: 'bold',
                marginTop: '10px',
                marginBottom: '5px',
              }}
            >
              {answerResults[questionCount] ? 'Correct!!' : 'Wrong!!'}
            </h1>
            <div className="animation-container">
              {answerResults[questionCount] ? (
                <img src={cheerGif} alt="Cheering Animation" className="animation" />
              ) : (
                // <img src={sadGif} alt="Sad Animation" className="animation" />
                <div class="tooltip-container">
                  
  <button class="show-explanation-btn" onClick={() => setShowExplanation(true)}>
  <img src="/images/owllll.png" alt="Show Explanation"/>
  </button>
  <span class="tooltip-text">Show Explanation</span>
</div>
              )}
            </div>
            <h2 className="message-display">{message}</h2>

            {!answerResults[questionCount] && (
  <>
    <h1 style={{ marginTop: '10px',marginBottom:'10px' }}>Correct Answer: {questionData?.correctAnswer}</h1>
    
           {/* <button className="show-explanation-btn" onClick={() => setShowExplanation(true)}>
        Show Explanation
      </button>  */}
      {/* <div class="tooltip-container">
  <button class="show-explanation-btn" onClick={() => setShowExplanation(true)}>
  <img src="/images/owllll.png" alt="Show Explanation"/>
  </button>
  <span class="tooltip-text">Show Explanation</span>
</div> */}

      {showExplanation && (
        <MathExplanationAI problem={questionData?.question} onClose={() => setShowExplanation(false)} />
      )}
  </>
)}

            {questionCount < 14 ? (
              <button className="button1111" onClick={handleNextQuestion}>
                Next
              </button>
            ) : (
              <button className="button1111" onClick={handleFinalSubmit}>
                Submit
              </button>
            )}
          </div>
        )}
      </div>
      <QuestionCountDisplay
        currentCount={questionCount}
        answerResults={answerResults}
      />
    </div>
  );
};

const QuestionCountDisplay = ({ currentCount, answerResults }) => {
  return (
    
    <div className='question-count-grid'>
      <h2>Answered Questions</h2>
      <div>
      </div>
      <div></div>
      {Array(15).fill(null).map((_, index) => (
        <div
          key={index}
          className={`question-box ${answerResults[index] === true ? 'correct' : answerResults[index] === false ? 'wrong' : ''}`}
        >
          {index + 1} 
        </div>
      ))}
    </div>
    
  );
};



export default QuestionDisplay;


