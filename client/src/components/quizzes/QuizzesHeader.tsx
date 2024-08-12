import { useState } from "react";

import { useWindowSize } from "@uidotdev/usehooks";
import { AnimatePresence } from "framer-motion";

import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { PiBooks } from "react-icons/pi";

import Drawer from "../Drawer";
import QuizzesBookList from "./QuizzesBookList";
import Dropdown from "../Dropdown";
import QuizzesSortList from "./QuizzesSortList";
import Search from "../Search";

import { sortList } from "../../config";

import styles from "../../styles/quizzesHeader.module.css";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <form className={styles.search} onSubmit={handleSubmit}>
          <Search name="search" type="search" placeholder="Search" />
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
          <QuizzesBookList setIsBookDrawerOpen={setIsBookDrawerOpen} />
        </Drawer>
      )}
    </header>
  );
};

export default QuizzesHeader;
