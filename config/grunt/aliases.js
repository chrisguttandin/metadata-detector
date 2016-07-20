'use strict';

module.exports = {
    build: [
        'clean:build',
        'babel:build'
    ],
    lint: [
        'eslint'
    ],
    test: [
        'build',
        'karma:test',       // run browser tests
        'mochaTest:test',   // run tests on Node.js
    ]
};
