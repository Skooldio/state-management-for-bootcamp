import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import Loading from '../components/Loading'

import { useAuth } from '../contexts/AuthContext.jsx'

function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { checkingStatus } = useAuth()

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(userCredential.user) // You might want to do something with the user info or redirect
      alert('Register success')
      navigate('/profile') // Redirect to profile page after successful registration
    } catch (error) {
      setError(error.message)
    }
  }

  if (checkingStatus) {
    return <Loading /> // or your custom loader component
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={registerUser}>
          <div className="mt-4">
            <div>
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
            <div className="flex items-baseline justify-between">
              <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
