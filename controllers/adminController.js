const { adminModel } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const createAdmin = async (req, res) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash("admin@123", salt);

    let user = new adminModel({
      name: "Soumallya",
      email: "admin@blinkit.com",
      password: hash,
      role: "admin",
    });

    await user.save();

    let token = jwt.sign(
      { email: "admin@blinkit.com" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Admin created successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(404).send("This admin is not available");
    }

    let valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).send("Invalid credentials");
    }

    let token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.redirect("/admin/dashboard");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createAdmin, loginAdmin };
