'use strict';

var test = require('tape');

var Server = require('../').Server;

test('Server.revoke', function (t) {
  t.test('unregisters named JSON RPC methods', function (t) {
    var server = new Server();
    var called = {};

    server.provide(function foo() { called.foo = true; });
    server.provide(function fiz() { called.fiz = true; });
    server.revoke('foo');

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'foo'
    }));

    t.equal(called.foo, void undefined);
    t.equal(server.provides('foo'), false);
    t.equal(server.provides('fiz'), true);

    t.end();
  });

  t.test('ignores non-existent methods', function (t) {
    var server = new Server();

    t.doesNotThrow(function () {
      server.revoke('foo');
    });

    server.provide(function fiz() { called.fiz = true; });

    t.doesNotThrow(function () {
      server.revoke('foo', 'foo');
    });

    t.end();
  });

  t.end();
});
