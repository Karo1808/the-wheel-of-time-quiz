import styles from "../../styles/quizzesSortList.module.css";

interface Props {
  options: {
    label: string;
    icon: React.ReactNode;
    cta: React.ReactNode;
  }[];
}

const QuizzesSortList = ({ options }: Props) => {
  return (
    <ul className={styles.list}>
      {options.map((item) => (
        <li key={item.label} className={styles.item}>
          <div className={styles.container}>
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
          <div>{item.cta}</div>
        </li>
      ))}
    </ul>
  );
};

export default QuizzesSortList;
