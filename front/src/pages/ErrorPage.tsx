import React from 'react';
import { X, User, MessageSquare, Heart } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-2xl aspect-square">
        {/* Background cards */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4">
          {['bg-green-200', 'bg-blue-200', 'bg-green-200', 'bg-pink-200', 'bg-purple-200', 'bg-yellow-200', 'bg-blue-200', 'bg-pink-200', 'bg-yellow-200'].map((color, index) => (
            <div key={index} className={`rounded-lg ${color} opacity-20 transform rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105`}></div>
          ))}
        </div>

        {/* Content cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-pink-200 text-gray-800 p-4 rounded-lg shadow-lg transform -rotate-6 transition-all duration-300 hover:rotate-0">
            <div className="flex items-center mb-2">
              <User size={16} className="mr-2" />
              <h3 className="font-bold">#Trust for Anyone</h3>
            </div>
            <p className="text-sm">404 Not Found Page - this content doesn't not exist...</p>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-purple-200 text-gray-800 p-4 rounded-lg shadow-lg transform rotate-3 transition-all duration-300 hover:rotate-0">
            <div className="flex items-center mb-2">
              <MessageSquare size={16} className="mr-2" />
              <h3 className="font-bold">#Free Speech</h3>
            </div>
            <p className="text-sm">404 Not Found Page - this content doesn't not exist...</p>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-yellow-200 text-gray-800 p-4 rounded-lg shadow-lg transform -rotate-3 transition-all duration-300 hover:rotate-0">
            <div className="flex items-center mb-2">
              <Heart size={16} className="mr-2" />
              <h3 className="font-bold">#Free Speech</h3>
            </div>
            <p className="text-sm">404 Not Found Page - this content doesn't not exist...</p>
          </div>
        </div>

        {/* Central error card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Error Page</h2>
              <button className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <p>404 Not Found Page - this content doesn't exist...</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="mb-4">Sorry #PeopleSpeech, we can't find the page you're looking for...</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Go back Home
        </button>
      </div>
    </div>
  );
}