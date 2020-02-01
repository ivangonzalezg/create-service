const _JSONSUCCESS = {
  error: null,
  success: true
};

const _JSONERROR = {
  error: true,
  success: null
};

exports.OK = {
  code: 200,
  json: { ..._JSONSUCCESS, code: 200, status: "OK" }
};

exports.CREATED = {
  code: 201,
  json: { ..._JSONSUCCESS, code: 201, status: "CREATED" }
};

exports.BAD_REQUEST = {
  code: 400,
  json: { ..._JSONERROR, code: 400, status: "BAD_REQUEST" }
};

exports.FORBIDDEN = {
  code: 403,
  json: { ..._JSONERROR, code: 403, status: "FORBIDDEN" }
};

exports.NOT_FOUND = {
  code: 404,
  json: { ..._JSONERROR, code: 404, status: "NOT_FOUND" }
};

exports.LOCKED = {
  code: 423,
  json: { ..._JSONERROR, code: 423, status: "LOCKED" }
};

exports.INTERNAL_SERVER_ERROR = {
  code: 500,
  json: { ..._JSONERROR, code: 500, status: "INTERNAL_SERVER_ERROR" }
};
