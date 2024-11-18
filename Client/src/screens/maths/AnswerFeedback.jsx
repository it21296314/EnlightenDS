// // // // src/components/AnswerFeedback.js
// // // import React from 'react';
// // // import { useLocation, useNavigate } from 'react-router-dom';

// // // const AnswerFeedback = () => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const { questionData, userAnswer } = location.state;
// // //   const isCorrect = userAnswer === questionData.correctAnswer;

// // //   return (
// // //     <div>
// // //       <h1>{isCorrect ? 'Correct!' : 'Wrong!'}</h1>
// // //       {!isCorrect && (
// // //         <p>
// // //           Correct Answer: {questionData.correctAnswer}
// // //         </p>
// // //       )}
// // //       <button onClick={() => navigate('/next-question', { state: { difficulty: questionData.difficulty } })}>
// // //         Next Question
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default AnswerFeedback;

// // // src/components/AnswerFeedback.js
















// // // import React from 'react';
// // // import { useLocation, useNavigate } from 'react-router-dom';

// // // const AnswerFeedback = () => {
// // // const location = useLocation();
// // // const navigate = useNavigate();

// // // const { questionData, userAnswer, endOfQuestions, category, difficulty, questionCount } = location.state;
// // // const isCorrect = userAnswer === questionData.correctAnswer;
// // // console.log(`Current question count in AnswerFeedback: ${questionCount}`);

// // //   const handleQuizNavigation = () => {
// // //     navigate(`/quiz/${questionData.category}/${questionData.difficulty}`, {
// // //       state: { category: questionData.category, difficulty: questionData.difficulty }
// // //     });
// // //   };

// // //   return (
// // //     <div>
// // //         <h1>{isCorrect ? 'Correct!' : 'Wrong!'}</h1>
// // //         {!isCorrect && (
// // //             <p>
// // //             Correct Answer: {questionData.correctAnswer}
// // //             </p>
// // //         )}
// // //         {endOfQuestions ? (
// // //             <button onClick={handleQuizNavigation}>Attempt Quiz</button>
// // //         ) : (
// // //             <button onClick={() => navigate(`/questions/${category}/${difficulty}`)}>Next Question</button>
// // //         )}
// // //     </div>
// // //   );
// // // };

// // // export default AnswerFeedback;


// // import React from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';

// // const AnswerFeedback = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { questionData, userAnswer, endOfQuestions, category, difficulty, questionCount } = location.state;
// //   const isCorrect = userAnswer === questionData.correctAnswer;

// //   console.log(`Current question count in AnswerFeedback: ${questionCount}`);

// //   const handleQuizNavigation = () => {
// //     navigate(`/quiz/${category}/${difficulty}`, {
// //       state: { category, difficulty }
// //     });
// //   };

// //   return (
// //     <div>
// //       <h1>{isCorrect ? 'Correct!' : 'Wrong!'}</h1>
// //       {!isCorrect && <p>Correct Answer: {questionData.correctAnswer}</p>}
// //       {endOfQuestions ? (
// //         <button onClick={handleQuizNavigation}>Attempt Quiz</button>
// //       ) : (
// //         <button onClick={() => navigate(`/questions/${category}/${difficulty}`)}>Next Question</button>
// //       )}
// //     </div>
// //   );
// // };

// // export default AnswerFeedback;

// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const AnswerFeedback = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { questionData, userAnswer, endOfQuestions, category, difficulty, questionCount } = location.state;
//   const isCorrect = userAnswer === questionData.correctAnswer;

//   console.log(`Current question count in AnswerFeedback: ${questionCount}`);

//   const handleQuizNavigation = () => {
//     navigate(`/quiz/${category}/${difficulty}`, {
//       state: { category, difficulty }
//     });
//   };

//   return (
//     <div>
//       <h1>{isCorrect ? 'Correct!' : 'Wrong!'}</h1>
//       {!isCorrect && <p>Correct Answer: {questionData.correctAnswer}</p>}
//       {endOfQuestions ? (
//         <button onClick={handleQuizNavigation}>Attempt Quiz</button>
//       ) : (
//         <button onClick={() => navigate(`/questions/${category}/${difficulty}`)}>Next Question</button>
//       )}
//     </div>
//   );
// };

// export default AnswerFeedback;
