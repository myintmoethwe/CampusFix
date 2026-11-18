import React from "react";
import StudentSidebar from "../components/StudentSideBar";
import StudentNavbar from "../components/StudentNavBar";

function StudentDashboard() {
  const issues = [
    {
      id: "CF001",
      title: "Broken classroom projector",
      category: "Equipment",
      date: "Nov 14, 2026",
      status: "Pending",
    },
    {
      id: "CF002",
      title: "Water leakage in restroom",
      category: "Maintenance",
      date: "Nov 13, 2026",
      status: "In Progress",
    },
    {
      id: "CF003",
      title: "Library Wi-Fi problem",
      category: "Network",
      date: "Nov 12, 2026",
      status: "Resolved",
    },
  ];

  return (
    <div className="dashboard-layout">
      <StudentSidebar />

      <main className="main-content">
        <StudentNavbar />

        <section className="welcome">
          <div>
            <h1>Welcome back, Student! 👋</h1>
            <p>Here's an overview of your reported campus issues.</p>
          </div>

          <button className="submit-btn">+ Submit New Issue</button>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">▤</div>
            <p>Total Issues</p>
            <h2>12</h2>
            <small>All reported issues</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">◷</div>
            <p>Pending</p>
            <h2>4</h2>
            <small>Waiting for review</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">⚙</div>
            <p>In Progress</p>
            <h2>5</h2>
            <small>Currently being fixed</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <p>Resolved</p>
            <h2>3</h2>
            <small>Successfully completed</small>
          </div>
        </section>

        <section className="issues-section">
          <div className="section-heading">
            <div>
              <h2>Recent Issues</h2>
              <p>Track the progress of your reported issues.</p>
            </div>

            <button className="view-btn">View All</button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Issue ID</th>
                  <th>Issue Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td>{issue.id}</td>
                    <td>{issue.title}</td>
                    <td>{issue.category}</td>
                    <td>{issue.date}</td>
                    <td>
                      <span
                        className={`status ${issue.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {issue.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;
