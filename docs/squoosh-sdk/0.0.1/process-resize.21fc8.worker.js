self.webpackChunk([4],{21:function(t,n,e){"use strict";e.r(n);var r=e(8);let i=null;function u(){return null!==i&&i.buffer===r.c.buffer||(i=new Uint8Array(r.c.buffer)),i}let f=0;let c=null;function s(t,n,e,i,s,a,o,h){r.d(8,function(t){const n=r.b(1*t.length);return u().set(t,n/1),f=t.length,n}(t),f,n,e,i,s,a,o,h);const l=(null!==c&&c.buffer===r.c.buffer||(c=new Int32Array(r.c.buffer)),c),d=function(t,n){return u().subarray(t/1,t/1+n)}(l[2],l[3]).slice();return r.a(l[2],1*l[3]),d}e.d(n,"resize",function(){return o});const a=["triangle","catrom","mitchell","lanczos3"];async function o(t,n){let e=t;if("contain"===n.fitMethod){const{sx:r,sy:i,sw:u,sh:f}=function(t,n,e,r){const i=e/r;if(i>t/n){const e=t/i;return{sw:t,sh:e,sx:0,sy:(n-e)/2}}const u=n*i;return{sh:n,sw:u,sx:(t-u)/2,sy:0}}(t.width,t.height,n.width,n.height);e=function(t,n,e,r,i){const u=new Uint32Array(t.data.buffer);for(let f=0;f<i;f+=1){const i=(f+e)*t.width+n;u.copyWithin(f*r,i,i+r)}return new ImageData(new Uint8ClampedArray(u.buffer.slice(0,r*i*4)),r,i)}(e,Math.round(r),Math.round(i),Math.round(u),Math.round(f))}const r=s(new Uint8Array(e.data.buffer),e.width,e.height,n.width,n.height,a.indexOf(n.method),n.premultiply,n.linearRGB);return new ImageData(new Uint8ClampedArray(r.buffer),n.width,n.height)}},8:function(t,n,e){"use strict";var r=e.w[t.i];t.exports=r,r.e()}});
//# sourceMappingURL=process-resize.21fc8.worker.js.map