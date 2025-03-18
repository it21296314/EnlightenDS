/*import React, { useState } from 'react'
import "./questions.css";

export default function Questions(){

    const [checked, setChecked]=useState(undefined)

    function onSelect(){
        setChecked(true)
        console.log('radio button change')
    }
    return (
        <div className='question'>
            <h1 className='text' >Questions 1</h1>

            <ul>
                <li>
                    <input
                    type='radio'
                    value={true}
                    name='options'
                    id='q1-option'
                    onChange={onSelect()}></input>
                    <label className='text-primary' htmlFor='q1-option'>option</label>
                    <div className='checked'></div>
                </li>
            </ul>
        </div>
    )
}*/

import React, { useState } from 'react';

const Questions = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

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
    }
  };

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

  const renderOptions = (question) => {
    const isAnswerCorrect = userAnswer === question.correctAnswer;
    const correctOption = question.correctAnswer;
    const isSelected = userAnswer !== null;

    return (
      <div className="space-y-4">
        {['A', 'B', 'C', 'D'].map((option) => {
          const isCorrect = option === correctOption;
          const isSelectedOption = userAnswer === option;
          const isNotSelectedOption = userAnswer !== option;
          const shouldHighlightCorrectAnswer =
            (!isSelected && isCorrect && isAnswerCorrect) ||
            (isSelected && isCorrect && isSelectedOption);

          return (
            <label key={option} className={`flex items-center space-x-2 p-2 rounded `}>
              <input
                type="radio"
                value={option}
                checked={isSelectedOption}
                onChange={() => handleAnswerSelection(option)}
                disabled={isAnswered}
              />
              <span
                className={`
                ${isSelectedOption && isCorrect && 'text-success'}
                ${isSelectedOption && !isCorrect ? 'text-red-500' : ''}
                ${isSelectedOption && isCorrect ? 'font-bold' : ''}
                ${isNotSelectedOption && userAnswer && isCorrect ? 'font-bold' : ''}
                ${isNotSelectedOption && userAnswer && isCorrect ? 'text-success' : ''}
                `}
              >
                {question[`option${option}`]}
              </span>
              {isSelectedOption && isCorrect && <span className="ml-2 text-success">✅</span>}
              {isNotSelectedOption && userAnswer && isCorrect && <span className="ml-2 text-success">✅</span>}
              {isSelectedOption && !isCorrect && <span className="ml-2 text-red-500">❌</span>}
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
    <div className="max-w mx-auto p-4 bg-white rounded-card flex flex-col">
      {currentQuestionIndex + 1 < questions.length && (
        <div className="flex justify-end text-sm mb-4">
          <div className="flex flex-col items-end">
            <p className="font-medium text-success mb-1">
              Number of Correct Answers: {numCorrect}
            </p>
            <p className="font-medium text-failed mb-1">
              Number of Wrong Answers: {numWrong}
            </p>
            <p className="font-medium">Correct Answers: {getFraction()}</p>
          </div>
        </div>
      )}
      {currentQuestionIndex + 1 < questions.length ? (
        <div>
          <h3 className="text-xl mb-2">Question {currentQuestionIndex + 1}</h3>
          <p className="text-lg font-semibold mb-4">
            {currentQuestion.question}
          </p>
          {renderOptions(currentQuestion)}
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className="mt-4 px-4 py-2 bg-blue-500 cursor-pointer text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-normal text-center  mb-2">
            Quiz Completed
          </h3>
          <div className="flex justify-center text-lg mb-4">
            <div className="flex flex-col items-center">
              <p className="font-medium text-success mb-1">
                Number of Correct Answers: {numCorrect}
              </p>
              <p className="font-medium text-failed mb-1">
                Number of Wrong Answers: {numWrong}
              </p>
              <p className="font-medium">Correct Answers: {getFraction()}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleTakeQuizAgain}
              className=" px-4 py-2 bg-brandBlue text-white font-semibold rounded-card  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Take the Quiz Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
