const pool = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    if (req.user.role != "STUDENT") {
      return res.status(401).json({ message: "Access Denied!" });
    }
    const studentId = req.user.id;

    const statResult = await pool.query(
      `SELECT
                COUNT(*) AS total,
                COUNT(*) FILTER (
                    WHERE status = 'PENDING'
                ) AS pending,
                COUNT(*) FILTER (
                    WHERE status = 'IN_PROGRESS'
                ) AS in_progress,
                COUNT(*) FILTER (
                    WHERE status = 'RESOLVED'
                ) AS resolved
             FROM issues
             WHERE student_id = $1`,
      [studentId],
    );
    res.status(200).json({
      success: true,
      stats: statResult.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};
const getStudentId = (req) => {
  return req.user?.id || req.user?.userId;
};
const getMyIssues = async (req, res) => {
  try {
    const studentId = getStudentId(req);

    if (!studentId) {
      return res.status(401).json({
        message: "Student ID not found in token",
      });
    }

    const result = await pool.query(
      `SELECT
                id,
                title,
                description,
                category,
                location,
                status,
                created_at
             FROM issues
             WHERE student_id = $1
             ORDER BY created_at DESC`,
      [studentId],
    );

    const issues = result.rows;

    const stats = {
      total: issues.length,

      pending: issues.filter((issue) =>
        ["PENDING", "SUBMITTED"].includes(String(issue.status).toUpperCase()),
      ).length,

      inProgress: issues.filter(
        (issue) => String(issue.status).toUpperCase() === "IN_PROGRESS",
      ).length,

      resolved: issues.filter(
        (issue) => String(issue.status).toUpperCase() === "RESOLVED",
      ).length,
    };
    console.log("Logged in user:", req.user);
    console.log("Student ID:", req.user.id || req.user.userId);
    return res.status(200).json({
      message: "Dashboard loaded successfully",
      stats,
      issues,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};
const createIssue = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Logged-in User:", req.user);

    const { title, description, category, location } = req.body || {};

    // Get student ID
    const studentId = getStudentId(req);

    if (!studentId) {
      return res.status(401).json({
        message: "Student ID not found in token",
      });
    }

    // Validate required fields
    if (
      !title?.trim() ||
      !description?.trim() ||
      !category?.trim() ||
      !location?.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Insert issue into PostgreSQL
    const result = await pool.query(
      `INSERT INTO issues
            (title, description, category, student_id, location, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
      [
        title.trim(),
        description.trim(),
        category.trim(),
        studentId,
        location.trim(),
        "PENDING",
      ],
    );

    return res.status(201).json({
      message: "Issue submitted successfully",
      issue: result.rows[0],
    });
  } catch (error) {
    console.error("Create Issue Error:", error);

    return res.status(500).json({
      message: "Failed to submit issue",
      error: error.message,
    });
  }
};
module.exports = { getDashboard, getMyIssues, createIssue };
