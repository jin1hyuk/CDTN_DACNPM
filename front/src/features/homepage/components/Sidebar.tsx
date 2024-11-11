import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC<{ leaderboard: { name: string; score: number }[] }> = ({ leaderboard }) => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li>
          <a href="#">
            <span className="icon">&#128100;</span>
            Profile
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">&#128196;</span>
            Your Threads
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">&#128278;</span>
            Saved
          </a>
        </li>
      </ul>

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
    </div>
  );
};

export default Sidebar;
