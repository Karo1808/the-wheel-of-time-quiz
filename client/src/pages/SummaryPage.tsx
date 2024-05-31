import { useShallow } from "zustand/react/shallow";
import Timeline from "../components/Timeline";
import useQuizStore from "../hooks/useQuizStore";
import ResultsGraph from "../components/ResultsGraph";
import { calculateScore } from "../utils/graph";
import { formatTime } from "../utils/shared";
import styles from "../styles/summaryPage.module.css";
import { useNavigate } from "react-router";
import { IoIosRefresh } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { useWindowSize } from "@uidotdev/usehooks";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../components/Button";
import { useState } from "react";
import Drawer from "../components/Drawer";
import SummaryDialogContent from "../components/SummaryDialogContent";

const SummaryPage = () => {
  const currentQuizId = useQuizStore(
    useShallow((state) => state.currentQuizId)
  );
  const currentQuiz = useQuizStore(
    useShallow((state) => state.quizzes[currentQuizId])
  );
  const resetQuiz = useQuizStore(useShallow((state) => state.resetQuiz));
  const questions = useQuizStore(useShallow(() => currentQuiz.questions));
  const setCurrentQuiz = useQuizStore(
    useShallow((state) => state.setCurrentQuiz)
  );
  const setCurrentQuizId = useQuizStore(
    useShallow((state) => state.setCurrentQuizId)
  );

  const navigate = useNavigate();

  const { width } = useWindowSize();

  const queryClient = useQueryClient();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleHome = () => {
    resetQuiz();
    setCurrentQuiz("", true);
    setCurrentQuizId("");
    queryClient.invalidateQueries({
      queryKey: ["quiz", currentQuizId, undefined],
    });
    navigate("/quizzes");
  };

  const handleReset = () => {
    resetQuiz();
    queryClient.invalidateQueries({
      queryKey: ["quiz", currentQuizId, undefined],
    });
    navigate(`/quiz/${currentQuizId}`);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  if (!width) return;

  return (
    <>
      <header className={styles.header}>
        <button onClick={handleHome} className={styles.button}>
          <IoHomeOutline />
        </button>
        <button onClick={handleReset} className={styles.button}>
          <IoIosRefresh />
        </button>
      </header>
      <h1 className={styles.title}>Summary</h1>
      <main className={styles.page}>
        <section className={styles.graphs}>
          <ResultsGraph
            value={currentQuiz.currentTime}
            maxValue={formatTime("00:03") as number}
            type="time"
            color="#4B0082"
            label={formatTime(currentQuiz.currentTime) as string}
          />
          <ResultsGraph
            value={currentQuiz.currentScore}
            maxValue={currentQuiz.numberOfQuestionsAnswered}
            type="score"
            color="#3F704D"
            label={`${calculateScore(
              currentQuiz.currentScore,
              currentQuiz.numberOfQuestionsAnswered
            )}%`}
          />
        </section>
        <footer className={styles.footer}>
          {width > 1200 ? (
            <Timeline questions={questions} />
          ) : (
            <>
              <Button
                className={styles.details_button}
                onClick={handleOpenDrawer}
                state="next"
              >
                See details
              </Button>
              {isDrawerOpen && (
                <Drawer open={isDrawerOpen} setOpen={setIsDrawerOpen}>
                  <SummaryDialogContent />
                </Drawer>
              )}
            </>
          )}
        </footer>
      </main>
    </>
  );
};

export default SummaryPage;
