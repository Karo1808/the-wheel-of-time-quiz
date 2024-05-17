import styles from "../styles/quiz.module.css";
import useQuiz from "../hooks/useQuiz";
import QuizFooter from "../components/QuizFooter";
import QuizAnswer from "../components/QuizAnswer";
import useQuizStore from "../hooks/useQuizStore";
import { useShallow } from "zustand/react/shallow";

const QuizPage = () => {
  const { navigate, quizActions, quizQuery, quizState, verifyQuery } =
    useQuiz();

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
    } else {
      quizActions.nextQuestion();
    }
  }

  function handlePrevious() {
    quizActions.previousQuestion();
  }

  function handleAnswer(answer: string) {
    // quizActions.setQuestionTimer(
    //   formatTime(minutes * 60 + seconds) as TimeFormat
    // );

    quizActions.setAnswer({
      answer,
    });
    if (verifyQuery.verificationResult?.isCorrect) increaseScore();
  }

  return (
    <>
      <header className={styles.header}>
        <span>{`Question ${quizState.currentQuestion}`}</span>
        <span>
          {/* {quizState.questionTimer || formatTime(minutes * 60 + seconds)} */}
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
          (ans) => (
            <QuizAnswer
              answer={quizState.answer}
              answerLabel={ans.answerLabel}
              answerNumber={ans.answerNumber}
              correctAnswer={verifyQuery.verificationResult?.correctAnswer}
              isCorrect={verifyQuery.verificationResult?.isCorrect}
              handleAnswer={handleAnswer}
              key={ans.answerNumber}
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
