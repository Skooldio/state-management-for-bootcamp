import { createContext, useState } from 'react'
import { auth } from '../firebase' // Ensure this path matches your Firebase configuration file
import { onAuthStateChanged } from 'firebase/auth'

// Create the context
export const AuthContext = createContext()

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [checkingStatus, setCheckingStatus] = useState(true)

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // User is signed in
      setUser(currentUser)
    } else {
      // User is signed out
      setUser(null)
    }
    setCheckingStatus(false)
  })

  return (
    <AuthContext.Provider value={{ user, checkingStatus }}>
      {children}
    </AuthContext.Provider>
  )
}

