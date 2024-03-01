function Profile() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg max-w-lg w-full">
        <form>
          <h3 className="text-2xl font-bold text-center mb-4">Profile</h3>
          <div className="mt-4">
            <label className="block">Full Name</label>
            <input
              type="text"
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
                />{' '}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                />{' '}
                Female
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block">Birthdate</label>
            <input
              type="date"
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
                />{' '}
                Reading
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Traveling"
                />{' '}
                Traveling
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Gaming"
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
              className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
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