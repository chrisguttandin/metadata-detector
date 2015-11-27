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
        'jshint'
    ],
    test: [
        'karma:test',
        'mochaTest:test'
    ]
};
