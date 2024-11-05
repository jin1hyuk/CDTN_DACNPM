import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
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
        <Link to="/manageruser" className="see-more-button">See More</Link> {/* Sử dụng Link */}
      </div>
    </div>
  );
};

export default RightSidebarUser;