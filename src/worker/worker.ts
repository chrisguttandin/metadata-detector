// This is the minified and stringified code of the metadata-detector-worker package.
export const worker = `!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=14)}([function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n(12);let o=null;const i=t=>"TextDecoder"in self?(null===o&&(o=new TextDecoder("utf-8")),o.decode(t)):String.fromCharCode.apply(null,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),u=t=>{const e=[];let n=new DataView(t,0,4);if("fLaC"===i(n)){let r=!1,o=0,i=4;for(;!r;)i+=o,n=new DataView(t,i,4),r=0!=(128&n.getUint8(0)),o=4+(n.getUint8(3)|n.getUint8(2)<<8|n.getUint8(1)<<16);e.push([0,i+o])}if(n=new DataView(t,4,4),"ftyp"===i(n)){let r=0;for(;r<t.byteLength;){n=new DataView(t,r,4);const o=n.getUint32(0);n=new DataView(t,r+4,4);const u=i(n);"moov"!==u&&"wide"!==u||e.push([r,r+o]),r+=o}}if(n=new DataView(t,0,3),"ID3"===i(n)&&(n=new DataView(t,6,4),e.push([0,Object(r.decode)(n.getUint32(0))+10])),n=new DataView(t,0,4),"OggS"===i(n)){let r=0;n=new DataView(t,4,1);const o=n.getUint8(0);for(;0===o&&r<t.byteLength;){n=new DataView(t,r+5,22);const o=n.getUint8(21);n=new DataView(t,r+27,o+1);let u=27+o;for(let t=0;t<o;t+=1)u+=n.getUint8(t);if(3===n.getUint8(o)){n=new DataView(t,r+27+o+1,6);"vorbis"===i(n)&&e.push([r,r+u])}r+=u}}return n=new DataView(t,t.byteLength-128,3),"TAG"===i(n)&&e.push([t.byteLength-128,t.byteLength]),e}},function(t,e,n){"use strict";n.r(e);var r=n(2);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);var i=n(3);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);var u=n(4);for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);var f=n(5);for(var o in f)"default"!==o&&function(t){n.d(e,t,(function(){return f[t]}))}(o);var a=n(6);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var c=n(7);for(var o in c)"default"!==o&&function(t){n.d(e,t,(function(){return c[t]}))}(o);var s=n(8);for(var o in s)"default"!==o&&function(t){n.d(e,t,(function(){return s[t]}))}(o)},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){"use strict";n.r(e);var r=n(10);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);var i=n(11);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o)},function(t,e){},function(t,e){},function(t,e,n){!function(t){"use strict";t.decode=function(t){for(var e=2130706432,n=0;0!==e;)n>>=1,n|=t&e,e>>=8;return n},t.encode=function(t){for(var e,n=127,r=t;0!=(2147483647^n);)e=r&~n,e<<=1,e|=r&n,n=(n+1<<8)-1,r=e;return e},Object.defineProperty(t,"__esModule",{value:!0})}(e)},function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(0);const o=t=>{const e=Object(r.a)(t);let n=0,o=t;return e.forEach(([t,e])=>{o=t===n?o.slice(e,o.byteLength):e-n===o.byteLength?o.slice(0,t-n):((...t)=>t.reduce(({array:t,offset:e},n)=>(t.set(new Uint8Array(n),e),{array:t,offset:e+n.byteLength}),{array:new Uint8Array(t.reduce((t,e)=>t+e.byteLength,0)),offset:0}).array.buffer)(o.slice(0,t-n),o.slice(e-n,o.byteLength)),n+=e-t}),o}},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n(13),i=n(1);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);var f=n(9);for(var u in f)"default"!==u&&function(t){n.d(e,t,(function(){return f[t]}))}(u);addEventListener("message",({data:t})=>{try{if("locate"===t.method){const{id:e,params:{arrayBuffer:n}}=t,o=Object(r.a)(n);postMessage({error:null,id:e,result:{locations:o}})}else if("strip"===t.method){const{id:e,params:{arrayBuffer:n}}=t,r=Object(o.a)(n);postMessage({error:null,id:e,result:{arrayBuffer:r}},[r])}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}})}]);`; // tslint:disable-line:max-line-length
