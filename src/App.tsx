import styles from "../styles/welcome.module.css";
const App = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>The Wheel of Time Quiz</h1>
      <img src="./wheel.png" className={styles.img} alt="the wheel of time" />
      <blockquote className={styles.blockquote}>
        Greetings, traveler of the Pattern, Welcome to the Wheel of Time Quiz,
        where the threads of fate are yours to unravel. Here, amidst the
        tapestry of Robert Jordan's epic saga, we invite you to test your
        knowledge and delve deep into the realms of Rand al'Thor, the Dragon
        Reborn, and the myriad characters who shape the destiny of nations.{" "}
        <br /> <br /> <span className={styles.warning}>Spoiler Warning</span>
        <br /> <br /> The Wheel weaves as the Wheel wills, and this quiz is a
        challenge fit for those who have traversed the entirety of the series.
        For the Wheel of Time turns, and ages come and pass, leaving memories
        that become legend. So, if you have braved the depths of the Great Hunt,
        danced with the fires of the Dragon Reborn, and whispered secrets in the
        shadowed halls of the White Tower, then step forth and let the Pattern
        guide you. May the Light illuminate your path as you venture into the
        heart of the Wheel of Time.
      </blockquote>
      <button className={styles.button}>Unravel the Pattern</button>
    </header>
  );
};

export default App;
