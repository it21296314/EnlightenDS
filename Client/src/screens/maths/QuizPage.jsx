
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const QuizPage = () => {
//   const { category, difficulty } = useParams();
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [showAnswers, setShowAnswers] = useState(false);

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

  // const handleSubmit = () => {
  //   // Calculate score
  //   let correctAnswers = 0;

  //   quizQuestions.forEach((question, index) => {
  //     const userAnswer = parseFloat(userAnswers[index]); // Convert to number if needed
  //     if (userAnswer === question.correctAnswer) {
  //       correctAnswers++;
  //     }
  //   });

  //   setScore((correctAnswers / quizQuestions.length) * 100); // Score as percentage
  // };

//   const handleShowAnswers = () => {
//     setShowAnswers(true); // Show correct answers when the button is clicked
//   };

//   return (
//     <div>
//       <h1>Quiz - {category.charAt(0).toUpperCase() + category.slice(1)} ({difficulty})</h1>

//       {score === null ? (
//         <>
//           {quizQuestions.length > 0 ? (
//             <form>
//               {quizQuestions.map((question, index) => (
//                 <div key={index} style={{ marginBottom: '20px' }}>
//                   <h3>Question {index + 1}:</h3>
//                   <p>{question.question}</p>
//                   <input
//                     type="text"
//                     value={userAnswers[index] || ''} // Pre-fill if user already answered
//                     onChange={(e) => handleInputChange(index, e.target.value)}
//                     placeholder="Enter your answer"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 style={{
//                   marginTop: '20px',
//                   padding: '10px 20px',
//                   backgroundColor: '#007BFF',
//                   color: '#fff',
//                   border: 'none',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Submit
//               </button>
//             </form>
//           ) : (
//             <p>Loading questions...</p>
//           )}
//         </>
//       ) : (
//         <div>
//           <h2>Your Score: {score}%</h2>
//           <button
//             onClick={handleShowAnswers}
//             style={{
//               marginTop: '20px',
//               padding: '10px 20px',
//               backgroundColor: '#28A745',
//               color: '#fff',
//               border: 'none',
//               cursor: 'pointer',
//             }}
//           >
//             Show Correct Answers
//           </button>
//           {showAnswers && (
//             <div style={{ marginTop: '20px' }}>
//               {quizQuestions.map((question, index) => (
//                 <div key={index} style={{ marginBottom: '20px' }}>
//                   <h3>Question {index + 1}:</h3>
//                   <p>{question.question}</p>
//                   <p>
//                     <strong>Your Answer:</strong>{' '}
//                     {userAnswers[index] !== undefined ? userAnswers[index] : 'Not Answered'}
//                   </p>
//                   <p>
//                     <strong>Correct Answer:</strong> {question.correctAnswer}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
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
const QuizPage = () => {
  const { category, difficulty } = useParams();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // State for tracking current question in slideshow

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/quizs/quiz/${category}/${difficulty}`);
        setQuizQuestions(response.data);
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

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;

    quizQuestions.forEach((question, index) => {
      const userAnswer = parseFloat(userAnswers[index]); // Convert to number if needed
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    setScore((correctAnswers / quizQuestions.length) * 100); // Score as percentage
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