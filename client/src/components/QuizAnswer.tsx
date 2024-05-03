import Button from "./Button";
import styles from "../styles/quiz.module.css";

interface Props {
  correctAnswer?: string;
  answerLabel: string;
  answer?: string;
  answerNumber: number;
  handleAnswer: (answer: string) => void;
}

const QuizAnswer = ({
  correctAnswer,
  answerLabel,
  answer,
  answerNumber,
  handleAnswer,
}: Props) => {
  let state: "correct" | "incorrect" | "disabled" | "none" = "none";
  if (answer) {
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
      key={answerNumber}
      state={state}
      className={styles.button}
      onClick={() => handleAnswer(answerLabel)}
    >
      {answerLabel}
    </Button>
  );
};

export default QuizAnswer;
