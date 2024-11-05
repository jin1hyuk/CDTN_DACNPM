import React from 'react';
import './RightSidebarUser.css';

const RightSidebarUser: React.FC<{ users: { name: string }[] }> = ({ users }) => {
  return (
    <div className="right-sidebar">
      <div className="setuser">
        <span className="icon" title="Settings">⚙️</span> {/* Biểu tượng cài đặt */}
        <span className="icon more-options" title="More Options">≡</span> {/* Biểu tượng ba gạch */}
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

export default RightSidebarUser;
