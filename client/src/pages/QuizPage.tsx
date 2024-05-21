import styles from "../styles/quiz.module.css";
import useQuiz from "../hooks/useQuiz";
import QuizFooter from "../components/QuizFooter";
import QuizAnswer from "../components/QuizAnswer";
import useQuizStore from "../hooks/useQuizStore";
import { useShallow } from "zustand/react/shallow";
import QuizHeader from "../components/QuizHeader";
import { formatTime } from "../utils/shared";
import { TimeFormat } from "../types";
import useButtonKeysNavigation from "../hooks/useButtonNavigation";
const QuizPage = () => {
  const {
    navigate,
    quizActions,
    quizQuery,
    quizState,
    verifyQuery,
    stopwatch,
  } = useQuiz();

  const { handleKeyDown, buttonRefs } = useButtonKeysNavigation();

  const increaseScore = useQuizStore(
    useShallow((state) => state.increaseScore)
  );

  function handleNext() {
    if (
      quizState.numberOfQuestionsAnswered ===
        quizQuery.quiz?.numberOfQuestions &&
      quizState.currentQuestion === quizQuery.quiz?.numberOfQuestions
    ) {
      navigate("/summary");
      stopwatch.reset();
    } else {
      quizActions.nextQuestion();
    }
  }

  function handlePrevious() {
    quizActions.previousQuestion();
    stopwatch.reset();
  }

  function handleAnswer(answer: string) {
    stopwatch.pause();
    quizActions.setQuestionTimer(
      formatTime(stopwatch.minutes * 60 + stopwatch.seconds) as TimeFormat
    );
    quizActions.setAnswer({
      answer,
    });
    if (verifyQuery.verificationResult?.isCorrect) increaseScore();
  }

  return (
    <>
      <QuizHeader
        currentQuestion={quizState.currentQuestion}
        questionTimer={quizState.questionTimer}
        minutes={stopwatch.minutes}
        seconds={stopwatch.seconds}
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
