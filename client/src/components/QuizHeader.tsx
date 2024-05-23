import styles from "../styles/quiz.module.css";
import { TimeFormat } from "../types";
import { formatTime } from "../utils/shared";

interface Props {
  currentQuestion: number;
  minutes: number;
  seconds: number;
  questionTimer: TimeFormat | null;
  answer?: string;
}

const QuizHeader = ({
  currentQuestion,
  minutes,
  seconds,
  questionTimer,
  answer,
}: Props) => {
  return (
    <header className={styles.header}>
      <span>{`Question ${currentQuestion}`}</span>
      <span>
        {questionTimer && answer
          ? questionTimer
          : formatTime(minutes * 60 + seconds)}
      </span>
    </header>
  );
};

export default QuizHeader;
