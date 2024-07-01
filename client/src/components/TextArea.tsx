import { TextareaHTMLAttributes } from "react";
import styles from "../styles/textArea.module.css";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  width?: string;
}

const TextArea = ({ label, width, ...props }: Props) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <textarea style={{ width: width }} className={styles.area} {...props} />
    </div>
  );
};

export default TextArea;
