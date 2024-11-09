import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RightSidebarUser.css';

const RightSidebarUser: React.FC<{ users: { name: string }[] }> = ({ users }) => {
  // State to toggle the visibility of the dropdowns
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Toggle visibility for Settings menu
  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  // Toggle visibility for More Options menu
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="right-sidebar">
      <div className="setuser">
        <span className="icon" title="Settings" onClick={toggleSettings}>⚙️</span>
        <span className="icon more-options" title="More Options" onClick={toggleDropdown}>≡</span>
      </div>

      {/* Settings menu dropdown */}
      {isSettingsVisible && (
        <div className="settings-menu">
          <Link to="/change-password" className="menu-option">Change Password</Link>
          <Link to="/sign-out" className="menu-option">Sign Out</Link>
        </div>
      )}

      {/* More options dropdown */}
      {isDropdownVisible && (
        <div className="settings-menu">
          <Link to="/manageruser" className="menu-option">Manager User</Link>
          <Link to="/managerpost" className="menu-option">Manager Post</Link>
        </div>
      )}

      <div className="user-list">
        <h2>List of Users</h2>
        {users.map((user, index) => (
          <div className="user" key={index}>
            <div className="avatar"></div>
            <span>{user.name}</span>
          </div>
        ))}
        <Link to="/manageruser" className="see-more-button">See More</Link>
      </div>
    </div>
  );
};

export default RightSidebarUser;
