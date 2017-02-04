'use strict';

var test = require('tape');
var sinon = require('sinon');

var tinyJsonRpc = require('../');
var Server = tinyJsonRpc.Server;
var StreamServer = tinyJsonRpc.StreamServer;

test('StreamServer instances', function (t) {
  t.test('are instances of Server', function (t) {
    t.ok(new StreamServer() instanceof Server);
    t.end();
  });

  t.test('inherit a respond method', function (t) {
    var server = new StreamServer();
    t.equal(server.respond, Server.prototype.respond);
    t.end();
  });

  t.test('inherit a provide method', function (t) {
    var server = new StreamServer();
    t.equal(server.provide, Server.prototype.provide);
    t.end();
  });

  t.test('inherit a revoke method', function (t) {
    var server = new StreamServer();
    t.equal(server.revoke, Server.prototype.revoke);
    t.end();
  });

  t.test('inherit a provides method', function (t) {
    var server = new StreamServer();
    t.equal(server.provides, Server.prototype.provides);
    t.end();
  });

  t.test('provide a listen method', function (t) {
    var server = new StreamServer();
    t.equal(typeof server.listen, 'function');
    t.end();
  });

  t.end();
});
