const defaultMessage = "Unknown error";

function getMongoErrorKey(errmsg) {
  const a = errmsg.split("index:")[1];
  const b = a.split("key:")[0];
  const c = b.split("_")[0];
  const d = c.replace(/\s/g, "");
  return d;
}

module.exports = (error = {}) => {
  const { name, code, model } = error;
  if (!name) return defaultMessage;
  switch (name) {
    case "ValidationError":
      return error.errors[Object.keys(error.errors)[0]].message;
    case "MongoError":
      if (code === 11000) return `Duplicate key error: ${getMongoErrorKey(error.errmsg)}`;
      return defaultMessage;
    case "CastError":
      if (model.modelName) return `${model.modelName} not found`;
      return defaultMessage;
    case "MissingField":
      return "Photo or Plan is missing";
    case "MissingId":
      return "Candidate ID is missing";
    case "IdNotFound":
      return "Id not found";
    default:
      return defaultMessage;
  }
};
