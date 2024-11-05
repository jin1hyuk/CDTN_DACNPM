import React from 'react';
import './homeuser.css';
import Navbar from './NavbarUser';
import Sidebar from './SidebarUser';
import RightSidebar from './RightSidebarUser';
import MainContent from './MainContentUser';

const HomeUser: React.FC = () => {
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

  return (
    <div className="home-body">
      <Navbar />
      <div className="container">
        <Sidebar leaderboard={leaderboard} />
        <MainContent posts={posts} />
        <RightSidebar users={users} />
      </div>
    </div>
  );
};

export default HomeUser;
