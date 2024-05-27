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
    setBarWidth(200 * questionLength + 170);
  }, [setBarWidth, questionLength, barWidth]);

  return (
    <div className={styles.timeline}>
      <div className={styles.icon_container}>
        {questions.map((question, index) =>
          question.isAnswerCorrect ? (
            <IoIosCloseCircle
              className={styles.icon}
              size={35}
              color={COLOR_WRONG}
              key={index}
            />
          ) : (
            <IoIosCheckmarkCircle
              className={styles.icon}
              size={35}
              key={index}
              color={COLOR_CORRECT}
            />
          )
        )}
      </div>
      <div style={{ width: `${barWidth}px` }} className={styles.bar} />
    </div>
  );
};

export default Timeline;
