'use strict';

var test = require('tape');

var tinyJsonRpc = require('../');
var StreamClient = tinyJsonRpc.StreamClient;
var Client = tinyJsonRpc.Client;
var Server = tinyJsonRpc.Server;
var EventEmitter = require('events').EventEmitter;
var sinon = require('sinon');

test('StreamClient.request', function (t) {
  var server = new Server();

  server.provide(function echo (what) {
    return what;
  });

  function expectValidRequest(t, request) {
    t.equal(request.jsonrpc, '2.0');
    t.equal(typeof request.id, 'number');
  }

  t.test('throws an error when', function (t) {
    var stream = new EventEmitter();
    var client = new StreamClient({
      server: stream
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

  t.test('upon a valid request', function (t) {
    t.test('sends a valid request to the server', function (t) {
      var stream = new EventEmitter();
      stream.write = sinon.stub().returns(true);

      var client = new StreamClient({
        server: stream
      });

      client.request('echo', 'marco');

      sinon.assert.calledOnce(stream.write);
      t.equal(stream.write.firstCall.args.length, 1);
      var request = JSON.parse(stream.write.firstCall.args[0]);

      expectValidRequest(t, request);
      t.equal(request.method, 'echo');
      t.deepEqual(request.params, ['marco']);

      stream.write.reset();
      client.request({
        method: 'echo',
        params: ['marco']
      });

      sinon.assert.calledOnce(stream.write);
      t.equal(stream.write.firstCall.args.length, 1);
      var request = JSON.parse(stream.write.firstCall.args[0]);

      expectValidRequest(t, request);
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

        client.request('echo', 'marco');

        sinon.assert.calledOnce(stream.write);
        sinon.assert.calledWith(stream.write, JSON.stringify({
            jsonrpc: '2.0',
            method: 'echo',
            params: ['marco'],
            id: 0
        }));

        stream.write.reset();

        client.request('echo', 'marco');
        client.request('echo', 'marco');

        sinon.assert.notCalled(stream.write);

        stream.write.returns(true);
        stream.emit('drain');

        sinon.assert.calledTwice(stream.write);

        t.ok(stream.write.firstCall.calledWith(JSON.stringify({
            jsonrpc: '2.0',
            method: 'echo',
            params: ['marco'],
            id: 1
        })));

        t.ok(stream.write.secondCall.calledWith(JSON.stringify({
            jsonrpc: '2.0',
            method: 'echo',
            params: ['marco'],
            id: 2
        })));

        t.end();
      });

      t.end();
    });

    t.test('upon a data event', function (t) {
      t.test('calls the user callback with a result', function (t) {
        var stream = new EventEmitter();
        var client = new StreamClient({
            server: stream
        });
        var callback = sinon.spy();

        stream.write = sinon.spy();
        
        client.request('echo', 'marco', callback);

        var id = JSON.parse(stream.write.firstCall.args[0]).id;
        stream.emit('data', JSON.stringify({
            jsonrpc: '2.0',
            id: id,
            result: 'polo'
        }));

        sinon.assert.calledOnce(callback);
        sinon.assert.calledWithExactly(callback, null, 'polo');

        t.end();
      });

      t.test('calls the user callback with an error', function (t) {
        var stream = new EventEmitter();
        var client = new StreamClient({
          server: stream
        });
        var callback = sinon.spy();

        stream.write = sinon.spy();

        client.request('echo', 'marco', callback);

        var id = JSON.parse(stream.write.firstCall.args[0]).id;
        stream.emit('data', JSON.stringify({
          jsonrpc: '2.0',
          id: id,
          error: 'DOH!'
        }));

        sinon.assert.calledOnce(callback);
        sinon.assert.calledWithExactly(callback, 'DOH!', null);

        t.end();
      });

    t.end();
  });

  t.end();
});
