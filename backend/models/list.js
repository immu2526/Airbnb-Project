let mongo = require("mongoose");
const { Review } = require("./review");

let { Schema } = mongo;

let listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// middleware
listingSchema.post("findOneAndDelete", async (deletedListing) => {
  if (deletedListing) {
    await Review.deleteMany({ _id: { $in: deletedListing.reviews } });
  }
});

const Listing = mongo.model("Listing", listingSchema);

module.exports = Listing;
