'use strict';

var test = require('tape');

var tinyJsonRpc = require('../');
var StreamClient = tinyJsonRpc.StreamClient;
var Client = tinyJsonRpc.Client;
var Server = tinyJsonRpc.Server;
var EventEmitter = require('events').EventEmitter;
var sinon = require('sinon');

test('StreamClient.notify', function (t) {
  var server = new Server();

  server.provide(function echo (what) {
    return what;
  });

  function expectValidNotification(t, request) {
    t.equal(request.jsonrpc, '2.0');
    t.equal(request.id, void undefined);
  }

  t.test('upon a valid notification, sends a valid notification to the server',
    function (t) {
      var stream = new EventEmitter();
      stream.write = sinon.stub().returns(true);

      var client = new StreamClient({
        server: stream
      });

      client.notify('echo', 'marco');

      sinon.assert.calledOnce(stream.write);
      t.equal(stream.write.firstCall.args.length, 1);
      var request = JSON.parse(stream.write.firstCall.args[0]);

      expectValidNotification(t, request);
      t.equal(request.method, 'echo');
      t.deepEqual(request.params, ['marco']);

      stream.write.reset();
      client.notify({
        method: 'echo',
        params: ['marco']
      });

      sinon.assert.calledOnce(stream.write);
      t.equal(stream.write.firstCall.args.length, 1);
      var request = JSON.parse(stream.write.firstCall.args[0]);

      expectValidNotification(t, request);
      t.equal(request.method, 'echo');
      t.deepEqual(request.params, ['marco']);

      t.end();
    });

  t.test('respects backoff signals when writing', function (t) {
    var stream = new EventEmitter();
    stream.write = sinon.stub().returns(true);

    var client = new StreamClient({
      server: stream
    });

    stream.write = sinon.stub();
    stream.write.returns(false);

    client.notify('echo', 'marco');

    sinon.assert.calledOnce(stream.write);
    sinon.assert.calledWith(stream.write, JSON.stringify({
      jsonrpc: '2.0',
      method: 'echo',
      params: ['marco']
    }));

    stream.write.reset();

    client.notify('echo', 'marco');
    client.notify('echo', 'marco');

    sinon.assert.notCalled(stream.write);

    stream.write.returns(true);
    stream.emit('drain');

    sinon.assert.calledTwice(stream.write);

    t.ok(stream.write.firstCall.calledWith(JSON.stringify({
      jsonrpc: '2.0',
      method: 'echo',
      params: ['marco']
    })));

    t.ok(stream.write.secondCall.calledWith(JSON.stringify({
      jsonrpc: '2.0',
      method: 'echo',
      params: ['marco']
    })));

    t.end();
  });

  t.end();
});
