import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./screens/mainpage"; // Update the path as per your structure
import LevelSelection from "./screens/maths/LevelSelection";
import QuestionDisplay from "./screens/maths/QuestionDisplay";
import AnswerFeedback from "./screens/maths/AnswerFeedback";
import NextQuestion from "./screens/maths/NextQuestion";
import QuizPage from "./screens/maths/QuizPage";
import ResultsPage from "./screens/maths/ResultsPage";
import PronunciationHome from "./screens/pronunciation/pronunciationHome/pronunciationHome";
import PronunciationChecker from "./screens/pronunciation/PronunciationChecker/PronunciationChecker"

function App() {

  return (
    <div className="app" style={{ width: "100%", height: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/LevelSelection" element={<LevelSelection />} />
          <Route
            path="/questions/category/:difficulty"
            element={<QuestionDisplay />}
          />
          <Route path="/answer-feedback" element={<AnswerFeedback />} />
          <Route path="/next-question" element={<NextQuestion />} />
          <Route
            path="/quiz/:category/:difficulty"
            element={<QuizPage />}
          />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/pm" element={<PronunciationHome />} />
          <Route path="/pc" element={<PronunciationChecker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
