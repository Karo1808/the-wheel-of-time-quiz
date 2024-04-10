import { useWindowSize } from "@uidotdev/usehooks";
import styles from "../../styles/quiz.module.css";
import Button from "../components/Button";
import ButtonDirection from "../components/ButtonDirection";
import { useStopwatch } from "react-timer-hook";
import { useQuizStore } from "../hooks/useQuizStore";

const QuizPage = () => {
  const { seconds, minutes, pause } = useStopwatch({ autoStart: true });
  const size = useWindowSize();
  const quizState = useQuizStore((state) => state);
  if (!size.width) return;
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span>{`Question ${quizState.questionNumber}`}</span>
        <span>
          {quizState.questionTimer ||
            `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`}
        </span>
      </header>
      <section className={styles.container}>
        <h1 className={styles.question}>{quizState.questionLabel}</h1>
        <img
          src="./wheel.png"
          alt="wheel of time logo"
          className={styles.logo}
        />
      </section>
      <section className={styles.answers}>
        {quizState.answers.map((ans) => {
          let state: "correct" | "incorrect" | "disabled" | "none" = "none";
          if (quizState.questionAnsweredIndex) {
            if (quizState.questionCorrectIndex === ans.answerNumber) {
              state = "correct";
            } else if (quizState.questionAnsweredIndex === ans.answerNumber) {
              state = "incorrect";
            } else {
              state = "disabled";
            }
          }

          return (
            <Button
              key={ans.answerNumber}
              text={ans.answerLabel}
              state={state}
              className={styles.button}
              onClick={() => {
                pause();
                quizState.setQuestionTimer(
                  `${minutes.toString().padStart(2, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`
                );
                quizState.answer(ans.answerNumber);
              }}
            />
          );
        })}
      </section>
      {size?.width > 700 ? (
        <>
          <progress
            className={styles.progress}
            value={quizState.questionNumber}
            max="20"
          ></progress>
          <ButtonDirection direction="left" />
          <ButtonDirection direction="right" />
        </>
      ) : (
        <Button
          text="Next"
          state="next"
          className={`${styles.button} ${styles.next}`}
        />
      )}
    </main>
  );
};

export default QuizPage;
