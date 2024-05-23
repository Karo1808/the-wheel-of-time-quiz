import React, { useEffect } from "react";
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
  const getState = () => {
    if (answer && correctAnswer) {
      if (correctAnswer === answerLabel) return "correct";
      if (answer === answerLabel) return "incorrect";
      return "disabled";
    }
    return "none";
  };

  const state = getState();

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong. Please try again.");
    }
  }, [isError]);

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
