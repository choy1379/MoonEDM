'use strict';

var test = require('tape');
var Server = require('../').Server;

test('Server instance', function (t) {
  var server = new Server();

  t.test('constructor', function (t) {
    t.test('provides the `provides` method', function (t) {
      var server = new Server();

      t.ok(server.provides('provides'), 'provides the `provides` method');
      t.end();
    });
  });

  t.ok(server.respond instanceof Function, 'provides a respond method');
  t.ok(server.provide instanceof Function, 'provides a provide method');
  t.ok(server.revoke instanceof Function, 'provides a revoke method');
  t.ok(server.provides instanceof Function, 'provides a provides method');

  t.end();
});
