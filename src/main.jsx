import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './contexts/AuthContext.jsx'

import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'

import './index.css'

const ProtectedRoute = ({ children }) => {
  const { user, checkingStatus } = useContext(AuthContext)

  if (checkingStatus) return <div>Loading...</div> // Show loading state

  if (user) return <Navigate to="/profile" replace />

  return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: <Profile />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
