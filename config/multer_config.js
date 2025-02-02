const multer = require("multer");

let storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
