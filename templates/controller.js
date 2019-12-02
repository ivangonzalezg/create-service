const {Name} = require("../models/{name}.model");
const httpStatus = require("../helpers/http-status.helper");
const getErrorMessage = require("../helpers/get-error-message.helper");

const MissingId = { name: "MissingId" };
const IdNotFound = { name: "IdNotFound" };

exports.get = async (req, res) => {
  try {
    const { query } = req;
    const data = await {Name}.find(query);
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};

exports.post = async (req, res) => {
  try {
    const { body } = req;
    const data = await new {Name}(body).save();
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { body } = req;
    if (!body.id) throw MissingId;
    const r = await {Name}.findById(body.id);
    if (!r) throw IdNotFound;
    await {Name}.findByIdAndDelete(body.id);
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};

exports.patch = async (req, res) => {
  try {
    const { body } = req;
    const { id, ...params } = body;
    if (!id) throw MissingId;
    const r = await {Name}.findById(id);
    if (!r) throw IdNotFound;
    const data = await {Name}.updateOne({ _id: id }, { $set: params });
    res.status(httpStatus.OK.code).json({ ...httpStatus.OK.json, data });
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json({ ...httpStatus.INTERNAL_SERVER_ERROR.json, message });
  }
};
