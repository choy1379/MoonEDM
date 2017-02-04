'use strict';

var test = require('tape');
var sinon = require('sinon');

var tinyJsonRpc = require('../');
var Client = tinyJsonRpc.Client;
var Server = tinyJsonRpc.Server;

test('Client.request', function (t) {
  var server = new Server();

  server.provide(function echo (what) {
    return what;
  });

  function expectValidRequest(t, request) {
    t.equal(request.jsonrpc, '2.0', 'version is "2.0"');
    t.equal(typeof request.id, 'number', '`id` is a number');
  }

  t.test('throws an error when', function (t) {
    var client = new Client({
      server: server
    });

    t.throws(function () {
      client.request();
    }, /Method must be a string/, 'config is required');

    t.throws(function () {
      client.request({});
    }, /Method must be a string/, 'config.method is required');

    [null, {}, [], 23, false].forEach(function (arg) {
      t.throws(function () {
        client.request({
          method: arg
        });
      }, /Method must be a string/, 'config.method must be a string');
    });

    var circular = {};
    circular.link = circular;

    t.throws(
      function () {
        client.request('echo', circular);
      },
      /Could not serialize request to JSON/,
      'throws if request parameters cannot be serialized'
    );

    t.throws(
      function () {
        client.request({
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
          client.request({
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

    test('on failure, calls the passed callback with the error', function (t) {
      server.provide(function fail () {
        throw new Error('DOH!');
      });
      var callback = sinon.spy();
      client.request('fail', 'marco', callback);

      sinon.assert.calledOnce(callback);
      t.equal(callback.firstCall.args.length, 2, 'passed two arguments');
      t.equal(callback.firstCall.args[0].message, 'DOH!');
      t.equal(callback.firstCall.args[1], null, 'second argument is null');

      callback.reset();
      client.request({
          method: 'fail',
          params: ['marco'],
          callback: callback
      });

      sinon.assert.calledOnce(callback);
      t.equal(callback.firstCall.args.length, 2, 'passed two arguments');
      t.equal(callback.firstCall.args[0].message, 'DOH!');
      t.equal(callback.firstCall.args[1], null, 'second argument is null');

      t.end();
    });

    t.test('calls the provided callback with the result', function (t) {
      var callback = sinon.spy();
      client.request('echo', 'marco', callback);

      sinon.assert.calledOnce(callback);
      t.equal(callback.firstCall.args.length, 2);
      t.equal(callback.firstCall.args[0], null);
      t.equal(callback.firstCall.args[1], 'marco');

      callback.reset();
      client.request({
        method: 'echo',
        params: ['marco'],
        callback: callback
      });

      sinon.assert.calledOnce(callback);
      t.equal(callback.firstCall.args.length, 2);
      t.equal(callback.firstCall.args[0], null);
      t.equal(callback.firstCall.args[1], 'marco');

      t.end();
    });

    t.end();
  });

  t.end();
});
