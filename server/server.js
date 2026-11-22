const express = require("express");
const pool = require("./config/db");
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const studentRoute = require("./routes/studentRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/student", studentRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
