import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const users = [
    { name: 'User1', email: 'user1@example.com' },
    { name: 'User2', email: 'user2@example.com' },
    { name: 'User3', email: 'user3@example.com' },
  ];

  const leaderboard = [
    { name: 'User1', score: 100, email: 'user1@example.com' },
    { name: 'User2', score: 90, email: 'user2@example.com' },
    { name: 'User3', score: 80, email: 'user3@example.com' },
  ];

  return (
    <div className="home-body">
      {/* Top Navigation Bar */}
      <div className="navbar">
        <div className="logo">DigiForum.io</div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." id="search-input" />
          <button onClick={() => console.log("Searching...")}>&#128269;</button>
        </div>
        <div className="bgr-nav-links">
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Threads</a>
            <a href="#">Community</a>
            <a href="#">Leaderboards</a>
          </div>
        </div>
        <div className="icons">
          <span>&#128276;</span>
          <span>&#128172;</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container">
        {/* Left Sidebar */}
        <div className="sidebar">
          <ul className="menu">
            <li>
              <a href="#">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/user.png" alt="Profile Icon" />
                Profile
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/document.png" alt="Your Threads Icon" />
                Your Threads
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/bookmark.png" alt="Saved Icon" />
                Saved
              </a>
            </li>
          </ul>

          {/* Leaderboard Section */}
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {leaderboard.map((user, index) => (
                <li key={index}>
                  <div className="leaderboard-item">
                    <span>{user.name}</span>
                    <div className="email">{user.email}</div> {/* Email nằm dưới tên người dùng */}
                  </div>
                </li>
              ))}
            </ul>
            <a href="#" className="see-all-button">See All Leaderboards</a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          <h1>Welcome to DigiForum</h1>
          <div className="post-card">
            <h2>Post Title</h2>
            <p>Post content goes here...</p>
          </div>
          <div className="post-card">
            <h2>Another Post Title</h2>
            <p>More content goes here...</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="login-button-container">
            {/* Link to the login page */}
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          </div>
          <div className="user-list">
            <h2>List of Users</h2>
            {users.map((user, index) => (
              <div className="user" key={index}>
                <div className="avatar"></div>
                <div>
                  <span>{user.name}</span>
                  <div className="email">{user.email}</div> {/* Email nằm dưới tên người dùng */}
                </div>
              </div>
            ))}
            <a href="#" className="see-more-button">See More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
