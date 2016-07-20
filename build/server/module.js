'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createStripStream = exports.createLocateStream = undefined;

var _stream = require('stream');

var _buffer = require('buffer');

var _synchsafe = require('synchsafe');

var _synchsafe2 = _interopRequireDefault(_synchsafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocateStream extends _stream.Writable {

    constructor(options) {
        super(options);

        this._buffer = new _buffer.Buffer(0);
        this._isFirstAnalysis = true;
        this._isLastAnalysis = false;
        this._nextMpeg4AtomStart = 0;
        this._nextOggPageStart = 0;
        this._offset = 0;
    }

    _analyzeBuffer() {
        if (this._isFirstAnalysis && this._buffer.length < 8) {
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

                /* eslint-disable no-bitwise */
                isLast = (this._buffer.readUInt8(offset) & 0x80) !== 0;
                length = (this._buffer.readUInt8(offset + 3) | this._buffer.readUInt8(offset + 2) << 8 | this._buffer.readUInt8(offset + 1) << 16) + 4;
                /* eslint-enable no-bitwise */
            }

            this.emit('location', [0, offset + length]);
        }

        if (this._isFirstAnalysis && this._buffer.toString('utf8', 4, 8) === 'ftyp' || this._nextMpeg4AtomStart > 0) {
            let offset = this._nextMpeg4AtomStart - this._offset;

            while (this._buffer.length > offset + 8) {
                let atom, length;

                length = this._buffer.readUInt32BE(offset);
                atom = this._buffer.toString('utf8', offset + 4, offset + 8);

                if (atom === 'moov' || atom === 'wide') {
                    this.emit('location', [this._nextMpeg4AtomStart, this._nextMpeg4AtomStart + length]);
                }

                this._nextMpeg4AtomStart += length;
                offset += length;
            }

            if (this._buffer.length - 8 < offset) {
                return false;
            }
        }

        if (this._isFirstAnalysis && this._buffer.toString('utf8', 0, 3) === 'ID3') {
            this.emit('location', [0, _synchsafe2.default.decode(this._buffer.readUInt32BE(6)) + 10]);
        }

        if (this._offset + this._buffer.length > this._nextOggPageStart + 4) {
            let offset = this._nextOggPageStart - this._offset;

            if (this._buffer.toString('utf8', offset, offset + 4) === 'OggS') {
                let streamStructureVersion;

                if (this._offset + this._buffer.length < this._nextOggPageStart + 27) {
                    return false;
                }

                streamStructureVersion = this._buffer.readUInt8(offset + 4);

                if (streamStructureVersion === 0) {
                    let firstByte, pageSegments, pageSize;

                    pageSegments = this._buffer.readUInt8(offset + 26);
                    pageSize = 27 + pageSegments;

                    if (this._offset + this._buffer.length < this._nextOggPageStart + 28 + pageSegments + 1 + 6) {
                        return false;
                    }

                    for (let i = 0; i < pageSegments; i += 1) {
                        pageSize += this._buffer.readUInt8(offset + 27 + i);
                    }

                    firstByte = this._buffer.readUInt8(offset + 27 + pageSegments);

                    if (firstByte === 3) {
                        let identifier = this._buffer.toString('utf8', offset + 27 + pageSegments + 1, offset + 27 + pageSegments + 1 + 6);

                        if (identifier === 'vorbis') {
                            this.emit('location', [offset, offset + pageSize]);
                        }
                    }

                    this._nextOggPageStart += pageSize;
                }
            }
        } else {
            return false;
        }

        if (this._isLastAnalysis && this._buffer.toString('utf8', this._buffer.length - 128, this._buffer.length - 125) === 'TAG') {
            this.emit('location', [this._offset + this._buffer.length - 128, this._offset + this._buffer.length]);
        }

        this._isFirstAnalysis = false;

        return true;
    }

    end(chunk, encoding, callback) {
        this._isLastAnalysis = true;

        if (chunk === undefined) {
            this._analyzeBuffer();
        }

        return super.end(chunk, encoding, callback);
    }

    _write(chunk, encoding, callback) {
        this._buffer = _buffer.Buffer.concat([this._buffer, chunk], this._buffer.length + chunk.length);

        if (this._analyzeBuffer()) {
            this._offset += this._buffer.length - 128;
            this._buffer = this._buffer.slice(-128);
        }

        callback();
    }

}

const createLocateStream = exports.createLocateStream = () => new LocateStream();

class StripStream extends _stream.Transform {

    constructor(options) {
        super(options);

        this._buffer = new _buffer.Buffer(0);
        this._isFirstAnalysis = true;
        this._isLastAnalysis = false;
        this._nextMpeg4AtomStart = 0;
        this._nextOggPageStart = 0;
        this._offset = 0;
    }

    _analyzeBuffer() {
        if (this._isFirstAnalysis && this._buffer.length < 8) {
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

                /* eslint-disable no-bitwise */
                isLast = (this._buffer.readUInt8(offset) & 0x80) !== 0;
                length = (this._buffer.readUInt8(offset + 3) | this._buffer.readUInt8(offset + 2) << 8 | this._buffer.readUInt8(offset + 1) << 16) + 4;
                /* eslint-enable no-bitwise */
            }

            if (this._buffer.length >= offset + length) {
                this._buffer = this._buffer.slice(offset + length);
            } else {
                return false;
            }
        }

        if (this._isFirstAnalysis && this._buffer.toString('utf8', 4, 8) === 'ftyp' || this._nextMpeg4AtomStart > 0) {
            let offset = this._nextMpeg4AtomStart - this._offset;

            while (this._buffer.length > offset + 8) {
                let atom, length;

                length = this._buffer.readUInt32BE(offset);
                atom = this._buffer.toString('utf8', offset + 4, offset + 8);

                if (atom === 'moov' || atom === 'wide') {
                    if (this._buffer.length >= offset + length) {
                        this._buffer = _buffer.Buffer.concat([this._buffer.slice(0, offset), this._buffer.slice(offset + length)], this._buffer.length - length);
                    } else {
                        return false;
                    }
                } else {
                    this._nextMpeg4AtomStart += length;
                    offset += length;
                }
            }

            if (this._buffer.length - 8 > offset) {
                return false;
            } else {
                return true;
            }
        }

        if (this._isFirstAnalysis && this._buffer.toString('utf8', 0, 3) === 'ID3') {
            let nextByte = _synchsafe2.default.decode(this._buffer.readUInt32BE(6)) + 10;

            if (this._buffer.length >= nextByte) {
                this._buffer = this._buffer.slice(nextByte);
            } else {
                return false;
            }
        }

        if (this._offset + this._buffer.length > this._nextOggPageStart + 4) {
            let offset = this._nextOggPageStart - this._offset;

            if (this._buffer.toString('utf8', offset, offset + 4) === 'OggS') {
                let streamStructureVersion;

                if (this._offset + this._buffer.length < this._nextOggPageStart + 27) {
                    return false;
                }

                streamStructureVersion = this._buffer.readUInt8(offset + 4);

                if (streamStructureVersion === 0) {
                    let firstByte, identifier, pageSegments, pageSize;

                    pageSegments = this._buffer.readUInt8(offset + 26);
                    pageSize = 27 + pageSegments;

                    if (this._offset + this._buffer.length < this._nextOggPageStart + 28 + pageSegments + 1 + 6) {
                        return false;
                    }

                    for (let i = 0; i < pageSegments; i += 1) {
                        pageSize += this._buffer.readUInt8(offset + 27 + i);
                    }

                    firstByte = this._buffer.readUInt8(offset + 27 + pageSegments);
                    identifier = this._buffer.toString('utf8', offset + 27 + pageSegments + 1, offset + 27 + pageSegments + 1 + 6);

                    if (firstByte === 3 && identifier === 'vorbis') {
                        if (this._offset + this._buffer.length < this._nextOggPageStart + pageSize) {
                            return false;
                        }

                        this._buffer = _buffer.Buffer.concat([this._buffer.slice(0, this._nextOggPageStart - this._offset), this._buffer.slice(this._nextOggPageStart + pageSize - this._offset)], this._buffer.length - pageSize);

                        this._nextOggPageStart += pageSize;
                    } else {
                        this._nextOggPageStart += pageSize;
                    }
                }
            }
        } else {
            return false;
        }

        if (this._isLastAnalysis && this._buffer.toString('utf8', this._buffer.length - 128, this._buffer.length - 125) === 'TAG') {
            this._buffer = this._buffer.slice(0, -128);
        }

        this._isFirstAnalysis = false;

        return true;
    }

    _flush(callback) {
        this._isLastAnalysis = true;

        this._analyzeBuffer();

        this.push(this._buffer);

        callback(null);
    }

    _transform(chunk, encoding, callback) {
        this._buffer = _buffer.Buffer.concat([this._buffer, chunk], this._buffer.length + chunk.length);

        if (this._analyzeBuffer()) {
            let offset = Math.min(this._buffer.length, 128);

            this.push(this._buffer.slice(0, -offset));
            this._offset += this._buffer.length - offset;
            this._buffer = this._buffer.slice(-offset);
        }

        callback();
    }

}

const createStripStream = exports.createStripStream = () => new StripStream();
