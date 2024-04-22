import { useEffect } from "react";

import { useWindowSize } from "@uidotdev/usehooks";
import { useStopwatch } from "react-timer-hook";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";

import useQuizStore from "../hooks/useQuizStore";

import Button from "../components/Button";
import ButtonDirection from "../components/ButtonDirection";

import styles from "../../styles/quiz.module.css";
import { formatTime } from "../utils/shared";

const QuizPage = () => {
  const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: true });
  const windowSize = useWindowSize();

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

  const navigate = useNavigate();

  function handleNext() {
    if (numberOfQuestionsAnswered === numberOfQuestions) {
      navigate("/summary");
    } else {
      nextQuestion();
    }
  }

  if (!windowSize.width) return;

  return (
    <>
      <header className={styles.header}>
        <span>{`Question ${quizState.questionNumber}`}</span>
        <span>
          {quizState.questionTimer || formatTime(minutes * 60 + seconds)}
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
                setQuestionTimer(formatTime(minutes * 60 + seconds) as string);
                answer(ans.answerNumber);
              }}
            >
              {ans.answerLabel}
            </Button>
          );
        })}
      </section>
      {windowSize?.width > 700 ? (
        <>
          <progress
            className={styles.progress}
            value={currentScore}
            max={numberOfQuestions}
          />
          <ButtonDirection
            disabled={currentQuestion - 1 < 1}
            onClick={previousQuestion}
            direction="left"
          />
          <ButtonDirection
            disabled={
              currentQuestion > numberOfQuestions ||
              currentQuestion > numberOfQuestionsAnswered
            }
            onClick={handleNext}
            direction="right"
          />
        </>
      ) : (
        <Button
          state={
            currentQuestion > numberOfQuestions ||
            currentQuestion > numberOfQuestionsAnswered
              ? "invisible"
              : "next"
          }
          onClick={handleNext}
          className={`${styles.button} ${styles.next}`}
        >
          Next
        </Button>
      )}
    </>
  );
};

export default QuizPage;
