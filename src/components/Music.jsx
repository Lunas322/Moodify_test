import { useParams } from "react-router-dom";
import styles from "../styles/Music.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase"; 



const API = import.meta.env.VITE_YOUTUBE_API_KEY;
const musicKeyworld = {
  happy: "신나는 힙합",
  sad: "슬픈감성 힙합",
  anger: "빡센 랩",
  stress: "힐링 힙합",
};

function Music() {
  const { emojitype } = useParams();
  const [musicList, setMusicList] = useState([]);
  const [MusicCount, setMusiCount] = useState(0);
  const [note, setNote] = useState("");
  const mood =
    emojitype === "sad"
      ? "슬픈"
      : emojitype === "happy"
      ? "행복한"
      : emojitype === "stress"
      ? "스트레스 받는"
      : emojitype === "anger"
      ? "화난"
      : "복잡한";

  const message =
    emojitype === "happy"
      ? "당신이 늘 행복했으면 좋겠어요🙂"
      : emojitype === "sad"
      ? "괜찮아요 그럴 수 있어요 힘내요😌"
      : emojitype === "stress"
      ? "이 노래를 들으면서 힐링해봐요😊"
      : emojitype === "anger"
      ? "이 노래를 듣고 분노를 날려버려요!😡"
      : "기분을 선택해주세요!";

  const Next = () => {
    setMusiCount((prev) => (prev + 1) % musicList.length);
  };

  const handleSaveNote = async () => {
    try {
      const music = musicList[MusicCount];
      await addDoc(collection(db, "moodHistory"), {
        mood: emojitype,
        message: note,
        videoTitle: music.snippet.title,
        videoId: music.id.videoId,
        uid: auth.currentUser?.uid,
        createdAt: Timestamp.now(),
      });
      alert("기분이 저장되었어요!");
      setNote("");
    } catch (error) {
      console.error("기분 저장 실패:", error);
      alert("로그인 후 이용하세요.");
    }
  };

  useEffect(() => {
    const fetchMusicList = async () => {
      setMusicList([]);
      try {
        const keyword = musicKeyworld[emojitype];
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              type: "video",
              q: keyword,
              maxResults: 3,
              key: API,
            },
          }
        );
        setMusicList(response.data.items);
      } catch (e) {
        alert("음악을 가져오는 중 문제가 생겼습니다");
      }
    };
    fetchMusicList();
  }, [emojitype]);

  return (
    <div className={styles.MusicBox}>
      <div className={styles.sessionone}>
        <h3 className={styles.moodText}>
          {`현재 ${mood} 기분을 가지고 있는 당신에게`}
        </h3>
        <h3 className={styles.moodText}>이 노래를 추천할게요 🙂</h3>
        {musicList.length > 0 && (
          <div className={styles.MusicItem}>
            <iframe
              className={styles.Music}
              src={`https://www.youtube.com/embed/${musicList[MusicCount].id.videoId}`}
              title={musicList[MusicCount].snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className={styles.mysay}>{message}</p>
            <button className={styles.Musicbutton} onClick={Next}>
              NEXT
            </button>
          </div>
        )}
      </div>

      <div className={styles.sessiontwo}>
        <h3 className={styles.inputh3}>ToDay My Mood</h3>
        <textarea
          placeholder="오늘의 기분 기록하기"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={styles.inputmood}
        />
        <button className={styles.addbutton} onClick={handleSaveNote}>
          Note
        </button>
      </div>
    </div>
  );
}

export default Music;