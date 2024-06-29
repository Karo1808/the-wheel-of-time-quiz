import { useEffect, useState } from "react";

const useDialogControls = ({
  ref,
}: {
  ref: React.RefObject<HTMLDialogElement>;
}) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setIsOverlayOpen(false);
    });
    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, [setIsOverlayOpen]);

  const toggleDialog = () => {
    if (!ref.current) return;
    ref.current.hasAttribute("open")
      ? ref.current.close()
      : ref.current.showModal();

    setIsOverlayOpen(!isOverlayOpen);
  };

  return {
    isOverlayOpen,
    toggleDialog,
  };
};

export default useDialogControls;
