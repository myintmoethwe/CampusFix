const express = require("express");
const pool = require("./config/db");
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const studentRoute = require("./routes/studentRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// API routes
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/student", studentRoute);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "CampusFix Backend API is running!",
  });
});

// Railway port
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CampusFix server running on port ${PORT}`);
});
