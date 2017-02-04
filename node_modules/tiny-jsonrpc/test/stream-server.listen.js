'use strict';

var test = require('tape');

var StreamServer = require('../').StreamServer;
var EventEmitter = require('events').EventEmitter;
var sinon = require('sinon');

test('StreamServer.listen', function (t) {
  t.test('listens to a stream for data events, calls Server.respond, ' +
    'and writes the results back to the stream',
    function (t) {
      var stream = new EventEmitter();
      var server = new StreamServer();
      var request = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'marco'
      });

      stream.write = sinon.spy();
      sinon.spy(server, 'respond');

      server.provide(function marco() { return 'polo'; });
      server.listen(stream);
      stream.emit('data', request);

      sinon.assert.calledOnce(server.respond);
      sinon.assert.calledWith(server.respond, request);

      sinon.assert.calledOnce(stream.write);
      sinon.assert.calledWith(stream.write, JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        result: 'polo'
      }));

      t.end();
    });

  t.test('respects backoff signals when writing', function (t) {
    var stream = new EventEmitter();
    var server = new StreamServer();

    stream.write = sinon.stub();
    stream.write.returns(false);

    server.provide(function marco() { return 'polo'; });
    server.listen(stream);
    stream.emit('data', JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'marco'
    }));

    sinon.assert.calledOnce(stream.write);
    sinon.assert.calledWith(stream.write, JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      result: 'polo'
    }));

    stream.write.reset();

    stream.emit('data', JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'marco'
    }));

    stream.emit('data', JSON.stringify({
      jsonrpc: '2.0',
      id: 3,
      method: 'marco'
    }));

    sinon.assert.notCalled(stream.write);

    stream.write.returns(true);
    stream.emit('drain');

    sinon.assert.calledTwice(stream.write);

    t.ok(stream.write.firstCall.calledWith(JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      result: 'polo'
    })));

    t.ok(stream.write.secondCall.calledWith(JSON.stringify({
      jsonrpc: '2.0',
      id: 3,
      result: 'polo'
    })));

    t.end();
  });
});
