import { useState } from "react";
import styles from "../styles/SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않아요!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입 완료! 🎉");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error.code);
      if (error.code === "auth/email-already-in-use") {
        alert("이미 사용 중인 이메일입니다.");
      } else if (error.code === "auth/invalid-email") {
        alert("이메일 형식이 올바르지 않습니다.");
      } else if (error.code === "auth/weak-password") {
        alert("비밀번호는 최소 6자 이상이어야 합니다.");
      } else {
        alert("회원가입 중 문제가 발생했어요.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signup}>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
