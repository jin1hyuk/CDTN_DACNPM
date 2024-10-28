import React from 'react';
import './Home.css'; // Assuming you save the styles in a separate CSS file

const Home: React.FC = () => {
  const activateIcon = (element: HTMLElement) => {
    const icons = document.querySelectorAll('.icons span');
    icons.forEach(icon => icon.classList.remove('active'));
    element.classList.add('active');
  };

  const activateSearch = () => {
    const input = document.getElementById('search-input') as HTMLInputElement;
    console.log("Searching for: " + input.value);
  };

  return (
    <div className="body">
      {/* Top Navigation Bar */}
      <div className="navbar">
        <div className="logo">DigiForum.io</div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." id="search-input" />
          <button onClick={activateSearch}>&#128269;</button>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Threads</a>
          <a href="#">Community</a>
          <a href="#">Leaderboards</a>
        </div>
        <div className="icons">
          <span id="notification-icon" onClick={() => activateIcon(document.getElementById('notification-icon')!)}>&nbsp;&#128276;</span>
          <span id="message-icon" onClick={() => activateIcon(document.getElementById('message-icon')!)}>&nbsp;&#128172;</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container">
        {/* Left Sidebar */}
        <div className="sidebar">
          <ul className="menu">
            <li><a href="#"><img src="https://img.icons8.com/ios-filled/50/ffffff/user.png" alt="Profile Icon" />Profile</a></li>
            <li><a href="#"><img src="https://img.icons8.com/ios-filled/50/ffffff/document.png" alt="Your Threads Icon" />Your Threads</a></li>
            <li><a href="#"><img src="https://img.icons8.com/ios-filled/50/ffffff/bookmark.png" alt="Saved Icon" />Saved</a></li>
          </ul>
          {/* Leaderboard Section */}
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              <li><span>User1</span><span className="score">100</span></li>
              <li><span>User2</span><span className="score">90</span></li>
              <li><span>User3</span><span className="score">80</span></li>
              <li><span>User4</span><span className="score">70</span></li>
            </ul>
            <a href="#" className="see-all-button">See All</a>
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
          <div className="user-list">
            <h2>Users Online</h2>
            <div className="user"><div style={{ backgroundColor: 'green' }}></div><span>User1</span></div>
            <div className="user"><div style={{ backgroundColor: 'red' }}></div><span>User2</span></div>
            <div className="user"><div style={{ backgroundColor: 'blue' }}></div><span>User3</span></div>
          </div>
          <div className="happening-section">
            <h2>What's Happening</h2>
            <div className="event"><div style={{ backgroundColor: 'orange' }}></div><span>Event 1</span></div>
            <div className="event"><div style={{ backgroundColor: 'yellow' }}></div><span>Event 2</span></div>
            <div className="event"><div style={{ backgroundColor: 'purple' }}></div><span>Event 3</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
