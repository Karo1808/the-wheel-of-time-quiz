import { useEffect, useRef, useState } from "react";

const useAccordionControls = (index: number | undefined) => {
  const [openedIndex, setOpenedIndex] = useState<number | undefined>();
  const accordionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setOpenedIndex(index);
    if (index !== undefined && accordionRefs.current[index]) {
      accordionRefs.current[index].scrollIntoView({
        block: "center",
      });
    }
  }, [index]);

  return {
    openedIndex,
    setOpenedIndex,
    accordionRefs,
  };
};

export default useAccordionControls;
