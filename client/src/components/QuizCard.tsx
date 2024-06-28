import { IoMdHeart } from "react-icons/io";
import styles from "../styles/quizCard.module.css";
import Tag from "./Tag";
import { FaComments } from "react-icons/fa6";

interface Props {
  tags?: {
    tagName: string;
    _id: string;
  }[];
  title: string;
  description?: string;
  ctaElements: React.ReactNode;
  isActive?: boolean;
  index?: number;
  handleClick?: (index: number) => void;
}

const QuizCard = ({
  tags,
  title,
  description,
  ctaElements,
  handleClick,
  isActive,
  index,
}: Props) => {
  return (
    <figure
      onClick={() => handleClick && handleClick(index || 0)}
      className={`${styles.card} ${isActive && styles.active_card}`}
      style={{ cursor: handleClick ? "pointer" : "default" }}
    >
      <header className={styles.header}>
        {/* TODO: Add image */}
        <div className={styles.profile}>
          <div className={styles.profile_picture} />
          <p>The Wheel of Time Quiz</p>
        </div>
        <ul className={styles.tags}>
          {tags
            ? tags.map((tag) => <Tag tagName={tag.tagName} key={tag._id} />)
            : null}
        </ul>
      </header>
      <main className={styles.main}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          {description ? description : "No description"}
        </p>
      </main>
      <footer className={styles.footer}>
        <div className={styles.misc}>
          <div className={styles.misc_item}>
            <IoMdHeart className={styles.misc_item_icon} />
            {/* TODO: Add number of likes */}
            <span className={styles.misc_item_number}>1200</span>
          </div>
          <div className={styles.misc_item}>
            <FaComments className={styles.misc_item_icon} />
            {/* TODO: Add number of likes */}
            <span className={styles.misc_item_number}>1200</span>
          </div>
        </div>
        <div className={styles.cta}>{ctaElements}</div>
      </footer>
    </figure>
  );
};

export default QuizCard;
