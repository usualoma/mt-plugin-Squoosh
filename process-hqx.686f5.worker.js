self.webpackChunk([0],{22:function(n,t,r){"use strict";r.r(t);var e=r(7);let u=null;function f(){return null!==u&&u.buffer===e.c.buffer||(u=new Uint32Array(e.c.buffer)),u}let c=0;let a=null;function i(n,t,r,u){e.d(8,function(n){const t=e.b(4*n.length);return f().set(n,t/4),c=n.length,t}(n),c,t,r,u);const i=(null!==a&&a.buffer===e.c.buffer||(a=new Int32Array(e.c.buffer)),a),l=function(n,t){return f().subarray(n/4,n/4+t)}(i[2],i[3]).slice();return e.a(i[2],4*i[3]),l}async function l(n,t){const r=n,e=i(new Uint32Array(r.data.buffer),r.width,r.height,t.factor);return new ImageData(new Uint8ClampedArray(e.buffer),n.width*t.factor,n.height*t.factor)}r.d(t,"hqx",function(){return l})},7:function(n,t,r){"use strict";var e=r.w[n.i];n.exports=e,e.e()}});
//# sourceMappingURL=process-hqx.686f5.worker.js.map