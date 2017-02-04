module.exports = function (grunt) {
  grunt.initConfig({
    eslint: {
      target: [
        './lib/**/*.js'
      ]
    },
    webpack: {
      options: require('./webpack.config.js'),
      build: {}
    }
  });

  [
    'grunt-webpack',
    'gruntify-eslint'
  ].forEach(function (module) {
    grunt.loadNpmTasks(module);
  });
};
