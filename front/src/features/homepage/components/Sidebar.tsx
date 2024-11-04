// Sidebar.tsx
import React from 'react';
import './home.css';

const Sidebar: React.FC = () => (
  <div className="sidebar">
    <ul className="menu">
      <li><a href="#"><span className="icon">&#128100;</span> Profile</a></li>
      <li><a href="#"><span className="icon">&#128196;</span> Your Threads</a></li>
      <li><a href="#"><span className="icon">&#128278;</span> Saved</a></li>
    </ul>
  </div>
);

export default Sidebar;
