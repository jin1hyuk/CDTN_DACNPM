import { FiDatabase, FiSearch } from "react-icons/fi"

function Header() {
  return (
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 rounded-full p-2">
                <FiDatabase className="text-white" />
              </div>
              <span className="font-bold text-xl">DigiForum.io</span>
            </div>
            <span className="text-gray-400">Platform Discussion</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiSearch className="text-gray-400" />
            <div className="bg-blue-500 rounded-full px-6 py-2 flex space-x-4">
              <span>Home</span>
              <span>About</span>
              <span>Community</span>
              <span>Threads</span>
              <span>Leaderboards</span>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Header