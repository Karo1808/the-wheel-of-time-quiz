import React from "react";
import styles from "../styles/button.module.css";
import { indexToRowsAndCols } from "../utils/shared";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state:
    | "correct"
    | "incorrect"
    | "none"
    | "disabled"
    | "next"
    | "invisible"
    | "not_found"
    | "error"
    | "green";
  buttonRefs?: React.RefObject<(HTMLButtonElement | null)[][]>;
  index?: number;
  handleKeyDown?: (
    event: React.KeyboardEvent<HTMLButtonElement>,
    row: number,
    col: number
  ) => void;
}

const Button = ({
  children,
  state,
  className,
  onClick,
  index,
  buttonRefs,
  handleKeyDown,
  ...rest
}: Props) => {
  const { cols, rows } = indexToRowsAndCols(index || 0);

  return (
    <button
      onKeyDown={
        handleKeyDown ? (event) => handleKeyDown(event, rows, cols) : undefined
      }
      ref={(el) => {
        if (buttonRefs && buttonRefs.current) {
          buttonRefs.current[rows][cols] = el;
        }
      }}
      onClick={onClick}
      className={`${styles[state]} ${styles.button} ${className}`}
      disabled={
        state === "disabled" || state === "correct" || state === "incorrect"
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
