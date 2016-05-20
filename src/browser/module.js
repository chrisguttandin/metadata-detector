var synchsafe = require('synchsafe'),
    textDecoder = null;

function decode(dataView) {
    if ('TextDecoder' in window) { // eslint-disable-line no-undef
        if (textDecoder === null) {
            textDecoder = new TextDecoder('utf-8'); // eslint-disable-line no-undef
        }

        return textDecoder.decode(dataView);
    }

    return String.fromCharCode.apply(null, new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength));
}

function locate(arrayBuffer) {
    var dataView,
        locations;

    locations = [];

    dataView = new DataView(arrayBuffer, 0, 4);

    if (decode(dataView) === 'fLaC') {
        let isLast = false,
            length = 0,
            offset = 4;

        while (!isLast) {
            offset += length;

            dataView = new DataView(arrayBuffer, offset, 4);

            /* eslint-disable no-bitwise */
            isLast = ((dataView.getUint8(0) & 0x80) !== 0);
            length = ((dataView.getUint8(3) | (dataView.getUint8(2) << 8) | (dataView.getUint8(1) << 16)) + 4);
            /* eslint-enable no-bitwise */
        }

        locations.push([
            0,
            offset + length
        ]);
    }

    dataView = new DataView(arrayBuffer, 4, 4);

    if (decode(dataView) === 'ftyp') {
        let offset = 0;

        while (offset < arrayBuffer.byteLength) {
            let atom,
                length;

            dataView = new DataView(arrayBuffer, offset, 4);
            length = dataView.getUint32(0);

            dataView = new DataView(arrayBuffer, offset + 4, 4);
            atom = decode(dataView);

            if (atom === 'moov' || atom === 'wide') {
                locations.push([
                    offset,
                    offset + length
                ]);
            }

            offset += length;
        }
    }

    dataView = new DataView(arrayBuffer, 0, 3);

    if (decode(dataView) === 'ID3') {
        dataView = new DataView(arrayBuffer, 6, 4);

        locations.push([
            0,
            synchsafe.decode(dataView.getUint32(0)) + 10
        ]);
    }

    dataView = new DataView(arrayBuffer, 0, 4);

    if (decode(dataView) === 'OggS') {
        let offset = 0,
            streamStructureVersion;

        dataView = new DataView(arrayBuffer, 4, 1);

        streamStructureVersion = dataView.getUint8(0);

        while (streamStructureVersion === 0 && offset < arrayBuffer.byteLength) {
            let firstByte,
                pageSegments,
                pageSize;

            dataView = new DataView(arrayBuffer, offset + 5, 22);

            // @todo Make sure the headerTypeFlag is not indicating that this is the first or last
            // page. If so the surrounding pages would need to get an updated headerTypeFlag when
            // stripping the metadata.
            // headerTypeFlag = dataView.getUint8(0);
            pageSegments = dataView.getUint8(21);

            dataView = new DataView(arrayBuffer, offset + 27, pageSegments + 1);

            pageSize = 27 + pageSegments;

            for (let i = 0; i < pageSegments; i += 1) {
                pageSize += dataView.getUint8(i);
            }

            firstByte = dataView.getUint8(pageSegments);

            if (firstByte === 3) {
                let identifier;

                dataView = new DataView(arrayBuffer, offset + 27 + pageSegments + 1, 6);

                identifier = decode(dataView);

                if (identifier === 'vorbis') {
                    locations.push([
                        offset,
                        offset + pageSize
                    ]);
                }
            }

            offset += pageSize;
        }
    }

    dataView = new DataView(arrayBuffer, arrayBuffer.byteLength - 128, 3);

    if (decode(dataView) === 'TAG') {
        locations.push([
            arrayBuffer.byteLength - 128,
            arrayBuffer.byteLength
        ]);
    }

    return locations;
}

function concat(...arrayBuffers) {
    return arrayBuffers
        .reduce(({ array, offset }, arrayBuffer) => {
            array.set(new Uint8Array(arrayBuffer), offset);

            offset += arrayBuffer.byteLength;

            return { array, offset };
        }, {
            array: new Uint8Array(arrayBuffers
                .reduce((byteLength, arrayBuffer) => byteLength + arrayBuffer.byteLength, 0)),
            offset: 0
        })
        .array.buffer;
};

function strip(arrayBuffer) {
    var locations,
        offset = 0;

    locations = locate(arrayBuffer);

    locations.forEach(([begin, end]) => {
        if (begin === offset) {
            arrayBuffer = arrayBuffer.slice(end, arrayBuffer.byteLength);
        } else if (end - offset === arrayBuffer.byteLength) {
            arrayBuffer = arrayBuffer.slice(0, begin - offset);
        } else {
            arrayBuffer = concat(arrayBuffer.slice(0, begin - offset), arrayBuffer.slice(end - offset, arrayBuffer.byteLength));
        }

        offset += end - begin;
    });

    return arrayBuffer;
}

module.exports.locate = locate;

module.exports.strip = strip;
