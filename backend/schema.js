let Joi = require("joi");

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
});

const reviewSchema = Joi.object({
  rating: Joi.number().strict().integer().min(1).max(5).required(),
  comment: Joi.string().required(),
  listingId: Joi.string().required(),
});

module.exports = { listingSchema, reviewSchema };
