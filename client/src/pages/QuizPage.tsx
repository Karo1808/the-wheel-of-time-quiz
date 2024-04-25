import Button from "../components/Button";
import ButtonDirection from "../components/ButtonDirection";

import styles from "../styles/quiz.module.css";
import { formatTime } from "../utils/shared";
import useQuiz from "../hooks/useQuiz";
import { TimeFormat } from "../types";

const QuizPage = () => {
  const { quizState, quizActions, navigate, windowSize, stopwatch } = useQuiz();
  const { minutes, seconds, pause } = stopwatch;
  const {
    numberOfQuestionsAnswered,
    numberOfQuestions,
    questionTimer,
    questionNumber,
    questionLabel,
    questionAnsweredIndex,
    questionCorrectIndex,
    answers,
    currentScore,
    currentQuestion,
  } = quizState;
  const { nextQuestion, previousQuestion, answer, setQuestionTimer } =
    quizActions;

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
        <span>{`Question ${questionNumber}`}</span>
        <span>{questionTimer || formatTime(minutes * 60 + seconds)}</span>
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
        {answers.map((ans) => {
          let state: "correct" | "incorrect" | "disabled" | "none" = "none";
          if (questionAnsweredIndex) {
            if (questionCorrectIndex === ans.answerNumber) {
              state = "correct";
            } else if (questionAnsweredIndex === ans.answerNumber) {
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
                  formatTime(minutes * 60 + seconds) as TimeFormat
                );
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
