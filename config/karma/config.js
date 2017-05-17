module.exports = (config) => {

    config.set({

        basePath: '../../',

        concurrency: 2,

        files: [
            {
                included: false,
                pattern: 'src/**',
                served: false,
                watched: true
            }, {
                included: false,
                pattern: 'test/fixtures/**',
                served: true,
                watched: true
            },
            'test/integration/**/*.js'
        ],

        frameworks: [
            'leche',
            'mocha',
            'sinon-chai'
        ],

        preprocessors: {
            'test/integration/**/*.js': 'webpack'
        },

        webpack: {
            module: {
                loaders: [
                    {
                        loader: 'ts-loader',
                        test: /\.ts?$/
                    }
                ]
            },
            resolve: {
                extensions: [ '.js', '.ts' ]
            }
        },

        webpackMiddleware: {
            noInfo: true
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
