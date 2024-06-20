import styles from "../../styles/quizzesHeader.module.css";
import { AnimatePresence } from "framer-motion";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import Drawer from "../Drawer";
import { useState } from "react";
import QuizzesBookList from "./QuizzesBookList";
import { useWindowSize } from "@uidotdev/usehooks";
import Dropdown from "../Dropdown";
import { sortList } from "../../config";
import QuizzesSortList from "./QuizzesSortList";

const QuizzesHeader = () => {
  const [isBookDrawerOpen, setIsBookDrawerOpen] = useState<boolean>(false);

  const [isSortHovered, setIsSortHovered] = useState<boolean>(false);
  const { width } = useWindowSize();

  if (!width) return null;

  const handleSortHoverEnter = () => {
    if (width < 1200) return;
    setIsSortHovered(true);
  };

  const handleSortHoverLeave = () => {
    if (width < 1200) return;
    setIsSortHovered(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img
            className={styles.logo_image}
            src="/wheel.png"
            alt="wheel of time logo"
          />
          <p className={styles.logo_text}>The Wheel of Time Quiz</p>
        </div>
        <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
          <button type="submit" className={styles.search_button}>
            <IoIosSearch size={20} />
          </button>
          <input
            type="text"
            placeholder="Search"
            className={styles.search_input}
          />
        </form>
      </div>
      <div className={styles.options}>
        {width < 1200 && (
          <button
            onClick={() => setIsBookDrawerOpen(!isBookDrawerOpen)}
            className={styles.option}
          >
            <PiBooks size={25} />
            <span>Books</span>
          </button>
        )}

        <button className={`${styles.option} ${false && styles.option_active}`}>
          <HiOutlineAdjustmentsHorizontal size={25} />
          <span>Filter</span>
        </button>
        <button
          onMouseEnter={handleSortHoverEnter}
          onMouseLeave={handleSortHoverLeave}
          className={`${styles.option} ${styles.option_sort} ${
            isSortHovered && styles.option_active
          }`}
        >
          <MdOutlineSortByAlpha size={25} />
          <span>Sort</span>
        </button>
        <AnimatePresence>
          {isSortHovered && (
            <Dropdown
              open={handleSortHoverEnter}
              close={handleSortHoverLeave}
              className={styles.quizzes_dropdown}
            >
              <QuizzesSortList options={sortList} />
            </Dropdown>
          )}
        </AnimatePresence>
      </div>
      {isBookDrawerOpen && (
        <Drawer open={isBookDrawerOpen} setOpen={setIsBookDrawerOpen}>
          <QuizzesBookList />
        </Drawer>
      )}
    </header>
  );
};

export default QuizzesHeader;
