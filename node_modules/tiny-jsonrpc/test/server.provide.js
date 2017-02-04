'use strict';

var test = require('tape');

var Server = require('../').Server;

test('Server.provide', function (t) {
  test('registers functions as JSON-RPC methods if named', function (t) {
    var server = new Server();
    var called = {};

    server.provide(function foo() { called.foo = true; });
    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'foo'
    }));

    t.ok(called.foo, 'foo called');

    server.provide(
      function fiz() { called.fiz = true; },
      function frob() { called.frob = true; }
    );

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'fiz'
    }));

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 3,
      method: 'frob'
    }));

    t.ok(called.fiz, 'fiz called');
    t.ok(called.frob, 'frob called');

    t.end();
  });

  test('throws if passed an anonymous function', function (t) {
    var server = new Server();

    t.throws(function () {
      server.provide(function () { });
    });
    t.throws(function () {
      server.provide(function foo() {}, function () { });
    });

    t.end();
  });

  t.test('registers methods of objects as JSON-RPC methods', function (t) {
    var server = new Server();
    var called = {};

    server.provide({ foo: function () { called.foo = true; } });
    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'foo'
    }));

    t.ok(called.foo, 'foo is registered');

    server.provide({
      fiz: function () { called.fiz = true; },
      wiz: function () { called.wiz = true; }
    }, {
      frob: function () { called.frob = true; }
    });

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'fiz'
    }));

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 3,
      method: 'wiz'
    }));

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 4,
      method: 'frob'
    }));

    t.ok(called.fiz, 'fiz is registered');
    t.ok(called.wiz, 'wiz is registered');
    t.ok(called.frob, 'frob is registered');

    t.end();
  });

  t.test('allows functions and objects in the same call', function (t) {
    var server = new Server();
    var called = {};

    server.provide({
        foo: function () { called.foo = true; }
      },
      function fiz() { called.fiz = true; }
    );

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'foo'
    }));

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'fiz'
    }));

    t.ok(called.foo, 'foo is registered');
    t.ok(called.fiz, 'fiz is registered');

    t.end();
  });

  t.test('throws when passed a duplicate name', function (t) {
    var server = new Server();
    function fn1() {};
    function fn2() {};

    t.throws(function () {
      server.provide(function foo() { }, function foo() { });
    });

    t.throws(function () {
      server.provide({ foo: fn1 }, { foo: fn2 });
    });

    t.throws(function () {
      server.provide({ foo: fn1 }, function foo() {});
    });

    server.provide(function foo() {});
    t.throws(function () {
      server.provide(function foo() { });
    });
    t.throws(function () {
      server.provide({ foo: fn1 });
    });

    t.end();
  });

  t.test('registers no methods if any cause it to throw', function (t) {
    var server = new Server();
    var called = {};

    try {
      server.provide(
        function foo() { called.foo = true; },
        function () {}
      );
    } catch (e) {}

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'foo'
    }));

    t.notOk(called.foo, 'foo is not registered');

    t.end();
  });

  t.test('marshals named arguments', function (t) {
    var server = new Server();
    var called = false;

    server.provide(function foo(bar, baz) {
      t.equal(bar, void undefined);
      t.equal(baz, 23);
      called = true;
    });

    server.respond(JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'foo',
      params: {
        baz: 23,
        biz: 42
      }
    }));

    t.ok(called, 'foo is registered');

    t.end();
  });

  t.end();
});
