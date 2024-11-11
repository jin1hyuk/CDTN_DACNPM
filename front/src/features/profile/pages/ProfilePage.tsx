import React from 'react';
import Header from '../components/Header';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import Body from '../components/Body';
import '../styles/ProfilePage.css';

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <Header />
      <div className='profile-page__body'>
        <SidebarLeft />
        <Body/>
        <SidebarRight />
      </div>
    </div>
  );
};

export default ProfilePage;