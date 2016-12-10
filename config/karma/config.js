'use strict';

module.exports = function (config) {

    config.set({

        basePath: '../../',

        files: [
            {
                included: false,
                pattern: 'src/browser/**/*.js',
                served: false,
                watched: true
            }, {
                included: false,
                pattern: 'src/common/**/*.js',
                served: false,
                watched: true
            }, {
                included: false,
                pattern: 'test/fixtures/**',
                served: true,
                watched: true
            },
            'test/integration/browser/**/*.js'
        ],

        frameworks: [
            'browserify',
            'leche',
            'mocha',
            'sinon-chai'
        ],

        preprocessors: {
            'test/integration/browser/**/*.js': 'browserify'
        }

    });

    if (process.env.TRAVIS) {

        config.set({

            browsers: [
                // 'ChromeCanarySauceLabs',
                'ChromeSauceLabs',
                // 'FirefoxDeveloperSauceLabs',
                'FirefoxSauceLabs',
                'SafariSauceLabs'
            ],

            captureTimeout: 120000,

            customLaunchers: {
                ChromeCanarySauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'chrome',
                    platform: 'OS X 10.11',
                    version: 'dev'
                },
                ChromeSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'chrome',
                    platform: 'OS X 10.11'
                },
                FirefoxDeveloperSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'firefox',
                    platform: 'OS X 10.11',
                    version: 'dev'
                },
                FirefoxSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'firefox',
                    platform: 'OS X 10.11'
                },
                SafariSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'safari',
                    platform: 'OS X 10.11'
                }
            },

            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER

        });

    } else {

        config.set({

            browsers: [
                'Chrome',
                'ChromeCanary',
                'Firefox',
                'FirefoxDeveloper',
                'Safari'
            ]

        });

    }

};
