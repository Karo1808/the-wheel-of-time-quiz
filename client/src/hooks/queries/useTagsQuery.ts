import { useSuspenseQuery } from "@tanstack/react-query";
import { getTags } from "../../api/getTags";

const useTagsQuery = () => {
  const { data: tags, error } = useSuspenseQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  return { tags, error };
};

export default useTagsQuery;
