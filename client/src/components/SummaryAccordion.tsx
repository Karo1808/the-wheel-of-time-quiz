import { forwardRef } from "react";
import styles from "../styles/accordion.module.css";
import {
  IoIosArrowDown,
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
} from "react-icons/io";

const COLOR_CORRECT = "#3f704d";
const COLOR_WRONG = "#9d2933";

interface Props {
  isCorrect: boolean;
  questionNumber: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  index: number;
  openedIndex?: number;
  setOpenedIndex: (index: number | undefined) => void;
  userAnswer: string;
}

const SummaryAccordion = forwardRef<HTMLDivElement, Props>(
  (
    {
      isCorrect,
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
        <div className={styles.top}>
          <div className={styles.left}>
            {isCorrect ? (
              <IoIosCheckmarkCircle
                className={styles.icon}
                color={COLOR_CORRECT}
              />
            ) : (
              <IoIosCloseCircle className={styles.icon} color={COLOR_WRONG} />
            )}
            <div className={styles.text}>
              <p className={styles.question_number}>
                Question {questionNumber}
              </p>
              <p className={styles.question}>{question}</p>
            </div>
          </div>
          <button className={styles.arrow_button}>
            <IoIosArrowDown
              className={`${styles.arrow_icon} ${
                isAccordionOpen && styles.open_icon
              }`}
            />
          </button>
        </div>
        <ol className={`${styles.answers} ${isAccordionOpen && styles.open}`}>
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
