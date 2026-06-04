const express = require("express");
const { catchAsync, AsyncErrorHandler } = require("../errorhandle/errorhandle");
const {
  index,
  listingDetails,
  newListing,
  ListingDelete,
  updateListing,
} = require("../controller/listing");
const { upload } = require("../multer");
const { listingSchema } = require("../schema");
const { verifyToken, isOwner } = require("../middleware/auth");
let router = express.Router();
const cloudinary = require("cloudinary").v2;

// validation middleware

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new AsyncErrorHandler(400, errMsg);
  } else {
    next();
  }
};

// created path route

router.get("/", catchAsync(index));
router.get("/:id", catchAsync(listingDetails));
router.post(
  "/new",
  verifyToken,
  upload.single("image"),
  validateListing,
  catchAsync(newListing)
);
router.put(
  "/:id/update",
  verifyToken,
  isOwner,
  upload.single("image"),
  validateListing,
  catchAsync(updateListing)
);
router.delete("/:id", verifyToken, isOwner, catchAsync(ListingDelete));
module.exports = router;

//  upload.single("image"),
