const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

module.exports = mongoose.connection;
