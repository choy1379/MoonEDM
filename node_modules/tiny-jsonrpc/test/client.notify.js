'use strict';

var test = require('tape');
var sinon = require('sinon');

var tinyJsonRpc = require('../');
var Client = tinyJsonRpc.Client;
var Server = tinyJsonRpc.Server;

test('Client.notify', function (t) {
  var server = new Server();

  server.provide(function echo (what) {
      return what;
  });

  function expectValidNotification(t, request) {
    t.equal(request.jsonrpc, '2.0', 'version is "2.0"');
    t.equal(request.id, void undefined, 'no `id` specified');
  }

  t.test('throws an error when', function (t) {
    var client = new Client({
      server: server
    });

    t.throws(function () {
      client.notify();
    }, /Method must be a string/, 'config is required');

    t.throws(function () {
      client.notify({});
    }, /Method must be a string/, 'config.method is required');

    [null, {}, [], 23, false].forEach(function (arg) {
      t.throws(function () {
        client.notify({
          method: arg
        });
      }, /Method must be a string/, 'config.method must be a string');
    });

    var circular = {};
    circular.link = circular;

    t.throws(
      function () {
        client.notify('echo', circular);
      },
      /Could not serialize request to JSON/,
      'throws if request parameters cannot be serialized'
    );

    t.throws(
      function () {
        client.notify({
          method: 'echo',
          params: [ circular ]
        });
      },
      /Could not serialize request to JSON/,
      'throws if request parameters cannot be serialized'
    );

    ['', false, true, null, 0, 42].forEach(function (arg) {
      t.throws(
        function () {
          client.notify({
            method: 'echo',
            params: arg
          });
        },
        /Params must be an object or array/,
        'config.params must be an object or array'
      );
    });

    t.end();
  });

  t.test('upon a valid notification', function (t) {
    var client = new Client({
      server: server
    });
    var request;

    sinon.spy(server, 'respond');
    client.notify('echo', 'marco');

    sinon.assert.calledOnce(server.respond);
    t.equal(server.respond.firstCall.args.length, 1);

    request = JSON.parse(server.respond.firstCall.args[0]);
    expectValidNotification(t, request);
    t.equal(request.method, 'echo');
    t.deepEqual(request.params, ['marco']);

    server.respond.reset();
    client.notify({
      method: 'echo',
      params: ['marco']
    });

    sinon.assert.calledOnce(server.respond);
    t.equal(server.respond.firstCall.args.length, 1);

    request = JSON.parse(server.respond.firstCall.args[0]);
    expectValidNotification(t, request);
    t.equal(request.method, 'echo');
    t.deepEqual(request.params, ['marco']);

    server.respond.reset();
    var callback = sinon.spy();
    client.notify('echo', 'marco', callback);

    sinon.assert.notCalled(callback);

    callback.reset()
    server.respond.reset();
    client.notify({
      method: 'echo',
      params: ['marco'],
      callback: callback
    });

    sinon.assert.notCalled(callback);

    server.respond.restore();
    t.end();
  });

  t.end();
});
