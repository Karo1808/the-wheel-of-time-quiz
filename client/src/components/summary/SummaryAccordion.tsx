import { forwardRef } from "react";
import styles from "../../styles/accordion.module.css";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  Icon: React.ReactNode;
  questionNumber: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  index: number;
  openedIndex?: number;
  setOpenedIndex: (index: number | undefined) => void;
  userAnswer?: string;
}

const SummaryAccordion = forwardRef<HTMLDivElement, Props>(
  (
    {
      Icon,
      questionNumber,
      question,
      answers,
      correctAnswer,
      index,
      openedIndex,
      setOpenedIndex,
      userAnswer,
    },
    ref
  ) => {
    const toggleAccordion = () => {
      if (openedIndex === index) {
        setOpenedIndex(undefined);
        return;
      }
      setOpenedIndex(index);
    };

    const isAccordionOpen = index === openedIndex;

    return (
      <div ref={ref} onClick={toggleAccordion} className={styles.container}>
        <div>{Icon}</div>
        <div className={styles.text}>
          <p className={styles.question_number}>Question {questionNumber}</p>
          <p className={styles.question}>{question}</p>
        </div>
        <button className={styles.arrow_button}>
          <IoIosArrowDown
            className={`${styles.arrow_icon} ${
              isAccordionOpen && styles.open_icon
            }`}
          />
        </button>
        <ol
          className={`${styles.answers} `}
          style={{
            maxHeight: isAccordionOpen ? 300 : 0,
            transition: isAccordionOpen
              ? "max-height 600ms ease"
              : "max-height 500ms ease",
          }}
        >
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
        </ol>
      </div>
    );
  }
);

export default SummaryAccordion;
