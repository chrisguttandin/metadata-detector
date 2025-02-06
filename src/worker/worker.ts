// This is the minified and stringified code of the metadata-detector-worker package.
export const worker = `(()=>{var e={455:function(e,t){!function(e){"use strict";var t=function(e){return function(t){var r=e(t);return t.add(r),r}},r=function(e){return function(t,r){return e.set(t,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,a=536870912,o=2*a,s=function(e,t){return function(r){var s=t.get(r),i=void 0===s?r.size:s<o?s+1:0;if(!r.has(i))return e(r,i);if(r.size<a){for(;r.has(i);)i=Math.floor(Math.random()*o);return e(r,i)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(i);)i=Math.floor(Math.random()*n);return e(r,i)}},i=new WeakMap,u=r(i),c=s(u,i),f=t(c);e.addUniqueNumber=f,e.generateUniqueNumber=c}(t)},0:function(e,t){!function(e){"use strict";var t=function(e){for(var t=2130706432,r=0;0!==t;)r>>=1,r|=e&t,t>>=8;return r},r=function(e){for(var t,r=127,n=e;2147483647^r;)t=n&~r,t<<=1,t|=n&r,r=(r+1<<8)-1,n=t;return t};e.decode=t,e.encode=r}(t)}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(()=>{"use strict";const e=-32603,t=-32602,n=-32601,a=(e,t)=>Object.assign(new Error(e),{status:t}),o=t=>a('The handler of the method called "'.concat(t,'" returned an unexpected result.'),e),s=(t,r)=>async({data:{id:s,method:i,params:u}})=>{const c=r[i];try{if(void 0===c)throw(e=>a('The requested method called "'.concat(e,'" is not supported.'),n))(i);const r=void 0===u?c():c(u);if(void 0===r)throw(t=>a('The handler of the method called "'.concat(t,'" returned no required result.'),e))(i);const f=r instanceof Promise?await r:r;if(null===s){if(void 0!==f.result)throw o(i)}else{if(void 0===f.result)throw o(i);const{result:e,transferables:r=[]}=f;t.postMessage({id:s,result:e},r)}}catch(e){const{message:r,status:n=-32603}=e;t.postMessage({error:{code:n,message:r},id:s})}};var i=r(455);const u=new Map,c=(e,r,n)=>({...r,connect:({port:t})=>{t.start();const n=e(t,r),a=(0,i.generateUniqueNumber)(u);return u.set(a,(()=>{n(),t.close(),u.delete(a)})),{result:a}},disconnect:({portId:e})=>{const r=u.get(e);if(void 0===r)throw(e=>a('The specified parameter called "portId" with the given value "'.concat(e,'" does not identify a port connected to this worker.'),t))(e);return r(),{result:null}},isSupported:async()=>{if(await new Promise((e=>{const t=new ArrayBuffer(0),{port1:r,port2:n}=new MessageChannel;r.onmessage=({data:t})=>e(null!==t),n.postMessage(t,[t])}))){const e=n();return{result:e instanceof Promise?await e:e}}return{result:!1}}}),f=(e,t,r=()=>!0)=>{const n=c(f,t,r),a=s(e,n);return e.addEventListener("message",a),()=>e.removeEventListener("message",a)};var l=r(0);let d=null;const h=e=>"TextDecoder"in self?(null===d&&(d=new TextDecoder),d.decode(e)):String.fromCharCode.apply(null,new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),w=e=>{const t=[];let r=new DataView(e,0,4);if("fLaC"===h(r)){let n=!1,a=0,o=4;for(;!n;)o+=a,r=new DataView(e,o,4),n=!!(128&r.getUint8(0)),a=4+(r.getUint8(3)|r.getUint8(2)<<8|r.getUint8(1)<<16);t.push([0,o+a])}if(r=new DataView(e,4,4),"ftyp"===h(r)){let n=0;for(;n<e.byteLength;){r=new DataView(e,n,4);const a=r.getUint32(0);r=new DataView(e,n+4,4);const o=h(r);"moov"!==o&&"wide"!==o||t.push([n,n+a]),n+=a}}if(r=new DataView(e,0,3),"ID3"===h(r)&&(r=new DataView(e,6,4),t.push([0,(0,l.decode)(r.getUint32(0))+10])),r=new DataView(e,0,4),"OggS"===h(r)){let n=0;r=new DataView(e,4,1);const a=r.getUint8(0);for(;0===a&&n<e.byteLength;){r=new DataView(e,n+5,22);const a=r.getUint8(21);r=new DataView(e,n+27,a+1);let o=27+a;for(let e=0;e<a;e+=1)o+=r.getUint8(e);if(3===r.getUint8(a)){r=new DataView(e,n+27+a+1,6);"vorbis"===h(r)&&t.push([n,n+o])}n+=o}}return r=new DataView(e,e.byteLength-128,3),"TAG"===h(r)&&t.push([e.byteLength-128,e.byteLength]),t},g=e=>{const t=w(e);let r=0,n=e;return t.forEach((([e,t])=>{n=e===r?n.slice(t,n.byteLength):t-r===n.byteLength?n.slice(0,e-r):((...e)=>e.reduce((({array:e,offset:t},r)=>(e.set(new Uint8Array(r),t),{array:e,offset:t+r.byteLength})),{array:new Uint8Array(e.reduce(((e,t)=>e+t.byteLength),0)),offset:0}).array.buffer)(n.slice(0,e-r),n.slice(t-r,n.byteLength)),r+=t-e})),n};f(self,{locate:({arrayBuffer:e})=>({result:w(e)}),strip:({arrayBuffer:e})=>{const t=g(e);return{result:t,transferables:[t]}}})})()})();`; // tslint:disable-line:max-line-length
