'use strict';

module.exports = {
    build: {
        files: [{
            cwd: 'src/',
            dest: 'build/',
            expand: true,
            src: [
                '**/*.js'
            ]
        }],
        options: {
            plugins: [
                'transform-es2015-block-scoping'
            ]
        }
    }
};
