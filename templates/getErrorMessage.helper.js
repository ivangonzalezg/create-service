const defaultMessage = "Unknown error";

function getMongoErrorKey(errmsg) {
  const a = errmsg.split("index: ")[1];
  const b = a.split(" dup key")[0];
  const c = b.split("$")[1] || b;
  const d = c.split("_1")[0];
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
    case "IdNotFound":
      return "Id Not Found";
    case "WrongPassword":
      return "Wrong Password";
    case "UserNotFound":
      return "User Not Found";
    case "EmialNotFound":
      return "Email Not Found";
    case "UserAlreadyExist":
      return "User Already Exist";
    default:
      return defaultMessage;
  }
};
