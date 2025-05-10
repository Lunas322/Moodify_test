import { useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Header() {
  const Nav = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert('로그아웃 되었습니다.')
      Nav("/"); 
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className={styles.headerBox}>
      <div className={styles.logo} onClick={() => Nav("/")}>
        Moodify
      </div>
      <div className={styles.navBox}>
        <div className={styles.navItem} onClick={()=>{Nav('/History')}}>History</div>
        <div className={styles.navItem} onClick={()=>{Nav('/Mypage')}}>MyPage</div>
        
        {user ? (
          <>
            <div className={styles.navItem} style={{ color: "#6fcf1c", fontWeight: "bold" }}>
              {user.displayName || user.email}
            </div>
            <div className={styles.navItem} onClick={handleLogout}>
              Logout
            </div>
          </>
        ) : (
          <div className={styles.navItem} onClick={() => Nav("/login")}>
            Login
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
