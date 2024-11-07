import React, {  } from 'react';
import Post from '../components/Post';
import '../styles/ProfilePosts.css';
import post1 from '../../../assets/images/IMG_9247.jpg';
import post2 from '../../../assets/images/z4622714404815_60c089ddaa2b94b042f05c35154d1ad3.jpg';
import post3 from '../../../assets/images/minq_pixi.jpg';
import { useNavigate } from 'react-router-dom'; // Thay đổi đây

interface PostData {
  id: number;
  title: string;
  content: string;
  images: string[];
  likes: number;
  dislikes: number;
}

const postsData: PostData[] = [
  { 
    id: 1, 
    title: "Title", 
    content: "The three main languages you need to know well are HTML, CSS, and JavaScript...", 
    images: [
      post1,
      post2,
      post3,
      post1,
      post2,
      post3,
      post1,
      post2,
      post3,
      post1,
      post2,
      post3,
      post1,
      post2,
      post3,
    ],
    likes: 10,
    dislikes: 1,
  },
  { 
    id: 2, 
    title: "Bài viết 2", 
    content: "Đây là nội dung của bài viết 2.", 
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    likes: 10,
    dislikes: 1,
  },
  { 
    id: 2, 
    title: "Bài viết 2", 
    content: "Đây là nội dung của bài viết 2.", 
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    likes: 10,
    dislikes: 1,
  },  { 
    id: 2, 
    title: "Bài viết 2", 
    content: "Đây là nội dung của bài viết 2.", 
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    likes: 10,
    dislikes: 1,
  },  { 
    id: 2, 
    title: "Bài viết 2", 
    content: "Đây là nội dung của bài viết 2.", 
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    likes: 10,
    dislikes: 1,
  },  { 
    id: 2, 
    title: "Bài viết 2", 
    content: "Đây là nội dung của bài viết 2.", 
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    likes: 10,
    dislikes: 1,
  },
];

const ProfilePosts: React.FC = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate thay cho useHistory

  const handlePostClick = (post: PostData) => {
    navigate(`/post/${post.id}`, {
      state: {
        title: post.title,
        content: post.content,
        images: post.images,
        likes: post.likes,
        dislikes: post.dislikes,
      },
    });
  };

  return (
    <div className="profile-posts">
      {postsData.map((post) => (
        <div className="profile-post" key={post.id} onClick={() => handlePostClick(post)}>
          <Post
            id={post.id}
            title={post.title}
            content={post.content}
            images={post.images}
            likes={post.likes}
            dislikes={post.dislikes}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
