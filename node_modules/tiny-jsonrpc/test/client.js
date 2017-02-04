'use strict';

var test = require('tape');
var Client = require('../').Client;

test('Client instance', function (t) {
  var client = new Client({
    server: true
  });

  t.ok(client.request instanceof Function, 'provides a request method');
  t.ok(client.notify instanceof Function, 'provides a notify method');

  t.end();
});
