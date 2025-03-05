import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./QuestionDisplayComponent.css";

const Quiz = ({ questions }) => {
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
    
    <div className="max-w mx-auto p-6 border border-gray-300 bg-white rounded-card flex flex-col">
      {currentQuestionIndex + 1 < questions.length && (
        <div className="correct_answers">
          <form className="upForm">
          <div className="flex flex-col items-end">
            <p className="font-medium  text-success mb-1">
              Number of Correct Answers: {numCorrect}
            </p>
            <p className="font-medium text-failed mb-1">
              Number of Wrong Answers: {numWrong}
            </p>
            <p className="font-medium">Correct Answers: {getFraction()}</p>
          </div>
          </form>
        </div>
        
      )}
      {currentQuestionIndex + 1 < questions.length ? (
        <div >
          <div className="Q">
          <h3 className="hQ4" >
            Question {currentQuestionIndex + 1}
          </h3>
          <div className="answers">
          <p >
            {currentQuestion.question}
          </p>
          {renderOptions(currentQuestion)}
          </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className="NQ">
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="hQ3">
            Quiz Completed
          </h3>

          <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">
                Number of Correct Answers:
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-3xl font-semibold text-success">
                  {numCorrect}
                </div>
              </dd>
            </div>

            <div className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">
                Number of Wrong Answers:
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-3xl font-semibold text-failed">
                  {numWrong}
                </div>
              </dd>
            </div>

            <div className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">
                Correct Answers:
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-3xl font-semibold text-indigo-600">
                  {getFraction()}
                </div>
              </dd>
            </div>
          </dl>

          <div className="flex pt-10 justify-center">
            <button
              onClick={handleTakeQuizAgain}
              className=" px-4 py-2 bg-brandBlue text-white font-semibold rounded-card  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Take the Quiz Again
            </button>
          </div>
          <div className="flex pt-10 justify-center">
          <Link to="/menu">
            <button className=" px-4 py-2 bg-brandBlue text-white font-semibold rounded-card  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Back to main page
            </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
