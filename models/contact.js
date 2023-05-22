const { Schema, model } = require("mongoose")
const Joi = require("joi");

const { handleMongooseError } = require("../helpers")

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  favorite: Joi.boolean(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required().messages({
    'string.pattern.base': 'Incorrect phone format. Example: (748) 206-2688',
    'any.required': 'The phone field is required',
  }),
});

const updateFavoriteShema = Joi.object({
  favorite: Joi.boolean().required().messages({ 'any.required': "missing field favorite" }),
})

const schemas = {
  addSchema,
  updateFavoriteShema,
}

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
}