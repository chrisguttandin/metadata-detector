'use strict';

var chai = require('chai'),
    leche = require('leche');

module.exports = {
    test: {
        options: {
            bail: true,
            clearRequireCache: true,
            require: [
                function () {
                    global.expect = chai.expect;
                    global.leche = leche;
                }
            ]
        },
        src: [
            'test/server/integration/**/*.js'
        ]
    }
};
