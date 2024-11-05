import React, { useState } from 'react';
import './MainContent.css';

const MainContent: React.FC<{ posts: any[] }> = ({ posts }) => {
  const [postsState, setPostsState] = useState(posts);

  const toggleComments = (postId: number) => {
    setPostsState((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  const addComment = (postId: number, comment: string) => {
    setPostsState((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  return (
    <div className="main-content">
      {postsState.map((post) => (
        <div className="post" key={post.id}>
          <div className="post-header">
            <div className="avatar"></div>
            <div>
              <span className="username">{post.username}</span>
              <div className="timestamp">{post.timestamp}</div>
            </div>
          </div>
          <div className="post-content">{post.content}</div>
          <div className="post-actions">
            <button className="action-button like">👍</button>
            <button className="action-button dislike">👎</button>
            <button className="action-button" onClick={() => toggleComments(post.id)}>💬</button>
            <button className="action-button save">🔖</button>
          </div>

          {post.showComments && (
            <div className="comments-section">
              <div className="comments">
                {post.comments.map((comment, index) => (
                  <div className="comment" key={index}>
                    <span>{comment}</span>
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
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MainContent;
