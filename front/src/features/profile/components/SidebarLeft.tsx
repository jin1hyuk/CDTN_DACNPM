import React from 'react';
import '../styles/SidebarLeft.css';

const SidebarLeft: React.FC = () => {
  return (
    <aside className="sidebar-left">
      <ul>
        <li>Home</li>
        <li>Messages</li>
        <li>Notifications</li>
      </ul>
    </aside>
  );
};

export default SidebarLeft;