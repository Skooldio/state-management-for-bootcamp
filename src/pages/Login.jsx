import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { auth } from '../firebase' // Adjust the path as necessary
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

import Spinner from '../components/Spinner'
import Loading from '../components/Loading'

import { AuthContext } from '../contexts/AuthContext' // Adjust the path as needed

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Add loading state
  const { checkingStatus } = useContext(AuthContext)

  const loginUser = async (e) => {
    e.preventDefault()
    setIsLoading(true) // Start loading

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/profile') // Redirect to profile page after successful login
    } catch (error) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false) // Stop loading regardless of outcome
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      navigate('/profile')
    } catch (error) {
      console.error(error)
      alert('Google Sign-In failed. Please try again.')
    }
  }

  if (checkingStatus) {
    return <Loading /> // or your custom loader component
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login</h3>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={loginUser}>
          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="flex flex-col gap-2 items-center justify-between ">
            {isLoading ? (
              <Spinner />
            ) : (
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Login
              </button>
            )}
            <Link
              to="/register"
              className="text-sm text-blue-600 hover:underline"
            >
              Don't have an account? Register
            </Link>
          </div>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login
