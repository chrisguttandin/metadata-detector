# metadata-detector

**A simple tool to locate and strip metadata from files.**

[![dependencies](https://img.shields.io/david/chrisguttandin/metadata-detector.svg?style=flat-square)](https://www.npmjs.com/package/metadata-detector)
[![version](https://img.shields.io/npm/v/metadata-detector.svg?style=flat-square)](https://www.npmjs.com/package/metadata-detector)

This module is currently capable of handling [ID3](http://id3.org/Home) tags within MP3s and
metadata of FLAC files as described in the official
[FLAC format specification](http://xiph.org/flac/format.html). It can also parse
[Vorbis Comments](https://xiph.org/vorbis/doc/v-comment.html) within
[OGG Containers](https://xiph.org/ogg). In addition to that it can also parse MPEG-4 files which are
nicely explained on the homepage of [AtomicParsley](http://atomicparsley.sourceforge.net).
