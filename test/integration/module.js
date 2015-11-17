'use strict';

var loadFixture = require('../helper/load-fixture.js'),
    metadataDetector = require('../../src/module.js');

describe('metadata-detector', function () {

    describe('locate()', function () {

        leche.withData([
            [
                '1000-frames-of-noise-encoded-and-tagged-with-itunes.mp3',
                [
                    [ 0, 2129 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg-and-tagged-with-vlc.flac',
                [
                    [ 0, 8376 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg-and-tagged-with-vlc.mp3',
                [
                    [ 0, 4928 ],
                    [ 8061, 8189 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg.flac',
                [
                    [ 0, 8376 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-ffmpeg.mp3',
                [
                    [ 0, 3870 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-itunes-and-tagged-with-mp3tag.mp3',
                [
                    [ 0, 2129 ],
                    [ 5264, 5392 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-itunes-and-tagged-with-vlc.mp3',
                [
                    [ 0, 2129 ],
                    [ 5264, 5392 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-itunes.mp3',
                [
                    [ 0, 2129 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-soundbooth-and-tagged-with-vlc.mp3',
                [
                    [ 0, 6471 ],
                    [ 8559, 8687 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-soundbooth.mp3',
                [
                    [ 0, 5370 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-toast-and-tagged-with-vlc.flac',
                [
                    [ 0, 4233 ]
                ]
            ], [
                '1000-frames-of-noise-encoded-with-toast.flac',
                [
                    [ 0, 4233 ]
                ]
            ]
        ], function (filename, locations) {

            it('should strip the id3 tag from the file', function (done) {
                loadFixture(filename, function (err, arrayBuffer) {
                    expect(err).to.be.null;

                    expect(metadataDetector.locate(arrayBuffer)).to.deep.equal(locations);

                    done();
                });
            });

        });

    });

    describe('strip()', function () {

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

            it('should strip the id3 tag from file', function (done) {
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
