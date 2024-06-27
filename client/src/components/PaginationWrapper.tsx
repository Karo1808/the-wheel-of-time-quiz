import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Pagination from "rc-pagination";
import styles from "../styles/pagination.module.css";
import { useWindowSize } from "@uidotdev/usehooks";

interface PaginationProps {
  numberOfPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const PaginationWrapper = ({
  numberOfPages,
  currentPage,
  handlePageChange,
}: PaginationProps) => {
  const { width } = useWindowSize();

  if (!width) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Pagination
        current={currentPage}
        total={numberOfPages}
        pageSize={1}
        onChange={handlePageChange}
        showLessItems={width < 600}
        align="center"
        className={styles.pagination}
        itemRender={(page, type, originalElement) => {
          if (page === 0 && type === "prev") {
            return null;
          }
          if (page === numberOfPages && type === "next") {
            return null;
          }
          if (
            type === "prev" ||
            type === "next" ||
            type === "jump-prev" ||
            type === "jump-next"
          ) {
            return originalElement;
          }
          return (
            <button
              className={`${styles.pageButton} ${
                page === currentPage && styles.active
              }`}
            >
              {page}
            </button>
          );
        }}
        prevIcon={
          <button className={styles.direction}>
            <IoChevronBackOutline />
          </button>
        }
        nextIcon={
          <button className={styles.direction}>
            <IoChevronForwardOutline />
          </button>
        }
        jumpNextIcon={<button className={styles.direction}>...</button>}
        jumpPrevIcon={<button className={styles.direction}>...</button>}
        defaultCurrent={1}
      />
    </div>
  );
};

export default PaginationWrapper;
