import React from 'react';
import  '../styles/ProfileAvatar.css';
import profileAvatar from '../../../assets/images/minq_pixi.jpg';

const ProfileAvatar: React.FC = () => {
  return (
    <div className="profile-avatar">
      <img src={profileAvatar} alt="Avatar" className="profile-avatar__image" />
    </div>
  );
};

export default ProfileAvatar;