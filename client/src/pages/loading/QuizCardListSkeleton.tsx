import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../styles/quizCardListSkeleton.module.css";

const QuizCardListSkeleton = () => {
  return (
    <div className={styles.container}>
      <Skeleton
        count={1}
        height={"100%"}
        containerClassName={styles.item}
        baseColor="#c5c1be"
        highlightColor="#dcdad8"
        borderRadius={10}
      />
      <Skeleton
        count={1}
        height={"100%"}
        containerClassName={styles.item}
        baseColor="#c5c1be"
        highlightColor="#dcdad8"
        borderRadius={10}
      />
    </div>
  );
};

export default QuizCardListSkeleton;
