import { useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import { AuthContext } from './AuthContext'
import axios from 'axios'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  // Save user to database 
  const saveUser = async (user) => {
    const userData ={
      email: user?.email,
      name: user?.displayName,
      photoURL: user?. photoURL,
      role: 'customer'
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        userData
      )
      return data
    } catch(error) {
      console.error('Error saving user:', error)
    }
  }

  // Get token from Firebase 
  const getToken = async (email) => {
    try {
      const currentUser = auth.currentUser
      if(currentUser) {
        const token = await currentUser.getIdToken()
        localStorage.setItem('access-token', token)
        return token
      }
    } catch (error) {
      console.error('Error getting token', error)
    }
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        await getToken(currentUser.email)
        await saveUser(currentUser)
      } else {
        localStorage.removeItem('access-token')
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    saveUser
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
