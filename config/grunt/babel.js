'use strict';

const babelOptions = require('../babel/build.json');

module.exports = {
    build: {
        files: [{
            cwd: 'src/',
            dest: 'build/',
            expand: true,
            src: [
                '**/*.js',
                '!browser/**'
            ]
        }],
        options: babelOptions
    }
};
