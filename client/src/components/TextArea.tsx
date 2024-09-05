import styles from "../styles/textArea.module.css";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import FormError from "./FormError";

interface Props<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<"textarea"> {
  name: Path<T>;
  label: string;
  width?: string;
  required?: boolean;
  register?: UseFormRegister<T>;
  errors?: FieldErrors[keyof FieldValues];
}

const TextArea = <T extends FieldValues>({
  label,
  width,
  register,
  required,
  name,
  errors,
  ...props
}: Props<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        {...(register && register(name, { required, onChange: handleChange }))}
        onChange={handleChange}
      />
      <FormError errorMessage={errorMessage} />
    </div>
  );
};

export default TextArea;
