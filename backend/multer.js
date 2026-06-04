const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("./claudnary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "AirBnb",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

module.exports = { upload };
