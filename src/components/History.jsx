import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import styles from "../styles/History.module.css";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "moodHistory"),
        where("uid", "==", user.uid),  
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      console.log(snapshot)
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHistory(data);
      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  if (loading) return <div className={styles.container}>로딩 중...</div>;

  if (!user) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>History는 로그인 후 이용할 수 있습니다.</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My History</h2>
      {history.map((item) => (
        <div className={styles.card} key={item.id}>
          <h3>{item.videoTitle} 🎧</h3>
          <p><strong>기분:</strong> {item.mood}</p>
          <p><strong>메모:</strong> {item.message}</p>
          <p><strong>날짜:</strong> {item.createdAt.toDate().toLocaleString()}</p>
          <iframe
            src={`https://www.youtube.com/embed/${item.videoId}`}
            title={item.videoTitle}
            frameBorder="0"
            allowFullScreen
            className={styles.video}
          />
        </div>
      ))}
    </div>
  );
}

export default History;
