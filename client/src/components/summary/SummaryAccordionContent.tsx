import styles from "../../styles/accordion.module.css";

interface Props {
  answers: string[];
  correctAnswer: string;
  userAnswer?: string;
  index: number;
  openedIndex?: number;
}

const SummaryAccordionContent = ({
  answers,
  correctAnswer,
  userAnswer,
}: Props) => {
  return (
    <>
      {answers.map((answer, index) => (
        <li
          key={index}
          className={`${
            answer === correctAnswer
              ? styles.correct
              : answer === userAnswer
              ? styles.incorrect
              : ""
          } ${styles.answer}`}
        >
          {answer}
        </li>
      ))}
    </>
  );
};

export default SummaryAccordionContent;
