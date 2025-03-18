import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./QuestionDisplayComponent.css";

const Quiz = ({ questions, userId, questionCollectionId }) => {
  useEffect(() => {
    console.log("Quiz component props:", {
      hasQuestions: !!questions,
      questionsLength: questions?.length,
      userId,
      questionCollectionId
    });
  }, [questions, userId, questionCollectionId]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [firstAnswerTime, setFirstAnswerTime] = useState(null); 
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);


  const handleAnswerSelection = (selectedOption) => {
    if (!isAnswered) {
      setUserAnswer(selectedOption);
      setIsAnswered(true);
      const currentQuestion = questions[currentQuestionIndex];
      if (selectedOption === currentQuestion.correctAnswer) {
        setNumCorrect((prev) => prev + 1);
      } else {
        setNumWrong((prev) => prev + 1);
      }
      if (!firstAnswerTime) { 
        setFirstAnswerTime(Date.now()); }
    }
  };
  useEffect(() => { 
    if ((questions.length - currentQuestionIndex - 1) === 0 && firstAnswerTime) { const endTime = Date.now(); 
    setTotalTimeSpent(Math.floor((endTime - firstAnswerTime) / 1000)); } }, [currentQuestionIndex, firstAnswerTime]);

  const handleNextQuestion = () => {
    setUserAnswer(null);
    setIsAnswered(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleTakeQuizAgain = () => {
    setCurrentQuestionIndex(0);
    setNumCorrect(0);
    setNumWrong(0);
    setUserAnswer(null);
    setIsAnswered(false);
    setQuizCompleted(false);
  };

  const handleSubmitScore = async () => {
    try {
      console.log("Submitting score with data:", {
        userId,
        questionCollectionId,
        numCorrect,
        numWrong,
        totalTimeSpent,
      });

      const response = await axios.post("http://localhost:3001/api/quizzes/save-score", {
        userId,
        questionCollectionId,
        numCorrect,
        numWrong,
        totalTimeSpent,
      });
      
      console.log("Server response:", response.data);
      
      if (response.status === 200) {
        alert("Score saved successfully!");
      }
    } catch (error) {
      console.error("Error saving score:", error.response?.data || error.message);
      alert(`Failed to save score: ${error.response?.data?.error || error.message}`);
    }
  };

  const renderOptions = (question) => {
    const isAnswerCorrect = userAnswer === question.correctAnswer;
    const correctOption = question.correctAnswer;
    const isSelected = userAnswer !== null;

    return (
      <div className="space-y-4">
        {["A", "B", "C", "D"].map((option) => {
          const isCorrect = option === correctOption;
          const isWrong = option !== correctOption;
          const isSelectedOption = userAnswer === option;
          const isNotSelectedOption = userAnswer !== option;
          const shouldHighlightCorrectAnswer =
            (!isSelected && isCorrect && isAnswerCorrect) ||
            (isSelected && isCorrect && isSelectedOption);

          return (
            <label
              key={option}
              className={`flex items-center space-x-2 p-2 rounded `}
            >
              <input
                type="radio"
                value={option}
                checked={isSelectedOption}
                onChange={() => handleAnswerSelection(option)}
                disabled={isAnswered}
              />
              <span
                className={`
                ${isSelectedOption && isCorrect && "text-success"}
                ${isSelectedOption && isWrong ? "text-red-500" : ""}
                ${isSelectedOption && isCorrect ? "font-bold" : ""}
                ${
                  isNotSelectedOption && userAnswer && isCorrect
                    ? "font-bold"
                    : ""
                }
                ${
                  isNotSelectedOption && userAnswer && isCorrect
                    ? "text-success"
                    : ""
                }
                `}
              >
                {question[`option${option}`]}
              </span>
              {isSelectedOption && isCorrect && (
                <span className="ml-2 text-success">✅</span>
              )}
              {isNotSelectedOption && userAnswer && isCorrect && (
                <span className="ml-2 text-success">✅</span>
              )}
              {isSelectedOption && !isCorrect && (
                <span className="ml-2 text-red-500">❌</span>
              )}
            </label>
          );
        })}
      </div>
    );
  };

  const currentQuestion = questions[currentQuestionIndex];

  const getFraction = () => {
    const totalQuestions = questions.length;
    return `${numCorrect}/${totalQuestions}`;
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">Fun Learning Quiz! 🎯</h1>
      </div>

      {currentQuestionIndex + 1 < questions.length && (
        <div className="score-display">
          <p className="score-text">
            Correct: <span style={{ color: '#4CAF50' }}>{numCorrect}</span> | 
            Wrong: <span style={{ color: '#ff6b6b' }}>{numWrong}</span> | 
            Score: <span style={{ color: '#3498db' }}>{getFraction()}</span>
          </p>
          <p className="score-text">Time: {totalTimeSpent}s ⏱️</p>
        </div>
      )}

      {currentQuestionIndex + 1 < questions.length ? (
        <div className="question-container">
          <h3 className="question-number">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>
          <p className="question-text">{currentQuestion.question}</p>
          
          <div className="options-container">
            {renderOptions(currentQuestion)}
          </div>

          <div className="controls-container">
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className="button button-next"
            >
              Next Question ➡️
            </button>
          </div>
        </div>
      ) : (
        <div className="results-container">
          <h3 className="results-title">Quiz Completed! 🎉</h3>

          <div className="stats-grid">
            <div className="stat-box">
              <p className="stat-label">Correct Answers</p>
              <p className="stat-value" style={{ color: '#4CAF50' }}>{numCorrect}</p>
            </div>

            <div className="stat-box">
              <p className="stat-label">Wrong Answers</p>
              <p className="stat-value" style={{ color: '#ff6b6b' }}>{numWrong}</p>
            </div>

            <div className="stat-box">
              <p className="stat-label">Final Score</p>
              <p className="stat-value" style={{ color: '#3498db' }}>{getFraction()}</p>
            </div>

            <div className="stat-box">
              <p className="stat-label">Time Spent</p>
              <p className="stat-value" style={{ color: '#f1c40f' }}>{totalTimeSpent}s</p>
            </div>
          </div>

          <div className="button-group">
            <button onClick={handleSubmitScore} className="button button-submit">
              Save Score 💾
            </button>
            <button onClick={handleTakeQuizAgain} className="button button-retry">
              Try Again 🔄
            </button>
            <Link to="/menu">
              <button className="button button-menu">
                Back to Menu 🏠
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./QuestionDisplayComponent.css";
// import axios from "axios";

// const Quiz = ({ questions }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [numCorrect, setNumCorrect] = useState(0);
//   const [numWrong, setNumWrong] = useState(0);
//   const [userAnswer, setUserAnswer] = useState(null);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [isAnswered, setIsAnswered] = useState(false);

//   const handleAnswerSelection = (selectedOption) => {
//     if (!isAnswered) {
//       setUserAnswer(selectedOption);
//       setIsAnswered(true);
//       const currentQuestion = questions[currentQuestionIndex];
//       if (selectedOption === currentQuestion.correctAnswer) {
//         setNumCorrect((prev) => prev + 1);
//       } else {
//         setNumWrong((prev) => prev + 1);
//       }
//     }
//   };

//   const handleNextQuestion = () => {
//     setUserAnswer(null);
//     setIsAnswered(false);
//     if (currentQuestionIndex + 1 < questions.length) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     } else {
//       setQuizCompleted(true);
//     }
//   };

//   // const handleTakeQuizAgain = () => {
//   //   setCurrentQuestionIndex(0);
//   //   setNumCorrect(0);
//   //   setNumWrong(0);
//   //   setUserAnswer(null);
//   //   setIsAnswered(false);
//   //   setQuizCompleted(false);
//   // };

//   const handleTakeQuizAgain = async () => {
//     try {
//       const questionCollectionId = questions[currentQuestionIndex]?.questionCollection;
      
//       // Send the final results to the backend
//       await axios.post(`http://localhost:3001/api/quizzes/update-results`, {
//         questionCollectionId,
//         numCorrect,
//         numWrong,
//       });
  
//       console.log("Results saved successfully.");
  
//       // Reset quiz state
//       setCurrentQuestionIndex(0);
//       setNumCorrect(0);
//       setNumWrong(0);
//       setUserAnswer(null);
//       setIsAnswered(false);
//       setQuizCompleted(false);
//     } catch (error) {
//       console.error("Error saving results:", error);
//     }
//   };
  

//   const renderOptions = (question) => {
//     const isAnswerCorrect = userAnswer === question.correctAnswer;
//     const correctOption = question.correctAnswer;
//     const isSelected = userAnswer !== null;

//     return (
//       <div className="space-y-4">
//         {["A", "B", "C", "D"].map((option) => {
//           const isCorrect = option === correctOption;
//           const isWrong = option !== correctOption;
//           const isSelectedOption = userAnswer === option;
//           const isNotSelectedOption = userAnswer !== option;
//           const shouldHighlightCorrectAnswer =
//             (!isSelected && isCorrect && isAnswerCorrect) ||
//             (isSelected && isCorrect && isSelectedOption);

//           return (
//             <label
//               key={option}
//               className={`flex items-center space-x-2 p-2 rounded `}
//             >
//               <input
//                 type="radio"
//                 value={option}
//                 checked={isSelectedOption}
//                 onChange={() => handleAnswerSelection(option)}
//                 disabled={isAnswered}
//               />
//               <span
//                 className={`
//                 ${isSelectedOption && isCorrect && "text-success"}
//                 ${isSelectedOption && isWrong ? "text-red-500" : ""}
//                 ${isSelectedOption && isCorrect ? "font-bold" : ""}
//                 ${
//                   isNotSelectedOption && userAnswer && isCorrect
//                     ? "font-bold"
//                     : ""
//                 }
//                 ${
//                   isNotSelectedOption && userAnswer && isCorrect
//                     ? "text-success"
//                     : ""
//                 }
//                 `}
//               >
//                 {question[`option${option}`]}
//               </span>
//               {isSelectedOption && isCorrect && (
//                 <span className="ml-2 text-success">✅</span>
//               )}
//               {isNotSelectedOption && userAnswer && isCorrect && (
//                 <span className="ml-2 text-success">✅</span>
//               )}
//               {isSelectedOption && !isCorrect && (
//                 <span className="ml-2 text-red-500">❌</span>
//               )}
//             </label>
//           );
//         })}
//       </div>
//     );
//   };

//   const currentQuestion = questions[currentQuestionIndex];

//   const getFraction = () => {
//     const totalQuestions = questions.length;
//     return `${numCorrect}/${totalQuestions}`;
//   };

//   return (
    
//     <div className="max-w mx-auto p-6 border border-gray-300 bg-white rounded-card flex flex-col">
//       {currentQuestionIndex + 1 < questions.length && (
//         <div className="correct_answers">
//           <form className="upForm">
//           <div className="flex flex-col items-end">
//             <p className="font-medium  text-success mb-1">
//               Number of Correct Answers: {numCorrect}
//             </p>
//             <p className="font-medium text-failed mb-1">
//               Number of Wrong Answers: {numWrong}
//             </p>
//             <p className="font-medium">Correct Answers: {getFraction()}</p>
//           </div>
//           </form>
//         </div>
        
//       )}
//       {currentQuestionIndex + 1 < questions.length ? (
//         <div >
//           <div className="Q">
//           <h3 className="hQ4" >
//             Question {currentQuestionIndex + 1}
//           </h3>
//           <div className="answers">
//           <p >
//             {currentQuestion.question}
//           </p>
//           {renderOptions(currentQuestion)}
//           </div>
//           </div>
//           <div className="flex justify-end">
//             <button
//               onClick={handleNextQuestion}
//               disabled={!isAnswered}
//               className="NQ">
//               Next Question
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <h3 className="hQ3">
//             Quiz Completed
//           </h3>

//           <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
//             <div className="px-4 py-5 sm:p-6">
//               <dt className="text-base font-normal text-gray-900">
//                 Number of Correct Answers:
//               </dt>
//               <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
//                 <div className="flex items-baseline text-3xl font-semibold text-success">
//                   {numCorrect}
//                 </div>
//               </dd>
//             </div>

//             <div className="px-4 py-5 sm:p-6">
//               <dt className="text-base font-normal text-gray-900">
//                 Number of Wrong Answers:
//               </dt>
//               <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
//                 <div className="flex items-baseline text-3xl font-semibold text-failed">
//                   {numWrong}
//                 </div>
//               </dd>
//             </div>

//             <div className="px-4 py-5 sm:p-6">
//               <dt className="text-base font-normal text-gray-900">
//                 Correct Answers:
//               </dt>
//               <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
//                 <div className="flex items-baseline text-3xl font-semibold text-indigo-600">
//                   {getFraction()}
//                 </div>
//               </dd>
//             </div>
//           </dl>

//           <div className="flex pt-10 justify-center">
//             <button
//               onClick={handleTakeQuizAgain}
//               className=" px-4 py-2 bg-brandBlue text-white font-semibold rounded-card  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             >
//               Take the Quiz Again
//             </button>
//           </div>
//           <div className="flex pt-10 justify-center">
//           <Link to="/menu">
//             <button className=" px-4 py-2 bg-brandBlue text-white font-semibold rounded-card  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             >
//               Back to main page
//             </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;
