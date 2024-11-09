import React, { useState, useEffect } from 'react';
import './MainManager.css';

const MainManager: React.FC = () => {
  const [userList, setUserList] = useState<any[]>([]);

  // Fake user data
  const fakeUsers = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40',
      roles: ['Admin', 'Moderator']
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://via.placeholder.com/40',
      roles: ['User']
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: 'https://via.placeholder.com/40',
      roles: ['User']
    },
    {
      id: 4,
      name: 'Sara Williams',
      avatar: 'https://via.placeholder.com/40',
      roles: ['Moderator']
    },
    {
      id: 5,
      name: 'David Brown',
      avatar: 'https://via.placeholder.com/40',
      roles: ['Admin']
    }
  ];

  // Set the user list with the fake users array
  useEffect(() => {
    setUserList(fakeUsers); // Use the fake user list
  }, []);

  // Function to render the user list
  const renderUserList = () => {
    return userList.map((user) => (
      <div className="mm-user-card" key={user.id}>
        <div className="mm-user-header">
          <div className="mm-avatar" style={{ backgroundImage: `url(${user.avatar || 'https://via.placeholder.com/40'})` }}></div>
          <div>
            <span className="mm-username">{user.name}</span>
            <div className="mm-user-roles">{user.roles.join(', ')}</div> {/* Display roles */}
          </div>
          <div></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="mm-main-content">
      <h2>User List</h2>
      {/* Render the user list */}
      {renderUserList()}
    </div>
  );
};

export default MainManager;
