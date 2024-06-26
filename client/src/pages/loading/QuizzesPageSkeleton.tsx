import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../styles/quizzesPageSkeleton.module.css";
import { useWindowSize } from "@uidotdev/usehooks";

const BASE_COLOR = "#c5c1be";
const HIGHLIGHT_COLOR = "#dcdad8";

const QuizzesPageSkeleton = () => {
  const windowSize = useWindowSize();
  if (!windowSize?.width) return null;
  return (
    <>
      <header className={styles.header}>
        <div className={styles.top}>
          <div className={styles.title}>
            <span>
              <Skeleton
                count={1}
                width={35}
                height={35}
                borderRadius={100}
                baseColor={BASE_COLOR}
                highlightColor={HIGHLIGHT_COLOR}
              />
            </span>
            {windowSize.width > 1200 && (
              <span>
                <Skeleton
                  count={1}
                  width={150}
                  height={35}
                  baseColor={BASE_COLOR}
                  highlightColor={HIGHLIGHT_COLOR}
                  borderRadius={10}
                />
              </span>
            )}
          </div>
          <span className={styles.input_container}>
            <Skeleton
              count={1}
              containerClassName={styles.input}
              height={35}
              baseColor={BASE_COLOR}
              highlightColor={HIGHLIGHT_COLOR}
              borderRadius={10}
            />
          </span>
        </div>
        <div className={styles.options}>
          <Skeleton
            count={1}
            height={windowSize.width > 1200 ? 35 : 60}
            containerClassName={styles.option}
            baseColor={BASE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
            borderRadius={10}
          />
          <Skeleton
            count={1}
            height={windowSize.width > 1200 ? 35 : 60}
            containerClassName={styles.option}
            baseColor={BASE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
            borderRadius={10}
          />
        </div>
      </header>
      <main className={styles.main}>
        {windowSize.width > 1200 && (
          <Skeleton
            count={1}
            width={200}
            height={"100%"}
            containerClassName={styles.book_list}
            baseColor={BASE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
            borderRadius={10}
          />
        )}
        <div className={styles.quizzes}>
          <Skeleton
            count={1}
            height={"100%"}
            containerClassName={styles.quizzes_card}
            baseColor={BASE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
            borderRadius={10}
          />
          <Skeleton
            count={1}
            height={"100%"}
            containerClassName={styles.quizzes_card}
            baseColor={BASE_COLOR}
            highlightColor={HIGHLIGHT_COLOR}
            borderRadius={10}
          />
        </div>
      </main>
    </>
  );
};

export default QuizzesPageSkeleton;
