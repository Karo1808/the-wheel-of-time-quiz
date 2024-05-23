import { IoIosCheckmarkCircle } from "react-icons/io";
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
    console.log(barWidth);
  }, [setBarWidth, questionLength, barWidth]);

  return (
    <div className={styles.timeline}>
      <div className={styles.icon_container}>
        {questions.map((question) => (
          <>
            <IoIosCheckmarkCircle
              className={styles.icon}
              size={35}
              color={question.isAnswerCorrect ? COLOR_CORRECT : COLOR_WRONG}
            />
          </>
        ))}
      </div>
      <div style={{ width: `${barWidth}px` }} className={styles.bar} />
    </div>
  );
};

export default Timeline;
