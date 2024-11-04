import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
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

  const posts = [
    {
      id: 1,
      username: 'User1',
      content: 'This is the first post content. It can be a bit longer to demonstrate the layout.',
      timestamp: '2 hours ago',
      comments: [],
    },
    {
      id: 2,
      username: 'User2',
      content: 'Here is another post. It can also contain more text.',
      timestamp: '5 hours ago',
      comments: [],
    },
    {
      id: 3,
      username: 'User3',
      content: 'This is the third post. Let’s make this one a bit longer to see how it looks with more text.',
      timestamp: '1 day ago',
      comments: [],
    },
    {
      id: 4,
      username: 'User1',
      content: 'Finally, this is the fourth post. It’s nice to add more content here for the example.',
      timestamp: '2 days ago',
      comments: [],
    },
  ];

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
    <div className="home-body">
      {/* Top Navigation Bar */}
      <div className="navbar">
        <div className="logo">DigiForum.io</div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." id="search-input" />
          <button onClick={() => console.log("Searching...")}>&#128269;</button>
        </div>
        <div className="icons">
          <span> &#128276;</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container">
        {/* Left Sidebar */}
        <div className="sidebar">
          <ul className="menu">
            <li>
              <a href="#">
                <span className="icon">&#128100;</span>
                Profile
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">&#128196;</span>
                Your Threads
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">&#128278;</span>
                Saved
              </a>
            </li>
          </ul>

          {/* Leaderboard Section */}
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {leaderboard.map((user, index) => (
                <li key={index}>
                  <div className="leaderboard-item">
                    <span>{user.name}</span>
                    <div className="score">{user.score}</div>
                  </div>
                </li>
              ))}
            </ul>
            <a href="#" className="see-all-button">See All Leaderboards</a>
          </div>
        </div>

        {/* Main Content Area */}
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

              {/* Comments Section */}
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
                          e.currentTarget.value = ''; // Clear input after adding comment
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="login-button-container">
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          </div>
          <div className="user-list">
            <h2>List of Users</h2>
            {users.map((user, index) => (
              <div className="user" key={index}>
                <div className="avatar"></div>
                <span>{user.name}</span>
              </div>
            ))}
            <a href="#" className="see-more-button">See More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
