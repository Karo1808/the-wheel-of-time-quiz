import { useRef } from "react";

interface UseButtonKeysNavigationProps {
  rows: number;
  cols: number;
}

const useButtonKeysNavigation = ({
  rows,
  cols,
}: UseButtonKeysNavigationProps) => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(null))
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    row: number,
    col: number
  ) => {
    switch (event.key) {
      case "ArrowRight":
      case "d":
      case "l":
        focusButton(row, (col + 1) % cols);
        break;
      case "ArrowLeft":
      case "a":
      case "h":
        focusButton(row, (col - 1 + cols) % cols);
        break;
      case "ArrowDown":
      case "s":
      case "j":
        focusButton((row + 1) % rows, col);
        break;
      case "ArrowUp":
      case "w":
      case "k":
        focusButton((row - 1 + rows) % rows, col);
        break;
      default:
        break;
    }
  };

  const focusButton = (row: number, col: number) => {
    if (buttonRefs.current[row] && buttonRefs.current[row][col]) {
      buttonRefs.current[row][col]?.focus();
    }
  };

  return { buttonRefs, handleKeyDown };
};

export default useButtonKeysNavigation;
