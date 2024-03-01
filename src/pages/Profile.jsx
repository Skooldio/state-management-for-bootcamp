import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

import { AuthContext } from '../contexts/AuthContext' // Adjust the path as needed

import Loading from '../components/Loading'

function Profile() {
  const navigate = useNavigate()
  const [fullname, setFullname] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [interests, setInterests] = useState([])
  const [loading, setLoading] = useState(true)
  const { checkingStatus, user } = useContext(AuthContext)

  useEffect(() => {
    if (!checkingStatus && !user) {
      navigator('/')
    }

    if (user) {
      fetchUserProfile(user.uid)
    }
  }, [checkingStatus, user])

  const fetchUserProfile = async (uid) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      setFullname(data.fullname)
      setGender(data.gender)
      setBirthdate(data.birthdate)
      setInterests(data.interests || [])
    }
    setLoading(false)
  }

  const handleInterestChange = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest))
    } else {
      setInterests([...interests, interest])
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    if (!user) return
    const docRef = doc(db, 'users', user.uid)
    await setDoc(docRef, {
      fullname,
      gender,
      birthdate,
      interests,
    })
    console.log('updateProfile')
    alert('Profile updated successfully!')
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  if (loading) return <Loading />

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg max-w-lg w-full">
        <form onSubmit={updateProfile}>
          <h3 className="text-2xl font-bold text-center mb-4">Profile</h3>
          <div className="mt-4">
            <label className="block">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Gender</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={() => setGender('Male')}
                />{' '}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={() => setGender('Female')}
                />{' '}
                Female
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block">Birthdate</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Interests</label>
            <div className="flex flex-wrap gap-4">
              <label>
                <input
                  type="checkbox"
                  value="Reading"
                  checked={interests.includes('Reading')}
                  onChange={() => handleInterestChange('Reading')}
                />{' '}
                Reading
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Traveling"
                  checked={interests.includes('Traveling')}
                  onChange={() => handleInterestChange('Traveling')}
                />{' '}
                Traveling
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Gaming"
                  checked={interests.includes('Gaming')}
                  onChange={() => handleInterestChange('Gaming')}
                />{' '}
                Gaming
              </label>
              {/* Add more interests as needed */}
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              Update Profile
            </button>
            <button
              type="button"
              className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
