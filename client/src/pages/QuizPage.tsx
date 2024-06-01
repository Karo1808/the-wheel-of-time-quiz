import styles from "../styles/quiz.module.css";
import useQuiz from "../hooks/useQuiz";
import QuizFooter from "../components/QuizFooter";
import QuizAnswer from "../components/QuizAnswer";
import QuizHeader from "../components/QuizHeader";
import { formatTime } from "../utils/shared";
import { TimeFormat } from "../types";
import useButtonKeysNavigation from "../hooks/useButtonNavigation";
import { useWindowSize } from "@uidotdev/usehooks";

const QuizPage = () => {
  const {
    navigate,
    quizActions,
    quizQuery,
    quizState,
    verifyQuery,
    stopwatch,
  } = useQuiz();

  const windowSize = useWindowSize();

  const { handleKeyDown, buttonRefs } = useButtonKeysNavigation(
    windowSize?.width || 0 > 1200 ? { rows: 2, cols: 2 } : { rows: 4, cols: 1 }
  );

  function handleNext() {
    if (
      !(
        quizState.currentQuestion > quizQuery.quiz.numberOfQuestions ||
        quizState.currentQuestion > quizState.numberOfQuestionsAnswered
      )
    ) {
      if (
        quizState.numberOfQuestionsAnswered ===
          quizQuery.quiz?.numberOfQuestions &&
        quizState.currentQuestion === quizQuery.quiz?.numberOfQuestions
      ) {
        navigate("summary");
        return;
      }
      quizActions.nextQuestion();
      stopwatch.start();
    }
  }

  function handlePrevious() {
    if (!quizState.answer) {
      quizActions.setQuestionTimer(
        formatTime(stopwatch.minutes * 60 + stopwatch.seconds) as TimeFormat
      );
    }
    if (!(quizState.currentQuestion - 1 < 1)) {
      quizActions.previousQuestion();
    }
    stopwatch.pause();
  }

  function handleAnswer(answer: string) {
    stopwatch.pause();
    quizActions.setQuestionTimer(
      formatTime(stopwatch.minutes * 60 + stopwatch.seconds) as TimeFormat
    );

    stopwatch.reset();
    quizActions.setAnswer({
      answer,
      numberOfQuestions: quizQuery.quiz?.numberOfQuestions,
    });
  }

  return (
    <>
      <QuizHeader
        currentQuestion={quizState.currentQuestion}
        questionTimer={quizState.questionTimer}
        minutes={stopwatch.minutes}
        seconds={stopwatch.seconds}
        answer={quizState.answer}
      />
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
          (ans, index) => (
            <QuizAnswer
              answer={quizState.answer}
              answerLabel={ans.answerLabel}
              answerNumber={ans.answerNumber}
              correctAnswer={verifyQuery.verificationResult?.correctAnswer}
              isCorrect={verifyQuery.verificationResult?.isCorrect}
              isError={verifyQuery.errorVerify ? true : false}
              handleAnswer={handleAnswer}
              key={ans.answerNumber}
              index={index}
              buttonRefs={buttonRefs}
              handleKeyDown={handleKeyDown}
            />
          )
        )}
      </section>
      <QuizFooter
        currentQuestion={quizState.currentQuestion}
        currentScore={quizState.currentScore}
        numberOfQuestions={quizQuery.quiz?.numberOfQuestions || 0}
        numberOfQuestionsAnswered={quizState.numberOfQuestionsAnswered}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </>
  );
};

export default QuizPage;
