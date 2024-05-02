import { Route, Routes } from "react-router";
import WelcomePage from "./pages/WelcomePage";
import QuizPage from "./pages/QuizPage";
import Layout from "./pages/Layout";
import QuizzesPage from "./pages/QuizzesPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
