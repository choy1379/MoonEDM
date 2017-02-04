'use strict';

var test = require('tape');

var Server = require('../').Server;
var sinon = require('sinon');

test('Server.respond', function (t) {
  var errors = {
    PARSE_ERROR: -32700,
    INVALID_REQUEST: -32600,
    METHOD_NOT_FOUND: -32601,
    INVALID_PARAMS: -32602,
    INTERNAL_ERROR: -32603
  };

  function expectValidResponse(t, response, id) {
    t.equal(response.jsonrpc, '2.0');
    t.equal(response.id, id);
  }

  function expectValidResult(t, response, id) {
    expectValidResponse(t, response, id);
    t.equal(response.error, void undefined);
  }

  function expectValidError(t, response, id) {
    expectValidResponse(t, response, id);
    t.equal(response.result, void undefined);
    t.equal(typeof response.error, 'object');
    t.equal(typeof response.error.code, 'number');
    t.equal(typeof response.error.message, 'string');
  }

  t.test('returns an error when', function (t) {
    t.test('request is not valid JSON', function (t) {
      var server = new Server();
      var requests = [
        void undefined,
        {
          id: 1,
          method: 'foo'
        },
        [],
        '[',
        '{ foo:',
        '{ foo }',
        '{ foo: "bar" }'
      ];
      var callbackCount = 0;
      var response;

      server.provide(function foo() { });
      requests.forEach(function (request) {
        server.respond(request, function (error, response) {
          response = JSON.parse(response);

          expectValidError(t, response, null);
          t.equal(response.error.code, errors.PARSE_ERROR);

          callbackCount++;
          if (callbackCount === requests.length) {
            t.end();
          }
        });
      });
    });

    t.test('request.jsonrpc !== "2.0"', function (t) {
      var server = new Server();
      var request = {
        id: 1,
        method: 'foo'
      };
      var versions = ['2.1', '2', 2.0, {}, [], null, false, true];

      server.provide(function foo() { });
      server.respond(JSON.stringify(request), function (error, response) {
        var callbackCount = 0;

        response = JSON.parse(response);
        expectValidError(t, response, request.id);
        t.equal(response.error.code, errors.INVALID_REQUEST);

        versions.forEach(function (version) {
          request.jsonrpc = version;
          server.respond(JSON.stringify(request), function (error, response) {
            response = JSON.parse(response);

            expectValidError(t, response, request.id);
            t.equal(response.error.code, errors.INVALID_REQUEST);

            callbackCount++;
            if (callbackCount === versions.length) {
              t.end();
            }
          });
        });
      });
    });

    t.test('request.method is missing', function (t) {
      var server = new Server();
      var request = {
        jsonrpc: '2.0',
        id: 1
      };

      server.provide(function foo() { });
      server.respond(JSON.stringify(request), function (error, response) {
        response = JSON.parse(response);

        expectValidError(t, response, request.id);
        t.equal(response.error.code, errors.INVALID_REQUEST);

        t.end();
      });
    });

    t.test('request.method is not a string', function (t) {
      var server = new Server();
      var request = {
        jsonrpc: '2.0',
        id: 1,
      };
      var methods = [null, {}, [], 23, false];
      var callbackCount = 0;
      var response;

      server.provide(function foo() { });
      methods.forEach(function (method) {
        request.method = method;
        server.respond(JSON.stringify(request), function (error, response) {
          response = JSON.parse(response);

          expectValidError(t, response, request.id);
          t.equal(response.error.code, errors.INVALID_REQUEST);

          callbackCount++;
          if (callbackCount === methods.length) {
            t.end();
          }
        });
      });
    });

    t.test('request.method is not provided by the server', function (t) {
      var server = new Server();
      var request = {
        jsonrpc: '2.0',
        id: 1,
        method: 'fiz'
      };
      var response;

      server.provide(function foo() { });
      server.respond(JSON.stringify(request), function (error, response) {
        response = JSON.parse(response);

        expectValidError(t, response, request.id);
        t.equal(response.error.code, errors.METHOD_NOT_FOUND);

        t.end();
      });
    });

    t.test('request.id is present, but not a string, number, or null',
      function (t) {
        var server = new Server();
        var request = {
          jsonrpc: '2.0',
          id: 1,
        };
        var ids = [{}, [], false];
        var callbackCount = 0;
        var response;

        server.provide(function foo() { });
        ids.forEach(function (id) {
          request.id = id;
          server.respond(JSON.stringify(request), function (error, response) {
            response = JSON.parse(response);

            expectValidError(t, response, null);
            t.equal(response.error.code, errors.INVALID_REQUEST);

            callbackCount++;
            if (callbackCount === ids.length) {
              t.end();
            }
          });
        });
      });

      t.test('request.params is present, but not an object or array',
        function (t) {
          var server = new Server();
          var request = {
            jsonrpc: '2.0',
            id: 1,
          };
          var paramses = ['', false, true, null, 0, 42];
          var callbackCount = 0;
          var response;

          server.provide(function foo() { });
          paramses.forEach(function (params) {
            request.params = params;
            server.respond(JSON.stringify(request), function (error, response) {
              response = JSON.parse(response);

              expectValidError(t, response, request.id);
              t.equal(response.error.code, errors.INVALID_REQUEST);

              callbackCount++;
              if (callbackCount === paramses.length) {
                t.end();
              }
            });
          });
        });

      t.end();
    });

    t.test('upon a valid request', function (t) {
      t.test('calls the named method', function (t) {
        var server = new Server();
        var request = {
          jsonrpc: '2.0',
          id: 1,
          method: 'foo'
        };
        var spy = sinon.spy();

        server.provide(function foo () { spy(); });
        server.respond(JSON.stringify(request));
        sinon.assert.calledOnce(spy);

        t.end();
      });

      t.test('calls the method in a context that provides an `async` method',
        function (t) {
          var server = new Server();
          var request = {
            jsonrpc: '2.0',
            id: 1,
            method: 'foo'
          };
          var spy = sinon.spy();

          server.provide(function foo () {
            t.equal(typeof this.async, 'function', 'this.async is a function');
          });
          server.respond(JSON.stringify(request), function (error, response) {
            error = error = response.error;
            if (error) {
              throw new Error(error.message);
            }
            t.end();
          });
        });

      t.test('`async` method', function (t) {
        t.test('returns a callback', function (t) {
          var server = new Server();
          var request = {
            jsonrpc: '2.0',
            id: 1,
            method: 'foo'
          };
          var spy = sinon.spy();

          server.provide(function foo () {
            var callback = this.async();
            t.equal(
              typeof callback, 'function', 'this.async returns a function');
            t.end();
          });

          server.respond(JSON.stringify(request));
        });

        t.test('if called', function (t) {
          t.test(
            '`respond` waits for the returned callback to be invoked',
            function (t) {
              var server = new Server();
              var request = {
                jsonrpc: '2.0',
                id: 1,
                method: 'foo'
              };
              var spy = sinon.spy();

              server.provide(function foo () {
                var callback = this.async();
                setTimeout(callback, 0);
              });
              server.respond(
                JSON.stringify(request),
                function (error, response) {
                  t.end();
                });
            });

          t.test(
            '`respond` passes thru errors thrown during method invocation',
            function (t) {
              var server = new Server();
              var request = {
                jsonrpc: '2.0',
                id: 1,
                method: 'foo'
              };
              var expected = 'doh!';
              var spy = sinon.spy();

              server.provide(function foo () {
                var callback = this.async();
                throw new Error(expected);
              });
              server.respond(
                JSON.stringify(request),
                function (error, response) {
                  response = JSON.parse(response);

                  t.equal(response.error.message, expected);
                  t.end();
                });
            });

          t.test(
            '`respond` passes thru errors passed to the callback',
            function (t) {
              var server = new Server();
              var request = {
                jsonrpc: '2.0',
                id: 1,
                method: 'foo'
              };
              var expected = 'doh!';
              var spy = sinon.spy();

              server.provide(function foo () {
                var callback = this.async();

                setTimeout(function () {
                  callback(new Error(expected));
                }, 0);
              });
              server.respond(
                JSON.stringify(request),
                function (error, response) {
                  response = JSON.parse(response);

                  t.equal(response.error.message, expected);
                  t.end();
                });
            });

          t.test(
            '`respond` passes thru results from the callback',
            function (t) {
              var server = new Server();
              var request = {
                jsonrpc: '2.0',
                id: 1,
                method: 'foo'
              };
              var expected = 'bar';
              var spy = sinon.spy();

              server.provide(function foo () {
                var callback = this.async();
                setTimeout(function () {
                  callback(null, expected);
                }, 0);
              });
              server.respond(
                JSON.stringify(request),
                function (error, response) {
                  response = JSON.parse(response);

                  t.equal(response.result, expected);
                  t.end();
                });
            });

          t.end();
        });

        t.test('if not called', function (t) {
          t.test(
            'invokes `respond` callback with the returned result synchronously',
            function (t) {
              var server = new Server();
              var request = {
                jsonrpc: '2.0',
                id: 1,
                method: 'foo'
              };
              var expected = 'bar';
              var actual;
              var spy = sinon.spy();

              server.provide(function foo () {
                return expected;
              });
              server.respond(
                JSON.stringify(request),
                function (error, response) {
                  actual = JSON.parse(response).result;
                });

              t.equal(actual, expected);
              t.end();
            });

          t.test(
            '`respond` passes thru errors thrown during method invocation',
            function (t) {
              var server = new Server();
              var request = {
                jsonrpc: '2.0',
                id: 1,
                method: 'foo'
              };
              var expected = 'doh!';
              var actual;
              var spy = sinon.spy();

              server.provide(function foo () {
                throw new Error(expected);
              });
              server.respond(
                JSON.stringify(request),
                function (error, response) {
                  actual = JSON.parse(response).error.message;
                });

              t.equal(actual, expected);
              t.end();
            });
        });

        t.end();
      });

      t.test('passes positional arguments in order', function (t) {
        var server = new Server();
        var request = {
          jsonrpc: '2.0',
          id: 1,
          method: 'foo'
        };
        var args = [
          [], [1], [1, 2], [1, 2, 3]
        ];
        var spy = sinon.spy();

        server.provide(function foo (first, second) {
          spy.apply(null, Array.prototype.slice.call(arguments));
        });

        for (var i = 0; i < args.length; i++) {
          request.params = args[i];
          server.respond(JSON.stringify(request));
          sinon.assert.calledOnce(spy);
          t.deepEqual(spy.lastCall.args, args[i]);
          spy.reset();
        }

        t.end();
      });

      t.test('passes named arguments in appropriately', function (t) {
        var server = new Server();
        var request = {
          jsonrpc: '2.0',
          id: 1,
          method: 'foo'
        };
        var args = [
          {}, { first: 23 }, { second: 42 }, { first: 23, second: 42 },
          { second: 42, first: 23 },
          { first: 23, second: 42, third: 23251 }
        ];
        var spy = sinon.spy();

        server.provide(function foo (first, second) {
          spy.apply(null, Array.prototype.slice.call(arguments));
        });

        for (var i = 0; i < args.length; i++) {
          request.params = args[i];
          server.respond(JSON.stringify(request));
          sinon.assert.calledOnce(spy);
          t.equal(spy.lastCall.args[0], args[i].first);
          t.equal(spy.lastCall.args[1], args[i].second);
          spy.reset();
        }

        t.end();
      });

      t.test('returns a valid response with the method result', function (t) {
        var server = new Server();
        var request = {
          jsonrpc: '2.0',
          id: 1,
          method: 'foo'
        };
        var results = [
          undefined, null, false, true, 0, 42, [1, 2, 3], { foo: 'bar' }
        ];
        var callbackCount = 0;
        var response, currentResult;

        server.provide(function foo () {
          return currentResult;
        });

        results.forEach(function (result) {
          currentResult = result;
          server.respond(JSON.stringify(request), function (error, response) {
            response = JSON.parse(response);

            expectValidResult(t, response, request.id);
            t.deepEqual(response.result, result);

            callbackCount++;
            if (callbackCount === results.length) {
              t.end();
            }
          });
        });
      });

      t.test('returns null when passed a notification', function (t) {
        var server = new Server();
        var request = {
          jsonrpc: '2.0',
          method: 'foo'
        };
        var results = [
          undefined, null, false, true, 0, 42, [1, 2, 3], { foo: 'bar' }
        ];
        var callbackCount = 0;
        var response, currentResult;

        server.provide(function foo () {
          return currentResult;
        });

        results.forEach(function (result) {
          currentResult = result;
          server.respond(JSON.stringify(request), function (error, response) {
            response = JSON.parse(response);

            t.equal(response, null);

            callbackCount++;
            if (callbackCount === results.length) {
              t.end();
            }
          });
        });
      });

      t.test(
        'returns an instance of Error if a method throws on a notification',
        function (t) {
          var server = new Server();
          var request = {
            jsonrpc: '2.0',
            method: 'foo'
          };
          var message = 'OHNOES';

          server.provide(function foo () {
            throw message;
          });

          server.respond(JSON.stringify(request), function (error, response) {
            // FIXME: there are no assertions
            t.end();
          });
        });

      t.test('returns an INTERNAL_ERROR if the method throws a string',
        function (t) {
          var server = new Server();
          var request = {
            jsonrpc: '2.0',
            id: 1,
            method: 'foo'
          };
          var message = 'OHNOES';

          server.provide(function foo () {
            throw message;
          });

          server.respond(JSON.stringify(request), function (error, response) {
            response = JSON.parse(response);

            expectValidError(t, response, request.id);
            t.equal(response.error.code, errors.INTERNAL_ERROR);
            t.equal(response.error.message, message);

            t.end();
          });
        });

      t.test(
        'returns an INTERNAL_ERROR if the method throws an Error with no code',
        function (t) {
          var server = new Server();
          var request = {
            jsonrpc: '2.0',
            id: 1,
            method: 'foo'
          };
          var message = 'OHNOES';

          server.provide(function foo () {
            throw new Error(message);
          });

          server.respond(JSON.stringify(request), function (error, response) {
            response = JSON.parse(response);

            expectValidError(t, response, request.id);
            t.equal(response.error.code, errors.INTERNAL_ERROR);
            t.equal(response.error.message, message);

            t.end();
          });
        });

      t.test(
        'returns an error with correct code if the method throws an Error ' +
        'with a code',
        function (t) {
          var server = new Server();
          var request = {
            jsonrpc: '2.0',
            id: 1,
            method: 'foo'
          };
          var message = 'OHNOES';
          var code = -32001;

          server.provide(function foo () {
            var e = new Error(message);
            e.code = code;
            throw e;
          });

          server.respond(JSON.stringify(request), function (error, response) {
            response = JSON.parse(response);

            expectValidError(t, response, request.id);
            t.equal(response.error.code, code);

            t.end();
          });
        });

      t.test('returns an error with correct data if the method throws an ' +
        'Error with data',
        function (t) {
          var server = new Server();
          var request = {
            jsonrpc: '2.0',
            id: 1,
            method: 'foo'
          };
          var message = 'OHNOES';
          var data = { foo: 'bar' };

          server.provide(function foo () {
            var e = new Error(message);
            e.data = data;
            throw e;
          });

          server.respond(JSON.stringify(request), function (error, response) {
            response = JSON.parse(response);

            expectValidError(t, response, request.id);
            t.same(response.error.data, data);

            t.end();
          });
        });

      t.end();
    });

    t.test('upon a batch request', function (t) {
      t.test('returns INVALID_REQUEST if the batch is empty', function (t) {
        var server = new Server();
        var request = [];

        server.provide(function foo() { });
        server.respond(JSON.stringify(request), function (error, response) {
          response = JSON.parse(response);

          expectValidError(t, response, null);
          t.equal(response.error.code, errors.INVALID_REQUEST);

          t.end();
        });
      });

      t.test('returns an array of responses', function (t) {
        var server = new Server();
        var request = [
          1,
          { 'foo': 'bar' },
          { jsonrpc: 2, method: 'foo', id: 1 },
          { jsonrpc: '2.0', id: 2 },
          { jsonrpc: '2.0', method: 2, id: 3 },
          { jsonrpc: '2.0', method: 'fiz', id: 4 },
          { jsonrpc: '2.0', method: 'foo', id: [] },
          { jsonrpc: '2.0', method: 'foo', id: 5, params: 23 },
          { jsonrpc: '2.0', method: 'foo', id: 6 },
          { jsonrpc: '2.0', method: 'foo', id: 7, params: [1, 2] },
          {
            jsonrpc: '2.0', method: 'foo', id: 8,
            params: { one: 1, two: 2 }
          },
          { jsonrpc: '2.0', method: 'foo', id: 9, params: [-1] },
          {
            jsonrpc: '2.0', method: 'foo', id: 10,
            params: [-1, true, 123]
          },
          {
            jsonrpc: '2.0', method: 'foo', id: 11,
            params: [-1, true, void undefined, { foo: 'bar' }]
          }
        ];

        server.provide(function foo(one, two, three, four) {
          var e;
          if (one < 0) {
            if (two) {
              e = new Error('OHNOES');
              e.code = three;
              e.data = four;
            } else {
              e = 'OHNOES';
            }
            throw e;
          }

          if (one && two) {
            return one + two;
          } else if (one) {
            return one;
          } else {
            return null;
          }
        });

        server.respond(JSON.stringify(request), function (error, response) {
          response = JSON.parse(response);

          // invalid requests
          expectValidError(t, response[0], null);
          t.equal(response[0].error.code, errors.INVALID_REQUEST);
          expectValidError(t, response[1], null);
          t.equal(response[0].error.code, errors.INVALID_REQUEST);

          // bad version
          expectValidError(t, response[2], 1);
          t.equal(response[2].error.code, errors.INVALID_REQUEST);

          // missing method
          expectValidError(t, response[3], 2);
          t.equal(response[3].error.code, errors.INVALID_REQUEST);

          // invalid method
          expectValidError(t, response[4], 3);
          t.equal(response[4].error.code, errors.INVALID_REQUEST);

          // unprovided method
          expectValidError(t, response[5], 4);
          t.equal(response[5].error.code, errors.METHOD_NOT_FOUND);

          // invalid id
          expectValidError(t, response[6], null);
          t.equal(response[6].error.code, errors.INVALID_REQUEST);

          // invalid params
          expectValidError(t, response[7], 5);
          t.equal(response[7].error.code, errors.INVALID_REQUEST);

          // no params
          expectValidResult(t, response[8], 6);
          t.equal(response[8].result, null);

          // positional params
          expectValidResult(t, response[9], 7);
          t.equal(response[9].result, 3);

          // named params
          expectValidResult(t, response[10], 8);
          t.equal(response[10].result, 3);

          // throws a string
          expectValidError(t, response[11], 9);
          t.equal(response[11].error.code, errors.INTERNAL_ERROR);
          t.equal(response[11].error.message, 'OHNOES');

          // throws an Error with code
          expectValidError(t, response[12], 10);
          t.equal(response[12].error.code, 123);
          t.equal(response[12].error.message, 'OHNOES');

          // throws an Error with data
          expectValidError(t, response[13], 11);
          t.equal(response[13].error.code, errors.INTERNAL_ERROR);
          t.equal(response[13].error.message, 'OHNOES');
          t.deepEqual(response[13].error.data, { foo: 'bar' });

          t.end();
        });
      });

    t.end();
  });
});
