const jwt = require("jsonwebtoken");
const { AsyncErrorHandler } = require("../errorhandle/errorhandle");
const Listing = require("../models/list");

// Check  user logged in hai ya nahi
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    throw new AsyncErrorHandler(401, "First you Login!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AsyncErrorHandler(401, "login again");
  }
};

//

const isOwner = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      throw new AsyncErrorHandler(404, "Listing not founded");
    }

    if (listing.owner.toString() !== req.user.id) {
      throw new AsyncErrorHandler(403, "Not you listing");
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyToken, isOwner };
