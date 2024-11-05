import React from 'react';
import './MainManager.css';

interface User {
  name: string;
  avatar: string;
}

interface MainManagerProps {
  users: User[];
}

const MainManager: React.FC<MainManagerProps> = ({ users }) => {
  return (
    <div className="main-content">
      <h2>User List</h2>
      <div className="user-list">
        {users.slice(0, 20).map((user, index) => (
          <div className="user" key={index}>
            <div className="avatar" style={{ backgroundImage: `url(${user.avatar})` }}></div>
            <span className="username">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainManager;
