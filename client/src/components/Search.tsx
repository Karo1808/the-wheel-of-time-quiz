import { IoIosSearch } from "react-icons/io";
import styles from "../styles/search.module.css";
import { InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

const Search = ({ name, onChange, onEnter, ...props }: Props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (onEnter) {
        onEnter();
      }
      setValue("");
    }
  };

  return (
    <div className={styles.wrapper} style={{ width: props?.width }}>
      <button type="submit" className={styles.button}>
        <IoIosSearch size={20} />
      </button>
      <input
        id={name}
        className={styles.input}
        onChange={(e) => {
          handleChange(e);
        }}
        onKeyDown={handleEnter}
        value={value}
        form={props?.form || "search"}
        {...props}
      />
    </div>
  );
};

export default Search;
