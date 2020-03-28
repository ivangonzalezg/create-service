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

exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw MissingId;
    const r = await {Name}.findById(id);
    if (!r) throw IdNotFound;
    await r.update({ $set: req.body }, { runValidators: true });
    return res.status(200).json({ ...httpStatus["200"] });
  } catch (error) {
    const { message, code } = getErrorParams(error);
    return res.status(code).json({ ...httpStatus[code], message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw MissingId;
    const r = await {Name}.findById(id);
    if (!r) throw IdNotFound;
    await r.remove();
    return res.status(200).json({ ...httpStatus["200"] });
  } catch (error) {
    const { message, code } = getErrorParams(error);
    return res.status(code).json({ ...httpStatus[code], message });
  }
};
