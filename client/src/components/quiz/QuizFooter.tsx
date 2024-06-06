import { useWindowSize } from "@uidotdev/usehooks";
import Button from "../Button";
import ButtonDirection from "./ButtonDirection";
import { motion } from "framer-motion";
import styles from "../../styles/quiz.module.css";
import useQuizNavigation from "../../hooks/useQuizNavigation";
import { calculateScore } from "../../utils/graph";

interface Props {
  currentQuestion: number;
  numberOfQuestionsAnswered: number;
  currentScore: number;
  numberOfQuestions: number;
  handleNext: () => void;
  handlePrevious: () => void;
}

const QuizFooter = ({
  currentQuestion,
  numberOfQuestions,
  currentScore,
  numberOfQuestionsAnswered,
  handleNext,
  handlePrevious,
}: Props) => {
  const windowSize = useWindowSize();

  useQuizNavigation({
    handleNextQuestion: handleNext,
    handlePreviousQuestion: handlePrevious,
  });

  // Ensure there is a window size to work with
  if (!windowSize?.width) return null;

  // Return the conditional rendering based on window width
  return windowSize.width > 700 ? (
    <>
      <div className={styles.progress_bar}>
        <motion.div
          className={styles.progress_value}
          initial={{
            width: `${calculateScore(currentScore, numberOfQuestions)}%`,
          }}
          animate={{
            width: `${calculateScore(currentScore, numberOfQuestions)}%`,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        />
      </div>
      <ButtonDirection
        disabled={currentQuestion - 1 < 1}
        onClick={handlePrevious}
        direction="left"
      />
      <ButtonDirection
        disabled={
          currentQuestion > numberOfQuestions ||
          currentQuestion > numberOfQuestionsAnswered
        }
        onClick={handleNext}
        direction="right"
      />
    </>
  ) : (
    <Button
      state={
        currentQuestion > numberOfQuestions ||
        currentQuestion > numberOfQuestionsAnswered
          ? "invisible"
          : "next"
      }
      onClick={handleNext}
      className={`${styles.button} ${styles.next}`}
    >
      Next
    </Button>
  );
};

export default QuizFooter;
