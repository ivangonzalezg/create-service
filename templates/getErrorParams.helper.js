const defaultMessage = "Unknown error";

function getMongoErrorKey(errmsg) {
  const a = errmsg.split("index: ")[1];
  const b = a.split(" dup key")[0];
  const c = b.split("$")[1] || b;
  const d = c.split("_1")[0];
  return d;
}

module.exports = (error = {}, code = 500) => {
  const { name, code, model } = error;
  if (!name) return defaultMessage;
  switch (name) {
    case "ValidationError":
      return { ...error.errors[Object.keys(error.errors)[0]], code };
    case "MongoError":
      if (code === 11000) return { message: `Duplicate key error: ${getMongoErrorKey(error.errmsg)}`, code };
      return defaultMessage;
    case "CastError":
      if (model.modelName) return { message: `${model.modelName} not found`, code };
      return defaultMessage;
    case "IdNotFound":
      return { message: "Id Not Found", code };
    case "WrongPassword":
      return { message: "Wrong Password", code };
    case "UserNotFound":
      return { message: "User Not Found", code };
    case "EmialNotFound":
      return { message: "Email Not Found", code };
    case "UserAlreadyExist":
      return { message: "User Already Exist", code };
    default:
      return defaultMessage;
  }
};
