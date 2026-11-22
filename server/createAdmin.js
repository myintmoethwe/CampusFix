require("dotenv").config();

const bcrypt = require("bcrypt");
const pool = require("./config/db");

const createAdmin = async () => {
  try {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    // Check required information
    if (!name || !email || !password) {
      throw new Error(
        "Please provide ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD",
      );
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    // Check whether email already exists
    const existingUser = await pool.query(
      "SELECT id, role FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      throw new Error("This email already exists. Please use a new email.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create ADMIN account
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name.trim(), email, hashedPassword, "ADMIN"],
    );

    console.log("Admin account created successfully!");
    console.log(result.rows[0]);
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

createAdmin();
