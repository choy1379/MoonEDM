'use strict';

var test = require('tape');
var sinon = require('sinon');

var tinyJsonRpc = require('../');
var Client = tinyJsonRpc.Client;
var StreamClient = tinyJsonRpc.StreamClient;

test('StreamClient instances', function (t) {
  var mockStream = { on: function () {} };

  t.test('are instances of Client', function (t) {
    var client = new StreamClient({
      server: mockStream
    });

    t.ok(client instanceof Client);

    t.end();
  });

  t.test('provide a request method', function (t) {
    var client = new StreamClient({
      server: mockStream
    });
    t.ok(client.request instanceof Function);

    t.end();
  });

  t.test('inherit a notify method', function (t) {
    var client = new StreamClient({
      server: mockStream
    });
    t.equal(client.notify, Client.prototype.notify);

    t.end();
  });

  t.end();
});

