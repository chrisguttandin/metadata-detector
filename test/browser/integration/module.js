'use strict';

var loadFixture = require('../../helper/load-fixture.js'),
    lengthsData = require('../../fixtures/lengths-data.json'),
    locationsData = require('../../fixtures/locations-data.json'),
    metadataDetector = require('../../../src/module.js');

describe('metadata-detector', function () {

    describe('locate()', function () {

        leche.withData(locationsData, function (filename, locations) {

            it('should locate the metadata tags of the file', function (done) {
                loadFixture(filename, function (err, arrayBuffer) {
                    expect(err).to.be.null;

                    expect(metadataDetector.locate(arrayBuffer)).to.deep.equal(locations);

                    done();
                });
            });

        });

    });

    describe('strip()', function () {

        leche.withData(lengthsData, function (filename, byteLength) {

            it('should strip the metadata tags from the file', function (done) {
                loadFixture(filename, function (err, arrayBuffer) {
                    expect(err).to.be.null;

                    arrayBuffer = metadataDetector.strip(arrayBuffer);

                    expect(arrayBuffer.byteLength).to.equal(byteLength);

                    done();
                });
            });

        });

    });

});
