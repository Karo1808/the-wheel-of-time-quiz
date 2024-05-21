import Button from "./Button";
import styles from "../styles/quiz.module.css";

interface Props {
  correctAnswer?: string;
  answerLabel: string;
  answer?: string;
  answerNumber: number;
  isCorrect?: boolean;
  isError?: boolean;
  handleAnswer: (answer: string) => void;
}

// TODO: Add error handling

const QuizAnswer = ({
  correctAnswer,
  answerLabel,
  answer,
  handleAnswer,
  isError,
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

  return (
    <Button
      state={state}
      className={styles.button}
      onClick={() => handleAnswer(answerLabel)}
    >
      {answerLabel}
    </Button>
  );
};

export default QuizAnswer;
