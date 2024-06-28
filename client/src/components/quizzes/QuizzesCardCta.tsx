import Button from "../Button";
import styles from "../../styles/quizzesCardCta.module.css";

interface Props {
  handleGoToQuiz: ({
    quizId,
    numberOfQuestions,
  }: {
    quizId: string;
    numberOfQuestions: number;
  }) => void;
  quizId: string;
  numberOfQuestions: number;
}

const QuizzesCardCta = ({
  handleGoToQuiz,
  quizId,
  numberOfQuestions,
}: Props) => {
  return (
    <>
      <Button className={styles.cta_button} state="none">
        See Details
      </Button>
      <Button
        onClick={() => {
          handleGoToQuiz({ quizId, numberOfQuestions });
        }}
        className={styles.cta_button}
        state="green"
      >
        Play Now
      </Button>
    </>
  );
};

export default QuizzesCardCta;
