import * as metadataDetector from '../../src/module';
import lengthsData from '../fixtures/lengths-data.json';
import { loadFixtureAsArrayBuffer } from '../helper/load-fixture';
import locationsData from '../fixtures/locations-data.json';

describe('metadata-detector', () => {
    describe('locate()', () => {
        leche.withData(locationsData, (filename, locations) => {
            let arrayBuffer;

            beforeEach(async () => {
                arrayBuffer = await loadFixtureAsArrayBuffer(filename);
            });

            it('should locate the metadata tags of the file', async () => {
                const detectedLocations = await metadataDetector.locate(arrayBuffer);

                expect(detectedLocations).to.deep.equal(locations);
            });
        });
    });

    describe('strip()', () => {
        leche.withData(lengthsData, (filename, byteLength) => {
            let arrayBuffer;

            beforeEach(async () => {
                arrayBuffer = await loadFixtureAsArrayBuffer(filename);
            });

            it('should strip the metadata tags from the file', async () => {
                const strippedArrayBuffer = await metadataDetector.strip(arrayBuffer);

                expect(strippedArrayBuffer.byteLength).to.equal(byteLength);
            });
        });
    });
});
