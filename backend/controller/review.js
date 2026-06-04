// Create review

const { AsyncErrorHandler } = require("../errorhandle/errorhandle");
const Listing = require("../models/list");
const { Review } = require("../models/review");
const { User } = require("../models/user");

let review = async (req, res) => {
  let { rating, comment, listingId } = req.body;
  console.log(req.user);
  console.log(req.user.id);

  let review = new Review({
    name: req.user.username,
    rating: rating,
    comment: comment,
    owner: req.user.id,
  });

  let listing = await Listing.findById(listingId);
  if (!listing) {
    throw new AsyncErrorHandler(400, "listing not founded!");
  }

  listing.reviews.push(review._id);
  await review.save();
  let output = await listing.save();

  res.status(200).json({
    success: true,
    message: output,
  });
};

// Delete Review

let destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  if (!id || !reviewId) {
    throw new AsyncErrorHandler(404, "Review not founded");
  }
  console.log(req.params);

  // Listing se review ID delete
  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  // Review delete
  await Review.findByIdAndDelete(reviewId);

  res.status(200).json({
    success: true,
    data: reviewId,
  });
};

module.exports = { review, destroyReview };
