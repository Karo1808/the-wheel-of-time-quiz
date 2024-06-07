import { IoMdHeart } from "react-icons/io";
import styles from "../../styles/quizzesCard.module.css";
import Tag from "../Tag";
import { FaComments } from "react-icons/fa6";
import Button from "../Button";
const QuizzesCard = () => {
  return (
    <figure className={styles.card}>
      <header className={styles.header}>
        {/* TODO: Add image */}
        <div className={styles.profile}>
          <div className={styles.profile_picture} />
          <p>The Wheel of Time Quiz</p>
        </div>
        <ul className={styles.tags}>
          <Tag tagName="Spoilers" />
          <Tag tagName="Dragon Reborn" />
          <Tag tagName="The Gatherin Storm" />
          <Tag tagName="Path of Daggers" />
        </ul>
      </header>
      <main className={styles.main}>
        <h2 className={styles.title}>The Wheel of Time Quiz</h2>
        <p className={styles.description}>
          Loren ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis
          molestie nibh, ac posuere libero. Donec ornare magna fringilla ante
          accumsan condimentum. Fusce bibendum dui eget nisi ullamcorper
          tincidunt. Integer non mi libero. Maecenas pharetra feugiat consequat.
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
          <Button className={styles.cta_button} state="green">
            Play Now
          </Button>
        </div>
      </footer>
    </figure>
  );
};

export default QuizzesCard;
