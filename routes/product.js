const express = require("express");
const router = express.Router();
const { productModel, validateProduct } = require("../models/product");
const { categoryModel, validateCategory } = require("../models/category");
const validateAdmin = require("../middlewares/admin");
const upload = require("../config/multer_config");

router.get("/", async (req, res) => {
  let prods = await productModel.find();
  res.send(prods);
});

router.post("/", upload.single("image"), async (req, res) => {
  let { name, price, category, stock, description, image } = req.body;
  let { error } = validateProduct({
    name,
    price,
    category,
    stock,
    description,
    image,
  });

  if (error) return res.send(error.message);
  let isCategory = await categoryModel.findOne({ name: category });
  if (!isCategory) {
    await categoryModel.create({ name: category });
  }
  let product = await productModel.create({
    name,
    price,
    category,
    stock,
    description,
    image: req.file.buffer,
  });

  res.redirect(`/admin/dashboard`);
});

router.get("/delete/:id", validateAdmin, async (req, res) => {
  try {
    if (!req.user.admin) {
      return res
        .status(403)
        .send("You are not allowed to delete this product."); // ✅ Return here
    }

    await productModel.findOneAndDelete({ _id: req.params.id });
    return res.redirect("/admin/products"); // ✅ Only one response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/delete", validateAdmin, async (req, res) => {
  try {
    if (!req.user.admin) {
      return res
        .status(403)
        .send("You are not allowed to delete this product.");
    }

    await productModel.findOneAndDelete({ _id: req.body.product_id });
    return res.redirect("back");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
