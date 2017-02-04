var util = require('./util');
var defaultConfig = {};

function Server(options) {
  this.options = options =
    util.clone(util.defaults(options || {}, defaultConfig));

  this._methods = {};

  this.provide({
    'provides': this.provides
  });
}

Server.prototype.errors = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603
};

// TODO: real error messages here
Server.prototype.errorMessages = (function () {
  var msgs = {};
  var errs = Server.prototype.errors;
  for (var k in errs) {
    msgs[errs[k]] = k;
  }
  return msgs;
}());

function parseArgs(args) {
  args = args.split(/,\s*/);
  var result = {};

  for (var i = 0; i < args.length; i++) {
    result[args[i]] = i;
  }

  return result;
}

function functionSnippet(fn) {
  return fn.toString().slice(0, 20) + '...';
}

function parseFunction(fn) {
  var parsed = fn.toString().match(/function(?:\s+|\s+(\w+))?\s*\((.*)\)/);

  if (!parsed) {
    throw 'Cannot parse function: ' + functionSnippet(fn);
  }

  return {
    fn: fn,
    name: parsed[1],
    args: parseArgs(parsed[2])
  };
}

Server.prototype._provide = function (toProvide, fn, name) {
  var fnRecord = parseFunction(fn);

  fnRecord.name = name || fnRecord.name;

  if (!fnRecord.name) {
    throw 'Cannot provide anonymous function: ' + functionSnippet(fn);
  }

  if (this._methods[fnRecord.name] || toProvide[fnRecord.name]) {
    throw 'Cannot provide duplicate function ' + fnRecord.name;
  }

  toProvide[fnRecord.name] = fnRecord;
};

Server.prototype.provide = function () {
  var args = util.toArray(arguments);
  var toProvide = {};
  var method;

  args.forEach(function (x) {
    if (util.isFunction(x)) {
      method = this._provide(toProvide, x);
    } else if (util.isObject(x)) {
      for (var k in x) {
        if (util.isFunction(x[k])) {
          this._provide(toProvide, x[k], k);
        }
      }
    } else {
      throw 'Cannot provide illegal argument: ' + x;
    }
  }, this);

  util.merge(this._methods, toProvide);
};

Server.prototype.revoke = function () {
  var args = util.toArray(arguments);

  for (var i = 0; i < args.length; i++) {
    delete this._methods[args[i]];
  }
};

function keys(o) {
  if (Object.prototype.keys) {
    return o.keys();
  }

  var result = [];
  for (var k in o) {
    if (o.hasOwnProperty(k)) {
      result.push(k);
    }
  }

  return result;
}

Server.prototype.provides = function (method) {
  if (util.isUndefined(method)) {
    return keys(this._methods);
  }

  return this._methods.hasOwnProperty(method);
};

Server.prototype.makeError = function(id, message, code, data) {
  var error;
  var response;

  if (util.isNumber(message)) {
    data = code;
    code = message;
    message = this.errorMessages[code];
  }

  if (!util.isNumber(code)) {
    code = this.errors.INTERNAL_ERROR;
  }

  error = { id: id, code: code, message: message };

  if (!util.isUndefined(data)) {
    error.data = data;
  }

  if (util.isNumber(id) || util.isString(id) || id === null) {
    response = {
      jsonrpc: '2.0',
      id: id
    };
    response.error = error;
    return response;
  } else {
    response = new Error(message);
    response.code = code;

    if (!util.isUndefined(data)) {
      response.data = data;
    }

    return response;
  }
};

Server.prototype.makeResponse = function (id, result) {
  var response = {
    jsonrpc: '2.0',
    id: id,
    result: result
  };

  return util.isString(id) || util.isNumber(id) || id === null ?
    response : null;
};

/**
 * Transform named arguments to an args array
 *
 * Missing args are undefined.
 */
function marshal(params, method) {
  var result = [];

  if (util.isArray(params)) {
    result = params;
  } else if (params) {
    for (var k in params) {
      if (util.isNumber(method.args[k])) {
        result[method.args[k]] = params[k];
      }
    }
  }

  return result;
}

function nopFn() {};

Server.prototype.respond = function (request, callback) {
  callback = callback || nopFn;

  function _respondCallback(error, response) {
    if (!error) {
      callback(null, JSON.stringify(response));
    }
  }

  var responseCount = 0;
  function _respondBatchCallback(error, response) {
    responseCount++;

    if (!error && response !== null) {
      results.push(response);
    }

    if (responseCount === request.length) {
      callback(null, JSON.stringify(results));
    }
  }

  var code, response, results, batchContext;

  // parse the payload
  try {
    request = JSON.parse(request, this.options.reviver);
  } catch (e) {
    return callback(
      null,
      JSON.stringify(
        this.makeError(null, this.errors.PARSE_ERROR, e)
      )
    );
  }

  // is it a batch request?
  if (util.isArray(request)) {
    if (request.length < 1) {
      // empty batch requests are invalid
      return callback(
        null,
        JSON.stringify(
          this.makeError(null, this.errors.INVALID_REQUEST)
        )
      );
    }

    results = [];

    for (var i = 0; i < request.length; i++) {
      this._respond(request[i], _respondBatchCallback);
    }

    if (results.length < 1) {
      // don't respond if everything was notifications
      results = null;
    }
  } else {
    this._respond(request, _respondCallback);
  }
};

Server.prototype._respond = function (request, callback) {
  if (!util.isUndefined(request.id) &&
    !util.isNull(request.id) &&
    !util.isString(request.id) &&
    !util.isNumber(request.id)
  ) {
    return callback(
      null,
      this.makeError(null, this.errors.INVALID_REQUEST)
    );
  }

  // is it a valid request?
  if (request.jsonrpc !== '2.0' ||
    !util.isString(request.method) ||
    (
      !util.isUndefined(request.params) &&
      !util.isArray(request.params) &&
      !util.isObject(request.params)
    )
  ) {
    return callback(
      null,
      this.makeError(util.isUndefined(request.id) ?
        null : request.id,
        this.errors.INVALID_REQUEST
      )
    );
  }

  // coolbro. handle it.
  var method = this._methods[request.method];
  if (!method) {
    return callback(
      null,
      this.makeError(request.id, this.errors.METHOD_NOT_FOUND)
    );
  }

  var that = this;
  var methodCallback = function (error, result) {
    var code;

    if (error) {
      code = util.isNumber(error.code) ?
        error.code :
        that.errors.INTERNAL_ERROR;

      return callback(
        null,
        that.makeError(
          request.id,
          error.message || error,
          error.code,
          error.data
        )
      );
    }

    return callback(
      null,
      that.makeResponse(request.id, result)
    );
  };
  var isAsync = false;

  var context = {
    async: function () {
      isAsync = true;
      return methodCallback;
    }
  };
  var result;

  try {
    result = method.fn.apply(context, marshal(request.params, method))

    if (!isAsync) {
      methodCallback(null, result);
    }
  } catch (e) {
    methodCallback(e, null);
  }
};

module.exports = Server;
