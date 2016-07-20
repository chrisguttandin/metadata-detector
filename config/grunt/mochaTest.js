'use strict';

var babelOptions = require('../babel/test.json'),
    babelRegister = require('babel-register'),
    chai = require('chai'),
    fs = require('fs');

module.exports = {
    test: {
        options: {
            bail: true,
            clearRequireCache: true,
            require: [
                () => {
                    var compiler = require.extensions['.js'];

                    require.extensions['.js'] = function (mdl, filename) {
                        if (!filename.includes('node_modules') && filename.includes('src/')) {
                            filename = filename.replace('src/', 'build/');

                            mdl._compile(fs.readFileSync(filename, 'utf8'), filename);
                        }

                        return compiler(mdl, filename);
                    }
                },
                () => babelRegister(babelOptions),
                () => global.expect = chai.expect
            ]
        },
        src: [
            'test/integration/server/**/*.js'
        ]
    }
};
