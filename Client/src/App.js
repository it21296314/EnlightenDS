import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import Savi from './screens/maths/savi';
import MainPage from './screens/mainpage';
import LevelSelection from './screens/maths/LevelSelection';
import QuestionDisplay from './screens/maths/QuestionDisplay';
import AnswerFeedback from './screens/maths/AnswerFeedback';
import NextQuestion from './screens/maths/NextQuestion';
import QuizPage from './screens/maths/QuizPage';
import ResultsPage from './screens/maths/ResultsPage';
import PronunciationChecker from './screens/pronunciation/PronunciationChecker/PronunciationChecker';
import BeginnerCategory from './screens/pronunciation/BeginnerCategory/BeginnerCategory';
import PronunciationHome from "./screens/pronunciation/pronunciationHome/pronunciationHome";

function App() {
  return (
    <div className="app" style={{
          width: '100%',
          height: '100%'
    }}>
      <BrowserRouter>
          <Routes>

            

        <Route path="/" element={<MainPage />} />
        <Route path="/LevelSelection" element={<LevelSelection />} />
        <Route path="/questions/:category/:difficulty" element={<QuestionDisplay />} />
        <Route path="/answer-feedback" element={<AnswerFeedback />} />
        <Route path="/next-question" element={<NextQuestion />} />
        <Route path="/quiz/:category/:difficulty" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/pro" element={<PronunciationHome/>} />
        <Route path="/beginner-category" element={<BeginnerCategory />} />
        <Route
          path="/pronunciation/checker/:category"
          element={<PronunciationChecker />}
        />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
