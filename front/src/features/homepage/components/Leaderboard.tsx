// Leaderboard.tsx
import React from 'react';
import './home.css';

interface LeaderboardProps {
  leaderboard: { name: string, score: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => (
  <div className="leaderboard">
    <h2>Leaderboard</h2>
    <ul>
      {leaderboard.map((user, index) => (
        <li key={index}>
          <div className="leaderboard-item">
            <span>{user.name}</span>
            <div className="score">{user.score}</div>
          </div>
        </li>
      ))}
    </ul>
    <a href="#" className="see-all-button">See All Leaderboards</a>
  </div>
);

export default Leaderboard;
