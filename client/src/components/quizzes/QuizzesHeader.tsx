import styles from "../../styles/quizzesHeader.module.css";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { PiBooks } from "react-icons/pi";

const QuizzesHeader = () => {
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
        <button className={`${styles.option} ${styles.option_book}`}>
          <PiBooks size={25} />
          <span>Books</span>
        </button>
        <button className={styles.option}>
          <HiOutlineAdjustmentsHorizontal size={25} />
          <span>Filter</span>
        </button>
        <button className={styles.option}>
          <MdOutlineSortByAlpha size={25} />
          <span>Sort</span>
        </button>
      </div>
    </header>
  );
};

export default QuizzesHeader;
