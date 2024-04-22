import { Route, Routes } from "react-router";
import WelcomePage from "./pages/WelcomePage";
import QuizPage from "./pages/QuizPage";
import Layout from "./pages/Layout";
import Summary from "./pages/Summary";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
