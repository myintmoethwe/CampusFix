import React from "react";

function StudentSidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span>Campus</span>Fix
      </div>

      <p className="menu-title">MENU</p>

      <nav>
        <a href="#" className="active">
          ▦ Dashboard
        </a>
        <a href="#">＋ Submit Issue</a>
        <a href="#">▤ My Issues</a>
        <a href="#">♧ Profile</a>
      </nav>

      <div className="sidebar-bottom">
        <a href="#">⚙ Settings</a>
        <a href="#">↪ Logout</a>
      </div>
    </aside>
  );
}

export default StudentSidebar;
