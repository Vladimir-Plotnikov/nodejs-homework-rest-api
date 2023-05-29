const { Contact } = require("../models/contact")

const { HttpError, ctrlWrapper } = require("../helpers")

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
  res.json(result)
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result)
}

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create(req.body, owner)
  res.status(201).json(result);
}

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json({
    message: "Delete success"
  })
}

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result)
}

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result)
}





module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: updateById,
  updateStatusContact: ctrlWrapper(updateStatusContact)

}