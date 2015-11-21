'use strict';

var Buffer = require('buffer').Buffer,
    synchsafe = require('synchsafe'),
    Transform = require('stream').Transform,
    util = require('util'),
    Writable = require('stream').Writable;

function LocateStream (options) {
    Writable.call(this, options);

    this._buffer = new Buffer(0);
    this._isFirstAnalysis = true;
    this._isLastAnalysis = false;
    this._offset = 0;
}

util.inherits(LocateStream, Writable);

LocateStream.prototype._analyzeBuffer = function () {
    if (this._isFirstAnalysis && this._buffer.length < 4) {
        return false;
    }

    if (this._isFirstAnalysis && this._buffer.toString('utf8', 0, 4) === 'fLaC') {
        let isLast = false,
            length = 0,
            offset = 4;

        while (!isLast) {
            offset += length;

            if (this._buffer.length < offset + 4) {
                return false;
            }

            /* jshint bitwise: false */
            isLast = ((this._buffer.readUInt8(offset + 0) & 0x80) !== 0);
            length = ((this._buffer.readUInt8(offset + 3) | (this._buffer.readUInt8(offset + 2) << 8) | (this._buffer.readUInt8(offset + 1) << 16)) + 4);
            /* jshint bitwise: true */
        }

        this.emit('location', [
            0,
            offset + length
        ]);
    }

    if (this._isFirstAnalysis && this._buffer.toString('utf8', 0, 3) === 'ID3') {
        this.emit('location', [
            0,
            synchsafe.decode(this._buffer.readUInt32BE(6)) + 10
        ]);
    }

    if (this._isLastAnalysis && this._buffer.toString('utf8', this._buffer.length - 128, this._buffer.length - 125) === 'TAG') {
        this.emit('location', [
            this._offset + this._buffer.length - 128,
            this._offset + this._buffer.length
        ]);
    }

    this._isFirstAnalysis = false;

    return true;
};

LocateStream.prototype.end = function (chunk) {
    this._isLastAnalysis = true;

    if (chunk === undefined) {
        this._analyzeBuffer();
    }

    return Writable.prototype.end.apply(this, arguments);
};

LocateStream.prototype._write = function (chunk, encoding, callback) {
    this._buffer = Buffer.concat([this._buffer, chunk], this._buffer.length + chunk.length);

    if (this._analyzeBuffer()) {
        this._offset += this._buffer.length - 128;
        this._buffer = this._buffer.slice(-128);
    }

    callback();
};

function createLocateStream () {
    return new LocateStream();
}

function StripStream (options) {
    Transform.call(this, options);

    this._buffer = new Buffer(0);
    this._isFirstAnalysis = true;
    this._isLastAnalysis = false;
}

util.inherits(StripStream, Transform);

StripStream.prototype._analyzeBuffer = function () {
    if (this._isFirstAnalysis && this._buffer.length < 4) {
        return false;
    }

    if (this._isFirstAnalysis && this._buffer.toString('utf8', 0, 4) === 'fLaC') {
        let isLast = false,
            length = 0,
            offset = 4;

        while (!isLast) {
            offset += length;

            if (this._buffer.length < offset + 4) {
                return false;
            }

            /* jshint bitwise: false */
            isLast = ((this._buffer.readUInt8(offset + 0) & 0x80) !== 0);
            length = ((this._buffer.readUInt8(offset + 3) | (this._buffer.readUInt8(offset + 2) << 8) | (this._buffer.readUInt8(offset + 1) << 16)) + 4);
            /* jshint bitwise: true */
        }

        if (this._buffer.length >= offset + length) {
            this._buffer = this._buffer.slice(offset + length);
        } else {
            return false;
        }
    }

    if (this._isFirstAnalysis && this._buffer.toString('utf8', 0, 3) === 'ID3') {
        let nextByte = synchsafe.decode(this._buffer.readUInt32BE(6)) + 10;

        if (this._buffer.length >= nextByte) {
            this._buffer = this._buffer.slice(nextByte);
        } else {
            return false;
        }
    }

    if (this._isLastAnalysis && this._buffer.toString('utf8', this._buffer.length - 128, this._buffer.length - 125) === 'TAG') {
        this._buffer = this._buffer.slice(0, -128);
    }

    this._isFirstAnalysis = false;

    return true;
};

StripStream.prototype._flush = function (callback) {
    this._isLastAnalysis = true;

    this._analyzeBuffer();

    this.push(this._buffer);

    callback(null);
};

StripStream.prototype._transform = function (chunk, encoding, callback) {
    this._buffer = Buffer.concat([this._buffer, chunk], this._buffer.length + chunk.length);

    if (this._analyzeBuffer()) {
        this.push(this._buffer.slice(0, -128));
        this._buffer = this._buffer.slice(-128);
    }

    callback();
};

function createStripStream () {
    return new StripStream();
}

module.exports.createLocateStream = createLocateStream;

module.exports.createStripStream = createStripStream;
