import { IoMdHeart } from "react-icons/io";
import styles from "../../styles/quizzesCard.module.css";
import Tag from "../Tag";
import { FaComments } from "react-icons/fa6";
import Button from "../Button";

interface QuizzesCardProps {
  handleGoToQuiz: ({
    quizId,
    numberOfQuestions,
  }: {
    quizId: string;
    numberOfQuestions: number;
  }) => void;
  quizId: string;
  numberOfQuestions: number;
  tags?: {
    tagName: string;
    _id: string;
  }[];
  title: string;
  description?: string;
}

const QuizzesCard = ({
  handleGoToQuiz,
  quizId,
  numberOfQuestions,
  tags,
  title,
  description,
}: QuizzesCardProps) => {
  return (
    <figure className={styles.card}>
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
        <div className={styles.cta}>
          <Button className={styles.cta_button} state="none">
            See Details
          </Button>
          <Button
            onClick={() => {
              handleGoToQuiz({ quizId, numberOfQuestions });
            }}
            className={styles.cta_button}
            state="green"
          >
            Play Now
          </Button>
        </div>
      </footer>
    </figure>
  );
};

export default QuizzesCard;
