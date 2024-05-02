import Button from "../components/Button";
import ButtonDirection from "../components/ButtonDirection";

import styles from "../styles/quiz.module.css";
import { formatTime } from "../utils/shared";
import useQuiz from "../hooks/useQuiz";
import { TimeFormat } from "../types";

const QuizPage = () => {
  const {
    windowSize,
    navigate,
    quizActions,
    quizQuery,
    quizState,
    stopwatch,
    verifyQuery,
  } = useQuiz();

  function handleNext() {
    if (
      quizState.numberOfQuestionsAnswered ===
        quizQuery.quiz?.numberOfQuestions &&
      quizState.currentQuestion === quizQuery.quiz?.numberOfQuestions
    ) {
      navigate("/summary");
    } else {
      quizActions.nextQuestion();
    }
  }

  function handleAnswer(answer: string) {
    console.log("Clicked");
    stopwatch.pause();
    quizActions.setQuestionTimer(
      formatTime(stopwatch.minutes * 60 + stopwatch.seconds) as TimeFormat
    );

    quizActions.setAnswer({
      answer,
      correctAnswer: verifyQuery.verificationResult?.correctAnswer,
      isCorrect: verifyQuery.verificationResult?.isCorrect,
    });
  }

  if (!windowSize.width) return;

  return (
    <>
      <header className={styles.header}>
        <span>{`Question ${quizState.currentQuestion}`}</span>
        <span>
          {quizState.questionTimer ||
            formatTime(stopwatch.minutes * 60 + stopwatch.seconds)}
        </span>
      </header>
      <section className={styles.container}>
        <h1 className={styles.question}>
          {
            quizQuery.quiz?.questions[quizState.currentQuestion - 1]
              .questionLabel
          }
        </h1>
        <img
          src="../wheel.png"
          alt="wheel of time logo"
          className={styles.logo}
        />
      </section>
      <section className={styles.answers}>
        {quizQuery.quiz?.questions[quizState.currentQuestion - 1].answers.map(
          (ans) => {
            let state: "correct" | "incorrect" | "disabled" | "none" = "none";
            if (quizState.answer) {
              if (quizState.correctAnswer === ans.answerLabel) {
                state = "correct";
              } else if (quizState.answer === ans.answerLabel) {
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
                onClick={() => handleAnswer(ans.answerLabel)}
              >
                {ans.answerLabel}
              </Button>
            );
          }
        )}
      </section>
      {windowSize?.width > 700 ? (
        <>
          <progress
            className={styles.progress}
            value={quizState.currentScore}
            max={quizQuery.quiz?.numberOfQuestions}
          />
          <ButtonDirection
            disabled={quizState.currentQuestion - 1 < 1}
            onClick={quizActions.previousQuestion}
            direction="left"
          />
          <ButtonDirection
            disabled={
              quizState.currentQuestion >
                (quizQuery.quiz?.numberOfQuestions || 0) ||
              quizState.currentQuestion > quizState.numberOfQuestionsAnswered
            }
            onClick={handleNext}
            direction="right"
          />
        </>
      ) : (
        <Button
          state={
            quizState.currentQuestion >
              (quizQuery.quiz?.numberOfQuestions || 0) ||
            quizState.currentQuestion > quizState.numberOfQuestionsAnswered
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
