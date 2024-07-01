import { useEffect, useRef, useState } from "react";
import useQuizCardPagination from "../../hooks/useQuizCardPagination";
import useQuizzesQuery from "../../hooks/queries/useQuizzesQuery";
import styles from "../../styles/adminCardList.module.css";
import PaginationWrapper from "../PaginationWrapper";
import QuizCard from "../QuizCard";
import AdminCardCta from "./AdminCardCta";
import { useLocation, useNavigate } from "react-router";

const AdminCardList = () => {
  const { quizzes } = useQuizzesQuery();
  const ref = useRef<HTMLUListElement>(null);
  const handleNavigation = () => {
    setActiveIndex(0);
  };
  const { currentPage, totalPages, handlePageChange } = useQuizCardPagination({
    ref,
    action: handleNavigation,
  });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    navigate(`/admin/overview/${quizzes[activeIndex]._id}${location.search}`);
  }, [activeIndex, navigate, quizzes]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list} ref={ref}>
        {quizzes?.map((quiz, index) => (
          <QuizCard
            key={quiz._id}
            tags={quiz.tags}
            title={quiz.quizName}
            description={quiz.quizDescription}
            ctaElements={<AdminCardCta />}
            isActive={activeIndex === index}
            index={index}
            handleClick={handleClick}
          />
        ))}
        <PaginationWrapper
          numberOfPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </ul>
    </div>
  );
};

export default AdminCardList;
