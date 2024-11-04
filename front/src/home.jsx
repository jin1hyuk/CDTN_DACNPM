import React from 'react';
import './DigiForum.css'; // Import the CSS styles

const DigiForum = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <a className="navbar-brand" href="#">DigiForum</a>
                <div className="search-container ml-3" id="search-container">
                    <input type="text" placeholder="Search..." aria-label="Search" id="search-input" />
                    <button className="search-icon" id="search-button">
                        <img src="https://img.icons8.com/material-outlined/24/343a40/search.png" alt="Search" />
                    </button>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">About</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Threads</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Community</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Leaderboards</a></li>
                </ul>
                <div className="notification-icons">
                    <a href="#" onClick={() => alert('Notification clicked!')}>🔔</a>
                    <a href="#" onClick={() => alert('Chat clicked!')}>💬</a>
                </div>
            </nav>

            <div className="sidebar">
                <h2>Dashboard</h2>
                <a href="#" className="d-block p-2"><i className="fas fa-user"></i> Profile</a>
                <a href="#" className="d-block p-2"><i className="fas fa-comment"></i> Your Threads</a>
                <a href="#" className="d-block p-2"><i className="fas fa-bookmark"></i> Saved</a>
                <div className="leaderboard">
                    <h3>Top Leaderboards</h3>
                    <div className="leaderboard-item">User 1</div>
                    <div className="leaderboard-item">User 2</div>
                    <div className="leaderboard-item">User 3</div>
                </div>  
                <div className="footer">
                    <p>© 2024 DigiForum</p>
                    <p>All Rights Reserved.</p>
                </div>
            </div>

            <div className="main-content">
                <h1>Welcome to DigiForum</h1>
                <button className="btn btn-primary" id="create-topic-button">Create Topic</button>
                <div className="topic-form" id="topic-form" style={{ display: 'none' }}>
                    <h2>Create a New Topic</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="topic-title">Title:</label>
                            <input type="text" className="form-control" id="topic-title" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="topic-content">Content:</label>
                            <textarea className="form-control" id="topic-content" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                        <button type="button" className="btn btn-danger" id="cancel-button">Cancel</button>
                    </form>
                </div>
            </div>

            <div className="right-sidebar">
                <div className="login-container">
                    <a href="login.html" className="btn btn-light btn-block">Login</a>
                </div>
                <div className="user-list">
                    <h4>Online Users</h4>
                    <p>User 1</p>
                    <p>User 2</p>
                    <p>User 3</p>
                    <p>User 4</p>
                </div>
                <div className="hot-search">
                    <h4>Hot Search</h4>
                    <p>#html</p>
                    <p>#css</p>
                    <p>#javascript</p>
                    <p>#mobile</p>
                    <p>#webdevelopment</p>
                </div>
            </div>
        </div>
    );
};

export default DigiForum;