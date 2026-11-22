const express = require("express");
const router = express.Router();

const { verifyToken, allowRole } = require("../middlewares/authMiddleware");

const {
  getDashboard,
  getAllIssues,
  updateIssueStatus,
} = require("../controllers/adminController");

// ADMIN DASHBOARD
router.get("/dashboard", verifyToken, allowRole("ADMIN"), getDashboard);

// GET ALL ISSUES
router.get("/issues", verifyToken, allowRole("ADMIN"), getAllIssues);

// UPDATE ISSUE STATUS
router.put(
  "/issues/:id/status",
  verifyToken,
  allowRole("ADMIN"),
  updateIssueStatus,
);

module.exports = router;
