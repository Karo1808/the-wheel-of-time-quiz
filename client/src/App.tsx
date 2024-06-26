import { Route, Routes } from "react-router";
import Layout from "./pages/Layout";
import { lazy } from "react";
import Loading from "./pages/loading/Loading";
import SuspenseLayout from "./pages/loading/SuspenseLayout";
import QuizPageSkeleton from "./pages/loading/QuizPageSkeleton";
import Page404 from "./pages/404";
import Test from "./pages/Test";
import QuizzesPageSkeleton from "./pages/loading/QuizzesPageSkeleton";

const QuizPage = lazy(() => import("./pages/QuizPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const QuizzesPage = lazy(() => import("./pages/QuizzesPage"));
const SummaryPage = lazy(() => import("./pages/SummaryPage"));
const DialogTest = lazy(() => import("./pages/DialogTest"));

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<SuspenseLayout fallback={<Loading />} />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/quiz/:quizId/summary" element={<SummaryPage />} />
            <Route path="/timeline" element={<SummaryPage />} />
            <Route path="/dialog" element={<DialogTest />} />
            <Route path="/test" element={<Test />} />
          </Route>

          <Route element={<SuspenseLayout fallback={<QuizPageSkeleton />} />}>
            <Route path="/quiz/:quizId" element={<QuizPage />} />
          </Route>
        </Route>
        <Route element={<Layout wide />}>
          <Route path="/skeleton" element={<QuizzesPageSkeleton />}></Route>
          <Route
            element={<SuspenseLayout fallback={<QuizzesPageSkeleton />} />}
          >
            <Route path="/quizzes" element={<QuizzesPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </>
  );
};

export default App;
