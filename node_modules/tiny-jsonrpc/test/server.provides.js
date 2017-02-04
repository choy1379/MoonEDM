'use strict';

var test = require('tape');

var Server = require('../').Server;

test('Server.provides', function (t) {
  t.test('if passed a method name', function (t) {
    t.test('returns true if the server provides it', function (t) {
      var server = new Server();

      server.provide(function foo() {});

      t.ok(server.provides('foo'), 'true if provided');

      t.end();
    });

    t.test('returns false if the server does not provide it', function (t) {
      var server = new Server();

      t.notOk(server.provides('fiz'), 'false if no functions provided');

      server.provide(function foo() {});

      t.notOk(server.provides('frob'), 'false if not provided');

      t.end();
    });
  });

  t.test('if not passed a method name, returns all registered methods',
    function (t) {
      var server = new Server();

      server.provide(
        function foo() {},
        function fiz() {},
        function frob() {}
      );

      t.deepEqual(
       server.provides(),
       ['provides', 'foo', 'fiz', 'frob'],
       'returns all provided method names as an array'
      );

      t.end();
    });
});
