// This is the minified and stringified code of the metadata-detector-worker package.
export const worker = `(()=>{var e=[function(e,t){!function(e){"use strict";var t=function(e){for(var t=2130706432,r=0;0!==t;)r>>=1,r|=e&t,t>>=8;return r},r=function(e){for(var t,r=127,n=e;2147483647^r;)t=n&~r,t<<=1,t|=n&r,r=(r+1<<8)-1,n=t;return t};e.decode=t,e.encode=r}(t)}],t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}(()=>{"use strict";var e=r(0);let t=null;const n=e=>"TextDecoder"in self?(null===t&&(t=new TextDecoder),t.decode(e)):String.fromCharCode.apply(null,new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),a=t=>{const r=[];let a=new DataView(t,0,4);if("fLaC"===n(a)){let e=!1,n=0,i=4;for(;!e;)i+=n,a=new DataView(t,i,4),e=!!(128&a.getUint8(0)),n=4+(a.getUint8(3)|a.getUint8(2)<<8|a.getUint8(1)<<16);r.push([0,i+n])}if(a=new DataView(t,4,4),"ftyp"===n(a)){let e=0;for(;e<t.byteLength;){a=new DataView(t,e,4);const i=a.getUint32(0);a=new DataView(t,e+4,4);const s=n(a);"moov"!==s&&"wide"!==s||r.push([e,e+i]),e+=i}}if(a=new DataView(t,0,3),"ID3"===n(a)&&(a=new DataView(t,6,4),r.push([0,(0,e.decode)(a.getUint32(0))+10])),a=new DataView(t,0,4),"OggS"===n(a)){let e=0;a=new DataView(t,4,1);const i=a.getUint8(0);for(;0===i&&e<t.byteLength;){a=new DataView(t,e+5,22);const i=a.getUint8(21);a=new DataView(t,e+27,i+1);let s=27+i;for(let e=0;e<i;e+=1)s+=a.getUint8(e);if(3===a.getUint8(i)){a=new DataView(t,e+27+i+1,6);"vorbis"===n(a)&&r.push([e,e+s])}e+=s}}return a=new DataView(t,t.byteLength-128,3),"TAG"===n(a)&&r.push([t.byteLength-128,t.byteLength]),r},i=e=>{const t=a(e);let r=0,n=e;return t.forEach((([e,t])=>{n=e===r?n.slice(t,n.byteLength):t-r===n.byteLength?n.slice(0,e-r):((...e)=>e.reduce((({array:e,offset:t},r)=>(e.set(new Uint8Array(r),t),{array:e,offset:t+r.byteLength})),{array:new Uint8Array(e.reduce(((e,t)=>e+t.byteLength),0)),offset:0}).array.buffer)(n.slice(0,e-r),n.slice(t-r,n.byteLength)),r+=t-e})),n};addEventListener("message",(({data:e})=>{try{if("locate"===e.method){const{id:t,params:{arrayBuffer:r}}=e,n=a(r);postMessage({error:null,id:t,result:{locations:n}})}else if("strip"===e.method){const{id:t,params:{arrayBuffer:r}}=e,n=i(r);postMessage({error:null,id:t,result:{arrayBuffer:n}},[n])}}catch(t){postMessage({error:{message:t.message},id:e.id,result:null})}}))})()})();`; // tslint:disable-line:max-line-length
