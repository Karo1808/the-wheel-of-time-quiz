import { useWindowSize } from "@uidotdev/usehooks";
import styles from "../../styles/quiz.module.css";
import Button from "../components/Button";
import ButtonDirection from "../components/ButtonDirection";
import { useStopwatch } from "react-timer-hook";
import usePersonStore from "../hooks/useStore";

const QuizPage = () => {
  const { seconds, minutes } = useStopwatch({ autoStart: true });
  const { questionNumber, questionLabel, answers, answer } = usePersonStore();
  const size = useWindowSize();
  if (!size.width) return;
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span>{`Question ${questionNumber}`}</span>
        <span>{`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}</span>
      </header>
      <section className={styles.container}>
        <h1 className={styles.question}>{questionLabel}</h1>
        <img
          src="./wheel.png"
          alt="wheel of time logo"
          className={styles.logo}
        />
      </section>
      <section className={styles.answers}>
        {answers.map((answer) => {
          const state = answer.isAnswered
            ? answer.isCorrect
              ? "correct"
              : "incorrect"
            : "none";
          return (
            <Button
              key={answer.number}
              text={answer.label}
              state={state}
              className={styles.button}
              onClick={() => answer(answer.number)}
            />
          );
        })}
      </section>
      {size?.width > 700 ? (
        <>
          <progress className={styles.progress} value={70} max="100"></progress>
          <ButtonDirection direction="left" />
          <ButtonDirection direction="right" />
        </>
      ) : (
        <Button text="Next" state="next" className={styles.next} />
      )}
    </main>
  );
};

export default QuizPage;
