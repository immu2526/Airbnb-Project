const { cloudinary } = require("../claudnary");
const { AsyncErrorHandler } = require("../errorhandle/errorhandle");
const Listing = require("../models/list");
const mongoose = require("mongoose");
// get all

let index = async (req, res) => {
  let mongoList = await Listing.find({});
  res.status(200).json({
    message: true,
    data: mongoList,
  });
};

// view details

let listingDetails = async (req, res) => {
  let { id } = req.params;

  // console.log(id);

  if (!id) {
    throw new AsyncErrorHandler(400, "Something Wrong!");
  }

  if (!mongoose.isValidObjectId(id)) {
    throw new AsyncErrorHandler(400, "Invalid ID format!");
  }

  let mongo = await Listing.findById(id).populate("reviews").populate("owner");
  console.log(mongo);

  if (!mongo) {
    throw new AsyncErrorHandler(400, "Listing not founded!");
  }

  res.status(200).json({
    status: true,
    data: mongo,
  });
};

// create new listing

let newListing = async (req, res) => {
  console.log(req.body);
  let { title, description, price, location, country } = req.body;
  const url = req.file.path;
  const filename = req.file.filename;

  let mongo = new Listing({
    title: title,
    description: description,
    image: {
      url: url,
      filename: filename,
    },
    price: price,
    location: location,
    country: country,
    owner: req.user.id,
  });

  let result = await mongo.save();

  console.log(filename);
  console.log(url);
  console.log(result);
  res.send("ok");
};

// edit listing

let updateListing = async (req, res) => {
  const { id } = req.params;
  let { title, description, price, location, country } = req.body;

  // pehle listing find karo
  let listing = await Listing.findById(id);
  if (!listing) {
    throw new AsyncErrorHandler(404, "Listing not founded");
  }

  listing.title = title || listing.title;
  listing.description = description || listing.description;
  listing.price = price || listing.price;
  listing.location = location || listing.location;
  listing.country = country || listing.country;

  if (req.file) {
    await cloudinary.uploader.destroy(listing.image.filename);

    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  let result = await listing.save();

  res.status(200).json({
    success: true,
    data: result,
    message: "listing update successfully!",
  });
};

// delete listing

let ListingDelete = async (req, res) => {
  let { id } = req.params;

  let monmgo = await Listing.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    data: monmgo._id,
    message: "listing delete successfuly!",
  });
};

module.exports = {
  index,
  newListing,
  updateListing,
  ListingDelete,
  listingDetails,
};
