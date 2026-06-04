const express = require("express");
const { catchAsync, AsyncErrorHandler } = require("../errorhandle/errorhandle");
const { review, destroyReview } = require("../controller/review");
const { reviewSchema } = require("../schema");
const { verifyToken } = require("../middleware/auth");
let router = express.Router();

// validation middleware

const validateReview = (req, res, next) => {
  console.log("this is validation", req.body);
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    console.log(errMsg);
    throw new AsyncErrorHandler(400, errMsg);
  } else {
    next();
  }
};

router.post("/new", verifyToken, validateReview, catchAsync(review));
router.delete("/:id/:reviewId", catchAsync(destroyReview));

//

module.exports = router;
