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

    describe('createStripStream()', function () {

        leche.withData([
            [
                '1000-frames-of-noise-encoded-and-tagged-with-itunes.mp3',
                3135
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg-and-tagged-with-vlc.flac',
                1690
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg-and-tagged-with-vlc.mp3',
                3133
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg.flac',
                1690
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg.mp3',
                3133
            ], [
                '1000-frames-of-noise-encoded-with-itunes-and-tagged-with-mp3tag.mp3',
                3135
            ], [
                '1000-frames-of-noise-encoded-with-itunes-and-tagged-with-vlc.mp3',
                3135
            ], [
                '1000-frames-of-noise-encoded-with-itunes.mp3',
                3135
            ], [
                '1000-frames-of-noise-encoded-with-soundbooth-and-tagged-with-vlc.mp3',
                2088
            ], [
                '1000-frames-of-noise-encoded-with-soundbooth.mp3',
                2088
            ], [
                '1000-frames-of-noise-encoded-with-toast-and-tagged-with-vlc.flac',
                3828
            ], [
                '1000-frames-of-noise-encoded-with-toast.flac',
                3828
            ]
        ], function (filename, byteLength) {

            it('should strip the metadata tags from the file', function (done) {
                var btLngth = 0,
                    readable = createReadStream('test/fixtures/' + filename, {
                        highWaterMark: 128
                    }),
                    stripStream = metadataDetector.createStripStream();

                readable
                    .pipe(stripStream)
                    .on('data', function (data) {
                        btLngth += data.length;
                    })
                    .on('error', function (err) {
                        done(err);
                    })
                    .on('finish', function () {
                        expect(btLngth).to.equal(byteLength);

                        done();
                    });
            });

        });

    });

});
