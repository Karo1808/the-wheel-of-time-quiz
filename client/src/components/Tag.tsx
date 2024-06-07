import styles from "../styles/tag.module.css";

interface TagProps {
  tagName: string;
}

const Tag = ({ tagName }: TagProps) => {
  return <button className={styles.tag}>{tagName}</button>;
};

export default Tag;
