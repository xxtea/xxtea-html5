module.exports = function (grunt) {
  var browsers = [{
    browserName: 'android',
    platform: 'Linux',
    version: '4.0'
  }, {
    browserName: 'android',
    platform: 'Linux',
    version: '4.1'
  }, {
    browserName: 'android',
    platform: 'Linux',
    version: '4.2'
  }, {
    browserName: 'android',
    platform: 'Linux',
    version: '4.3'
  }, {
    browserName: 'android',
    platform: 'Linux',
    version: '4.4'
  }, {
    browserName: 'android',
    platform: 'Linux',
    version: '5.1'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '9.2'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '9.1'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '9.0'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '8.4'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '8.3'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '8.2'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '8.1'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '8.0'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '7.1'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '7.0'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '6.1'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '6.0'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '5.1'
  }, {
    browserName: 'chrome',
    platform: 'Linux'
  }, {
    browserName: 'firefox',
    platform: 'Linux'
  }, {
    browserName: 'safari',
    platform: 'Linux'
  }, {
    browserName: 'chrome',
    platform: 'OS X 10.8'
  }, {
    browserName: 'safari',
    platform: 'OS X 10.8'
  }, {
    browserName: 'firefox',
    platform: 'OS X 10.8'
  }, {
    browserName: 'chrome',
    platform: 'OS X 10.9'
  }, {
    browserName: 'safari',
    platform: 'OS X 10.9'
  }, {
    browserName: 'firefox',
    platform: 'OS X 10.9'
  }, {
    browserName: 'chrome',
    platform: 'OS X 10.10'
  }, {
    browserName: 'safari',
    platform: 'OS X 10.10'
  }, {
    browserName: 'firefox',
    platform: 'OS X 10.10'
  }, {
    browserName: 'chrome',
    platform: 'OS X 10.11'
  }, {
    browserName: 'safari',
    platform: 'OS X 10.11'
  }, {
    browserName: 'firefox',
    platform: 'OS X 10.11'
  }, {
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '20.10240'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11.0'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11.0'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10.0'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '11.0'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10.0'
  }, {
    browserName: 'chrome',
    platform: 'Windows 7'
  }, {
    browserName: 'firefox',
    platform: 'Windows 7'
  }, {
    browserName: 'safari',
    platform: 'Windows 7'
  }, {
    browserName: 'opera',
    platform: 'Windows 7',
    version: '12.12'
  }, {
    browserName: 'opera',
    platform: 'Windows 7',
    version: '11.64'
  }, {
    browserName: 'chrome',
    platform: 'Windows XP'
  }, {
    browserName: 'firefox',
    platform: 'Windows XP'
  }, {
    browserName: 'opera',
    platform: 'Windows XP',
    version: '12.12'
  }, {
    browserName: 'opera',
    platform: 'Windows XP',
    version: '11.64'
  }];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          base: '',
          port: 9999
        }
      }
    },

    'saucelabs-mocha': {
      all: {
        options: {
          username: 'xxtea-html5',
          key: 'e6a46f2c-33b9-473a-8c81-ec0228d7d9f5',
          urls: [
            'http://127.0.0.1:9999/xxtea_test.html'
          ],
          browsers: browsers,
          build: process.env.TRAVIS_JOB_ID,
          testname: 'xxtea-html5 tests',
          throttled: 3,
          sauceConfig: {
            'video-upload-on-pass': false
          }
        }
      }
    },
    watch: {}
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-saucelabs');

  grunt.registerTask('default', ['connect', 'saucelabs-mocha']);
};
