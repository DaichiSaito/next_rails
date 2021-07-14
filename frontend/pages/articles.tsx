import firebase from "firebase/app";
import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";
export default function Articles() {
  const [authUser, setAuthUser] = useState(undefined);
  const [articles, setArticles] = useState([]);
  useEffect(async () => {
    firebase.auth().onAuthStateChanged((user) => {
      setAuthUser(user);
    });
    if (authUser == undefined) return;

    const idToken = await firebase
      .auth()
      .currentUser?.getIdToken(/* forceRefresh */ true);
    console.log(idToken);
    try {
      const res = await axios.get("http://localhost:5000/articles", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      setArticles(res.data);
    } catch (e) {
      console.log(e);
    }
  }, [authUser]);
  return (
    <>
      <h1>記事一覧です。ログインしてないと見れません</h1>
      <LogoutButton />
      <div>
        {articles.map((article) => (
          <p key={article.id}>{article.title}</p>
        ))}
      </div>
    </>
  );
}
