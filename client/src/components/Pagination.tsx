import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import styles from "../styles/pagination.module.css";

interface PaginationProps {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <button
        disabled={currentPage === 1}
        className={styles.direction}
        onClick={handlePrevious}
      >
        <IoChevronBackOutline />
      </button>
      {[...Array(numberOfPages)].map((_, i) => (
        <button
          key={i}
          className={`${styles.pageButton} ${
            currentPage === i + 1 ? styles.active : ""
          }`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === numberOfPages}
        className={styles.direction}
        onClick={handleNext}
      >
        <IoChevronForwardOutline />
      </button>
    </div>
  );
};

export default Pagination;
