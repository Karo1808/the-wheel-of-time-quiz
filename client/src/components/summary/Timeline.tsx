import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import styles from "../../styles/timeline.module.css";
import { Question } from "../../types";
import { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import SummaryDialogContent from "./SummaryDialogContent";

const COLOR_CORRECT = "#3f704d";
const COLOR_WRONG = "#9d2933";

interface Props {
  questions: Question[];
}

const Timeline = ({ questions }: Props) => {
  const [barWidth, setBarWidth] = useState<number>(0);
  const [index, setIndex] = useState<number | undefined>();
  const [isOVerlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const questionLength = questions.length + 1;

  useEffect(() => {
    setBarWidth(170 * questionLength);
  }, [setBarWidth, questionLength, barWidth]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setIsOverlayOpen(false);
    });
    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, [setIsOverlayOpen]);

  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();

    setIsOverlayOpen(!isOVerlayOpen);
  };

  function handleTimeLineClick(index: number) {
    toggleDialog();
    setIndex(index);
  }

  return (
    <div className={styles.timeline}>
      <div className={styles.icon_container}>
        {questions.map((question, index) => (
          <button
            className={styles.button}
            onClick={() => handleTimeLineClick(index)}
            key={index}
          >
            {question.isAnswerCorrect ? (
              <IoIosCheckmarkCircle
                className={styles.icon}
                size={30}
                color={COLOR_CORRECT}
              />
            ) : (
              <IoIosCloseCircle
                className={styles.icon}
                size={30}
                color={COLOR_WRONG}
              />
            )}
          </button>
        ))}
      </div>
      <div style={{ width: `${barWidth}px` }} className={styles.bar} />
      <Dialog
        toggleDialog={toggleDialog}
        ref={dialogRef}
        isOverlayOpen={isOVerlayOpen}
      >
        {<SummaryDialogContent index={index} />}
      </Dialog>
    </div>
  );
};

export default Timeline;
