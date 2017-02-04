var Server = require('./server');
var util = require('./util');

function StreamServer(options) {
  Server.apply(this, arguments);
  this._streams = [];
}

StreamServer.prototype = new Server();
StreamServer.prototype.constructor = StreamServer;

StreamServer.prototype._write = function (stream, what) {
  var success;

  if (stream.full) {
    stream.buffer.push(what);
  } else {
    stream.full = !stream.stream.write(what);
  }
};

StreamServer.prototype.listen = function () {
  var args = util.toArray(arguments);

  args.forEach(function (stream) {
    var streamRecord = {
      stream: stream,
      buffer: []
    };

    streamRecord.onData = this._onData.bind(this, streamRecord);
    stream.on('data', streamRecord.onData);

    streamRecord.onDrain = this._onDrain.bind(this, streamRecord);
    stream.on('drain', streamRecord.onDrain);

    this._streams.push(streamRecord);
  }, this);
};

StreamServer.prototype._onData = function (stream, request) {
  var that = this;

  this.respond(request, function (error, response) {
    if (typeof response === 'string') {
      that._write(stream, response);
    }
  });
};

StreamServer.prototype._onDrain = function (stream, request) {
  var buffer = stream.buffer.slice().reverse();

  stream.full = false;
  while (buffer.length > 0) {
    this._write(stream, buffer.pop());
  }
};

module.exports = StreamServer;
