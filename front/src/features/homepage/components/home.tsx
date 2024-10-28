import React, { useState } from 'react';
import './Home.css'; // Assuming you save the styles in a separate CSS file

const Home: React.FC = () => {
  const [activeUser, setActiveUser] = useState<string | null>(null);

  const handleUserClick = (username: string) => {
    setActiveUser(username); // Set the clicked user as active
  };

  return (
    <div className="body">
      {/* Top Navigation Bar */}
      <div className="navbar">
        <div className="logo">DigiForum.io</div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." id="search-input" />
          <button onClick={() => console.log("Searching...")}>&#128269;</button>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Threads</a>
          <a href="#">Community</a>
          <a href="#">Leaderboards</a>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container">
        {/* Left Sidebar */}
        <div className="sidebar">
          <ul className="menu">
            <li><a href="#">Profile</a></li>
            <li><a href="#">Your Threads</a></li>
            <li><a href="#">Saved</a></li>
          </ul>
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              <li><span>User1</span><span className="score">100</span></li>
              <li><span>User2</span><span className="score">90</span></li>
              <li><span>User3</span><span className="score">80</span></li>
            </ul>
            <a href="#" className="see-all-button">See All Leaderboards</a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          <h1>Welcome to DigiForum</h1>
          <div className="post-card">Post content goes here...</div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="login-button-container">
            <button className="login-button">Login</button>
          </div>
          <div className="user-list">
            <h2>List of Users</h2>
            {['User1', 'User2', 'User3', 'User4', 'User5'].map((username) => (
              <div
                key={username}
                className={`user ${activeUser === username ? 'active' : ''}`}
                onClick={() => handleUserClick(username)}
              >
                <span>{username}</span>
                <span className="faint-label">{username.toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
