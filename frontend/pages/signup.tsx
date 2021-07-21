import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import Link from "next/link";
export default function Signup() {
  const { emailSignup } = useAuthentication();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignup = (e) => {
    e.preventDefault();
    emailSignup({ email, password });
  };

  return (
    <>
      <div>
        <h2>メールアドレス, PWでサインアップ</h2>
        <form onSubmit={handleEmailSignup}>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button>メールアドレス, PWでサインアップ</button>
        </form>
      </div>
      <Link href="/login">
        <a>ログインはこちら →</a>
      </Link>
    </>
  );
}
