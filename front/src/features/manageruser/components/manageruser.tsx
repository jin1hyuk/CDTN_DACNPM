import React from 'react';
import './manageruser.css';
import Navbar from './NavbarUser';
import Sidebar from './SidebarUser';
import RightSidebar from './RightSidebarUser';
import MainManager from './MainManager';

const ManagerUser: React.FC = () => {
  const users = [
    { name: 'User1' },
    { name: 'User2' },
    { name: 'User3' },
  ];

  const leaderboard = [
    { name: 'User1', score: 100 },
    { name: 'User2', score: 90 },
    { name: 'User3', score: 80 },
  ];


  return (
    <div className="home-body">
      <Navbar />
      <div className="container">
        <Sidebar leaderboard={leaderboard} />

        <RightSidebar users={users} />
      </div>
    </div>
  );
};

export default ManagerUser;
