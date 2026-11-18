import React from "react";

function StudentNavbar() {
  return (
    <header className="navbar">
      <div>
        <h2>Student Dashboard</h2>
        <p>Manage and track your campus issues</p>
      </div>

      <div className="user-profile">
        <div className="avatar">S</div>
        <div>
          <strong>Student User</strong>
          <small>Student</small>
        </div>
      </div>
    </header>
  );
}

export default StudentNavbar;
