import styles from "../styles/input.module.css";
import { InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  width?: string;
}

const Input = ({ label, name, width, ...props }: Props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        value={value}
        onChange={handleChange}
        name={name}
        style={{ width: width }}
        {...props}
      />
    </div>
  );
};

export default Input;
