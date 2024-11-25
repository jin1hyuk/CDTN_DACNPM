import React from 'react';
import { Avatar } from '../components/ui/avatar';

interface LeaderboardUser {
  name: string;
  email: string;
  points: number;
  avatar: string;
}

const users: LeaderboardUser[] = Array(7).fill({
  name: 'Ebayyou Anggoro',
  email: 'ebayyouanggoro@gmail.com',
  points: 100,
  avatar: '/placeholder.svg?height=40&width=40'
});

export default function TopLeader() {
  return (
    <div className="bg-gray-900 text-white p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">
        Top Leaderboards For<br />24h Threads
      </h1>
      <p className="text-gray-400 text-center mb-8">
        Leaderboard is used to see the top<br />users with the highest score.
      </p>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <h2 className="text-xl font-semibold">Point</h2>
        </div>

        {users.map((user, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-t border-gray-700">
            <div className="flex items-center">
              <Avatar src={user.avatar} alt={user.name} className="w-10 h-10 rounded-lg mr-3" />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="bg-indigo-600 bg-opacity-20 text-indigo-400 px-3 py-1 rounded-md">
              {user.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}