import * as lengthsData from '../fixtures/lengths-data.json';
import * as locationsData from '../fixtures/locations-data.json';
import * as metadataDetector from '../../src/module';
import { loadFixtureAsArrayBuffer } from '../helper/load-fixture';

describe('metadata-detector', () => {

    describe('locate()', () => {

        leche.withData(locationsData, (filename, locations) => {

            it('should locate the metadata tags of the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    metadataDetector
                        .locate(arrayBuffer)
                        .then((lctns) => {
                            expect(lctns).to.deep.equal(locations);

                            done();
                        });
                });
            });

        });

    });

    describe('strip()', () => {

        leche.withData(lengthsData, (filename, byteLength) => {

            it('should strip the metadata tags from the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    metadataDetector
                        .strip(arrayBuffer)
                        .then((arrayBuffer) => {
                            expect(arrayBuffer.byteLength).to.equal(byteLength);

                            done();
                        });
                });
            });

        });

    });

});
