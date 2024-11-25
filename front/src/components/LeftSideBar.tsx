import { useState, useEffect } from 'react'
import { FiUser,FiGithub
    ,FiDatabase,
FiHash,FiBookmark,FiSearch} from 'react-icons/fi'
import { Button } from './ui/button'
import apiUser from '../api/apiUser';
function LeftSideBar() {


  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col">
    <div className="flex items-center space-x-2 mb-8">
      <div className="bg-blue-500 rounded-full p-2">
        <FiDatabase className="text-white" />
      </div>
      <div>
        <h1 className="font-bold text-xl">DigiForum.io</h1>
        <p className="text-sm text-gray-400">Platform Discussion</p>
      </div>
    </div>

    <div className="flex items-center space-x-2 bg-gray-700 rounded-full px-4 py-2 mb-8">
      <FiSearch className="text-gray-400" />
      <input type="text" placeholder="Explore..." className="bg-transparent focus:outline-none w-full text-sm" />
    </div>

    <nav className="space-y-4 mb-8">
      <a href="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white">
        <FiUser />
        <span>Profile</span>
      </a>
      <a href="/home" className="flex items-center space-x-2 text-gray-300 hover:text-white">
        <FiHash />
        <span>Your Threads</span>
      </a>
      <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
        <FiBookmark />
        <span>Saved</span>
      </a>
    </nav>

    <div className="flex-grow">
      <h2 className="font-bold mb-4">Top Leaderboards</h2>
      <div className="space-y-4">
        {[
          { name: 'Ebayyou An', email: 'ebay@gmail.c', score: 100, color: 'bg-green-500' },
          { name: 'Ebayyou An', email: 'ebay@gmail.c', score: 80, color: 'bg-blue-500' },
          { name: 'Ebayyou An', email: 'ebay@gmail.c', score: 50, color: 'bg-pink-500' },
        ].map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-md ${user.color}`}></div>
              <div>
                <div className="text-sm">{user.name}</div>
                <div className="text-xs text-gray-400">{user.email}</div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded ${user.color} bg-opacity-20 text-${user.color.split('-')[1]}-500`}>
              {user.score}
            </div>
          </div>
        ))}
      </div>
      <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-sm">See All Leaderboards</Button>
    </div>

    <div className="mt-8 space-y-2 text-sm text-gray-400">
      <a href="#" className="flex items-center space-x-2 hover:text-white">
        <FiGithub />
        <span>Source Code</span>
      </a>
      <a href="#" className="flex items-center space-x-2 hover:text-white">
        <FiDatabase />
        <span>Forum API Dicoding</span>
      </a>
    </div>

    <div className="mt-4 text-xs text-gray-500">
      ©2023 DigiForum. All rights reserved.
    </div>
  </div>
  )
}

export default LeftSideBar