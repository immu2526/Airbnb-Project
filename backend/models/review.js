const { types, required } = require("joi");
const { default: mongoose } = require("mongoose");
let mongo = require("mongoose");

let { Schema } = mongo;

let reviewShema = new Schema({
  name: {
    type: String,
    required: true,
  },

  rating: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

let Review = mongoose.model("Review", reviewShema);

module.exports = { Review };
