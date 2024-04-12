import { useEffect, useState } from "react";
import styles from "../../styles/welcome.module.css";
import Typewriter from "../components/Typewriter";
import Button from "../components/Button";
const WelcomePage = () => {
  const [isOpaqueFirstSection, setIsOpaqueFirstSection] =
    useState<boolean>(true);
  const [isOpaqueSecondSection, setIsOpaqueSecondSection] =
    useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsOpaqueFirstSection(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsOpaqueSecondSection(false);
    }, 3000);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <>
          <h1 className={styles.h1}>
            <Typewriter text="Welcome to The Wheel of Time Quiz" delay={50} />
          </h1>
        </>
      </header>
      <section
        className={styles.section}
        style={{ opacity: isOpaqueFirstSection ? 0 : 1 }}
      >
        <img src="./wheel.png" className={styles.img} alt="the wheel of time" />
        <blockquote className={styles.blockquote}>
          Greetings, traveler of the Pattern, Welcome to the Wheel of Time Quiz,
          where the threads of fate are yours to unravel. Here, amidst the
          tapestry of Robert Jordan's epic saga, we invite you to test your
          knowledge and delve deep into the realms of intrigue, mystery, and the
          myriad characters who shape the destiny of nations. <br /> <br />
        </blockquote>
      </section>
      <div className={styles.container}>
        <p className={styles.warning}>
          <Typewriter
            text="Spoiler Warning!"
            isOpaque={isOpaqueFirstSection}
            delay={50}
          />
        </p>
        <section
          className={styles.section}
          style={{ opacity: isOpaqueSecondSection ? 0 : 1 }}
        >
          <blockquote className={styles.blockquote}>
            The Wheel weaves as the Wheel wills, and this quiz is a challenge
            fit for those who have traversed the entirety of the series. For the
            Wheel of Time turns, and ages come and pass, leaving memories that
            become legend. So, if you have braved the depths of the Great Hunt,
            danced with the fires of the Dragon Reborn, and whispered secrets in
            the shadowed halls of the White Tower, then step forth and let the
            Pattern guide you. May the Light illuminate your path as you venture
            into the heart of the Wheel of Time.
          </blockquote>
          <Button
            className={styles.button}
            text="Unravel the Pattern"
            state="none"
            onClick={() => {}}
          />
        </section>
      </div>
    </div>
  );
};

export default WelcomePage;
