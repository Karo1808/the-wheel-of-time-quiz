import { useState } from "react";
import styles from "../styles/textArea.module.css";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<"textarea"> {
  name: Path<T>;
  label: string;
  width?: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors[keyof FieldValues];
}

const TextArea = <T extends FieldValues>({
  label,
  width,
  register,
  name,
  errors,
  ...props
}: Props<T>) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

  const errorMessage = errors?.message as React.ReactNode;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        style={{ width: width }}
        className={styles.area}
        {...props}
        value={value}
        {...(register &&
          register(name, { required: true, onChange: handleChange }))}
        onChange={handleChange}
      />
      {errors && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default TextArea;
