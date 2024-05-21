import React from "react";
import Button from "./Button";
import styles from "../styles/quiz.module.css";
import toast from "react-hot-toast";

interface Props {
  correctAnswer?: string;
  answerLabel: string;
  answer?: string;
  answerNumber: number;
  isCorrect?: boolean;
  isError?: boolean;
  index: number;
  handleAnswer: (answer: string) => void;
  buttonRefs: React.RefObject<(HTMLButtonElement | null)[][]>;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLButtonElement>,
    row: number,
    col: number
  ) => void;
}

const QuizAnswer = ({
  correctAnswer,
  answerLabel,
  answer,
  handleAnswer,
  isError,
  index,
  buttonRefs,
  handleKeyDown,
}: Props) => {
  let state: "correct" | "incorrect" | "disabled" | "none" = "none";

  if (answer && correctAnswer) {
    if (correctAnswer === answerLabel) {
      state = "correct";
    } else if (answer === answerLabel) {
      state = "incorrect";
    } else {
      state = "disabled";
    }
  }

  if (isError) {
    toast.error("Something went wrong. Please try again.");
  }

  return (
    <Button
      state={state}
      className={styles.button}
      onClick={() => handleAnswer(answerLabel)}
      index={index}
      buttonRefs={buttonRefs}
      handleKeyDown={handleKeyDown}
    >
      {answerLabel}
    </Button>
  );
};

export default QuizAnswer;
