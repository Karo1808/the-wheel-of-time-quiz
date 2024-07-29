import Input from "../Input";
import styles from "../../styles/adminAddQuizForm.module.css";
import SearchAndAddItem from "../SearchAndAddItem";
import useTagsQuery from "../../hooks/queries/useTagsQuery";
import { booksList } from "../../config";
import TextArea from "../TextArea";

const AdminAddQuizForm = () => {
  const { tags } = useTagsQuery();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input label="Quiz Name" name="quizName" width="100%" />
      <TextArea rows={6} label="Description" width="100%" />
      <Input
        label="Maximum Time (seconds)"
        name="quizName"
        width="100%"
        min={0}
      />
      <SearchAndAddItem items={tags} keyProp={"tagName"} label="Tags" />
      <SearchAndAddItem items={booksList} keyProp={"title"} label="Books" />
    </form>
  );
};

export default AdminAddQuizForm;
