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
      stats: statsResult.rows[0],
      recentIssues: issuesResult.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};
module.exports = getDashboard;
