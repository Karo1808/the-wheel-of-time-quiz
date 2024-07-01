import { Route, Routes } from "react-router";
import Layout from "./pages/Layout";
import { lazy } from "react";
import Loading from "./pages/loading/Loading";
import SuspenseLayout from "./pages/loading/SuspenseLayout";
import QuizPageSkeleton from "./pages/loading/QuizPageSkeleton";
import Page404 from "./pages/404";
import QuizzesPageSkeleton from "./pages/loading/QuizzesPageSkeleton";
import AdminOverviewDetails from "./components/admin/AdminOverviewDetails";

const QuizPage = lazy(() => import("./pages/QuizPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const QuizzesPage = lazy(() => import("./pages/QuizzesPage"));
const SummaryPage = lazy(() => import("./pages/SummaryPage"));
const AdminOverviewPage = lazy(() => import("./pages/AdminOverviewPage"));
const AdminAddQuizPage = lazy(() => import("./pages/AdminAddQuizPage"));

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<SuspenseLayout fallback={<Loading />} />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/quiz/:quizId/summary" element={<SummaryPage />} />
          </Route>
          <Route element={<SuspenseLayout fallback={<QuizPageSkeleton />} />}>
            <Route path="/quiz/:quizId" element={<QuizPage />} />
          </Route>
        </Route>
        <Route element={<Layout wide />}>
          <Route
            element={<SuspenseLayout fallback={<QuizzesPageSkeleton />} />}
          >
            <Route path="/quizzes" element={<QuizzesPage />} />
          </Route>
        </Route>
        <Route element={<SuspenseLayout fallback={<Loading />} />}>
          <Route path="/admin/overview" element={<AdminOverviewPage />} />
          <Route element={<AdminOverviewPage />}>
            <Route
              path="/admin/overview/:quizId"
              element={<AdminOverviewDetails />}
            />
          </Route>
          <Route path="/admin/add-quiz" element={<AdminAddQuizPage />} />
        </Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </>
  );
};

export default App;
