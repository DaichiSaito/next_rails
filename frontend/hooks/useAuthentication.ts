import firebase from 'firebase/app'
import axios from 'axios'
import router from 'next/router'
const provider = new firebase.auth.GoogleAuthProvider()
type UserRequestParams = {
  token: string;
  email: string;
  name: string;
}

export const useAuthentication = () => {
  const googleLogin = async () => {
    const userCredential = await firebase.auth().signInWithPopup(provider)
    const idToken = await firebase.auth().currentUser?.getIdToken(/* forceRefresh */ true);
    console.log(idToken)
    const { user } = userCredential
    const res = await loginOrSignup({ token: idToken, email: user?.email, name: user.name })
    if (res.data.error) {
      alert("失敗")
    } else {
      router.push('/articles')
    }
  }

  const emailLogin = async (props: { email: string, password: string }) => {
    const { email, password } = props
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
      const idToken = await firebase.auth().currentUser?.getIdToken(/* forceRefresh */ true);
      const { user } = userCredential
      const res = await loginOrSignup({ token: idToken, email: user?.email, name: user.name })
      if (res.data.error) {
        alert("失敗")
      } else {
        router.push('/articles')
      } 
    } catch (error) {
      alert(error)
    }
  }

  const emailSignup = async (props: { email: string, password: string }) => {
    const { email, password } = props
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const idToken = await firebase.auth().currentUser?.getIdToken(/* forceRefresh */ true);
      const { user } = userCredential
      const res = await loginOrSignup({ token: idToken, email: user?.email, name: user.name })
      if (res.data.error) {
        alert("失敗")
      } else {
        router.push('/articles')
      } 
    } catch (error) {
      alert(error)
    }
    
  }

  const loginOrSignup = async (props: UserRequestParams) => {
    const { token, email, name } = props
    const res = await axios.post('http://localhost:5000/authentications/firebase/login_or_signup', {
      user: {
        email,
        name
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return res
  }

  const logout = async () => {
    await firebase.auth().signOut()
    router.push('/login')
  }
  return { googleLogin, emailLogin, emailSignup, logout }
}