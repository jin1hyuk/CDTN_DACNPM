import React from 'react';
import '../styles/UserInfo.css';

const UserInfo: React.FC = () => {
  return (
    <div className="user-info">
      <h1 className="user-info__name">Quang Nguyen</h1>
      <p className="user-info__bio">Ig: ngw_gnaq</p>
      <div className="user-info__details">
        <p><strong>Học tại:</strong> Đại học Sư Phạm Hà Nội</p>
        <p><strong>Sống tại:</strong> Thành phố Hà Nội</p>
        <p><strong>Đến từ:</strong> Hà Nội</p>
      </div>
    </div>
  );
};

export default UserInfo;