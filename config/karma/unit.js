'use strict';

module.exports = function (config) {

    /* eslint-disable indent */
    var configuration = {

            basePath: '../../',

            files: [
                'src/browser/module.js',
                {
                    included: false,
                    pattern: 'test/fixtures/**',
                    served: true,
                    watched: true,
                },
                'test/browser/integration/**/*.js'
            ],

            frameworks: [
                'browserify',
                'leche',
                'mocha',
                'sinon-chai' // implicitly uses chai too
            ],

            preprocessors: {
                'src/browser/module.js': 'browserify',
                'test/browser/integration/**/*.js': 'browserify'
            }

        };
    /* eslint-enable indent */

    if (process.env.TRAVIS) {
        configuration.browsers = [
            'ChromeCanarySauceLabs',
            'ChromeSauceLabs',
            'FirefoxDeveloperSauceLabs',
            'FirefoxSauceLabs',
            'SafariSauceLabs'
        ];

        configuration.captureTimeout = 120000;

        configuration.customLaunchers = {
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
        };

        configuration.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    } else {
        configuration.browsers = [
            'Chrome',
            'ChromeCanary',
            'Firefox',
            'FirefoxDeveloper',
            'Safari'
        ];
    }

    config.set(configuration);

};
