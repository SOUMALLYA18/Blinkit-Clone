const express = require("express");
const router = express.Router();
const { createAdmin, loginAdmin } = require("../controllers/adminController");
const { adminModel } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateAdmin = require("../middlewares/admin");

require("dotenv").config();

if (process.env.NODE_ENV === "DEVELOPMENT") {
  router.get("/create", createAdmin);
}

router.get("/login", (req, res) => {
  res.render("admin_login");
});

router.post("/login", loginAdmin);

router.get("/dashboard", validateAdmin, (req, res) => {
  res.render("admin_dashboard");
});

router.get("/logout", validateAdmin, (req, res) => {
  res.cookie("token", "");
  res.render("admin_login");
});
module.exports = router;
