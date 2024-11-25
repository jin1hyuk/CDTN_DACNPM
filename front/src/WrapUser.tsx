import React from 'react'
import { Link } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar'
import RightSideBar from './components/RightSideBar'
import { Button } from './components/ui/button'
import { FiBell, FiMail } from 'react-icons/fi'

function WrapUser({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Sidebar */}
      <LeftSideBar/>
      <div className="flex-grow p-8">
        <header className="flex justify-between items-center mb-8">
          <nav className="bg-indigo-600 rounded-full px-6 py-2">
            <ul className="flex space-x-6">
              <li><Link to={'/'} className="text-white hover:text-gray-200">Home</Link></li>
              <li><Link to={'/'} className="text-white hover:text-gray-200">About</Link></li>
              <li><Link to={'/'} className="text-white hover:text-gray-200">Threads</Link></li>
              <li><Link to={'/'} className="text-white hover:text-gray-200">Community</Link></li>
              <li><Link to={'/'} className="text-white hover:text-gray-200">Leaderboards</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <FiBell />
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <FiMail />
            </Button>
          </div>
        </header>
      {children}
    </div>
      {/* Right Sidebar */}
      <RightSideBar/>
    </div>
    </>
  )
}

export default WrapUser