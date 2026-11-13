const express = require("express");
const pool = require("./config/db");

const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const studentRoute = require("./routes/studentRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/student", studentRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
