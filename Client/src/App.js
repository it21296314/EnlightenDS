import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Savi from './screens/maths/savi';
import MainPage from './screens/mainpage';
import SignUp from './screens/signupPage';
import SignIn from './screens/signinPage';
import Home from './screens/Home';
import LevelSelection from './screens/maths/LevelSelection';
import QuestionDisplay from './screens/maths/QuestionDisplay';
import AnswerFeedback from './screens/maths/AnswerFeedback';
import NextQuestion from './screens/maths/NextQuestion';
import QuizPage from './screens/maths/QuizPage';
import ResultsPage from './screens/maths/ResultsPage';
import PronunciationChecker from './screens/pronunciation/PronunciationChecker/PronunciationChecker';
import BeginnerCategory from './screens/pronunciation/BeginnerCategory/BeginnerCategory';
import PronunciationHome from "./screens/pronunciation/pronunciationHome/pronunciationHome";
import Categories from "./components/pronunciation/Categories";
import PronunciationChecker1 from './components/pronunciation/PronunciationChecker1';
import Dashboard from './components/pronunciation/Dashboard';
import QuizSummary from './screens/maths/QuizSummary';
import Question from './components/maths/Question';
import BallCountingAnimation from './components/maths/count';
import DashboardMath from './screens/maths/Dashboard';
function App() {
  return (
    <div className="app" style={{
      width: '100%',
      height: '100%'
    }}>
      <BrowserRouter>
        <Routes>



        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/LevelSelection" element={<LevelSelection />} />
        <Route path="/questions/:category/:difficulty" element={<QuestionDisplay />} />
        <Route path="/answer-feedback" element={<AnswerFeedback />} />
        <Route path="/next-question" element={<NextQuestion />} />
        <Route path="/quiz/:category/:difficulty" element={<QuizPage />} />
        <Route path="/quiz-summary" element={<QuizSummary />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/ani" element={<Question />} />
        <Route path="/ball" element={<BallCountingAnimation />} />
        <Route path="/dashboard/math" element={<DashboardMath />} />

        <Route path="/pro" element={<PronunciationHome />} />
          <Route path="/beginner-category" element={<BeginnerCategory />} />
          <Route
            path="/pronunciation/checker/:category"
            element={<PronunciationChecker />}
          />
          <Route path="/categories" element={<Categories />} />
        <Route path="/quiz/:category" element={<PronunciationChecker1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
