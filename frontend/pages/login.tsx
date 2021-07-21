import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import Link from "next/link";
export default function Login() {
  const { googleLogin, emailLogin } = useAuthentication();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickGoogleLogin = () => {
    googleLogin();
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    emailLogin({ email, password });
  };

  return (
    <>
      <div>
        <h2>ソーシャルログイン</h2>
        <button onClick={handleClickGoogleLogin}>Googleでログイン</button>
      </div>
      <hr />
      <div>
        <h2>メールアドレス, PWでログイン</h2>
        <form onSubmit={handleEmailLogin}>
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
          <button>メールアドレス, PWでログイン</button>
        </form>
      </div>
      <Link href="/signup">
        <a>サインアップはこちら →</a>
      </Link>
    </>
  );
}
