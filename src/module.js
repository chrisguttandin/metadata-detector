'use strict';

var synchsafe = require('synchsafe');

function locate(arrayBuffer) {
    var dataView,
        locations,
        textEncoder;

    locations = [];
    textEncoder = new TextDecoder('utf-8');

    dataView = new DataView(arrayBuffer, 0, 3);

    if (textEncoder.decode(dataView) === 'ID3') {
        dataView = new DataView(arrayBuffer, 6, 4);

        locations.push([
            0,
            synchsafe.decode(dataView.getUint32(0)) + 10
        ]);
    }

    dataView = new DataView(arrayBuffer, arrayBuffer.byteLength - 128, 3);

    if (textEncoder.decode(dataView) === 'TAG') {
        locations.push([
            arrayBuffer.byteLength - 128,
            arrayBuffer.byteLength
        ]);
    }

    return locations;
}

function strip(arrayBuffer) {
    var begin,
        locations,
        end;

    locations = locate(arrayBuffer);

    begin = 0;
    end = arrayBuffer.byteLength;

    locations.forEach(function (location) {
        if (location[0] === 0) {
            begin = location[1];
        }

        if (location[1] === end) {
            end = location[0];
        }
    });

    return arrayBuffer.slice(begin, end);
}

module.exports.locate = locate;

module.exports.strip = strip;
