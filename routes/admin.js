const express = require("express");
const router = express.Router();
const { createAdmin, loginAdmin } = require("../controllers/adminController");
const { adminModel } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateAdmin = require("../middlewares/admin");
const { productModel } = require("../models/product");
const { categoryModel } = require("../models/category");

require("dotenv").config();

if (process.env.NODE_ENV === "DEVELOPMENT") {
  router.get("/create", createAdmin);
}

router.get("/login", (req, res) => {
  res.render("admin_login");
});

router.post("/login", loginAdmin);

router.get("/dashboard", validateAdmin, async (req, res) => {
  let prodcount = await productModel.countDocuments();
  let categcount = await categoryModel.countDocuments();

  res.render("admin_dashboard", { prodcount, categcount });
});

router.get("/login", (req, res) => {
  res.render("admin_login");
});

router.get("/products", validateAdmin, async (req, res) => {
  const resultArray = await productModel.aggregate([
    {
      $group: {
        _id: "$category",
        products: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        products: { $slice: ["$products", 10] },
      },
    },
  ]);

  const resultObject = resultArray.reduce((acc, item) => {
    acc[item.category] = item.products;
    return acc;
  }, {});

  res.render("admin_products", { products: resultObject });
});

router.get("/logout", validateAdmin, (req, res) => {
  res.cookie("token", "");
  res.render("admin_login");
});
module.exports = router;
