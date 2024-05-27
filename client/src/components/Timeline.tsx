import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import styles from "../styles/timeline.module.css";
import { Question } from "../types";
import { useEffect, useState } from "react";

const COLOR_CORRECT = "#3f704d";
const COLOR_WRONG = "#9d2933";

interface Props {
  questions: Question[];
}

const Timeline = ({ questions }: Props) => {
  const [barWidth, setBarWidth] = useState<number>(0);
  const questionLength = questions.length + 1;
  useEffect(() => {
    setBarWidth(200 * questionLength);
  }, [setBarWidth, questionLength, barWidth]);

  return (
    <div className={styles.timeline}>
      <div className={styles.icon_container}>
        {questions.map((question, index) =>
          question.isAnswerCorrect ? (
            <IoIosCheckmarkCircle
              className={styles.icon}
              size={30}
              key={index}
              color={COLOR_CORRECT}
            />
          ) : (
            <IoIosCloseCircle
              className={styles.icon}
              size={30}
              color={COLOR_WRONG}
              key={index}
            />
          )
        )}
      </div>
      <div style={{ width: `${barWidth}px` }} className={styles.bar} />
    </div>
  );
};

export default Timeline;
