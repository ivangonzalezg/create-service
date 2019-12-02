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
  json: { ..._JSONSUCCESS, code: 201, status: "Created" }
};

exports.LOCKED = {
  code: 423,
  json: { ..._JSONERROR, code: 423, status: "Locked" }
};

exports.INTERNAL_SERVER_ERROR = {
  code: 500,
  json: { ..._JSONERROR, code: 500, status: "Server Error" }
};
