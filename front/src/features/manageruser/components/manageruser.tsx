import React from 'react';
import './manageruser.css';
import Navbar from '../../homepage/components/Navbar';
import Sidebar from '../../homepage/components/Sidebar';
import MainManager from './MainManager';
import RightSidebarUser from '../../homeuser/components/RightSidebarUser';


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

        <RightSidebarUser users={users} />
      </div>
    </div>
  );
};

export default ManagerUser;
