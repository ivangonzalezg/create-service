const _JSONSUCCESS = {
  error: false,
  success: true
};

const _JSONERROR = {
  error: true,
  success: false
};

exports["200"] = { ..._JSONSUCCESS, code: 200, status: "OK" };

exports["201"] = { ..._JSONSUCCESS, code: 201, status: "CREATED" };

exports["400"] = { ..._JSONERROR, code: 400, status: "BAD_REQUEST" };

exports["401"] = { ..._JSONERROR, code: 401, status: "UNAUTHORIZED" };

exports["402"] = { ..._JSONERROR, code: 402, status: "PAYMENT_REQUIRED" };

exports["403"] = { ..._JSONERROR, code: 403, status: "FORBIDDEN" };

exports["404"] = { ..._JSONERROR, code: 404, status: "NOT_FOUND" };

exports["405"] = { ..._JSONERROR, code: 403, status: "METHOD_NOT_ALLOWED" };

exports["409"] = { ..._JSONERROR, code: 409, status: "CONFLICT" };

exports["423"] = { ..._JSONERROR, code: 423, status: "LOCKED" };

exports["428"] = { ..._JSONERROR, code: 428, status: "PRECONDITION_REQUIRED" };

exports["500"] = { ..._JSONERROR, code: 500, status: "INTERNAL_SERVER_ERROR" };
