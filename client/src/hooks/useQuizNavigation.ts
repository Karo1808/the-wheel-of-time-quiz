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
      const activeElement = document.activeElement;

      // Define constants for key codes
      const NEXT_KEYS = ["ArrowRight", "d", "l"];
      const PREVIOUS_KEYS = ["ArrowLeft", "a", "h"];
      const IGNORE_TAGS = ["INPUT", "BUTTON", "TEXTAREA"];

      if (activeElement && IGNORE_TAGS.includes(activeElement.tagName)) {
        // If the focused element is an input, button, textarea, or content editable, do nothing
        return;
      }

      if (PREVIOUS_KEYS.includes(e.key)) {
        handlePreviousQuestion();
      } else if (NEXT_KEYS.includes(e.key)) {
        handleNextQuestion();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextQuestion, handlePreviousQuestion]);

  return null;
};

export default useQuizNavigation;
