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
import Code from "./pages/Quiz/code";
import Page from "./pages/Quiz/page";
import Questions from "./pages/Quiz/questions";
import Grammar from "./pages/grammar/grammar";
// import Homepage from "./pages/home/homepage";
// import Login from "./pages/login";
// import Main from "./pages/main";
import Menu from "./pages/menu/menu";
import Reading from "./pages/reading/reading";
// import Signup from "./pages/signup";
import Quiz from "./pages/Quiz/Quiz";
import Vocabluary from "./pages/vocabluary/vocabluary";
import QuestionDisplayComponent from "./pages/QuestionDisplayComponent/QuestionDisplayComponent";
import DrawingCanvas from "./components/interest/DrawingCanvas";
// import Piano from './components/interest/Piano';
// import { ChakraProvider } from "@chakra-ui/react";
import TouchPiano from "./components/interest/TouchPiano";
import Main from "./pages/main/main";

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
        {/* <Route path="/quiz/:category" element={<PronunciationChecker1 />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
        path="/quiz/:questionCollectionId"
        element={<QuestionDisplayComponent />}
      />
          <Route path="/grammar" exact element={<Grammar />} />
      <Route path="/reading" exact element={<Reading />} />
      <Route path="/questions" exact element={<Questions />} />
      <Route path="/page" exact element={<Page />} />
      <Route path="/quiz" exact element={<Quiz />} />
      <Route path="/main" exact element={<Main />} />
     
      <Route path="/code" exact element={<Code />} />
      <Route path="/vocabluary" exact element={<Vocabluary />} />
      <Route path="/menu" exact element={<Menu />} />
      <Route path="/DrawingCanvas" element={<DrawingCanvas/>} />
      <Route path="/TouchPiano" element={<TouchPiano/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
