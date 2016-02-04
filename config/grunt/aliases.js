'use strict';

module.exports = {
    build: [
        'clean:build',
        'babel:build'
    ],
    continuous: [
        'karma:continuous'
    ],
    lint: [
        'eslint'
    ],
    test: [
        'karma:test',
        'mochaTest:test'
    ]
};
