const base64ToArrayBuffer = (encodedData) => {
    const decodedData = atob(encodedData.replace(/\s/g, ''));
    const uint8Array = new Uint8Array(decodedData.length);

    Array.prototype.forEach.call(uint8Array, (value, index) => {
        uint8Array[index] = decodedData.charCodeAt(index);
    });

    return uint8Array.buffer;
};

export const loadFixtureAsArrayBuffer = (fixture, callback) => {
    const request = new XMLHttpRequest();

    request.onerror = function () {
        callback('request-failed');
    };
    request.onload = function (event) {
        if (fixture.slice(-4) === '.txt') {
            callback(null, base64ToArrayBuffer(event.target.response));
        } else {
            callback(null, event.target.response);
        }
    };
    request.open('GET', 'base/test/fixtures/' + fixture);

    if (fixture.slice(-4) !== '.txt') {
        request.responseType = 'arraybuffer';
    }

    request.send();
};
