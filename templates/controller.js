const {Name} = require("../models/{name}.model");
const httpStatus = require("../helpers/httpStatus.helper");
const getErrorParams = require("../helpers/getErrorParams.helper");

const MissingId = { name: "MissingId" };
const IdNotFound = { name: "IdNotFound" };

exports.get = async (req, res) => {
  try {
    const { query } = req;
    const data = await {Name}.find(query);
    return res.status(200).json({ ...httpStatus["200"], data });
  } catch (error) {
    const { message, code } = getErrorParams(error);
    return res.status(code).json({ ...httpStatus[code], message });
  }
};

exports.post = async (req, res) => {
  try {
    const { body } = req;
    const data = await new {Name}(body).save();
    return res.status(201).json({ ...httpStatus["201"], data });
  } catch (error) {
    const { message, code } = getErrorParams(error);
    return res.status(code).json({ ...httpStatus[code], message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await {Name}.findById(id);
    return res.status(200).json({ ...httpStatus["200"], data });
  } catch (error) {
    const { message, code } = getErrorParams(error);
    return res.status(code).json({ ...httpStatus[code], message });
  }
};

exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw MissingId;
    const {name} = await {Name}.findById(id);
    if (!{name}) throw IdNotFound;
    await {name}.updateOne({ $set: req.body }, { runValidators: true });
    return res.status(200).json({ ...httpStatus["200"] });
  } catch (error) {
    const { message, code } = getErrorParams(error);
    return res.status(code).json({ ...httpStatus[code], message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw MissingId;
    const {name} = await {Name}.findById(id);
    if (!{name}) throw IdNotFound;
    await {name}.remove();
    return res.status(200).json({ ...httpStatus["200"] });
  } catch (error) {
    const { message, code } = getErrorParams(error);
    return res.status(code).json({ ...httpStatus[code], message });
  }
};
