const pool = require("../config/db");

// =====================================
// ADMIN DASHBOARD STATISTICS
// =====================================
const getDashboard = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) AS total_issues,
        COUNT(*) FILTER (WHERE status = 'P') AS pending_issues,
        COUNT(*) FILTER (WHERE status = 'A') AS approved_issues,
        COUNT(*) FILTER (WHERE status = 'I') AS in_progress_issues,
        COUNT(*) FILTER (WHERE status = 'R') AS resolved_issues
      FROM issues
    `);

    return res.status(200).json({
      success: true,
      message: "Admin dashboard loaded successfully",
      statistics: result.rows[0],
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
    });
  }
};

// =====================================
// GET ALL ISSUES
// =====================================
const getAllIssues = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM issues
      ORDER BY id DESC
    `);

    return res.status(200).json({
      success: true,
      issues: result.rows,
    });
  } catch (error) {
    console.error("Get All Issues Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load issues",
    });
  }
};

// =====================================
// UPDATE ISSUE STATUS
// =====================================
const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid issue ID",
      });
    }

    const allowedStatuses = ["P", "A", "I", "R"];
    const newStatus = String(status || "").toUpperCase();

    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid issue status",
      });
    }

    const existingIssue = await pool.query(
      "SELECT id FROM issues WHERE id = $1",
      [id],
    );

    if (existingIssue.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    const result = await pool.query(
      `UPDATE issues
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [newStatus, id],
    );

    return res.status(200).json({
      success: true,
      message: "Issue status updated successfully",
      issue: result.rows[0],
    });
  } catch (error) {
    console.error("Update Issue Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update issue status",
    });
  }
};

module.exports = {
  getDashboard,
  getAllIssues,
  updateIssueStatus,
};
