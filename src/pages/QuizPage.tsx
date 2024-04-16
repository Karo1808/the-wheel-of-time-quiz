import { useWindowSize } from "@uidotdev/usehooks";
import styles from "../../styles/quiz.module.css";
import Button from "../components/Button";
import ButtonDirection from "../components/ButtonDirection";
import { useStopwatch } from "react-timer-hook";
import useQuizStore from "../hooks/useQuizStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

const QuizPage = () => {
  const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: true });
  const size = useWindowSize();

  const quizState = useQuizStore(
    useShallow((state) => state.questions[state.currentQuestionNumber - 1])
  );

  const setQuestionTimer = useQuizStore(
    useShallow((state) => state.setQuestionTimer)
  );

  const answer = useQuizStore(useShallow((state) => state.answer));

  const nextQuestion = useQuizStore(useShallow((state) => state.nextQuestion));
  const previousQuestion = useQuizStore(
    useShallow((state) => state.previousQuestion)
  );

  const currentQuestion = useQuizStore(
    useShallow((state) => state.currentQuestionNumber)
  );
  const currentScore = useQuizStore(useShallow((state) => state.currentScore));

  const numberOfQuestions = useQuizStore(
    useShallow((state) => state.numberOfQuestions)
  );

  const numberOfQuestionsAnswered = useQuizStore(
    useShallow((state) => state.numberOfQuestionsAnswered)
  );

  useEffect(() => {
    reset();
  }, [currentQuestion, reset]);

  if (!size.width) return;
  return (
    <>
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
              state={state}
              className={styles.button}
              onClick={() => {
                pause();
                setQuestionTimer(
                  `${minutes.toString().padStart(2, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`
                );
                answer(ans.answerNumber);
              }}
            >
              {ans.answerLabel}
            </Button>
          );
        })}
      </section>
      {size?.width > 700 ? (
        <>
          <progress
            className={styles.progress}
            value={currentScore}
            max={numberOfQuestions}
          ></progress>
          <ButtonDirection
            disabled={currentQuestion - 1 < 1}
            onClick={previousQuestion}
            direction="left"
          />
          <ButtonDirection
            disabled={
              currentQuestion + 1 > numberOfQuestions ||
              currentQuestion > numberOfQuestionsAnswered
            }
            onClick={nextQuestion}
            direction="right"
          />
        </>
      ) : (
        <Button
          state={
            currentQuestion + 1 > numberOfQuestions ||
            currentQuestion > numberOfQuestionsAnswered
              ? "invisible"
              : "next"
          }
          onClick={nextQuestion}
          className={`${styles.button} ${styles.next}`}
        >
          Next
        </Button>
      )}
    </>
  );
};

export default QuizPage;
