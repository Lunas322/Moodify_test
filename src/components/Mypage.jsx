import { useEffect, useState } from "react";
import styles from "../styles/MyPage.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00e396", "#feb019", "#ff4560", "#775dd0"];

function MyPage() {
  const [user] = useAuthState(auth);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const q = query(
        collection(db, "moodHistory"),
        where("uid", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const moodCounts = {};
      snapshot.forEach((doc) => {
        const mood = doc.data().mood;
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
      });

      const formattedData = Object.keys(moodCounts).map((mood) => ({
        name: mood,
        value: moodCounts[mood],
      }));

      setChartData(formattedData);
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>로그인 후 이용해주세요.</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>내가 느낀 감정 통계</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={150}
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MyPage;
