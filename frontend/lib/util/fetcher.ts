import axios from "axios";
import firebase from 'firebase/app'

const updateOptions = async () => {
  if (typeof window === "undefined") return {};
  const idToken = await firebase
      .auth()
    .currentUser?.getIdToken(/* forceRefresh */ true);
  if (idToken) {
    return {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  }
  

  // if (!window.localStorage.user) return {};

  // if (Object.keys(window.localStorage.user).length === 0) return {};

  // const user = JSON.parse(window.localStorage.user);

  // if (!!user.token) {
  //   return {
  //     headers: {
  //       Authorization: `Token ${user.token}`,
  //     },
  //   };
  // }
};
export default async function (url) {
  const options = await updateOptions()
  const { data } = await axios.get(url, options);
  return data;
}
