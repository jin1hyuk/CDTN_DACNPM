import React from 'react';
import '../styles/SidebarRight.css';

const SidebarRight: React.FC = () => {
  return (
    <aside className="sidebar-right">
      <ul>
        <li>Friends</li>
        <li>Groups</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
};

export default SidebarRight;