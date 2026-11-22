const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      return res.status(400).json({
        message: "Name and email cannot be empty!",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({
        message: "Invalid email format!",
      });
    }

    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters!",
      });
    }

    const existingEmail = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [cleanEmail],
    );

    if (existingEmail.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [cleanName, cleanEmail, hashPassword, "STUDENT"],
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, name, email, password, role
       FROM users
       WHERE email = $1`,
      [cleanEmail],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password!",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password!",
      });
    }

    // Normalize role
    const role = String(user.role || "")
      .trim()
      .toUpperCase();

    if (!["STUDENT", "TEACHER", "ADMIN"].includes(role)) {
      console.log("Unknown user role:", user.role);

      return res.status(403).json({
        message: "Unknown user role",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.trim().toUpperCase(),
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = { register, login };
