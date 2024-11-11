import React from 'react';
import { Link } from 'react-router-dom';
import './RightSidebar.css';

const RightSidebar: React.FC<{ users: { name: string }[] }> = ({ users }) => {
  return (
    <div className="right-sidebar">
      <div className="login-button-container">
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
      <div className="user-list">
        <h2>List of Users</h2>
        {users.map((user, index) => (
          <div className="user" key={index}>
            <div className="avatar"></div>
            <span>{user.name}</span>
          </div>
        ))}
        <a href="#" className="see-more-button">See More</a>
      </div>
    </div>
  );
};

export default RightSidebar;
