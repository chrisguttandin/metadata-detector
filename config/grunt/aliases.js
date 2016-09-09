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
        'karma:test',
        'mochaTest:test'
    ]
};
