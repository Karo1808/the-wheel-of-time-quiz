import React from "react";
import styles from "../../styles/quiz.module.css";
import { TimeFormat } from "../../types/index";
import { formatTime } from "../../utils/shared";

interface Props {
  currentQuestion: number;
  questionTimer: TimeFormat | null;
  answer?: string;
  minutes: number;
  seconds: number;
}

const QuizHeader = React.memo(
  ({ currentQuestion, questionTimer, answer, minutes, seconds }: Props) => {
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
  }
);

export default QuizHeader;
