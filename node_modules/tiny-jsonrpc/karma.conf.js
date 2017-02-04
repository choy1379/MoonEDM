var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-tap'),
      require('karma-chrome-launcher'),
      require('karma-coverage')
    ],

    basePath: '',
    frameworks: [ 'tap' ],
    files: [
      'test/index.js'
    ],

    preprocessors: {
      'test/**/*.js': [ 'webpack' ]
    },

    webpack: {
      node : {
        fs: 'empty'
      },

      // Instrument code that isn't test or vendor code.
      module: {
        postLoaders: [{
          test: /\.js$/,
          exclude: /(test|node_modules)\//,
          loader: 'istanbul-instrumenter'
        }],
        noParse: [
          /node_modules\/sinon\//
        ]
      },

      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon',
        }
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: [
      'dots',
      'coverage'
    ],

    coverageReporter: {
      type: 'text',
      dir: 'coverage/'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
};
