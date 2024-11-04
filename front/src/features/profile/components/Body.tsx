import React from 'react';
import CoverPhoto from '../components/CoverPhoto';
import ProfileAvatar from '../components/ProfileAvatar';
import UserInfo from '../components/UserInfo';
import ProfilePosts from '../components/ProfilePosts';
import '../styles/Body.css';

const Body: React.FC = () => {
  return (
      <div className='body'>
        <div style={{ position: 'relative' }}>
          <CoverPhoto />
          <ProfileAvatar />
        </div>
        <UserInfo />
        <ProfilePosts />
      </div>
  );
};

export default Body;