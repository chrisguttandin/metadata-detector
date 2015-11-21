'use strict';

var createReadStream = require('fs').createReadStream,
    metadataDetector = require('../../../src/module.js'),
    testData = require('../../fixtures/test-data.json');

describe('metadata-detector', function () {

    describe('createReadStream()', function () {

        leche.withData(testData, function (filename, locations) {

            it('should strip the id3 tag from the file', function (done) {
                var lctns = [],
                    readable = createReadStream('test/fixtures/' + filename),
                    writable = metadataDetector.createLocateStream();

                readable
                    .pipe(writable)
                    .on('error', function (err) {
                        done(err);
                    })
                    .on('finish', function () {
                        expect(lctns).to.deep.equal(locations);

                        done();
                    })
                    .on('location', function (location) {
                        lctns.push(location);
                    });
            });

        });

    });

});
