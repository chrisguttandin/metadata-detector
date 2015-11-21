'use strict';

var createReadStream = require('fs').createReadStream,
    metadataDetector = require('../../../src/module.js'),
    testData = require('../../fixtures/test-data.json');

describe('metadata-detector', function () {

    describe('createLocateStream()', function () {

        leche.withData(testData, function (filename, locations) {

            it('should locate the metadata tags of the file', function (done) {
                var lctns = [],
                    locateStream = metadataDetector.createLocateStream(),
                    readable = createReadStream('test/fixtures/' + filename, {
                        highWaterMark: 128
                    });

                readable
                    .pipe(locateStream)
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
