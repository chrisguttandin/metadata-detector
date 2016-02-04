'use strict';

module.exports = function loadFixture(fixture, callback) {
    var request = new XMLHttpRequest(); // eslint-disable-line no-undef

    request.onerror = function () {
        callback('request-failed');
    };
    request.onload = function (event) {
        callback(null, event.target.response);
    };
    request.open('GET', 'base/test/fixtures/' + fixture);
    request.responseType = 'arraybuffer';
    request.send();
};
