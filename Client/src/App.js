import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Savi from './screens/maths/savi';
import MainPage from './screens/main/mainpage';
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
import Level1G from './screens/pronunciation/Level1G/Level1G';
import Level2G from './screens/pronunciation/Level2G/Level2G';
import Question from './components/maths/Question';
import BallCountingAnimation from './components/maths/count';
import DashboardMath from './screens/maths/Dashboard';
// Import the new DetectionPage
import DetectionPage from './screens/detection/DetectionPage';

import Navbar from './components/Header';
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
        <Route path="/detection" element={<DetectionPage />} />
 
        
      
        <Route path="/pro" element={<PronunciationHome />} />
        <Route path="/head" element={<Navbar/>} />

         
          {/* IT21293030 ROUTES */}
          <Route path="/pro" element={<PronunciationHome />} />
          <Route path="/beginner-category" element={<BeginnerCategory />} />
          <Route path="/pronunciation/checker/:category" element={<PronunciationChecker />}/>
          <Route path="/categories" element={<Categories />} />
          <Route path="/quiz/:category" element={<PronunciationChecker1 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/level1" element={<Level1G />} />
          <Route path="/level2" element={<Level2G />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
