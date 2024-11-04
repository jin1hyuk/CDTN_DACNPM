// UserList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

interface UserListProps {
  users: { name: string }[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <div className="user-list">
    <h2>List of Users</h2>
    {users.map((user, index) => (
      <div className="user" key={index}>
        <div className="avatar"></div>
        <span>{user.name}</span>
      </div>
    ))}
    <Link to="#" className="see-more-button">See More</Link>
  </div>
);

export default UserList;
