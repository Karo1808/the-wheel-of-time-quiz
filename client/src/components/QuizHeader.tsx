import React from "react";
import styles from "../styles/quiz.module.css";
import { TimeFormat } from "../types";
import { formatTime } from "../utils/shared";
import useQuiz from "../hooks/useQuiz";

interface Props {
  currentQuestion: number;
  questionTimer: TimeFormat | null;
  answer?: string;
}

const QuizHeader = React.memo(({ currentQuestion,   questionTimer, answer }: Props) => {
  const {stopwatch} = useQuiz();
  return (
    <header className={styles.header}>
      <span>{`Question ${currentQuestion}`}</span>
      <span>
        {questionTimer && answer
          ? questionTimer
          : formatTime(stopwatch.minutes * 60 + stopwatch.seconds)}
      </span>
    </header>
  );
});

export default QuizHeader;
