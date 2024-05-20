import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../styles/quizPageSkeleton.module.css";
import { useWindowSize } from "@uidotdev/usehooks";

const BASE_COLOR = "#c5c1be";
const HIGHLIGHT_COLOR = "#dcdad8";

const QuizPageSkeleton = () => {
  const windowSize = useWindowSize();
  if (!windowSize?.width) return null;
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>
          <Skeleton
            count={1}
            width={120}
            height={15}
            borderRadius={8}
            baseColor={BASE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
          />
        </span>
        <span>
          <Skeleton
            count={1}
            width={80}
            height={15}
            borderRadius={8}
            baseColor={BASE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
          />
        </span>
      </header>
      <section className={styles.container}>
        <h1>
          <Skeleton
            containerClassName={styles.question}
            className={styles.question}
            height={30}
            borderRadius={8}
            baseColor={BASE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
          />
        </h1>
        <div>
          <Skeleton
            count={1}
            height={90}
            width={90}
            circle
            baseColor={BASE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
          />
        </div>
      </section>
      <section className={styles.answers}>
        <Skeleton
          count={1}
          containerClassName={styles.answer}
          height={65}
          borderRadius={8}
          baseColor={BASE_COLOR}
          highlightColor={HIGHLIGHT_COLOR}
        />
        <Skeleton
          count={1}
          containerClassName={styles.answer}
          height={65}
          borderRadius={8}
          baseColor={BASE_COLOR}
          highlightColor={HIGHLIGHT_COLOR}
        />
        <Skeleton
          count={1}
          containerClassName={styles.answer}
          height={65}
          borderRadius={8}
          baseColor={BASE_COLOR}
          highlightColor={HIGHLIGHT_COLOR}
        />
        <Skeleton
          count={1}
          containerClassName={styles.answer}
          height={65}
          className={styles.answer}
          borderRadius={8}
          baseColor={BASE_COLOR}
          highlightColor={HIGHLIGHT_COLOR}
        />
      </section>
      {windowSize.width > 700 && (
        <footer className={styles.footer}>
          <div>
            <Skeleton
              count={1}
              height={20}
              borderRadius={8}
              baseColor={BASE_COLOR}
              highlightColor={HIGHLIGHT_COLOR}
            />
          </div>
        </footer>
      )}
    </div>
  );
};

export default QuizPageSkeleton;
