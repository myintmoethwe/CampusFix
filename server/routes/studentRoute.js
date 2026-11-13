const express = require("express");
const router = express.Router();

const { verifyToken, allowRole } = require("../middlewares/authMiddleware");
const getDashboard = require("../controllers/studentCOntroller");
// router.get("/", verifyToken, allowRole("STUDENT"), (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Welcome to student dashboard!", user: req.user });
// });
router.get("/dashboard", verifyToken, allowRole("STUDENT"), getDashboard);
module.exports = router;
