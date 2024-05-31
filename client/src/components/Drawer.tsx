import {
  motion,
  useDragControls,
  useMotionValue,
  useAnimate,
} from "framer-motion";
import styles from "../styles/drawer.module.css";
import { useMeasure } from "@uidotdev/usehooks";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Drawer = ({ open, setOpen, children }: Props) => {
  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const y = useMotionValue<number>(0);

  const [drawerRef, bounds] = useMeasure();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, bounds.height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.overlay}
          onClick={handleClose}
          ref={scope}
        >
          <motion.div
            ref={drawerRef}
            id="drawer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            style={{ y }}
            transition={{ ease: "easeInOut" }}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
            className={styles.drawer}
          >
            <div
              onPointerDown={(e) => controls.start(e)}
              className={styles.handle}
            >
              <button className={styles.button_handle} />
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Drawer;
