import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="logo">DigiForum.io</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." id="search-input" />
        <button onClick={() => console.log("Searching...")}>&#128269;</button>
      </div>
      <div className="icons">
        <span> &#128276;</span>
      </div>
    </div>
  );
};

export default Navbar;
