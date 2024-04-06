import styles from "../../styles/quiz.module.css";
import Button from "../components/Button";
import { question } from "../data/index";

const QuizPage = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span>{`Question ${question.number}`}</span>
        <span>00:46</span>
      </header>
      <h1 className={styles.question}>{question.label}</h1>
      <img src="./wheel.png" alt="wheel of time logo" className={styles.logo} />
      <section className={styles.answers}>
        {question.answers.map((answer) => {
          return (
            <Button
              key={answer.number}
              text={answer.label}
              state="none"
              className={styles.button}
            />
          );
        })}
      </section>
    </main>
  );
};

export default QuizPage;
