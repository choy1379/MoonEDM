'use strict';

module.exports = {
  context: __dirname + '/lib',
  entry: 'expose?TinyJSONRPC!./tiny-jsonrpc',
  output: {
    path: __dirname + '/dist',
    filename: 'tiny-jsonrpc.js'
  }
}
