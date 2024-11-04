import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/PostDetail.css';

const PostDetail: React.FC = () => {
  const location = useLocation();
  const { title, content, images, likes, dislike } = location.state || {};

  return (
    <div className="post-detail">
      <h1>{title}</h1>
      <p>{content}</p>
      <div className="image-carousel">
        {images && images.map((image: string, index: number) => (
          <img key={index} src={image} alt={`Post image ${index + 1}`} />
        ))}
      </div>
      <div className="like-section">
        <span>{likes} Likes</span>
        <span>{dislike} Dislikes</span>
      </div>
    </div>
  );
};

export default PostDetail;
