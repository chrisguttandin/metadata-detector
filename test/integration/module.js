import * as lengthsData from '../fixtures/lengths-data.json';
import * as locationsData from '../fixtures/locations-data.json';
import * as metadataDetector from '../../src/module';
import { loadFixtureAsArrayBuffer } from '../helper/load-fixture';

describe('metadata-detector', () => {

    describe('locate()', () => {

        leche.withData(locationsData, (filename, locations) => { // eslint-disable-line no-undef

            it('should locate the metadata tags of the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    expect(metadataDetector.locate(arrayBuffer)).to.deep.equal(locations);

                    done();
                });
            });

        });

    });

    describe('strip()', () => {

        leche.withData(lengthsData, (filename, byteLength) => { // eslint-disable-line no-undef

            it('should strip the metadata tags from the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    arrayBuffer = metadataDetector.strip(arrayBuffer);

                    expect(arrayBuffer.byteLength).to.equal(byteLength);

                    done();
                });
            });

        });

    });

});
