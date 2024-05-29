import React from "react";
import styles from "../styles/button.module.css";
import { indexToRowsAndCols } from "../utils/shared";

interface Props {
  children: React.ReactNode;
  state:
    | "correct"
    | "incorrect"
    | "none"
    | "disabled"
    | "next"
    | "invisible"
    | "not_found"
    | "error";
  className?: string;
  onClick?: () => void;
  buttonRefs?: React.RefObject<(HTMLButtonElement | null)[][]>;
  index?: number;
  handleKeyDown?: (
    event: React.KeyboardEvent<HTMLButtonElement>,
    row: number,
    col: number
  ) => void;
  handleAnswer?: (answer: string) => void;
  answerLabel?: string;
}

const Button = ({
  children,
  state,
  className,
  onClick,
  index,
  buttonRefs,
  handleKeyDown,
  handleAnswer,
  answerLabel,
}: Props) => {
  const { cols, rows } = indexToRowsAndCols(index || 0);

  const handleClick = () => {
    if (handleAnswer && answerLabel) {
      handleAnswer(answerLabel);
    }
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDownInternal = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (handleKeyDown) {
      handleKeyDown(event, rows, cols);
    }
  };

  return (
    <button
      onKeyDown={handleKeyDownInternal}
      ref={(el) => {
        if (buttonRefs && buttonRefs.current) {
          buttonRefs.current[rows][cols] = el;
        }
      }}
      onClick={handleClick}
      className={`${styles[state]} ${styles.button} ${className}`}
      disabled={
        state === "disabled" || state === "correct" || state === "incorrect"
      }
    >
      {children}
    </button>
  );
};

export default Button;
