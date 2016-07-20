'use strict';

module.exports = {
    'config': {
        options: {
            configFile: 'config/eslint/config.json'
        },
        src: [
            '*.js',
            'config/**/*.js'
        ]
    },
    'src-browser': {
        options: {
            configFile: 'config/eslint/src-browser.json'
        },
        src: [
            'src/browser/**/*.js'
        ]
    },
    'src-common': {
        options: {
            configFile: 'config/eslint/src-common.json'
        },
        src: [
            'src/**!(browser|server)/*.js'
        ]
    },
    'src-server': {
        options: {
            configFile: 'config/eslint/src-server.json'
        },
        src: [
            'src/server/**/*.js'
        ]
    },
    'test': {
        options: {
            configFile: 'config/eslint/test.json'
        },
        src: [
            'test/**/*.js'
        ]
    }
};
