import { IoIosSearch } from "react-icons/io";
import styles from "../../styles/adminOverviewHeader.module.css";
import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { PiBooks } from "react-icons/pi";
import Button from "../Button";
import { useNavigate } from "react-router";

const AdminOverviewHeader = () => {
  const [searchContent, setSearchContent] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  const handleAddQuizClick = () => {
    navigate("/admin/add-quiz");
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
            value={searchContent}
            onChange={handleSearchChange}
            className={styles.search_input}
          />
        </form>
      </div>
      <div className={styles.options}>
        <button className={`${styles.option} ${false && styles.option_active}`}>
          <PiBooks size={25} />
          <span>Books</span>
        </button>
        <button className={`${styles.option} ${false && styles.option_active}`}>
          <HiOutlineAdjustmentsHorizontal size={25} />
          <span>Filter</span>
        </button>
        <Button
          onClick={handleAddQuizClick}
          className={styles.add_quiz}
          state="next"
        >
          Add Quiz
        </Button>
      </div>
    </header>
  );
};

export default AdminOverviewHeader;
