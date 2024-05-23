import { Route, Routes } from "react-router";
import Layout from "./pages/Layout";
import { lazy } from "react";
import Loading from "./pages/loading/Loading";
import SuspenseLayout from "./pages/loading/SuspenseLayout";
import QuizPageSkeleton from "./pages/loading/QuizPageSkeleton";
import Page404 from "./pages/404";

const QuizPage = lazy(() => import("./pages/QuizPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const QuizzesPage = lazy(() => import("./pages/QuizzesPage"));

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<SuspenseLayout fallback={<Loading />} />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
          </Route>
          <Route element={<SuspenseLayout fallback={<QuizPageSkeleton />} />}>
            <Route path="/quiz/:quizId" element={<QuizPage />} />
          </Route>
          <Route path="/skeleton" element={<QuizPageSkeleton />}></Route>
        </Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </>
  );
};

export default App;
