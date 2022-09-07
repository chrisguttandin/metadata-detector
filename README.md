# metadata-detector

**A tool to locate and strip metadata from files.**

[![version](https://img.shields.io/npm/v/metadata-detector.svg?style=flat-square)](https://www.npmjs.com/package/metadata-detector)

This package is currently capable of handling [ID3](http://id3.org/Home) tags within MP3s and metadata of FLAC files as described in the official [FLAC format specification](http://xiph.org/flac/format.html). It can also parse [Vorbis Comments](https://xiph.org/vorbis/doc/v-comment.html) within [OGG Containers](https://xiph.org/ogg). In addition to that it can also parse MPEG-4 files which are nicely explained on the homepage of [AtomicParsley](http://atomicparsley.sourceforge.net).

## Usage

This package is intended to be used in the browser. Please take a look at [`metadata-detector-streams`](https://github.com/chrisguttandin/metadata-detector-streams) if you look for a package that works with Node.js.

`metadata-detector` is available as a package on npm. You can use the following command to install it:

```shell
npm install metadata-detector
```

The package exports two functions to locate and to strip metadata from a given ArrayBuffer.

### locate(arrayBuffer)

```typescript
locate(arrayBuffer: ArrayBuffer) => Promise<[number, number][]>;
```

`locate()` can be used to find metadata within a given ArrayBuffer. It will return an array of tuples. Each tuple consists of two numbers. Those numbers are byte offsets. The first number is the start of the metadata and the second number marks the end.

```js
import { locate } from 'metadata-detector';

const detectedLocations = await locate(arrayBuffer);
// [
//     [28, 36],
//     [1290, 2124]
//  ]
```

### strip(arrayBuffer)

```typescript
strip(arrayBuffer: ArrayBuffer) => Promise<ArrayBuffer>;
```

`strip()` can be used to remove the metadata from a given ArrayBuffer. It will return a new ArrayBuffer without all the detected metadata.

```js
import { strip } from 'metadata-detector';

const strippedArrayBuffer = await strip(arrayBuffer);
// ArrayBuffer
```
