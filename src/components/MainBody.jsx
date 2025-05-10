import { useNavigate } from "react-router-dom";
import styles from "../styles/MainBody.module.css";

function MainBody({ emojis }) {
  const Nav = useNavigate();
  const handleEmojiClick = (mood) => {
    Nav(`/emotion/${mood.types}`);
  };

  return (
    <div className={styles.emojiBox}>
  <h3 className={styles.emojip}>당신의 오늘 기분은 어떠신가요?</h3>
  <p className={styles.mainp}>당신의 기분에 맞춰 노래를 추천해 드릴게요 😌</p>
  <div className={styles.emojis}>
    {emojis.map((mood, index) => (
      <div className={styles.moodBox} key={index}>
        <div className={styles.emoji} onClick={() => handleEmojiClick(mood)}>
          {mood.Emoji}
        </div>
        <p className={styles.mood}>{mood.mood}</p>
      </div>
    ))}
  </div>
</div>

  );
}

export default MainBody;
