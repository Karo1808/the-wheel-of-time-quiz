import { useEffect } from "react";

interface Props {
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
}

const useQuizNavigation = ({
  handleNextQuestion,
  handlePreviousQuestion,
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePreviousQuestion();
      } else if (e.key === "ArrowRight") {
        handleNextQuestion();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextQuestion, handlePreviousQuestion]);
};

export default useQuizNavigation;
