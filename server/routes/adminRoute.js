const express = require("express");
const router = express.Router();

const { verifyToken, allowRole } = require("../middlewares/authMiddleware");
const getDashboard = require("../controllers/studentCOntroller");

router.get("/dashboard", verifyToken, allowRole("ADMIN"), getDashboard);

module.exports = router;
