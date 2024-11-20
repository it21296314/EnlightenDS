
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import './QuestionDisplay.css'; // Import your CSS file

// // // const QuestionDisplay = () => {
// // //   const { category, difficulty } = useParams();
// // //   const navigate = useNavigate();

// // //   const [questionData, setQuestionData] = useState(null);
// // //   const [userAnswer, setUserAnswer] = useState('');
// // //   const [questionCount, setQuestionCount] = useState(0);
// // //   const [isAnswered, setIsAnswered] = useState(false);
// // //   const [answerResults, setAnswerResults] = useState([]); // Track correct/incorrect answers

// // //   useEffect(() => {
// // //     if (questionCount < 5) {
// // //       fetchQuestion();
// // //     }
// // //   }, [category, difficulty, questionCount]);

// // //   const fetchQuestion = async () => {
// // //     try {
// // //       console.log(`Fetching question number: ${questionCount + 1}`);
// // //       const response = await axios.get(`http://localhost:3001/api/questions/generate/${category}/${difficulty}`);
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
// // //   };

// // //   const handleNextQuestion = () => {
// // //     setIsAnswered(false); // Reset answer state
// // //     setUserAnswer(''); // Clear input
// // //     setQuestionCount((prevCount) => prevCount + 1);
// // //   };

// // //   return (
// // //     <div className='question-container'>
// // //      <QuestionCountDisplay currentCount={questionCount} answerResults={answerResults} />
     
// // //       {questionData && !isAnswered ? (
// // //         <>
// // //           <p className='question11'>{questionData.question} = ?</p>
// // //           <h2>Type your answer here</h2>
// // //           <input
// // //             type="text"
// // //             value={userAnswer}
// // //             onChange={(e) => setUserAnswer(e.target.value)}
// // //           /> <br></br>
// // //           <button className='button1' onClick={handleSubmit}>Submit</button>
           
// // //         </>
// // //       ) : (
// // //         <>
// // //           <h1>{answerResults[questionCount] ? 'Correct!' : 'Wrong!'}</h1>
// // //           {!answerResults[questionCount] && <p>Correct Answer: {questionData?.correctAnswer}</p>}
// // //           {questionCount < 5 ? (
// // //             <button className='button2' onClick={handleNextQuestion}>Next Question</button>
// // //           ) : (
// // //             <button className='button3' onClick={() => navigate(`/quiz/${category}/${difficulty}`)}>Attempt Quiz</button>
// // //           )}
// // //         </>
// // //       )}
      
// // //     </div>
// // //   );
// // // };

// // // const QuestionCountDisplay = ({ currentCount, answerResults }) => {
// // //   return (
// // //     <div className='question-count-display'>
// // //       {Array(20).fill(null).map((_, index) => (
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import './QuestionDisplay.css'; // Import your CSS file

// import cheerGif from './img/cheer.gif'; // Add your cheering animation
// import sadGif from './img/sad.gif';    
// import background1 from './img/background1.png'
// import background2 from './img/background2.png'
// import background3 from './img/background3.png'
// import background4 from './img/background4.png'
// import background5 from './img/background5.png'
// import background6 from './img/background6.png'
// import background7 from './img/background7.png'
// import background8 from './img/background8.png'
// import background9 from './img/background9.png'
// import background10 from './img/background10.png'
// import background11 from './img/background11.png'
// import background12 from './img/background12.png'

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

//   const [questionData, setQuestionData] = useState(null);
//   const [userAnswer, setUserAnswer] = useState('');
//   const [questionCount, setQuestionCount] = useState(0);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [answerResults, setAnswerResults] = useState([]); // Track correct/incorrect answers
//   const [correctCount, setCorrectCount] = useState(0);
//   const [incorrectCount, setIncorrectCount] = useState(0);
//   const [message, setMessage] = useState('');

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
//     if (questionCount < 5) {
//       fetchQuestion();
//     }
//   }, [category, difficulty, questionCount]);

//   const fetchQuestion = async () => {
//     try {
//       console.log(`Fetching question number: ${questionCount + 1}`);
//       const response = await axios.get(`http://localhost:3001/api/questions/generate/${category}/${difficulty}`);
//       setQuestionData(response.data);
//     } catch (error) {
//       console.error('Error fetching question:', error);
//     }
//   };



//   const handleSubmit = () => {
//     if (userAnswer.trim() === '') return; // Prevent empty submissions

//     setIsAnswered(true); // Mark as answered

//     const isCorrect = questionData && parseFloat(userAnswer) === parseFloat(questionData.correctAnswer);
//     setAnswerResults((prevResults) => {
//       const updatedResults = [...prevResults];
//       updatedResults[questionCount] = isCorrect;
//       return updatedResults;
//     });

//     // Update correct or incorrect count and set a message
//     if (isCorrect) {
//       setCorrectCount((prev) => {
//         const newCount = prev + 1;
//         setMessage(positiveMessages[newCount - 1] || shuffleMessages(positiveMessages));
//         return newCount;
//       });
//     } else {
//       setIncorrectCount((prev) => {
//         const newCount = prev + 1;
//         setMessage(motivationalMessages[newCount - 1] || shuffleMessages(motivationalMessages));
//         return newCount;
//       });
//     }
//   };

//   const handleNextQuestion = () => {
//     setIsAnswered(false); // Reset answer state
//     setUserAnswer(''); // Clear input
//     setQuestionCount((prevCount) => prevCount + 1);
//     setMessage(''); 
//   };

//   // Function to shuffle messages if predefined ones are used up
//   const shuffleMessages = (messages) => {
//     return messages[Math.floor(Math.random() * messages.length)];
//   };

// return (
//   <div
//     className="question-page"
//     style={{
//       backgroundImage: `url(${getBackgroundImage(category, difficulty)})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//     }}
//   >
//     <div className="question-container">
//       {questionData && !isAnswered ? (
//         <>
//           <p className="question11">{questionData.question}</p>
//           <h2>Type your answer here</h2>
//           <input
//             type="text"
//             value={userAnswer}
//             onChange={(e) => setUserAnswer(e.target.value)}
//           />{' '}
//           <br />
//           <button className="button1" onClick={handleSubmit}>
//             Submit
//           </button>
//         </>
//       ) : (
//         <div className='feedbackpage'>
//           <h1
//             style={{
//               color: answerResults[questionCount] ? 'green' : 'red',
//               fontSize: '100px',
//               fontWeight: 'bold',
//             }}
//           >
//             {answerResults[questionCount] ? 'Correct!!' : 'Wrong!!'}
//           </h1>
//           <div className="animation-container">
//             {answerResults[questionCount] ? (
//               <img src={cheerGif} alt="Cheering Animation" className="animation" />
//             ) : (
//               <img src={sadGif} alt="Sad Animation" className="animation" />
//             )}
//           </div>
//           <h2 className="message-display">{message}</h2>
//           {!answerResults[questionCount] && (
//             <h1>Correct Answer: {questionData?.correctAnswer}</h1>
//           )}
//           {questionCount < 5 ? (
//             <button className="button1" onClick={handleNextQuestion}>
//               Next
//             </button>
//           ) : (
//             <button
//               className="button1"
//               onClick={() => navigate(`/quiz/${category}/${difficulty}`)}
//             >
//               Attempt Quiz
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//     <QuestionCountDisplay
//       currentCount={questionCount}
//       answerResults={answerResults}
//     />
//   </div>
// );
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
import { useParams, useNavigate } from 'react-router-dom';
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

  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerResults, setAnswerResults] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [message, setMessage] = useState('');
  const [currentSubLevel, setCurrentSubLevel] = useState(1); // Track the current sub-level

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
    if (questionCount < 5) {
      fetchQuestion();
    }
  }, [category, difficulty, questionCount, currentSubLevel]);

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

    const isCorrect = questionData && parseFloat(userAnswer) === parseFloat(questionData.correctAnswer);
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
      setIncorrectCount((prev) => prev + 1);
      setMessage(shuffleMessages(motivationalMessages));

      // Keep sub-level the same
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false); // Reset answer state
    setUserAnswer(''); // Clear input
    setQuestionCount((prevCount) => prevCount + 1);
    setMessage('');
  };

  const shuffleMessages = (messages) => {
    return messages[Math.floor(Math.random() * messages.length)];
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
              }}
            >
              {answerResults[questionCount] ? 'Correct!!' : 'Wrong!!'}
            </h1>
            <div className="animation-container">
              {answerResults[questionCount] ? (
                <img src={cheerGif} alt="Cheering Animation" className="animation" />
              ) : (
                <img src={sadGif} alt="Sad Animation" className="animation" />
              )}
            </div>
            <h2 className="message-display">{message}</h2>
            {!answerResults[questionCount] && (
              <h1>Correct Answer: {questionData?.correctAnswer}</h1>
            )}
            {questionCount < 5 ? (
              <button className="button1" onClick={handleNextQuestion}>
                Next
              </button>
            ) : (
              <button
                className="button1"
                onClick={() => navigate(`/quiz/${category}/${difficulty}`)}
              >
                Attempt Quiz
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

// const QuestionCountDisplay = ({ currentCount, answerResults }) => {
//   return (
//     <div className='question-count-grid'>
//       <h2>Answered Questions</h2>
//       <div>

//         {Array(15)
//           .fill(null)
//           .map((_, index) => (
//             <div
//               key={index}
//               className={`question-box ${
//                 answerResults[index] === true
//                   ? 'correct'
//                   : answerResults[index] === false
//                   ? 'wrong'
//                   : ''
//               }`}
//             >
//               {index + 1}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

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
