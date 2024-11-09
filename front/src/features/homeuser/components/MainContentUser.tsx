import React, { useState, useEffect } from 'react';
import './MainContentUser.css';
import { users } from './userData';
import PostModal from './PostModal';

const MainContentUser: React.FC = () => {
  const loggedInUser = users[1]; // Assuming the second user is logged in, replace with dynamic login logic

  const [postsState, setPostsState] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize posts with the logged-in user's posts
  useEffect(() => {
    setPostsState(loggedInUser.posts); // Use the posts of the logged-in user
  }, [loggedInUser]);

  const handlePostCreation = (title: string, description: string, content: string) => {
    const newPost = {
      id: Date.now(),
      username: loggedInUser.name, // This is the name of the user who is posting
      userId: loggedInUser.id,
      timestamp: new Date().toLocaleString(),
      title,
      description,
      content,
      comments: [],
      showComments: false,
      likes: 0,
      dislikes: 0,
      avatar: loggedInUser.avatar || 'https://via.placeholder.com/40',
    };

    // Directly update the state with the new post
    setPostsState(prevPosts => [...prevPosts, newPost]);
    setIsModalOpen(false);  // Close the modal after posting
  };

  const toggleComments = (postId: number) => {
    setPostsState(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const handleLikeDislike = (postId: number, type: 'like' | 'dislike') => {
    setPostsState(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: type === 'like' ? post.likes + 1 : post.likes,
            dislikes: type === 'dislike' ? post.dislikes + 1 : post.dislikes,
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId: number, commentText: string) => {
    setPostsState(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  user: loggedInUser.name,
                  text: commentText,
                  avatar: loggedInUser.avatar || 'https://via.placeholder.com/40',
                  time: new Date().toLocaleString(),  // Add timestamp to comment
                }
              ]
            }
          : post
      )
    );
  };

  return (
    <div className="main-content">
      <div className="new-post">
        <div className="avatar" style={{ backgroundImage: `url(${loggedInUser.avatar || 'https://via.placeholder.com/40'})` }}></div>
        <div className="postcard">
          <div className="think-text">What do you think?</div>
          <button className="Postbtn" onClick={() => setIsModalOpen(true)}>
            Post
          </button>
        </div>
      </div>

      {postsState.map(post => (
        <div className="post" key={post.id}>
          <div className="post-header">
            <div className="avatar" style={{ backgroundImage: `url(${post.avatar || 'https://via.placeholder.com/40'})` }}></div>
            <div>
              <span className="username">{post.username}</span>  {/* Displaying the username */}
              <div className="timestamp">{post.timestamp}</div>
            </div>
          </div>
          <div className="post-content">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.content}</p>
          </div>
          <div className="post-actions">
            <button className="action-button like" onClick={() => handleLikeDislike(post.id, 'like')}>👍 {post.likes}</button>
            <button className="action-button dislike" onClick={() => handleLikeDislike(post.id, 'dislike')}>👎 {post.dislikes}</button>
            <button className="action-button" onClick={() => toggleComments(post.id)}>💬</button>
            <button className="action-button save">🔖</button>
          </div>

          {post.showComments && (
            <div className="comments-section">
              <div className="comments">
                {post.comments.map((comment: any, index: number) => (
                  <div className="comment" key={index}>
                    <div className="comment-header">
                      <div className="avatar" style={{ backgroundImage: `url(${comment.avatar || 'https://via.placeholder.com/40'})` }}></div>
                      <div>
                        <span className="username">{comment.user}</span>
                        <span className="comment-time">{comment.time}</span> {/* Display timestamp */}
                      </div>
                    </div>
                    <div className="comment-text">
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      addComment(post.id, e.currentTarget.value);
                      e.currentTarget.value = '';  // Clear input after comment
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Post Modal */}
      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPost={handlePostCreation}
      />
    </div>
  );
};

export default MainContentUser;
