'use strict';

var lengthsData = require('../../fixtures/lengths-data.json'),
    loadFixture = require('../../helper/load-fixture.js'),
    locationsData = require('../../fixtures/locations-data.json'),
    metadataDetector = require('../../../src/browser/module.js');

describe('metadata-detector', function () {

    describe('createLocateStream()', function () {

        it('should be undefined', function () {
            expect(metadataDetector.createLocateStream).to.be.undefined;
        });

    });

    describe('createStripStream()', function () {

        it('should be undefined', function () {
            expect(metadataDetector.createStripStream).to.be.undefined;
        });

    });

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
