import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import styles from "../styles/login.module.css"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("이메일 로그인 에러:", error.message);
      alert("로그인 실패: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google 로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("Google 로그인 에러:", error.message);
      alert("Google 로그인 실패: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
        <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin} className={styles.form}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>이메일로 로그인</button>
        <button type="button" className={styles.button} onClick={()=>{navigate('/SignUp')}}>회원가입</button>
      </form>

      <hr className={styles.hr} />
      <button onClick={handleGoogleLogin} className={styles.googleButton}>
        Google 계정으로 로그인
      </button>
    </div>
    </div>
  );
}

export default Login;
