import {
  BaseWallet,
  BridgeTokenRepository,
  Staking,
  Tx,
  assertSafeHttpUrl,
  checkDeployed,
  ensureWalletReady,
  getStakingPreset,
  preflightTransaction,
  sepoliaTokens,
  sponsoredDetails
} from "./chunk-MXWUSOZN.mjs";
import "./chunk-FMBTOKMI.mjs";
import "./chunk-IX2XH525.mjs";
import "./chunk-VP7WVUCP.mjs";
import {
  Amount,
  ChainId,
  OnboardStrategy,
  fromAddress,
  getChainId
} from "./chunk-XZWI72IE.mjs";
import {
  __commonJS,
  __publicField,
  __require,
  __toESM
} from "./chunk-TJFISUBQ.mjs";

// ../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/_assert.js
var require_assert = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/_assert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.anumber = anumber;
    exports.number = anumber;
    exports.abytes = abytes;
    exports.bytes = abytes;
    exports.ahash = ahash;
    exports.aexists = aexists;
    exports.aoutput = aoutput;
    function anumber(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function abytes(b, ...lengths) {
      if (!isBytes(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.wrapConstructor");
      anumber(h.outputLen);
      anumber(h.blockLen);
    }
    function aexists(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function aoutput(out, instance) {
      abytes(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least " + min);
      }
    }
    var assert = {
      number: anumber,
      bytes: abytes,
      hash: ahash,
      exists: aexists,
      output: aoutput
    };
    exports.default = assert;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/_u64.js
var require_u64 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/_u64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.add5L = exports.add5H = exports.add4H = exports.add4L = exports.add3H = exports.add3L = exports.rotlBL = exports.rotlBH = exports.rotlSL = exports.rotlSH = exports.rotr32L = exports.rotr32H = exports.rotrBL = exports.rotrBH = exports.rotrSL = exports.rotrSH = exports.shrSL = exports.shrSH = exports.toBig = void 0;
    exports.fromBig = fromBig;
    exports.split = split;
    exports.add = add;
    var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    var _32n = /* @__PURE__ */ BigInt(32);
    function fromBig(n, le = false) {
      if (le)
        return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
      return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
    }
    function split(lst, le = false) {
      let Ah = new Uint32Array(lst.length);
      let Al = new Uint32Array(lst.length);
      for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
      }
      return [Ah, Al];
    }
    var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
    exports.toBig = toBig;
    var shrSH = (h, _l, s) => h >>> s;
    exports.shrSH = shrSH;
    var shrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports.shrSL = shrSL;
    var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
    exports.rotrSH = rotrSH;
    var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports.rotrSL = rotrSL;
    var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
    exports.rotrBH = rotrBH;
    var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
    exports.rotrBL = rotrBL;
    var rotr32H = (_h, l) => l;
    exports.rotr32H = rotr32H;
    var rotr32L = (h, _l) => h;
    exports.rotr32L = rotr32L;
    var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    exports.rotlSH = rotlSH;
    var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    exports.rotlSL = rotlSL;
    var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    exports.rotlBH = rotlBH;
    var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
    exports.rotlBL = rotlBL;
    function add(Ah, Al, Bh, Bl) {
      const l = (Al >>> 0) + (Bl >>> 0);
      return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
    }
    var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    exports.add3L = add3L;
    var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
    exports.add3H = add3H;
    var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
    exports.add4L = add4L;
    var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
    exports.add4H = add4H;
    var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
    exports.add5L = add5L;
    var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
    exports.add5H = add5H;
    var u64 = {
      fromBig,
      split,
      toBig,
      shrSH,
      shrSL,
      rotrSH,
      rotrSL,
      rotrBH,
      rotrBL,
      rotr32H,
      rotr32L,
      rotlSH,
      rotlSL,
      rotlBH,
      rotlBL,
      add,
      add3L,
      add3H,
      add4L,
      add4H,
      add5H,
      add5L
    };
    exports.default = u64;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/cryptoNode.js
var require_cryptoNode = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/cryptoNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crypto = void 0;
    var nc = __require("crypto");
    exports.crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : nc && typeof nc === "object" && "randomBytes" in nc ? nc : void 0;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hash = exports.nextTick = exports.byteSwapIfBE = exports.byteSwap = exports.isLE = exports.rotl = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
    exports.isBytes = isBytes;
    exports.byteSwap32 = byteSwap32;
    exports.bytesToHex = bytesToHex;
    exports.hexToBytes = hexToBytes;
    exports.asyncLoop = asyncLoop;
    exports.utf8ToBytes = utf8ToBytes;
    exports.toBytes = toBytes;
    exports.concatBytes = concatBytes;
    exports.checkOpts = checkOpts;
    exports.wrapConstructor = wrapConstructor;
    exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
    exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
    exports.randomBytes = randomBytes;
    var crypto_1 = require_cryptoNode();
    var _assert_js_1 = require_assert();
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.u8 = u8;
    var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    exports.u32 = u32;
    var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.createView = createView;
    var rotr = (word, shift) => word << 32 - shift | word >>> shift;
    exports.rotr = rotr;
    var rotl = (word, shift) => word << shift | word >>> 32 - shift >>> 0;
    exports.rotl = rotl;
    exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    exports.byteSwap = byteSwap;
    exports.byteSwapIfBE = exports.isLE ? (n) => n : (n) => (0, exports.byteSwap)(n);
    function byteSwap32(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = (0, exports.byteSwap)(arr[i]);
      }
    }
    var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      (0, _assert_js_1.abytes)(bytes);
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
      }
      return hex;
    }
    var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    var nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error("utf8ToBytes expected string, got " + typeof str);
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      (0, _assert_js_1.abytes)(data);
      return data;
    }
    function concatBytes(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        (0, _assert_js_1.abytes)(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    var Hash = class {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    };
    exports.Hash = Hash;
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    function wrapConstructor(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    function wrapConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function wrapXOFConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return crypto_1.crypto.randomBytes(bytesLength);
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/sha3.js
var require_sha3 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/sha3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shake256 = exports.shake128 = exports.keccak_512 = exports.keccak_384 = exports.keccak_256 = exports.keccak_224 = exports.sha3_512 = exports.sha3_384 = exports.sha3_256 = exports.sha3_224 = exports.Keccak = void 0;
    exports.keccakP = keccakP;
    var _assert_js_1 = require_assert();
    var _u64_js_1 = require_u64();
    var utils_js_1 = require_utils();
    var SHA3_PI = [];
    var SHA3_ROTL = [];
    var _SHA3_IOTA = [];
    var _0n = /* @__PURE__ */ BigInt(0);
    var _1n = /* @__PURE__ */ BigInt(1);
    var _2n = /* @__PURE__ */ BigInt(2);
    var _7n = /* @__PURE__ */ BigInt(7);
    var _256n = /* @__PURE__ */ BigInt(256);
    var _0x71n = /* @__PURE__ */ BigInt(113);
    for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI.push(2 * (5 * y + x));
      SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n)
          t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
      }
      _SHA3_IOTA.push(t);
    }
    var [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ (0, _u64_js_1.split)(_SHA3_IOTA, true);
    var rotlH = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBH)(h, l, s) : (0, _u64_js_1.rotlSH)(h, l, s);
    var rotlL = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBL)(h, l, s) : (0, _u64_js_1.rotlSL)(h, l, s);
    function keccakP(s, rounds = 24) {
      const B = new Uint32Array(5 * 2);
      for (let round = 24 - rounds; round < 24; round++) {
        for (let x = 0; x < 10; x++)
          B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for (let x = 0; x < 10; x += 2) {
          const idx1 = (x + 8) % 10;
          const idx0 = (x + 2) % 10;
          const B0 = B[idx0];
          const B1 = B[idx0 + 1];
          const Th = rotlH(B0, B1, 1) ^ B[idx1];
          const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
          for (let y = 0; y < 50; y += 10) {
            s[x + y] ^= Th;
            s[x + y + 1] ^= Tl;
          }
        }
        let curH = s[2];
        let curL = s[3];
        for (let t = 0; t < 24; t++) {
          const shift = SHA3_ROTL[t];
          const Th = rotlH(curH, curL, shift);
          const Tl = rotlL(curH, curL, shift);
          const PI = SHA3_PI[t];
          curH = s[PI];
          curL = s[PI + 1];
          s[PI] = Th;
          s[PI + 1] = Tl;
        }
        for (let y = 0; y < 50; y += 10) {
          for (let x = 0; x < 10; x++)
            B[x] = s[y + x];
          for (let x = 0; x < 10; x++)
            s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
      }
      B.fill(0);
    }
    var Keccak = class _Keccak extends utils_js_1.Hash {
      // NOTE: we accept arguments in bytes instead of bits here.
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        (0, _assert_js_1.anumber)(outputLen);
        if (0 >= this.blockLen || this.blockLen >= 200)
          throw new Error("Sha3 supports only keccak-f1600 function");
        this.state = new Uint8Array(200);
        this.state32 = (0, utils_js_1.u32)(this.state);
      }
      keccak() {
        if (!utils_js_1.isLE)
          (0, utils_js_1.byteSwap32)(this.state32);
        keccakP(this.state32, this.rounds);
        if (!utils_js_1.isLE)
          (0, utils_js_1.byteSwap32)(this.state32);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        (0, _assert_js_1.aexists)(this);
        const { blockLen, state } = this;
        data = (0, utils_js_1.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        (0, _assert_js_1.aexists)(this, false);
        (0, _assert_js_1.abytes)(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes) {
        (0, _assert_js_1.anumber)(bytes);
        return this.xofInto(new Uint8Array(bytes));
      }
      digestInto(out) {
        (0, _assert_js_1.aoutput)(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        this.state.fill(0);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    exports.Keccak = Keccak;
    var gen = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
    exports.sha3_224 = gen(6, 144, 224 / 8);
    exports.sha3_256 = gen(6, 136, 256 / 8);
    exports.sha3_384 = gen(6, 104, 384 / 8);
    exports.sha3_512 = gen(6, 72, 512 / 8);
    exports.keccak_224 = gen(1, 144, 224 / 8);
    exports.keccak_256 = gen(1, 136, 256 / 8);
    exports.keccak_384 = gen(1, 104, 384 / 8);
    exports.keccak_512 = gen(1, 72, 512 / 8);
    var genShake = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
    exports.shake128 = genShake(31, 168, 128 / 8);
    exports.shake256 = genShake(31, 136, 256 / 8);
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/_md.js
var require_md = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/_md.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HashMD = exports.Maj = exports.Chi = void 0;
    var _assert_js_1 = require_assert();
    var utils_js_1 = require_utils();
    function setBigUint64(view, byteOffset, value, isLE) {
      if (typeof view.setBigUint64 === "function")
        return view.setBigUint64(byteOffset, value, isLE);
      const _32n = BigInt(32);
      const _u32_max = BigInt(4294967295);
      const wh = Number(value >> _32n & _u32_max);
      const wl = Number(value & _u32_max);
      const h = isLE ? 4 : 0;
      const l = isLE ? 0 : 4;
      view.setUint32(byteOffset + h, wh, isLE);
      view.setUint32(byteOffset + l, wl, isLE);
    }
    var Chi = (a, b, c) => a & b ^ ~a & c;
    exports.Chi = Chi;
    var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
    exports.Maj = Maj;
    var HashMD = class extends utils_js_1.Hash {
      constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, utils_js_1.createView)(this.buffer);
      }
      update(data) {
        (0, _assert_js_1.aexists)(this);
        const { view, buffer, blockLen } = this;
        data = (0, utils_js_1.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          if (take === blockLen) {
            const dataView = (0, utils_js_1.createView)(data);
            for (; blockLen <= len - pos; pos += blockLen)
              this.process(dataView, pos);
            continue;
          }
          buffer.set(data.subarray(pos, pos + take), this.pos);
          this.pos += take;
          pos += take;
          if (this.pos === blockLen) {
            this.process(view, 0);
            this.pos = 0;
          }
        }
        this.length += data.length;
        this.roundClean();
        return this;
      }
      digestInto(out) {
        (0, _assert_js_1.aexists)(this);
        (0, _assert_js_1.aoutput)(out, this);
        this.finished = true;
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        buffer[pos++] = 128;
        this.buffer.subarray(pos).fill(0);
        if (this.padOffset > blockLen - pos) {
          this.process(view, 0);
          pos = 0;
        }
        for (let i = pos; i < blockLen; i++)
          buffer[i] = 0;
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, utils_js_1.createView)(out);
        const len = this.outputLen;
        if (len % 4)
          throw new Error("_sha2: outputLen should be aligned to 32bit");
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
          throw new Error("_sha2: outputLen bigger than state");
        for (let i = 0; i < outLen; i++)
          oview.setUint32(4 * i, state[i], isLE);
      }
      digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
      }
      _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen)
          to.buffer.set(buffer);
        return to;
      }
    };
    exports.HashMD = HashMD;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/sha256.js
var require_sha256 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.1/node_modules/@noble/hashes/sha256.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sha224 = exports.sha256 = exports.SHA256 = void 0;
    var _md_js_1 = require_md();
    var utils_js_1 = require_utils();
    var SHA256_K = /* @__PURE__ */ new Uint32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    var SHA256_IV = /* @__PURE__ */ new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
    var SHA256 = class extends _md_js_1.HashMD {
      constructor() {
        super(64, 32, 8, false);
        this.A = SHA256_IV[0] | 0;
        this.B = SHA256_IV[1] | 0;
        this.C = SHA256_IV[2] | 0;
        this.D = SHA256_IV[3] | 0;
        this.E = SHA256_IV[4] | 0;
        this.F = SHA256_IV[5] | 0;
        this.G = SHA256_IV[6] | 0;
        this.H = SHA256_IV[7] | 0;
      }
      get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
      }
      // prettier-ignore
      set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
      }
      process(view, offset) {
        for (let i = 0; i < 16; i++, offset += 4)
          SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
          const W15 = SHA256_W[i - 15];
          const W2 = SHA256_W[i - 2];
          const s0 = (0, utils_js_1.rotr)(W15, 7) ^ (0, utils_js_1.rotr)(W15, 18) ^ W15 >>> 3;
          const s1 = (0, utils_js_1.rotr)(W2, 17) ^ (0, utils_js_1.rotr)(W2, 19) ^ W2 >>> 10;
          SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
          const sigma1 = (0, utils_js_1.rotr)(E, 6) ^ (0, utils_js_1.rotr)(E, 11) ^ (0, utils_js_1.rotr)(E, 25);
          const T1 = H + sigma1 + (0, _md_js_1.Chi)(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
          const sigma0 = (0, utils_js_1.rotr)(A, 2) ^ (0, utils_js_1.rotr)(A, 13) ^ (0, utils_js_1.rotr)(A, 22);
          const T2 = sigma0 + (0, _md_js_1.Maj)(A, B, C) | 0;
          H = G;
          G = F;
          F = E;
          E = D + T1 | 0;
          D = C;
          C = B;
          B = A;
          A = T1 + T2 | 0;
        }
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
      }
      roundClean() {
        SHA256_W.fill(0);
      }
      destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
      }
    };
    exports.SHA256 = SHA256;
    var SHA224 = class extends SHA256 {
      constructor() {
        super();
        this.A = 3238371032 | 0;
        this.B = 914150663 | 0;
        this.C = 812702999 | 0;
        this.D = 4144912697 | 0;
        this.E = 4290775857 | 0;
        this.F = 1750603025 | 0;
        this.G = 1694076839 | 0;
        this.H = 3204075428 | 0;
        this.outputLen = 28;
      }
    };
    exports.sha256 = (0, utils_js_1.wrapConstructor)(() => new SHA256());
    exports.sha224 = (0, utils_js_1.wrapConstructor)(() => new SHA224());
  }
});

// ../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.notImplemented = exports.bitMask = void 0;
    exports.isBytes = isBytes;
    exports.abytes = abytes;
    exports.abool = abool;
    exports.bytesToHex = bytesToHex;
    exports.numberToHexUnpadded = numberToHexUnpadded;
    exports.hexToNumber = hexToNumber;
    exports.hexToBytes = hexToBytes;
    exports.bytesToNumberBE = bytesToNumberBE;
    exports.bytesToNumberLE = bytesToNumberLE;
    exports.numberToBytesBE = numberToBytesBE;
    exports.numberToBytesLE = numberToBytesLE;
    exports.numberToVarBytesBE = numberToVarBytesBE;
    exports.ensureBytes = ensureBytes;
    exports.concatBytes = concatBytes;
    exports.equalBytes = equalBytes;
    exports.utf8ToBytes = utf8ToBytes;
    exports.inRange = inRange;
    exports.aInRange = aInRange;
    exports.bitLen = bitLen;
    exports.bitGet = bitGet;
    exports.bitSet = bitSet;
    exports.createHmacDrbg = createHmacDrbg;
    exports.validateObject = validateObject;
    exports.memoized = memoized;
    var _0n = /* @__PURE__ */ BigInt(0);
    var _1n = /* @__PURE__ */ BigInt(1);
    var _2n = /* @__PURE__ */ BigInt(2);
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function abytes(item) {
      if (!isBytes(item))
        throw new Error("Uint8Array expected");
    }
    function abool(title, value) {
      if (typeof value !== "boolean")
        throw new Error(title + " boolean expected, got " + value);
    }
    var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      abytes(bytes);
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
      }
      return hex;
    }
    function numberToHexUnpadded(num2) {
      const hex = num2.toString(16);
      return hex.length & 1 ? "0" + hex : hex;
    }
    function hexToNumber(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      return hex === "" ? _0n : BigInt("0x" + hex);
    }
    var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    function bytesToNumberBE(bytes) {
      return hexToNumber(bytesToHex(bytes));
    }
    function bytesToNumberLE(bytes) {
      abytes(bytes);
      return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
    }
    function numberToBytesBE(n, len) {
      return hexToBytes(n.toString(16).padStart(len * 2, "0"));
    }
    function numberToBytesLE(n, len) {
      return numberToBytesBE(n, len).reverse();
    }
    function numberToVarBytesBE(n) {
      return hexToBytes(numberToHexUnpadded(n));
    }
    function ensureBytes(title, hex, expectedLength) {
      let res;
      if (typeof hex === "string") {
        try {
          res = hexToBytes(hex);
        } catch (e) {
          throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
        }
      } else if (isBytes(hex)) {
        res = Uint8Array.from(hex);
      } else {
        throw new Error(title + " must be hex string or Uint8Array");
      }
      const len = res.length;
      if (typeof expectedLength === "number" && len !== expectedLength)
        throw new Error(title + " of length " + expectedLength + " expected, got " + len);
      return res;
    }
    function concatBytes(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    function equalBytes(a, b) {
      if (a.length !== b.length)
        return false;
      let diff = 0;
      for (let i = 0; i < a.length; i++)
        diff |= a[i] ^ b[i];
      return diff === 0;
    }
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(str));
    }
    var isPosBig = (n) => typeof n === "bigint" && _0n <= n;
    function inRange(n, min, max) {
      return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
    }
    function aInRange(title, n, min, max) {
      if (!inRange(n, min, max))
        throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
    }
    function bitLen(n) {
      let len;
      for (len = 0; n > _0n; n >>= _1n, len += 1)
        ;
      return len;
    }
    function bitGet(n, pos) {
      return n >> BigInt(pos) & _1n;
    }
    function bitSet(n, pos, value) {
      return n | (value ? _1n : _0n) << BigInt(pos);
    }
    var bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;
    exports.bitMask = bitMask;
    var u8n = (data) => new Uint8Array(data);
    var u8fr = (arr) => Uint8Array.from(arr);
    function createHmacDrbg(hashLen, qByteLen, hmacFn) {
      if (typeof hashLen !== "number" || hashLen < 2)
        throw new Error("hashLen must be a number");
      if (typeof qByteLen !== "number" || qByteLen < 2)
        throw new Error("qByteLen must be a number");
      if (typeof hmacFn !== "function")
        throw new Error("hmacFn must be a function");
      let v = u8n(hashLen);
      let k = u8n(hashLen);
      let i = 0;
      const reset = () => {
        v.fill(1);
        k.fill(0);
        i = 0;
      };
      const h = (...b) => hmacFn(k, v, ...b);
      const reseed = (seed = u8n()) => {
        k = h(u8fr([0]), seed);
        v = h();
        if (seed.length === 0)
          return;
        k = h(u8fr([1]), seed);
        v = h();
      };
      const gen = () => {
        if (i++ >= 1e3)
          throw new Error("drbg: tried 1000 values");
        let len = 0;
        const out = [];
        while (len < qByteLen) {
          v = h();
          const sl = v.slice();
          out.push(sl);
          len += v.length;
        }
        return concatBytes(...out);
      };
      const genUntil = (seed, pred) => {
        reset();
        reseed(seed);
        let res = void 0;
        while (!(res = pred(gen())))
          reseed();
        reset();
        return res;
      };
      return genUntil;
    }
    var validatorFns = {
      bigint: (val) => typeof val === "bigint",
      function: (val) => typeof val === "function",
      boolean: (val) => typeof val === "boolean",
      string: (val) => typeof val === "string",
      stringOrUint8Array: (val) => typeof val === "string" || isBytes(val),
      isSafeInteger: (val) => Number.isSafeInteger(val),
      array: (val) => Array.isArray(val),
      field: (val, object) => object.Fp.isValid(val),
      hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
    };
    function validateObject(object, validators, optValidators = {}) {
      const checkField = (fieldName, type, isOptional) => {
        const checkVal = validatorFns[type];
        if (typeof checkVal !== "function")
          throw new Error("invalid validator function");
        const val = object[fieldName];
        if (isOptional && val === void 0)
          return;
        if (!checkVal(val, object)) {
          throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
        }
      };
      for (const [fieldName, type] of Object.entries(validators))
        checkField(fieldName, type, false);
      for (const [fieldName, type] of Object.entries(optValidators))
        checkField(fieldName, type, true);
      return object;
    }
    var notImplemented = () => {
      throw new Error("not implemented");
    };
    exports.notImplemented = notImplemented;
    function memoized(fn) {
      const map = /* @__PURE__ */ new WeakMap();
      return (arg, ...args) => {
        const val = map.get(arg);
        if (val !== void 0)
          return val;
        const computed = fn(arg, ...args);
        map.set(arg, computed);
        return computed;
      };
    }
  }
});

// ../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/modular.js
var require_modular = __commonJS({
  "../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/modular.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isNegativeLE = void 0;
    exports.mod = mod;
    exports.pow = pow;
    exports.pow2 = pow2;
    exports.invert = invert;
    exports.tonelliShanks = tonelliShanks;
    exports.FpSqrt = FpSqrt;
    exports.validateField = validateField;
    exports.FpPow = FpPow;
    exports.FpInvertBatch = FpInvertBatch;
    exports.FpDiv = FpDiv;
    exports.FpLegendre = FpLegendre;
    exports.FpIsSquare = FpIsSquare;
    exports.nLength = nLength;
    exports.Field = Field;
    exports.FpSqrtOdd = FpSqrtOdd;
    exports.FpSqrtEven = FpSqrtEven;
    exports.hashToPrivateScalar = hashToPrivateScalar;
    exports.getFieldBytesLength = getFieldBytesLength;
    exports.getMinHashLength = getMinHashLength;
    exports.mapHashToField = mapHashToField;
    var utils_js_1 = require_utils2();
    var _0n = BigInt(0);
    var _1n = BigInt(1);
    var _2n = /* @__PURE__ */ BigInt(2);
    var _3n = /* @__PURE__ */ BigInt(3);
    var _4n = /* @__PURE__ */ BigInt(4);
    var _5n = /* @__PURE__ */ BigInt(5);
    var _8n = /* @__PURE__ */ BigInt(8);
    var _9n = /* @__PURE__ */ BigInt(9);
    var _16n = /* @__PURE__ */ BigInt(16);
    function mod(a, b) {
      const result = a % b;
      return result >= _0n ? result : b + result;
    }
    function pow(num2, power, modulo) {
      if (power < _0n)
        throw new Error("invalid exponent, negatives unsupported");
      if (modulo <= _0n)
        throw new Error("invalid modulus");
      if (modulo === _1n)
        return _0n;
      let res = _1n;
      while (power > _0n) {
        if (power & _1n)
          res = res * num2 % modulo;
        num2 = num2 * num2 % modulo;
        power >>= _1n;
      }
      return res;
    }
    function pow2(x, power, modulo) {
      let res = x;
      while (power-- > _0n) {
        res *= res;
        res %= modulo;
      }
      return res;
    }
    function invert(number, modulo) {
      if (number === _0n)
        throw new Error("invert: expected non-zero number");
      if (modulo <= _0n)
        throw new Error("invert: expected positive modulus, got " + modulo);
      let a = mod(number, modulo);
      let b = modulo;
      let x = _0n, y = _1n, u = _1n, v = _0n;
      while (a !== _0n) {
        const q = b / a;
        const r = b % a;
        const m = x - u * q;
        const n = y - v * q;
        b = a, a = r, x = u, y = v, u = m, v = n;
      }
      const gcd = b;
      if (gcd !== _1n)
        throw new Error("invert: does not exist");
      return mod(x, modulo);
    }
    function tonelliShanks(P) {
      const legendreC = (P - _1n) / _2n;
      let Q, S, Z;
      for (Q = P - _1n, S = 0; Q % _2n === _0n; Q /= _2n, S++)
        ;
      for (Z = _2n; Z < P && pow(Z, legendreC, P) !== P - _1n; Z++) {
        if (Z > 1e3)
          throw new Error("Cannot find square root: likely non-prime P");
      }
      if (S === 1) {
        const p1div4 = (P + _1n) / _4n;
        return function tonelliFast(Fp, n) {
          const root = Fp.pow(n, p1div4);
          if (!Fp.eql(Fp.sqr(root), n))
            throw new Error("Cannot find square root");
          return root;
        };
      }
      const Q1div2 = (Q + _1n) / _2n;
      return function tonelliSlow(Fp, n) {
        if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE))
          throw new Error("Cannot find square root");
        let r = S;
        let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q);
        let x = Fp.pow(n, Q1div2);
        let b = Fp.pow(n, Q);
        while (!Fp.eql(b, Fp.ONE)) {
          if (Fp.eql(b, Fp.ZERO))
            return Fp.ZERO;
          let m = 1;
          for (let t2 = Fp.sqr(b); m < r; m++) {
            if (Fp.eql(t2, Fp.ONE))
              break;
            t2 = Fp.sqr(t2);
          }
          const ge = Fp.pow(g, _1n << BigInt(r - m - 1));
          g = Fp.sqr(ge);
          x = Fp.mul(x, ge);
          b = Fp.mul(b, g);
          r = m;
        }
        return x;
      };
    }
    function FpSqrt(P) {
      if (P % _4n === _3n) {
        const p1div4 = (P + _1n) / _4n;
        return function sqrt3mod4(Fp, n) {
          const root = Fp.pow(n, p1div4);
          if (!Fp.eql(Fp.sqr(root), n))
            throw new Error("Cannot find square root");
          return root;
        };
      }
      if (P % _8n === _5n) {
        const c1 = (P - _5n) / _8n;
        return function sqrt5mod8(Fp, n) {
          const n2 = Fp.mul(n, _2n);
          const v = Fp.pow(n2, c1);
          const nv = Fp.mul(n, v);
          const i = Fp.mul(Fp.mul(nv, _2n), v);
          const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
          if (!Fp.eql(Fp.sqr(root), n))
            throw new Error("Cannot find square root");
          return root;
        };
      }
      if (P % _16n === _9n) {
      }
      return tonelliShanks(P);
    }
    var isNegativeLE = (num2, modulo) => (mod(num2, modulo) & _1n) === _1n;
    exports.isNegativeLE = isNegativeLE;
    var FIELD_FIELDS = [
      "create",
      "isValid",
      "is0",
      "neg",
      "inv",
      "sqrt",
      "sqr",
      "eql",
      "add",
      "sub",
      "mul",
      "pow",
      "div",
      "addN",
      "subN",
      "mulN",
      "sqrN"
    ];
    function validateField(field) {
      const initial = {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "isSafeInteger",
        BITS: "isSafeInteger"
      };
      const opts = FIELD_FIELDS.reduce((map, val) => {
        map[val] = "function";
        return map;
      }, initial);
      return (0, utils_js_1.validateObject)(field, opts);
    }
    function FpPow(f, num2, power) {
      if (power < _0n)
        throw new Error("invalid exponent, negatives unsupported");
      if (power === _0n)
        return f.ONE;
      if (power === _1n)
        return num2;
      let p = f.ONE;
      let d = num2;
      while (power > _0n) {
        if (power & _1n)
          p = f.mul(p, d);
        d = f.sqr(d);
        power >>= _1n;
      }
      return p;
    }
    function FpInvertBatch(f, nums) {
      const tmp = new Array(nums.length);
      const lastMultiplied = nums.reduce((acc, num2, i) => {
        if (f.is0(num2))
          return acc;
        tmp[i] = acc;
        return f.mul(acc, num2);
      }, f.ONE);
      const inverted = f.inv(lastMultiplied);
      nums.reduceRight((acc, num2, i) => {
        if (f.is0(num2))
          return acc;
        tmp[i] = f.mul(acc, tmp[i]);
        return f.mul(acc, num2);
      }, inverted);
      return tmp;
    }
    function FpDiv(f, lhs, rhs) {
      return f.mul(lhs, typeof rhs === "bigint" ? invert(rhs, f.ORDER) : f.inv(rhs));
    }
    function FpLegendre(order) {
      const legendreConst = (order - _1n) / _2n;
      return (f, x) => f.pow(x, legendreConst);
    }
    function FpIsSquare(f) {
      const legendre = FpLegendre(f.ORDER);
      return (x) => {
        const p = legendre(f, x);
        return f.eql(p, f.ZERO) || f.eql(p, f.ONE);
      };
    }
    function nLength(n, nBitLength) {
      const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
      const nByteLength = Math.ceil(_nBitLength / 8);
      return { nBitLength: _nBitLength, nByteLength };
    }
    function Field(ORDER, bitLen, isLE = false, redef = {}) {
      if (ORDER <= _0n)
        throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
      const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen);
      if (BYTES > 2048)
        throw new Error("invalid field: expected ORDER of <= 2048 bytes");
      let sqrtP;
      const f = Object.freeze({
        ORDER,
        BITS,
        BYTES,
        MASK: (0, utils_js_1.bitMask)(BITS),
        ZERO: _0n,
        ONE: _1n,
        create: (num2) => mod(num2, ORDER),
        isValid: (num2) => {
          if (typeof num2 !== "bigint")
            throw new Error("invalid field element: expected bigint, got " + typeof num2);
          return _0n <= num2 && num2 < ORDER;
        },
        is0: (num2) => num2 === _0n,
        isOdd: (num2) => (num2 & _1n) === _1n,
        neg: (num2) => mod(-num2, ORDER),
        eql: (lhs, rhs) => lhs === rhs,
        sqr: (num2) => mod(num2 * num2, ORDER),
        add: (lhs, rhs) => mod(lhs + rhs, ORDER),
        sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
        mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
        pow: (num2, power) => FpPow(f, num2, power),
        div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
        // Same as above, but doesn't normalize
        sqrN: (num2) => num2 * num2,
        addN: (lhs, rhs) => lhs + rhs,
        subN: (lhs, rhs) => lhs - rhs,
        mulN: (lhs, rhs) => lhs * rhs,
        inv: (num2) => invert(num2, ORDER),
        sqrt: redef.sqrt || ((n) => {
          if (!sqrtP)
            sqrtP = FpSqrt(ORDER);
          return sqrtP(f, n);
        }),
        invertBatch: (lst) => FpInvertBatch(f, lst),
        // TODO: do we really need constant cmov?
        // We don't have const-time bigints anyway, so probably will be not very useful
        cmov: (a, b, c) => c ? b : a,
        toBytes: (num2) => isLE ? (0, utils_js_1.numberToBytesLE)(num2, BYTES) : (0, utils_js_1.numberToBytesBE)(num2, BYTES),
        fromBytes: (bytes) => {
          if (bytes.length !== BYTES)
            throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
          return isLE ? (0, utils_js_1.bytesToNumberLE)(bytes) : (0, utils_js_1.bytesToNumberBE)(bytes);
        }
      });
      return Object.freeze(f);
    }
    function FpSqrtOdd(Fp, elm) {
      if (!Fp.isOdd)
        throw new Error("Field doesn't have isOdd");
      const root = Fp.sqrt(elm);
      return Fp.isOdd(root) ? root : Fp.neg(root);
    }
    function FpSqrtEven(Fp, elm) {
      if (!Fp.isOdd)
        throw new Error("Field doesn't have isOdd");
      const root = Fp.sqrt(elm);
      return Fp.isOdd(root) ? Fp.neg(root) : root;
    }
    function hashToPrivateScalar(hash4, groupOrder, isLE = false) {
      hash4 = (0, utils_js_1.ensureBytes)("privateHash", hash4);
      const hashLen = hash4.length;
      const minLen = nLength(groupOrder).nByteLength + 8;
      if (minLen < 24 || hashLen < minLen || hashLen > 1024)
        throw new Error("hashToPrivateScalar: expected " + minLen + "-1024 bytes of input, got " + hashLen);
      const num2 = isLE ? (0, utils_js_1.bytesToNumberLE)(hash4) : (0, utils_js_1.bytesToNumberBE)(hash4);
      return mod(num2, groupOrder - _1n) + _1n;
    }
    function getFieldBytesLength(fieldOrder) {
      if (typeof fieldOrder !== "bigint")
        throw new Error("field order must be bigint");
      const bitLength = fieldOrder.toString(2).length;
      return Math.ceil(bitLength / 8);
    }
    function getMinHashLength(fieldOrder) {
      const length = getFieldBytesLength(fieldOrder);
      return length + Math.ceil(length / 2);
    }
    function mapHashToField(key, fieldOrder, isLE = false) {
      const len = key.length;
      const fieldLen = getFieldBytesLength(fieldOrder);
      const minLen = getMinHashLength(fieldOrder);
      if (len < 16 || len < minLen || len > 1024)
        throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
      const num2 = isLE ? (0, utils_js_1.bytesToNumberBE)(key) : (0, utils_js_1.bytesToNumberLE)(key);
      const reduced = mod(num2, fieldOrder - _1n) + _1n;
      return isLE ? (0, utils_js_1.numberToBytesLE)(reduced, fieldLen) : (0, utils_js_1.numberToBytesBE)(reduced, fieldLen);
    }
  }
});

// ../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/poseidon.js
var require_poseidon = __commonJS({
  "../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/poseidon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateOpts = validateOpts;
    exports.splitConstants = splitConstants;
    exports.poseidon = poseidon;
    var modular_js_1 = require_modular();
    function validateOpts(opts) {
      const { Fp, mds, reversePartialPowIdx: rev, roundConstants: rc } = opts;
      const { roundsFull, roundsPartial, sboxPower, t } = opts;
      (0, modular_js_1.validateField)(Fp);
      for (const i of ["t", "roundsFull", "roundsPartial"]) {
        if (typeof opts[i] !== "number" || !Number.isSafeInteger(opts[i]))
          throw new Error("invalid number " + i);
      }
      if (!Array.isArray(mds) || mds.length !== t)
        throw new Error("Poseidon: invalid MDS matrix");
      const _mds = mds.map((mdsRow) => {
        if (!Array.isArray(mdsRow) || mdsRow.length !== t)
          throw new Error("invalid MDS matrix row: " + mdsRow);
        return mdsRow.map((i) => {
          if (typeof i !== "bigint")
            throw new Error("invalid MDS matrix bigint: " + i);
          return Fp.create(i);
        });
      });
      if (rev !== void 0 && typeof rev !== "boolean")
        throw new Error("invalid param reversePartialPowIdx=" + rev);
      if (roundsFull & 1)
        throw new Error("roundsFull is not even" + roundsFull);
      const rounds = roundsFull + roundsPartial;
      if (!Array.isArray(rc) || rc.length !== rounds)
        throw new Error("Poseidon: invalid round constants");
      const roundConstants = rc.map((rc2) => {
        if (!Array.isArray(rc2) || rc2.length !== t)
          throw new Error("invalid round constants");
        return rc2.map((i) => {
          if (typeof i !== "bigint" || !Fp.isValid(i))
            throw new Error("invalid round constant");
          return Fp.create(i);
        });
      });
      if (!sboxPower || ![3, 5, 7].includes(sboxPower))
        throw new Error("invalid sboxPower");
      const _sboxPower = BigInt(sboxPower);
      let sboxFn = (n) => (0, modular_js_1.FpPow)(Fp, n, _sboxPower);
      if (sboxPower === 3)
        sboxFn = (n) => Fp.mul(Fp.sqrN(n), n);
      else if (sboxPower === 5)
        sboxFn = (n) => Fp.mul(Fp.sqrN(Fp.sqrN(n)), n);
      return Object.freeze({ ...opts, rounds, sboxFn, roundConstants, mds: _mds });
    }
    function splitConstants(rc, t) {
      if (typeof t !== "number")
        throw new Error("poseidonSplitConstants: invalid t");
      if (!Array.isArray(rc) || rc.length % t)
        throw new Error("poseidonSplitConstants: invalid rc");
      const res = [];
      let tmp = [];
      for (let i = 0; i < rc.length; i++) {
        tmp.push(rc[i]);
        if (tmp.length === t) {
          res.push(tmp);
          tmp = [];
        }
      }
      return res;
    }
    function poseidon(opts) {
      const _opts = validateOpts(opts);
      const { Fp, mds, roundConstants, rounds: totalRounds, roundsPartial, sboxFn, t } = _opts;
      const halfRoundsFull = _opts.roundsFull / 2;
      const partialIdx = _opts.reversePartialPowIdx ? t - 1 : 0;
      const poseidonRound = (values, isFull, idx) => {
        values = values.map((i, j) => Fp.add(i, roundConstants[idx][j]));
        if (isFull)
          values = values.map((i) => sboxFn(i));
        else
          values[partialIdx] = sboxFn(values[partialIdx]);
        values = mds.map((i) => i.reduce((acc, i2, j) => Fp.add(acc, Fp.mulN(i2, values[j])), Fp.ZERO));
        return values;
      };
      const poseidonHash = function poseidonHash2(values) {
        if (!Array.isArray(values) || values.length !== t)
          throw new Error("invalid values, expected array of bigints with length " + t);
        values = values.map((i) => {
          if (typeof i !== "bigint")
            throw new Error("invalid bigint=" + i);
          return Fp.create(i);
        });
        let lastRound = 0;
        for (let i = 0; i < halfRoundsFull; i++)
          values = poseidonRound(values, true, lastRound++);
        for (let i = 0; i < roundsPartial; i++)
          values = poseidonRound(values, false, lastRound++);
        for (let i = 0; i < halfRoundsFull; i++)
          values = poseidonRound(values, true, lastRound++);
        if (lastRound !== totalRounds)
          throw new Error("invalid number of rounds");
        return values;
      };
      poseidonHash.roundConstants = roundConstants;
      return poseidonHash;
    }
  }
});

// ../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/curve.js
var require_curve = __commonJS({
  "../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/curve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wNAF = wNAF;
    exports.pippenger = pippenger;
    exports.precomputeMSMUnsafe = precomputeMSMUnsafe;
    exports.validateBasic = validateBasic;
    var modular_js_1 = require_modular();
    var utils_js_1 = require_utils2();
    var _0n = BigInt(0);
    var _1n = BigInt(1);
    function constTimeNegate(condition, item) {
      const neg = item.negate();
      return condition ? neg : item;
    }
    function validateW(W, bits) {
      if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
        throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
    }
    function calcWOpts(W, bits) {
      validateW(W, bits);
      const windows = Math.ceil(bits / W) + 1;
      const windowSize = 2 ** (W - 1);
      return { windows, windowSize };
    }
    function validateMSMPoints(points, c) {
      if (!Array.isArray(points))
        throw new Error("array expected");
      points.forEach((p, i) => {
        if (!(p instanceof c))
          throw new Error("invalid point at index " + i);
      });
    }
    function validateMSMScalars(scalars, field) {
      if (!Array.isArray(scalars))
        throw new Error("array of scalars expected");
      scalars.forEach((s, i) => {
        if (!field.isValid(s))
          throw new Error("invalid scalar at index " + i);
      });
    }
    var pointPrecomputes = /* @__PURE__ */ new WeakMap();
    var pointWindowSizes = /* @__PURE__ */ new WeakMap();
    function getW(P) {
      return pointWindowSizes.get(P) || 1;
    }
    function wNAF(c, bits) {
      return {
        constTimeNegate,
        hasPrecomputes(elm) {
          return getW(elm) !== 1;
        },
        // non-const time multiplication ladder
        unsafeLadder(elm, n, p = c.ZERO) {
          let d = elm;
          while (n > _0n) {
            if (n & _1n)
              p = p.add(d);
            d = d.double();
            n >>= _1n;
          }
          return p;
        },
        /**
         * Creates a wNAF precomputation window. Used for caching.
         * Default window size is set by `utils.precompute()` and is equal to 8.
         * Number of precomputed points depends on the curve size:
         * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
         * - 𝑊 is the window size
         * - 𝑛 is the bitlength of the curve order.
         * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
         * @param elm Point instance
         * @param W window size
         * @returns precomputed point tables flattened to a single array
         */
        precomputeWindow(elm, W) {
          const { windows, windowSize } = calcWOpts(W, bits);
          const points = [];
          let p = elm;
          let base = p;
          for (let window2 = 0; window2 < windows; window2++) {
            base = p;
            points.push(base);
            for (let i = 1; i < windowSize; i++) {
              base = base.add(p);
              points.push(base);
            }
            p = base.double();
          }
          return points;
        },
        /**
         * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
         * @param W window size
         * @param precomputes precomputed tables
         * @param n scalar (we don't check here, but should be less than curve order)
         * @returns real and fake (for const-time) points
         */
        wNAF(W, precomputes, n) {
          const { windows, windowSize } = calcWOpts(W, bits);
          let p = c.ZERO;
          let f = c.BASE;
          const mask = BigInt(2 ** W - 1);
          const maxNumber = 2 ** W;
          const shiftBy = BigInt(W);
          for (let window2 = 0; window2 < windows; window2++) {
            const offset = window2 * windowSize;
            let wbits = Number(n & mask);
            n >>= shiftBy;
            if (wbits > windowSize) {
              wbits -= maxNumber;
              n += _1n;
            }
            const offset1 = offset;
            const offset2 = offset + Math.abs(wbits) - 1;
            const cond1 = window2 % 2 !== 0;
            const cond2 = wbits < 0;
            if (wbits === 0) {
              f = f.add(constTimeNegate(cond1, precomputes[offset1]));
            } else {
              p = p.add(constTimeNegate(cond2, precomputes[offset2]));
            }
          }
          return { p, f };
        },
        /**
         * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
         * @param W window size
         * @param precomputes precomputed tables
         * @param n scalar (we don't check here, but should be less than curve order)
         * @param acc accumulator point to add result of multiplication
         * @returns point
         */
        wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
          const { windows, windowSize } = calcWOpts(W, bits);
          const mask = BigInt(2 ** W - 1);
          const maxNumber = 2 ** W;
          const shiftBy = BigInt(W);
          for (let window2 = 0; window2 < windows; window2++) {
            const offset = window2 * windowSize;
            if (n === _0n)
              break;
            let wbits = Number(n & mask);
            n >>= shiftBy;
            if (wbits > windowSize) {
              wbits -= maxNumber;
              n += _1n;
            }
            if (wbits === 0)
              continue;
            let curr = precomputes[offset + Math.abs(wbits) - 1];
            if (wbits < 0)
              curr = curr.negate();
            acc = acc.add(curr);
          }
          return acc;
        },
        getPrecomputes(W, P, transform) {
          let comp = pointPrecomputes.get(P);
          if (!comp) {
            comp = this.precomputeWindow(P, W);
            if (W !== 1)
              pointPrecomputes.set(P, transform(comp));
          }
          return comp;
        },
        wNAFCached(P, n, transform) {
          const W = getW(P);
          return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
        },
        wNAFCachedUnsafe(P, n, transform, prev) {
          const W = getW(P);
          if (W === 1)
            return this.unsafeLadder(P, n, prev);
          return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
        },
        // We calculate precomputes for elliptic curve point multiplication
        // using windowed method. This specifies window size and
        // stores precomputed values. Usually only base point would be precomputed.
        setWindowSize(P, W) {
          validateW(W, bits);
          pointWindowSizes.set(P, W);
          pointPrecomputes.delete(P);
        }
      };
    }
    function pippenger(c, fieldN, points, scalars) {
      validateMSMPoints(points, c);
      validateMSMScalars(scalars, fieldN);
      if (points.length !== scalars.length)
        throw new Error("arrays of points and scalars must have equal length");
      const zero = c.ZERO;
      const wbits = (0, utils_js_1.bitLen)(BigInt(points.length));
      const windowSize = wbits > 12 ? wbits - 3 : wbits > 4 ? wbits - 2 : wbits ? 2 : 1;
      const MASK = (1 << windowSize) - 1;
      const buckets = new Array(MASK + 1).fill(zero);
      const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
      let sum = zero;
      for (let i = lastBits; i >= 0; i -= windowSize) {
        buckets.fill(zero);
        for (let j = 0; j < scalars.length; j++) {
          const scalar = scalars[j];
          const wbits2 = Number(scalar >> BigInt(i) & BigInt(MASK));
          buckets[wbits2] = buckets[wbits2].add(points[j]);
        }
        let resI = zero;
        for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
          sumI = sumI.add(buckets[j]);
          resI = resI.add(sumI);
        }
        sum = sum.add(resI);
        if (i !== 0)
          for (let j = 0; j < windowSize; j++)
            sum = sum.double();
      }
      return sum;
    }
    function precomputeMSMUnsafe(c, fieldN, points, windowSize) {
      validateW(windowSize, fieldN.BITS);
      validateMSMPoints(points, c);
      const zero = c.ZERO;
      const tableSize = 2 ** windowSize - 1;
      const chunks = Math.ceil(fieldN.BITS / windowSize);
      const MASK = BigInt((1 << windowSize) - 1);
      const tables = points.map((p) => {
        const res = [];
        for (let i = 0, acc = p; i < tableSize; i++) {
          res.push(acc);
          acc = acc.add(p);
        }
        return res;
      });
      return (scalars) => {
        validateMSMScalars(scalars, fieldN);
        if (scalars.length > points.length)
          throw new Error("array of scalars must be smaller than array of points");
        let res = zero;
        for (let i = 0; i < chunks; i++) {
          if (res !== zero)
            for (let j = 0; j < windowSize; j++)
              res = res.double();
          const shiftBy = BigInt(chunks * windowSize - (i + 1) * windowSize);
          for (let j = 0; j < scalars.length; j++) {
            const n = scalars[j];
            const curr = Number(n >> shiftBy & MASK);
            if (!curr)
              continue;
            res = res.add(tables[j][curr - 1]);
          }
        }
        return res;
      };
    }
    function validateBasic(curve) {
      (0, modular_js_1.validateField)(curve.Fp);
      (0, utils_js_1.validateObject)(curve, {
        n: "bigint",
        h: "bigint",
        Gx: "field",
        Gy: "field"
      }, {
        nBitLength: "isSafeInteger",
        nByteLength: "isSafeInteger"
      });
      return Object.freeze({
        ...(0, modular_js_1.nLength)(curve.n, curve.nBitLength),
        ...curve,
        ...{ p: curve.Fp.ORDER }
      });
    }
  }
});

// ../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/weierstrass.js
var require_weierstrass = __commonJS({
  "../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/abstract/weierstrass.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DER = void 0;
    exports.weierstrassPoints = weierstrassPoints;
    exports.weierstrass = weierstrass;
    exports.SWUFpSqrtRatio = SWUFpSqrtRatio;
    exports.mapToCurveSimpleSWU = mapToCurveSimpleSWU;
    var curve_js_1 = require_curve();
    var mod = require_modular();
    var ut = require_utils2();
    var utils_js_1 = require_utils2();
    function validateSigVerOpts(opts) {
      if (opts.lowS !== void 0)
        (0, utils_js_1.abool)("lowS", opts.lowS);
      if (opts.prehash !== void 0)
        (0, utils_js_1.abool)("prehash", opts.prehash);
    }
    function validatePointOpts(curve) {
      const opts = (0, curve_js_1.validateBasic)(curve);
      ut.validateObject(opts, {
        a: "field",
        b: "field"
      }, {
        allowedPrivateKeyLengths: "array",
        wrapPrivateKey: "boolean",
        isTorsionFree: "function",
        clearCofactor: "function",
        allowInfinityPoint: "boolean",
        fromBytes: "function",
        toBytes: "function"
      });
      const { endo, Fp, a } = opts;
      if (endo) {
        if (!Fp.eql(a, Fp.ZERO)) {
          throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
        }
        if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
          throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
        }
      }
      return Object.freeze({ ...opts });
    }
    var { bytesToNumberBE: b2n, hexToBytes: h2b } = ut;
    exports.DER = {
      // asn.1 DER encoding utils
      Err: class DERErr extends Error {
        constructor(m = "") {
          super(m);
        }
      },
      // Basic building block is TLV (Tag-Length-Value)
      _tlv: {
        encode: (tag, data) => {
          const { Err: E } = exports.DER;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length & 1)
            throw new E("tlv.encode: unpadded data");
          const dataLen = data.length / 2;
          const len = ut.numberToHexUnpadded(dataLen);
          if (len.length / 2 & 128)
            throw new E("tlv.encode: long form length too big");
          const lenLen = dataLen > 127 ? ut.numberToHexUnpadded(len.length / 2 | 128) : "";
          const t = ut.numberToHexUnpadded(tag);
          return t + lenLen + len + data;
        },
        // v - value, l - left bytes (unparsed)
        decode(tag, data) {
          const { Err: E } = exports.DER;
          let pos = 0;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length < 2 || data[pos++] !== tag)
            throw new E("tlv.decode: wrong tlv");
          const first = data[pos++];
          const isLong = !!(first & 128);
          let length = 0;
          if (!isLong)
            length = first;
          else {
            const lenLen = first & 127;
            if (!lenLen)
              throw new E("tlv.decode(long): indefinite length not supported");
            if (lenLen > 4)
              throw new E("tlv.decode(long): byte length is too big");
            const lengthBytes = data.subarray(pos, pos + lenLen);
            if (lengthBytes.length !== lenLen)
              throw new E("tlv.decode: length bytes not complete");
            if (lengthBytes[0] === 0)
              throw new E("tlv.decode(long): zero leftmost byte");
            for (const b of lengthBytes)
              length = length << 8 | b;
            pos += lenLen;
            if (length < 128)
              throw new E("tlv.decode(long): not minimal encoding");
          }
          const v = data.subarray(pos, pos + length);
          if (v.length !== length)
            throw new E("tlv.decode: wrong value length");
          return { v, l: data.subarray(pos + length) };
        }
      },
      // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
      // since we always use positive integers here. It must always be empty:
      // - add zero byte if exists
      // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
      _int: {
        encode(num2) {
          const { Err: E } = exports.DER;
          if (num2 < _0n)
            throw new E("integer: negative integers are not allowed");
          let hex = ut.numberToHexUnpadded(num2);
          if (Number.parseInt(hex[0], 16) & 8)
            hex = "00" + hex;
          if (hex.length & 1)
            throw new E("unexpected DER parsing assertion: unpadded hex");
          return hex;
        },
        decode(data) {
          const { Err: E } = exports.DER;
          if (data[0] & 128)
            throw new E("invalid signature integer: negative");
          if (data[0] === 0 && !(data[1] & 128))
            throw new E("invalid signature integer: unnecessary leading zero");
          return b2n(data);
        }
      },
      toSig(hex) {
        const { Err: E, _int: int, _tlv: tlv } = exports.DER;
        const data = typeof hex === "string" ? h2b(hex) : hex;
        ut.abytes(data);
        const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
        if (seqLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
        const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
        if (sLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        return { r: int.decode(rBytes), s: int.decode(sBytes) };
      },
      hexFromSig(sig) {
        const { _tlv: tlv, _int: int } = exports.DER;
        const rs = tlv.encode(2, int.encode(sig.r));
        const ss = tlv.encode(2, int.encode(sig.s));
        const seq = rs + ss;
        return tlv.encode(48, seq);
      }
    };
    var _0n = BigInt(0);
    var _1n = BigInt(1);
    var _2n = BigInt(2);
    var _3n = BigInt(3);
    var _4n = BigInt(4);
    function weierstrassPoints(opts) {
      const CURVE = validatePointOpts(opts);
      const { Fp } = CURVE;
      const Fn = mod.Field(CURVE.n, CURVE.nBitLength);
      const toBytes = CURVE.toBytes || ((_c, point, _isCompressed) => {
        const a = point.toAffine();
        return ut.concatBytes(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
      });
      const fromBytes = CURVE.fromBytes || ((bytes) => {
        const tail = bytes.subarray(1);
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x, y };
      });
      function weierstrassEquation(x) {
        const { a, b } = CURVE;
        const x2 = Fp.sqr(x);
        const x3 = Fp.mul(x2, x);
        return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
      }
      if (!Fp.eql(Fp.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
        throw new Error("bad generator point: equation left != right");
      function isWithinCurveOrder(num2) {
        return ut.inRange(num2, _1n, CURVE.n);
      }
      function normPrivateKeyToScalar(key) {
        const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
        if (lengths && typeof key !== "bigint") {
          if (ut.isBytes(key))
            key = ut.bytesToHex(key);
          if (typeof key !== "string" || !lengths.includes(key.length))
            throw new Error("invalid private key");
          key = key.padStart(nByteLength * 2, "0");
        }
        let num2;
        try {
          num2 = typeof key === "bigint" ? key : ut.bytesToNumberBE((0, utils_js_1.ensureBytes)("private key", key, nByteLength));
        } catch (error) {
          throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
        }
        if (wrapPrivateKey)
          num2 = mod.mod(num2, N);
        ut.aInRange("private key", num2, _1n, N);
        return num2;
      }
      function assertPrjPoint(other) {
        if (!(other instanceof Point))
          throw new Error("ProjectivePoint expected");
      }
      const toAffineMemo = (0, utils_js_1.memoized)((p, iz) => {
        const { px: x, py: y, pz: z } = p;
        if (Fp.eql(z, Fp.ONE))
          return { x, y };
        const is0 = p.is0();
        if (iz == null)
          iz = is0 ? Fp.ONE : Fp.inv(z);
        const ax = Fp.mul(x, iz);
        const ay = Fp.mul(y, iz);
        const zz = Fp.mul(z, iz);
        if (is0)
          return { x: Fp.ZERO, y: Fp.ZERO };
        if (!Fp.eql(zz, Fp.ONE))
          throw new Error("invZ was invalid");
        return { x: ax, y: ay };
      });
      const assertValidMemo = (0, utils_js_1.memoized)((p) => {
        if (p.is0()) {
          if (CURVE.allowInfinityPoint && !Fp.is0(p.py))
            return;
          throw new Error("bad point: ZERO");
        }
        const { x, y } = p.toAffine();
        if (!Fp.isValid(x) || !Fp.isValid(y))
          throw new Error("bad point: x or y not FE");
        const left = Fp.sqr(y);
        const right = weierstrassEquation(x);
        if (!Fp.eql(left, right))
          throw new Error("bad point: equation left != right");
        if (!p.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
        return true;
      });
      class Point {
        constructor(px, py, pz) {
          this.px = px;
          this.py = py;
          this.pz = pz;
          if (px == null || !Fp.isValid(px))
            throw new Error("x required");
          if (py == null || !Fp.isValid(py))
            throw new Error("y required");
          if (pz == null || !Fp.isValid(pz))
            throw new Error("z required");
          Object.freeze(this);
        }
        // Does not validate if the point is on-curve.
        // Use fromHex instead, or call assertValidity() later.
        static fromAffine(p) {
          const { x, y } = p || {};
          if (!p || !Fp.isValid(x) || !Fp.isValid(y))
            throw new Error("invalid affine point");
          if (p instanceof Point)
            throw new Error("projective point not allowed");
          const is0 = (i) => Fp.eql(i, Fp.ZERO);
          if (is0(x) && is0(y))
            return Point.ZERO;
          return new Point(x, y, Fp.ONE);
        }
        get x() {
          return this.toAffine().x;
        }
        get y() {
          return this.toAffine().y;
        }
        /**
         * Takes a bunch of Projective Points but executes only one
         * inversion on all of them. Inversion is very slow operation,
         * so this improves performance massively.
         * Optimization: converts a list of projective points to a list of identical points with Z=1.
         */
        static normalizeZ(points) {
          const toInv = Fp.invertBatch(points.map((p) => p.pz));
          return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
        }
        /**
         * Converts hash string or Uint8Array to Point.
         * @param hex short/long ECDSA hex
         */
        static fromHex(hex) {
          const P = Point.fromAffine(fromBytes((0, utils_js_1.ensureBytes)("pointHex", hex)));
          P.assertValidity();
          return P;
        }
        // Multiplies generator point by privateKey.
        static fromPrivateKey(privateKey) {
          return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
        }
        // Multiscalar Multiplication
        static msm(points, scalars) {
          return (0, curve_js_1.pippenger)(Point, Fn, points, scalars);
        }
        // "Private method", don't use it directly
        _setWindowSize(windowSize) {
          wnaf.setWindowSize(this, windowSize);
        }
        // A point on curve is valid if it conforms to equation.
        assertValidity() {
          assertValidMemo(this);
        }
        hasEvenY() {
          const { y } = this.toAffine();
          if (Fp.isOdd)
            return !Fp.isOdd(y);
          throw new Error("Field doesn't support isOdd");
        }
        /**
         * Compare one point to another.
         */
        equals(other) {
          assertPrjPoint(other);
          const { px: X1, py: Y1, pz: Z1 } = this;
          const { px: X2, py: Y2, pz: Z2 } = other;
          const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
          const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
          return U1 && U2;
        }
        /**
         * Flips point to one corresponding to (x, -y) in Affine coordinates.
         */
        negate() {
          return new Point(this.px, Fp.neg(this.py), this.pz);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
          const { a, b } = CURVE;
          const b3 = Fp.mul(b, _3n);
          const { px: X1, py: Y1, pz: Z1 } = this;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          let t0 = Fp.mul(X1, X1);
          let t1 = Fp.mul(Y1, Y1);
          let t2 = Fp.mul(Z1, Z1);
          let t3 = Fp.mul(X1, Y1);
          t3 = Fp.add(t3, t3);
          Z3 = Fp.mul(X1, Z1);
          Z3 = Fp.add(Z3, Z3);
          X3 = Fp.mul(a, Z3);
          Y3 = Fp.mul(b3, t2);
          Y3 = Fp.add(X3, Y3);
          X3 = Fp.sub(t1, Y3);
          Y3 = Fp.add(t1, Y3);
          Y3 = Fp.mul(X3, Y3);
          X3 = Fp.mul(t3, X3);
          Z3 = Fp.mul(b3, Z3);
          t2 = Fp.mul(a, t2);
          t3 = Fp.sub(t0, t2);
          t3 = Fp.mul(a, t3);
          t3 = Fp.add(t3, Z3);
          Z3 = Fp.add(t0, t0);
          t0 = Fp.add(Z3, t0);
          t0 = Fp.add(t0, t2);
          t0 = Fp.mul(t0, t3);
          Y3 = Fp.add(Y3, t0);
          t2 = Fp.mul(Y1, Z1);
          t2 = Fp.add(t2, t2);
          t0 = Fp.mul(t2, t3);
          X3 = Fp.sub(X3, t0);
          Z3 = Fp.mul(t2, t1);
          Z3 = Fp.add(Z3, Z3);
          Z3 = Fp.add(Z3, Z3);
          return new Point(X3, Y3, Z3);
        }
        // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(other) {
          assertPrjPoint(other);
          const { px: X1, py: Y1, pz: Z1 } = this;
          const { px: X2, py: Y2, pz: Z2 } = other;
          let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
          const a = CURVE.a;
          const b3 = Fp.mul(CURVE.b, _3n);
          let t0 = Fp.mul(X1, X2);
          let t1 = Fp.mul(Y1, Y2);
          let t2 = Fp.mul(Z1, Z2);
          let t3 = Fp.add(X1, Y1);
          let t4 = Fp.add(X2, Y2);
          t3 = Fp.mul(t3, t4);
          t4 = Fp.add(t0, t1);
          t3 = Fp.sub(t3, t4);
          t4 = Fp.add(X1, Z1);
          let t5 = Fp.add(X2, Z2);
          t4 = Fp.mul(t4, t5);
          t5 = Fp.add(t0, t2);
          t4 = Fp.sub(t4, t5);
          t5 = Fp.add(Y1, Z1);
          X3 = Fp.add(Y2, Z2);
          t5 = Fp.mul(t5, X3);
          X3 = Fp.add(t1, t2);
          t5 = Fp.sub(t5, X3);
          Z3 = Fp.mul(a, t4);
          X3 = Fp.mul(b3, t2);
          Z3 = Fp.add(X3, Z3);
          X3 = Fp.sub(t1, Z3);
          Z3 = Fp.add(t1, Z3);
          Y3 = Fp.mul(X3, Z3);
          t1 = Fp.add(t0, t0);
          t1 = Fp.add(t1, t0);
          t2 = Fp.mul(a, t2);
          t4 = Fp.mul(b3, t4);
          t1 = Fp.add(t1, t2);
          t2 = Fp.sub(t0, t2);
          t2 = Fp.mul(a, t2);
          t4 = Fp.add(t4, t2);
          t0 = Fp.mul(t1, t4);
          Y3 = Fp.add(Y3, t0);
          t0 = Fp.mul(t5, t4);
          X3 = Fp.mul(t3, X3);
          X3 = Fp.sub(X3, t0);
          t0 = Fp.mul(t3, t1);
          Z3 = Fp.mul(t5, Z3);
          Z3 = Fp.add(Z3, t0);
          return new Point(X3, Y3, Z3);
        }
        subtract(other) {
          return this.add(other.negate());
        }
        is0() {
          return this.equals(Point.ZERO);
        }
        wNAF(n) {
          return wnaf.wNAFCached(this, n, Point.normalizeZ);
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed private key e.g. sig verification, which works over *public* keys.
         */
        multiplyUnsafe(sc) {
          const { endo, n: N } = CURVE;
          ut.aInRange("scalar", sc, _0n, N);
          const I = Point.ZERO;
          if (sc === _0n)
            return I;
          if (this.is0() || sc === _1n)
            return this;
          if (!endo || wnaf.hasPrecomputes(this))
            return wnaf.wNAFCachedUnsafe(this, sc, Point.normalizeZ);
          let { k1neg, k1, k2neg, k2 } = endo.splitScalar(sc);
          let k1p = I;
          let k2p = I;
          let d = this;
          while (k1 > _0n || k2 > _0n) {
            if (k1 & _1n)
              k1p = k1p.add(d);
            if (k2 & _1n)
              k2p = k2p.add(d);
            d = d.double();
            k1 >>= _1n;
            k2 >>= _1n;
          }
          if (k1neg)
            k1p = k1p.negate();
          if (k2neg)
            k2p = k2p.negate();
          k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
          return k1p.add(k2p);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */
        multiply(scalar) {
          const { endo, n: N } = CURVE;
          ut.aInRange("scalar", scalar, _1n, N);
          let point, fake;
          if (endo) {
            const { k1neg, k1, k2neg, k2 } = endo.splitScalar(scalar);
            let { p: k1p, f: f1p } = this.wNAF(k1);
            let { p: k2p, f: f2p } = this.wNAF(k2);
            k1p = wnaf.constTimeNegate(k1neg, k1p);
            k2p = wnaf.constTimeNegate(k2neg, k2p);
            k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
            point = k1p.add(k2p);
            fake = f1p.add(f2p);
          } else {
            const { p, f } = this.wNAF(scalar);
            point = p;
            fake = f;
          }
          return Point.normalizeZ([point, fake])[0];
        }
        /**
         * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
         * Not using Strauss-Shamir trick: precomputation tables are faster.
         * The trick could be useful if both P and Q are not G (not in our case).
         * @returns non-zero affine point
         */
        multiplyAndAddUnsafe(Q, a, b) {
          const G = Point.BASE;
          const mul = (P, a2) => a2 === _0n || a2 === _1n || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
          const sum = mul(this, a).add(mul(Q, b));
          return sum.is0() ? void 0 : sum;
        }
        // Converts Projective point to affine (x, y) coordinates.
        // Can accept precomputed Z^-1 - for example, from invertBatch.
        // (x, y, z) ∋ (x=x/z, y=y/z)
        toAffine(iz) {
          return toAffineMemo(this, iz);
        }
        isTorsionFree() {
          const { h: cofactor, isTorsionFree } = CURVE;
          if (cofactor === _1n)
            return true;
          if (isTorsionFree)
            return isTorsionFree(Point, this);
          throw new Error("isTorsionFree() has not been declared for the elliptic curve");
        }
        clearCofactor() {
          const { h: cofactor, clearCofactor } = CURVE;
          if (cofactor === _1n)
            return this;
          if (clearCofactor)
            return clearCofactor(Point, this);
          return this.multiplyUnsafe(CURVE.h);
        }
        toRawBytes(isCompressed = true) {
          (0, utils_js_1.abool)("isCompressed", isCompressed);
          this.assertValidity();
          return toBytes(Point, this, isCompressed);
        }
        toHex(isCompressed = true) {
          (0, utils_js_1.abool)("isCompressed", isCompressed);
          return ut.bytesToHex(this.toRawBytes(isCompressed));
        }
      }
      Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
      Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
      const _bits = CURVE.nBitLength;
      const wnaf = (0, curve_js_1.wNAF)(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
      return {
        CURVE,
        ProjectivePoint: Point,
        normPrivateKeyToScalar,
        weierstrassEquation,
        isWithinCurveOrder
      };
    }
    function validateOpts(curve) {
      const opts = (0, curve_js_1.validateBasic)(curve);
      ut.validateObject(opts, {
        hash: "hash",
        hmac: "function",
        randomBytes: "function"
      }, {
        bits2int: "function",
        bits2int_modN: "function",
        lowS: "boolean"
      });
      return Object.freeze({ lowS: true, ...opts });
    }
    function weierstrass(curveDef) {
      const CURVE = validateOpts(curveDef);
      const { Fp, n: CURVE_ORDER } = CURVE;
      const compressedLen = Fp.BYTES + 1;
      const uncompressedLen = 2 * Fp.BYTES + 1;
      function modN(a) {
        return mod.mod(a, CURVE_ORDER);
      }
      function invN(a) {
        return mod.invert(a, CURVE_ORDER);
      }
      const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
        ...CURVE,
        toBytes(_c, point, isCompressed) {
          const a = point.toAffine();
          const x = Fp.toBytes(a.x);
          const cat = ut.concatBytes;
          (0, utils_js_1.abool)("isCompressed", isCompressed);
          if (isCompressed) {
            return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
          } else {
            return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
          }
        },
        fromBytes(bytes) {
          const len = bytes.length;
          const head = bytes[0];
          const tail = bytes.subarray(1);
          if (len === compressedLen && (head === 2 || head === 3)) {
            const x = ut.bytesToNumberBE(tail);
            if (!ut.inRange(x, _1n, Fp.ORDER))
              throw new Error("Point is not on curve");
            const y2 = weierstrassEquation(x);
            let y;
            try {
              y = Fp.sqrt(y2);
            } catch (sqrtError) {
              const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
              throw new Error("Point is not on curve" + suffix);
            }
            const isYOdd = (y & _1n) === _1n;
            const isHeadOdd = (head & 1) === 1;
            if (isHeadOdd !== isYOdd)
              y = Fp.neg(y);
            return { x, y };
          } else if (len === uncompressedLen && head === 4) {
            const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
            const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
            return { x, y };
          } else {
            const cl = compressedLen;
            const ul = uncompressedLen;
            throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
          }
        }
      });
      const numToNByteStr = (num2) => ut.bytesToHex(ut.numberToBytesBE(num2, CURVE.nByteLength));
      function isBiggerThanHalfOrder(number) {
        const HALF = CURVE_ORDER >> _1n;
        return number > HALF;
      }
      function normalizeS(s) {
        return isBiggerThanHalfOrder(s) ? modN(-s) : s;
      }
      const slcNum = (b, from, to) => ut.bytesToNumberBE(b.slice(from, to));
      class Signature {
        constructor(r, s, recovery) {
          this.r = r;
          this.s = s;
          this.recovery = recovery;
          this.assertValidity();
        }
        // pair (bytes of r, bytes of s)
        static fromCompact(hex) {
          const l = CURVE.nByteLength;
          hex = (0, utils_js_1.ensureBytes)("compactSignature", hex, l * 2);
          return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
        }
        // DER encoded ECDSA signature
        // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
        static fromDER(hex) {
          const { r, s } = exports.DER.toSig((0, utils_js_1.ensureBytes)("DER", hex));
          return new Signature(r, s);
        }
        assertValidity() {
          ut.aInRange("r", this.r, _1n, CURVE_ORDER);
          ut.aInRange("s", this.s, _1n, CURVE_ORDER);
        }
        addRecoveryBit(recovery) {
          return new Signature(this.r, this.s, recovery);
        }
        recoverPublicKey(msgHash) {
          const { r, s, recovery: rec } = this;
          const h = bits2int_modN((0, utils_js_1.ensureBytes)("msgHash", msgHash));
          if (rec == null || ![0, 1, 2, 3].includes(rec))
            throw new Error("recovery id invalid");
          const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
          if (radj >= Fp.ORDER)
            throw new Error("recovery id 2 or 3 invalid");
          const prefix = (rec & 1) === 0 ? "02" : "03";
          const R = Point.fromHex(prefix + numToNByteStr(radj));
          const ir = invN(radj);
          const u1 = modN(-h * ir);
          const u2 = modN(s * ir);
          const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
          if (!Q)
            throw new Error("point at infinify");
          Q.assertValidity();
          return Q;
        }
        // Signatures should be low-s, to prevent malleability.
        hasHighS() {
          return isBiggerThanHalfOrder(this.s);
        }
        normalizeS() {
          return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
        }
        // DER-encoded
        toDERRawBytes() {
          return ut.hexToBytes(this.toDERHex());
        }
        toDERHex() {
          return exports.DER.hexFromSig({ r: this.r, s: this.s });
        }
        // padded bytes of r, then padded bytes of s
        toCompactRawBytes() {
          return ut.hexToBytes(this.toCompactHex());
        }
        toCompactHex() {
          return numToNByteStr(this.r) + numToNByteStr(this.s);
        }
      }
      const utils = {
        isValidPrivateKey(privateKey) {
          try {
            normPrivateKeyToScalar(privateKey);
            return true;
          } catch (error) {
            return false;
          }
        },
        normPrivateKeyToScalar,
        /**
         * Produces cryptographically secure private key from random of size
         * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
         */
        randomPrivateKey: () => {
          const length = mod.getMinHashLength(CURVE.n);
          return mod.mapHashToField(CURVE.randomBytes(length), CURVE.n);
        },
        /**
         * Creates precompute table for an arbitrary EC point. Makes point "cached".
         * Allows to massively speed-up `point.multiply(scalar)`.
         * @returns cached point
         * @example
         * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
         * fast.multiply(privKey); // much faster ECDH now
         */
        precompute(windowSize = 8, point = Point.BASE) {
          point._setWindowSize(windowSize);
          point.multiply(BigInt(3));
          return point;
        }
      };
      function getPublicKey(privateKey, isCompressed = true) {
        return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
      }
      function isProbPub(item) {
        const arr = ut.isBytes(item);
        const str = typeof item === "string";
        const len = (arr || str) && item.length;
        if (arr)
          return len === compressedLen || len === uncompressedLen;
        if (str)
          return len === 2 * compressedLen || len === 2 * uncompressedLen;
        if (item instanceof Point)
          return true;
        return false;
      }
      function getSharedSecret(privateA, publicB, isCompressed = true) {
        if (isProbPub(privateA))
          throw new Error("first arg must be private key");
        if (!isProbPub(publicB))
          throw new Error("second arg must be public key");
        const b = Point.fromHex(publicB);
        return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
      }
      const bits2int = CURVE.bits2int || function(bytes) {
        if (bytes.length > 8192)
          throw new Error("input is too large");
        const num2 = ut.bytesToNumberBE(bytes);
        const delta = bytes.length * 8 - CURVE.nBitLength;
        return delta > 0 ? num2 >> BigInt(delta) : num2;
      };
      const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
        return modN(bits2int(bytes));
      };
      const ORDER_MASK = ut.bitMask(CURVE.nBitLength);
      function int2octets(num2) {
        ut.aInRange("num < 2^" + CURVE.nBitLength, num2, _0n, ORDER_MASK);
        return ut.numberToBytesBE(num2, CURVE.nByteLength);
      }
      function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
        if (["recovered", "canonical"].some((k) => k in opts))
          throw new Error("sign() legacy options not supported");
        const { hash: hash4, randomBytes } = CURVE;
        let { lowS, prehash, extraEntropy: ent } = opts;
        if (lowS == null)
          lowS = true;
        msgHash = (0, utils_js_1.ensureBytes)("msgHash", msgHash);
        validateSigVerOpts(opts);
        if (prehash)
          msgHash = (0, utils_js_1.ensureBytes)("prehashed msgHash", hash4(msgHash));
        const h1int = bits2int_modN(msgHash);
        const d = normPrivateKeyToScalar(privateKey);
        const seedArgs = [int2octets(d), int2octets(h1int)];
        if (ent != null && ent !== false) {
          const e = ent === true ? randomBytes(Fp.BYTES) : ent;
          seedArgs.push((0, utils_js_1.ensureBytes)("extraEntropy", e));
        }
        const seed = ut.concatBytes(...seedArgs);
        const m = h1int;
        function k2sig(kBytes) {
          const k = bits2int(kBytes);
          if (!isWithinCurveOrder(k))
            return;
          const ik = invN(k);
          const q = Point.BASE.multiply(k).toAffine();
          const r = modN(q.x);
          if (r === _0n)
            return;
          const s = modN(ik * modN(m + r * d));
          if (s === _0n)
            return;
          let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n);
          let normS = s;
          if (lowS && isBiggerThanHalfOrder(s)) {
            normS = normalizeS(s);
            recovery ^= 1;
          }
          return new Signature(r, normS, recovery);
        }
        return { seed, k2sig };
      }
      const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
      const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
      function sign(msgHash, privKey, opts = defaultSigOpts) {
        const { seed, k2sig } = prepSig(msgHash, privKey, opts);
        const C = CURVE;
        const drbg = ut.createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
        return drbg(seed, k2sig);
      }
      Point.BASE._setWindowSize(8);
      function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
        const sg = signature;
        msgHash = (0, utils_js_1.ensureBytes)("msgHash", msgHash);
        publicKey = (0, utils_js_1.ensureBytes)("publicKey", publicKey);
        const { lowS, prehash, format } = opts;
        validateSigVerOpts(opts);
        if ("strict" in opts)
          throw new Error("options.strict was renamed to lowS");
        if (format !== void 0 && format !== "compact" && format !== "der")
          throw new Error("format must be compact or der");
        const isHex = typeof sg === "string" || ut.isBytes(sg);
        const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
        if (!isHex && !isObj)
          throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
        let _sig = void 0;
        let P;
        try {
          if (isObj)
            _sig = new Signature(sg.r, sg.s);
          if (isHex) {
            try {
              if (format !== "compact")
                _sig = Signature.fromDER(sg);
            } catch (derError) {
              if (!(derError instanceof exports.DER.Err))
                throw derError;
            }
            if (!_sig && format !== "der")
              _sig = Signature.fromCompact(sg);
          }
          P = Point.fromHex(publicKey);
        } catch (error) {
          return false;
        }
        if (!_sig)
          return false;
        if (lowS && _sig.hasHighS())
          return false;
        if (prehash)
          msgHash = CURVE.hash(msgHash);
        const { r, s } = _sig;
        const h = bits2int_modN(msgHash);
        const is = invN(s);
        const u1 = modN(h * is);
        const u2 = modN(r * is);
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
        if (!R)
          return false;
        const v = modN(R.x);
        return v === r;
      }
      return {
        CURVE,
        getPublicKey,
        getSharedSecret,
        sign,
        verify,
        ProjectivePoint: Point,
        Signature,
        utils
      };
    }
    function SWUFpSqrtRatio(Fp, Z) {
      const q = Fp.ORDER;
      let l = _0n;
      for (let o = q - _1n; o % _2n === _0n; o /= _2n)
        l += _1n;
      const c1 = l;
      const _2n_pow_c1_1 = _2n << c1 - _1n - _1n;
      const _2n_pow_c1 = _2n_pow_c1_1 * _2n;
      const c2 = (q - _1n) / _2n_pow_c1;
      const c3 = (c2 - _1n) / _2n;
      const c4 = _2n_pow_c1 - _1n;
      const c5 = _2n_pow_c1_1;
      const c6 = Fp.pow(Z, c2);
      const c7 = Fp.pow(Z, (c2 + _1n) / _2n);
      let sqrtRatio = (u, v) => {
        let tv1 = c6;
        let tv2 = Fp.pow(v, c4);
        let tv3 = Fp.sqr(tv2);
        tv3 = Fp.mul(tv3, v);
        let tv5 = Fp.mul(u, tv3);
        tv5 = Fp.pow(tv5, c3);
        tv5 = Fp.mul(tv5, tv2);
        tv2 = Fp.mul(tv5, v);
        tv3 = Fp.mul(tv5, u);
        let tv4 = Fp.mul(tv3, tv2);
        tv5 = Fp.pow(tv4, c5);
        let isQR = Fp.eql(tv5, Fp.ONE);
        tv2 = Fp.mul(tv3, c7);
        tv5 = Fp.mul(tv4, tv1);
        tv3 = Fp.cmov(tv2, tv3, isQR);
        tv4 = Fp.cmov(tv5, tv4, isQR);
        for (let i = c1; i > _1n; i--) {
          let tv52 = i - _2n;
          tv52 = _2n << tv52 - _1n;
          let tvv5 = Fp.pow(tv4, tv52);
          const e1 = Fp.eql(tvv5, Fp.ONE);
          tv2 = Fp.mul(tv3, tv1);
          tv1 = Fp.mul(tv1, tv1);
          tvv5 = Fp.mul(tv4, tv1);
          tv3 = Fp.cmov(tv2, tv3, e1);
          tv4 = Fp.cmov(tvv5, tv4, e1);
        }
        return { isValid: isQR, value: tv3 };
      };
      if (Fp.ORDER % _4n === _3n) {
        const c12 = (Fp.ORDER - _3n) / _4n;
        const c22 = Fp.sqrt(Fp.neg(Z));
        sqrtRatio = (u, v) => {
          let tv1 = Fp.sqr(v);
          const tv2 = Fp.mul(u, v);
          tv1 = Fp.mul(tv1, tv2);
          let y1 = Fp.pow(tv1, c12);
          y1 = Fp.mul(y1, tv2);
          const y2 = Fp.mul(y1, c22);
          const tv3 = Fp.mul(Fp.sqr(y1), v);
          const isQR = Fp.eql(tv3, u);
          let y = Fp.cmov(y2, y1, isQR);
          return { isValid: isQR, value: y };
        };
      }
      return sqrtRatio;
    }
    function mapToCurveSimpleSWU(Fp, opts) {
      mod.validateField(Fp);
      if (!Fp.isValid(opts.A) || !Fp.isValid(opts.B) || !Fp.isValid(opts.Z))
        throw new Error("mapToCurveSimpleSWU: invalid opts");
      const sqrtRatio = SWUFpSqrtRatio(Fp, opts.Z);
      if (!Fp.isOdd)
        throw new Error("Fp.isOdd is not implemented!");
      return (u) => {
        let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
        tv1 = Fp.sqr(u);
        tv1 = Fp.mul(tv1, opts.Z);
        tv2 = Fp.sqr(tv1);
        tv2 = Fp.add(tv2, tv1);
        tv3 = Fp.add(tv2, Fp.ONE);
        tv3 = Fp.mul(tv3, opts.B);
        tv4 = Fp.cmov(opts.Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO));
        tv4 = Fp.mul(tv4, opts.A);
        tv2 = Fp.sqr(tv3);
        tv6 = Fp.sqr(tv4);
        tv5 = Fp.mul(tv6, opts.A);
        tv2 = Fp.add(tv2, tv5);
        tv2 = Fp.mul(tv2, tv3);
        tv6 = Fp.mul(tv6, tv4);
        tv5 = Fp.mul(tv6, opts.B);
        tv2 = Fp.add(tv2, tv5);
        x = Fp.mul(tv1, tv3);
        const { isValid, value } = sqrtRatio(tv2, tv6);
        y = Fp.mul(tv1, u);
        y = Fp.mul(y, value);
        x = Fp.cmov(x, tv3, isValid);
        y = Fp.cmov(y, value, isValid);
        const e1 = Fp.isOdd(u) === Fp.isOdd(y);
        y = Fp.cmov(Fp.neg(y), y, e1);
        x = Fp.div(x, tv4);
        return { x, y };
      };
    }
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.0/node_modules/@noble/hashes/_assert.js
var require_assert2 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.0/node_modules/@noble/hashes/_assert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.anumber = anumber;
    exports.number = anumber;
    exports.abytes = abytes;
    exports.bytes = abytes;
    exports.ahash = ahash;
    exports.aexists = aexists;
    exports.aoutput = aoutput;
    function anumber(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function abytes(b, ...lengths) {
      if (!isBytes(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.wrapConstructor");
      anumber(h.outputLen);
      anumber(h.blockLen);
    }
    function aexists(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function aoutput(out, instance) {
      abytes(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least " + min);
      }
    }
    var assert = {
      number: anumber,
      bytes: abytes,
      hash: ahash,
      exists: aexists,
      output: aoutput
    };
    exports.default = assert;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.0/node_modules/@noble/hashes/cryptoNode.js
var require_cryptoNode2 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.0/node_modules/@noble/hashes/cryptoNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crypto = void 0;
    var nc = __require("crypto");
    exports.crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : nc && typeof nc === "object" && "randomBytes" in nc ? nc : void 0;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.0/node_modules/@noble/hashes/utils.js
var require_utils3 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.0/node_modules/@noble/hashes/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hash = exports.nextTick = exports.byteSwapIfBE = exports.byteSwap = exports.isLE = exports.rotl = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
    exports.isBytes = isBytes;
    exports.byteSwap32 = byteSwap32;
    exports.bytesToHex = bytesToHex;
    exports.hexToBytes = hexToBytes;
    exports.asyncLoop = asyncLoop;
    exports.utf8ToBytes = utf8ToBytes;
    exports.toBytes = toBytes;
    exports.concatBytes = concatBytes;
    exports.checkOpts = checkOpts;
    exports.wrapConstructor = wrapConstructor;
    exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
    exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
    exports.randomBytes = randomBytes;
    var crypto_1 = require_cryptoNode2();
    var _assert_js_1 = require_assert2();
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.u8 = u8;
    var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    exports.u32 = u32;
    var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.createView = createView;
    var rotr = (word, shift) => word << 32 - shift | word >>> shift;
    exports.rotr = rotr;
    var rotl = (word, shift) => word << shift | word >>> 32 - shift >>> 0;
    exports.rotl = rotl;
    exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    exports.byteSwap = byteSwap;
    exports.byteSwapIfBE = exports.isLE ? (n) => n : (n) => (0, exports.byteSwap)(n);
    function byteSwap32(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = (0, exports.byteSwap)(arr[i]);
      }
    }
    var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      (0, _assert_js_1.abytes)(bytes);
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
      }
      return hex;
    }
    var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("padded hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    var nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error("utf8ToBytes expected string, got " + typeof str);
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      (0, _assert_js_1.abytes)(data);
      return data;
    }
    function concatBytes(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        (0, _assert_js_1.abytes)(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    var Hash = class {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    };
    exports.Hash = Hash;
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    function wrapConstructor(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    function wrapConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function wrapXOFConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return crypto_1.crypto.randomBytes(bytesLength);
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.6.0/node_modules/@noble/hashes/hmac.js
var require_hmac = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.6.0/node_modules/@noble/hashes/hmac.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hmac = exports.HMAC = void 0;
    var _assert_js_1 = require_assert2();
    var utils_js_1 = require_utils3();
    var HMAC = class extends utils_js_1.Hash {
      constructor(hash4, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        (0, _assert_js_1.ahash)(hash4);
        const key = (0, utils_js_1.toBytes)(_key);
        this.iHash = hash4.create();
        if (typeof this.iHash.update !== "function")
          throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        pad.set(key.length > blockLen ? hash4.create().update(key).digest() : key);
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54;
        this.iHash.update(pad);
        this.oHash = hash4.create();
        for (let i = 0; i < pad.length; i++)
          pad[i] ^= 54 ^ 92;
        this.oHash.update(pad);
        pad.fill(0);
      }
      update(buf) {
        (0, _assert_js_1.aexists)(this);
        this.iHash.update(buf);
        return this;
      }
      digestInto(out) {
        (0, _assert_js_1.aexists)(this);
        (0, _assert_js_1.abytes)(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
      }
      digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
      }
      _cloneInto(to) {
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
      }
      destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
      }
    };
    exports.HMAC = HMAC;
    var hmac = (hash4, key, message) => new HMAC(hash4, key).update(message).digest();
    exports.hmac = hmac;
    exports.hmac.create = (hash4, key) => new HMAC(hash4, key);
  }
});

// ../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/_shortw_utils.js
var require_shortw_utils = __commonJS({
  "../../node_modules/.pnpm/@noble+curves@1.7.0/node_modules/@noble/curves/_shortw_utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getHash = getHash;
    exports.createCurve = createCurve;
    var hmac_1 = require_hmac();
    var utils_1 = require_utils3();
    var weierstrass_js_1 = require_weierstrass();
    function getHash(hash4) {
      return {
        hash: hash4,
        hmac: (key, ...msgs) => (0, hmac_1.hmac)(hash4, key, (0, utils_1.concatBytes)(...msgs)),
        randomBytes: utils_1.randomBytes
      };
    }
    function createCurve(curveDef, defHash) {
      const create2 = (hash4) => (0, weierstrass_js_1.weierstrass)({ ...curveDef, ...getHash(hash4) });
      return Object.freeze({ ...create2(defHash), create: create2 });
    }
  }
});

// ../../node_modules/.pnpm/@scure+starknet@1.1.0/node_modules/@scure/starknet/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/.pnpm/@scure+starknet@1.1.0/node_modules/@scure/starknet/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.poseidonSmall = exports.Fp251 = exports.keccak = exports.computeHashOnElements = exports.utils = exports.Signature = exports.ProjectivePoint = exports.CURVE = exports._starkCurve = exports.MAX_VALUE = void 0;
    exports.normalizePrivateKey = normalizePrivateKey;
    exports.getPublicKey = getPublicKey;
    exports.getSharedSecret = getSharedSecret;
    exports.sign = sign;
    exports.verify = verify;
    exports.grindKey = grindKey;
    exports.getStarkKey = getStarkKey;
    exports.ethSigToPrivate = ethSigToPrivate;
    exports.getAccountPath = getAccountPath;
    exports.pedersen = pedersen;
    exports._poseidonMDS = _poseidonMDS;
    exports.poseidonBasic = poseidonBasic;
    exports.poseidonCreate = poseidonCreate;
    exports.poseidonHash = poseidonHash;
    exports.poseidonHashFunc = poseidonHashFunc;
    exports.poseidonHashSingle = poseidonHashSingle;
    exports.poseidonHashMany = poseidonHashMany;
    var sha3_1 = require_sha3();
    var sha256_1 = require_sha256();
    var utils_1 = require_utils();
    var modular_1 = require_modular();
    var poseidon_1 = require_poseidon();
    var weierstrass_1 = require_weierstrass();
    var u = require_utils2();
    var _shortw_utils_1 = require_shortw_utils();
    var CURVE_ORDER = BigInt("3618502788666131213697322783095070105526743751716087489154079457884512865583");
    exports.MAX_VALUE = BigInt("0x800000000000000000000000000000000000000000000000000000000000000");
    var nBitLength = 252;
    function bits2int(bytes) {
      while (bytes[0] === 0)
        bytes = bytes.subarray(1);
      const delta = bytes.length * 8 - nBitLength;
      const num2 = u.bytesToNumberBE(bytes);
      return delta > 0 ? num2 >> BigInt(delta) : num2;
    }
    function hex0xToBytes(hex) {
      if (typeof hex === "string") {
        hex = strip0x(hex);
        if (hex.length & 1)
          hex = "0" + hex;
      }
      return u.hexToBytes(hex);
    }
    var curve = (0, weierstrass_1.weierstrass)({
      a: BigInt(1),
      // Params: a, b
      b: BigInt("3141592653589793238462643383279502884197169399375105820974944592307816406665"),
      // Field over which we'll do calculations; 2n**251n + 17n * 2n**192n + 1n
      // There is no efficient sqrt for field (P%4==1)
      Fp: (0, modular_1.Field)(BigInt("0x800000000000011000000000000000000000000000000000000000000000001")),
      n: CURVE_ORDER,
      // Curve order, total count of valid points in the field.
      nBitLength,
      // len(bin(N).replace('0b',''))
      // Base point (x, y) aka generator point
      Gx: BigInt("874739451078007766457464989774322083649278607533249481151382481072868806602"),
      Gy: BigInt("152666792071518830868575557812948353041420400780739481342941381225525861407"),
      h: BigInt(1),
      // cofactor
      lowS: false,
      // Allow high-s signatures
      ...(0, _shortw_utils_1.getHash)(sha256_1.sha256),
      // Custom truncation routines for stark curve
      bits2int,
      bits2int_modN: (bytes) => {
        const hex = u.bytesToNumberBE(bytes).toString(16);
        if (hex.length === 63)
          bytes = hex0xToBytes(hex + "0");
        return (0, modular_1.mod)(bits2int(bytes), CURVE_ORDER);
      }
    });
    exports._starkCurve = curve;
    function ensureBytes(hex) {
      return u.ensureBytes("", typeof hex === "string" ? hex0xToBytes(hex) : hex);
    }
    function normalizePrivateKey(privKey) {
      return u.bytesToHex(ensureBytes(privKey)).padStart(64, "0");
    }
    function getPublicKey(privKey, isCompressed = false) {
      return curve.getPublicKey(normalizePrivateKey(privKey), isCompressed);
    }
    function getSharedSecret(privKeyA, pubKeyB) {
      return curve.getSharedSecret(normalizePrivateKey(privKeyA), pubKeyB);
    }
    function checkSignature(signature) {
      const { r, s } = signature;
      if (r < 0n || r >= exports.MAX_VALUE)
        throw new Error(`Signature.r should be [1, ${exports.MAX_VALUE})`);
      const w = (0, modular_1.invert)(s, CURVE_ORDER);
      if (w < 0n || w >= exports.MAX_VALUE)
        throw new Error(`inv(Signature.s) should be [1, ${exports.MAX_VALUE})`);
    }
    function checkMessage(msgHash) {
      const bytes = ensureBytes(msgHash);
      const num2 = u.bytesToNumberBE(bytes);
      if (num2 >= exports.MAX_VALUE)
        throw new Error(`msgHash should be [0, ${exports.MAX_VALUE})`);
      return bytes;
    }
    function sign(msgHash, privKey, opts) {
      const sig = curve.sign(checkMessage(msgHash), normalizePrivateKey(privKey), opts);
      checkSignature(sig);
      return sig;
    }
    function verify(signature, msgHash, pubKey) {
      if (!(signature instanceof Signature)) {
        const bytes = ensureBytes(signature);
        try {
          signature = Signature.fromDER(bytes);
        } catch (derError) {
          if (!(derError instanceof weierstrass_1.DER.Err))
            throw derError;
          signature = Signature.fromCompact(bytes);
        }
      }
      checkSignature(signature);
      return curve.verify(signature, checkMessage(msgHash), ensureBytes(pubKey));
    }
    var { CURVE, ProjectivePoint, Signature, utils } = curve;
    exports.CURVE = CURVE;
    exports.ProjectivePoint = ProjectivePoint;
    exports.Signature = Signature;
    exports.utils = utils;
    function extractX(bytes) {
      const hex = u.bytesToHex(bytes.subarray(1));
      const stripped = hex.replace(/^0+/gm, "");
      return `0x${stripped}`;
    }
    function strip0x(hex) {
      return hex.replace(/^0x/i, "");
    }
    function grindKey(seed) {
      const _seed = ensureBytes(seed);
      const sha256mask = 2n ** 256n;
      const limit = sha256mask - (0, modular_1.mod)(sha256mask, CURVE_ORDER);
      for (let i = 0; ; i++) {
        const key = sha256Num(u.concatBytes(_seed, u.numberToVarBytesBE(BigInt(i))));
        if (key < limit)
          return (0, modular_1.mod)(key, CURVE_ORDER).toString(16);
        if (i === 1e5)
          throw new Error("grindKey is broken: tried 100k vals");
      }
    }
    function getStarkKey(privateKey) {
      return extractX(getPublicKey(privateKey, true));
    }
    function ethSigToPrivate(signature) {
      signature = strip0x(signature);
      if (signature.length !== 130)
        throw new Error("Wrong ethereum signature");
      return grindKey(signature.substring(0, 64));
    }
    var MASK_31 = 2n ** 31n - 1n;
    var int31 = (n) => Number(n & MASK_31);
    function getAccountPath(layer, application, ethereumAddress, index) {
      const layerNum = int31(sha256Num(layer));
      const applicationNum = int31(sha256Num(application));
      const eth = u.hexToNumber(strip0x(ethereumAddress));
      return `m/2645'/${layerNum}'/${applicationNum}'/${int31(eth)}'/${int31(eth >> 31n)}'/${index}`;
    }
    var PEDERSEN_POINTS = [
      new ProjectivePoint(2089986280348253421170679821480865132823066470938446095505822317253594081284n, 1713931329540660377023406109199410414810705867260802078187082345529207694986n, 1n),
      new ProjectivePoint(996781205833008774514500082376783249102396023663454813447423147977397232763n, 1668503676786377725805489344771023921079126552019160156920634619255970485781n, 1n),
      new ProjectivePoint(2251563274489750535117886426533222435294046428347329203627021249169616184184n, 1798716007562728905295480679789526322175868328062420237419143593021674992973n, 1n),
      new ProjectivePoint(2138414695194151160943305727036575959195309218611738193261179310511854807447n, 113410276730064486255102093846540133784865286929052426931474106396135072156n, 1n),
      new ProjectivePoint(2379962749567351885752724891227938183011949129833673362440656643086021394946n, 776496453633298175483985398648758586525933812536653089401905292063708816422n, 1n)
    ];
    function pedersenPrecompute(p1, p2) {
      const out = [];
      let p = p1;
      for (let i = 0; i < 248; i++) {
        out.push(p);
        p = p.double();
      }
      p = p2;
      for (let i = 0; i < 4; i++) {
        out.push(p);
        p = p.double();
      }
      return out;
    }
    var PEDERSEN_POINTS1 = pedersenPrecompute(PEDERSEN_POINTS[1], PEDERSEN_POINTS[2]);
    var PEDERSEN_POINTS2 = pedersenPrecompute(PEDERSEN_POINTS[3], PEDERSEN_POINTS[4]);
    function pedersenArg(arg) {
      let value;
      if (typeof arg === "bigint") {
        value = arg;
      } else if (typeof arg === "number") {
        if (!Number.isSafeInteger(arg))
          throw new Error(`Invalid pedersenArg: ${arg}`);
        value = BigInt(arg);
      } else {
        value = u.bytesToNumberBE(ensureBytes(arg));
      }
      if (!(0n <= value && value < curve.CURVE.Fp.ORDER))
        throw new Error(`PedersenArg should be 0 <= value < CURVE.P: ${value}`);
      return value;
    }
    function pedersenSingle(point, value, constants) {
      let x = pedersenArg(value);
      for (let j = 0; j < 252; j++) {
        const pt = constants[j];
        if (!pt)
          throw new Error("invalid constant index");
        if (pt.equals(point))
          throw new Error("Same point");
        if ((x & 1n) !== 0n)
          point = point.add(pt);
        x >>= 1n;
      }
      return point;
    }
    function pedersen(x, y) {
      let point = PEDERSEN_POINTS[0];
      point = pedersenSingle(point, x, PEDERSEN_POINTS1);
      point = pedersenSingle(point, y, PEDERSEN_POINTS2);
      return extractX(point.toRawBytes(true));
    }
    var computeHashOnElements = (data, fn = pedersen) => [0, ...data, data.length].reduce((x, y) => fn(x, y));
    exports.computeHashOnElements = computeHashOnElements;
    var MASK_250 = u.bitMask(250);
    var keccak = (data) => u.bytesToNumberBE((0, sha3_1.keccak_256)(data)) & MASK_250;
    exports.keccak = keccak;
    var sha256Num = (data) => u.bytesToNumberBE((0, sha256_1.sha256)(data));
    exports.Fp251 = (0, modular_1.Field)(BigInt("3618502788666131213697322783095070105623107215331596699973092056135872020481"));
    function poseidonRoundConstant(Fp, name, idx) {
      const val = Fp.fromBytes((0, sha256_1.sha256)((0, utils_1.utf8ToBytes)(`${name}${idx}`)));
      return Fp.create(val);
    }
    function _poseidonMDS(Fp, name, m, attempt = 0) {
      const x_values = [];
      const y_values = [];
      for (let i = 0; i < m; i++) {
        x_values.push(poseidonRoundConstant(Fp, `${name}x`, attempt * m + i));
        y_values.push(poseidonRoundConstant(Fp, `${name}y`, attempt * m + i));
      }
      if ((/* @__PURE__ */ new Set([...x_values, ...y_values])).size !== 2 * m)
        throw new Error("X and Y values are not distinct");
      return x_values.map((x) => y_values.map((y) => Fp.inv(Fp.sub(x, y))));
    }
    var MDS_SMALL = [
      [3, 1, 1],
      [1, -1, 1],
      [1, 1, -2]
    ].map((i) => i.map(BigInt));
    function poseidonBasic(opts, mds) {
      (0, modular_1.validateField)(opts.Fp);
      if (!Number.isSafeInteger(opts.rate) || !Number.isSafeInteger(opts.capacity))
        throw new Error(`Wrong poseidon opts: ${opts}`);
      const m = opts.rate + opts.capacity;
      const rounds = opts.roundsFull + opts.roundsPartial;
      const roundConstants = [];
      for (let i = 0; i < rounds; i++) {
        const row = [];
        for (let j = 0; j < m; j++)
          row.push(poseidonRoundConstant(opts.Fp, "Hades", m * i + j));
        roundConstants.push(row);
      }
      const res = (0, poseidon_1.poseidon)({
        ...opts,
        t: m,
        sboxPower: 3,
        reversePartialPowIdx: true,
        // Why?!
        mds,
        roundConstants
      });
      res.m = m;
      res.rate = opts.rate;
      res.capacity = opts.capacity;
      return res;
    }
    function poseidonCreate(opts, mdsAttempt = 0) {
      const m = opts.rate + opts.capacity;
      if (!Number.isSafeInteger(mdsAttempt))
        throw new Error(`Wrong mdsAttempt=${mdsAttempt}`);
      return poseidonBasic(opts, _poseidonMDS(opts.Fp, "HadesMDS", m, mdsAttempt));
    }
    exports.poseidonSmall = poseidonBasic({ Fp: exports.Fp251, rate: 2, capacity: 1, roundsFull: 8, roundsPartial: 83 }, MDS_SMALL);
    function poseidonHash(x, y, fn = exports.poseidonSmall) {
      return fn([x, y, 2n])[0];
    }
    function poseidonHashFunc(x, y, fn = exports.poseidonSmall) {
      return u.numberToVarBytesBE(poseidonHash(u.bytesToNumberBE(x), u.bytesToNumberBE(y), fn));
    }
    function poseidonHashSingle(x, fn = exports.poseidonSmall) {
      return fn([x, 0n, 1n])[0];
    }
    function poseidonHashMany(values, fn = exports.poseidonSmall) {
      const { m, rate } = fn;
      if (!Array.isArray(values))
        throw new Error("bigint array expected in values");
      const padded = Array.from(values);
      padded.push(1n);
      while (padded.length % rate !== 0)
        padded.push(0n);
      let state = new Array(m).fill(0n);
      for (let i = 0; i < padded.length; i += rate) {
        for (let j = 0; j < rate; j++) {
          const item = padded[i + j];
          if (typeof item === "undefined")
            throw new Error("invalid index");
          if (typeof state[j] === "undefined")
            throw new Error("state[j] is undefined");
          state[j] = state[j] + item;
        }
        state = fn(state);
      }
      return state[0];
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CURVE_ORDER = void 0;
    var starknet_1 = require_lib();
    exports.CURVE_ORDER = starknet_1.CURVE.n;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/types.js
var require_types = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectivePoint = exports.CURVE_ORDER = void 0;
    var starknet_1 = require_lib();
    var constants_js_1 = require_constants();
    Object.defineProperty(exports, "CURVE_ORDER", { enumerable: true, get: function() {
      return constants_js_1.CURVE_ORDER;
    } });
    exports.ProjectivePoint = starknet_1.ProjectivePoint;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/utils.js
var require_utils4 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateRandom = generateRandom;
    exports.in_curve_order = in_curve_order;
    exports.validate_challenge = validate_challenge;
    exports.reduce_modulo_order = reduce_modulo_order;
    exports.compute_challenge = compute_challenge;
    exports.compute_s = compute_s;
    exports.subtract_modulo_curve_order = subtract_modulo_curve_order;
    var starknet_1 = require_lib();
    var constants_js_1 = require_constants();
    function generateRandom() {
      const random_bytes = starknet_1.utils.randomPrivateKey();
      return starknet_1.utils.normPrivateKeyToScalar(random_bytes);
    }
    function in_curve_order(number) {
      if (number < constants_js_1.CURVE_ORDER) {
        return true;
      }
      ;
      return false;
    }
    function validate_challenge(challenge) {
      if (challenge == 0n) {
        return false;
      }
      return in_curve_order(challenge);
    }
    function reduce_modulo_order(number) {
      return number % constants_js_1.CURVE_ORDER;
    }
    function compute_challenge(prefix, commitments) {
      const arr = [prefix];
      commitments.forEach((commit) => {
        const { x, y } = commit.toAffine();
        arr.push(x);
        arr.push(y);
      });
      return reduce_modulo_order((0, starknet_1.poseidonHashMany)(arr));
    }
    function compute_s(k, x, c) {
      return (k + x * c) % constants_js_1.CURVE_ORDER;
    }
    function subtract_modulo_curve_order(lhs, rhs) {
      return ((lhs - rhs) % constants_js_1.CURVE_ORDER + constants_js_1.CURVE_ORDER) % constants_js_1.CURVE_ORDER;
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/exceptions.js
var require_exceptions = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/exceptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LengthMismatchError = exports.PreconditionError = exports.OutOfRangeError = exports.InvalidInputError = exports.ProtocolError = void 0;
    var ProtocolError = class extends Error {
      constructor(message, errorCode) {
        super(message);
        __publicField(this, "errorCode");
        this.errorCode = errorCode;
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    };
    exports.ProtocolError = ProtocolError;
    var InvalidInputError = class extends ProtocolError {
      constructor(message) {
        super(message, "INVALID_INPUT");
      }
    };
    exports.InvalidInputError = InvalidInputError;
    var OutOfRangeError = class extends ProtocolError {
      constructor(message, value, range) {
        super(message, "OUT_OF_RANGE");
        __publicField(this, "value");
        __publicField(this, "range");
        this.value = value;
        this.range = range;
      }
    };
    exports.OutOfRangeError = OutOfRangeError;
    var PreconditionError = class extends ProtocolError {
      constructor(message) {
        super(message, "PRECONDITION_FAILED");
      }
    };
    exports.PreconditionError = PreconditionError;
    var LengthMismatchError = class extends InvalidInputError {
      constructor(expected, actual, context = "arrays") {
        super(`Length mismatch: expected ${expected} but got ${actual} for ${context}`);
      }
    };
    exports.LengthMismatchError = LengthMismatchError;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/index.js
var require_lib2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_constants(), exports);
    __exportStar(require_types(), exports);
    __exportStar(require_utils4(), exports);
    __exportStar(require_exceptions(), exports);
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/poe.js
var require_poe = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/poe.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verify = verify;
    exports.verify_with_prefix = verify_with_prefix;
    exports._verify = _verify;
    exports.prove = prove;
    var utils_js_1 = require_utils4();
    function verify(inputs, proof) {
      const { y, g } = inputs;
      const { A, c, s } = proof;
      return _verify(y, g, A, c, s);
    }
    function verify_with_prefix(inputs, proof) {
      const { y, g } = inputs;
      const { A, prefix, s } = proof;
      const commitments = [A];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      return _verify(y, g, A, c, s);
    }
    function _verify(y, g, A, c, s) {
      if (!(0, utils_js_1.in_curve_order)(s)) {
        throw new Error(" s not in curve order");
      }
      ;
      if (!(0, utils_js_1.validate_challenge)(c)) {
        throw new Error("invalid challenge");
      }
      ;
      const LHS = g.multiplyUnsafe(s);
      const RHS = A.add(y.multiplyUnsafe(c));
      return LHS.equals(RHS);
    }
    function prove(x, g, prefix) {
      const y = g.multiply(x);
      const inputs = { y, g };
      const k = (0, utils_js_1.generateRandom)();
      const A = g.multiplyUnsafe(k);
      const c = (0, utils_js_1.compute_challenge)(prefix, [A]);
      const s = (0, utils_js_1.compute_s)(k, x, c);
      const proof = { A, s, prefix };
      return { inputs, proof };
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/poe2.js
var require_poe2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/poe2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verify = verify;
    exports.verify_with_prefix = verify_with_prefix;
    exports._verify = _verify;
    exports.prove = prove;
    var utils_js_1 = require_utils4();
    function verify(inputs, proof) {
      const { y, g1, g2 } = inputs;
      const { A, c, s1, s2 } = proof;
      return _verify(y, g1, g2, A, c, s1, s2);
    }
    function verify_with_prefix(inputs, proof) {
      const { y, g1, g2 } = inputs;
      const { A, prefix, s1, s2 } = proof;
      const commitments = [A];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      return _verify(y, g1, g2, A, c, s1, s2);
    }
    function _verify(y, g1, g2, A, c, s1, s2) {
      if (!(0, utils_js_1.in_curve_order)(s1)) {
        throw new Error(" s1 not in curve order");
      }
      ;
      if (!(0, utils_js_1.in_curve_order)(s2)) {
        throw new Error(" s2 not in curve order");
      }
      ;
      if (!(0, utils_js_1.validate_challenge)(c)) {
        throw new Error("invalid challenge");
      }
      ;
      const LHS = g1.multiplyUnsafe(s1).add(g2.multiplyUnsafe(s2));
      const RHS = A.add(y.multiplyUnsafe(c));
      return LHS.equals(RHS);
    }
    function prove(x1, x2, g1, g2, prefix) {
      const y = g1.multiply(x1).add(g2.multiply(x2));
      const inputs = { y, g1, g2 };
      const k1 = (0, utils_js_1.generateRandom)();
      const k2 = (0, utils_js_1.generateRandom)();
      const A = g1.multiplyUnsafe(k1).add(g2.multiplyUnsafe(k2));
      const c = (0, utils_js_1.compute_challenge)(prefix, [A]);
      const s1 = (0, utils_js_1.compute_s)(k1, x1, c);
      const s2 = (0, utils_js_1.compute_s)(k2, x2, c);
      const proof = { A, prefix, s1, s2 };
      return { inputs, proof };
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/poeN.js
var require_poeN = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/poeN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verify = verify;
    exports.verify_with_prefix = verify_with_prefix;
    exports._verify = _verify;
    exports.prove = prove;
    var exceptions_js_1 = require_exceptions();
    var types_js_1 = require_types();
    var utils_js_1 = require_utils4();
    function verify(inputs, proof) {
      const { y, generators } = inputs;
      const { A, c, ss } = proof;
      return _verify(y, generators, A, c, ss);
    }
    function verify_with_prefix(inputs, proof) {
      const { y, generators } = inputs;
      const { A, prefix, ss } = proof;
      const commitments = [A];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      return _verify(y, generators, A, c, ss);
    }
    function _verify(y, generators, A, c, ss) {
      if (generators.length !== ss.length) {
        throw new exceptions_js_1.LengthMismatchError(generators.length, ss.length, "generators and responses");
      }
      if (!(0, utils_js_1.validate_challenge)(c)) {
        throw new Error("invalid challenge");
      }
      ;
      let LHS = types_js_1.ProjectivePoint.ZERO;
      for (let i = 0; i < generators.length; i++) {
        if (!(0, utils_js_1.in_curve_order)(ss[i])) {
          throw new Error(" s not in curve order");
        }
        ;
        LHS = LHS.add(generators[i].multiplyUnsafe(ss[i]));
      }
      const RHS = A.add(y.multiplyUnsafe(c));
      return LHS.equals(RHS);
    }
    function prove(scalars, generators, prefix) {
      if (generators.length !== scalars.length) {
        throw new exceptions_js_1.LengthMismatchError(generators.length, scalars.length, "generators and scalars");
      }
      let ks = [];
      let y = types_js_1.ProjectivePoint.ZERO;
      let A = types_js_1.ProjectivePoint.ZERO;
      for (let i = 0; i < generators.length; i++) {
        const g = generators[i];
        const k = (0, utils_js_1.generateRandom)();
        y = y.add(g.multiply(scalars[i]));
        A = A.add(g.multiply(k));
        ks.push(k);
      }
      const inputs = { y, generators };
      const commitments = [A];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      const ss = [];
      for (let i = 0; i < generators.length; i++) {
        ss.push((0, utils_js_1.compute_s)(ks[i], scalars[i], c));
      }
      const proof = { A, prefix, ss };
      return { inputs, proof };
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/bit.js
var require_bit = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/bit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verify = verify;
    exports.verify_with_prefix = verify_with_prefix;
    exports._verify = _verify;
    exports.prove = prove;
    var utils_js_1 = require_utils4();
    var poe_js_1 = require_poe();
    function verify(inputs, proof) {
      const { V, g1, g2 } = inputs;
      const { A0, A1, c, c0, s0, s1 } = proof;
      return _verify(V, g1, g2, A0, A1, c, c0, s0, s1);
    }
    function verify_with_prefix(inputs, proof) {
      const { V, g1, g2 } = inputs;
      const { A0, A1, prefix, c0, s0, s1 } = proof;
      const commitments = [V, A0, A1];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      return _verify(V, g1, g2, A0, A1, c, c0, s0, s1);
    }
    function _verify(V, g1, g2, A0, A1, c, c0, s0, s1) {
      if (!(0, utils_js_1.validate_challenge)(c)) {
        throw new Error("invalid challenge");
      }
      ;
      const c1 = (0, utils_js_1.subtract_modulo_curve_order)(c, c0);
      if (!(0, poe_js_1._verify)(V, g2, A0, c0, s0)) {
        return false;
      }
      const V1 = V.subtract(g1);
      if (!(0, poe_js_1._verify)(V1, g2, A1, c1, s1)) {
        return false;
      }
      return true;
    }
    function simulatePOE(y, gen) {
      const s = (0, utils_js_1.generateRandom)();
      const c = (0, utils_js_1.generateRandom)();
      const A = gen.multiplyUnsafe(s).subtract(y.multiplyUnsafe(c));
      return { A, c, s };
    }
    function _proveBit0(random, g1, g2, prefix) {
      const V = g2.multiplyUnsafe(random);
      const inputs = { V, g1, g2 };
      const V1 = V.subtract(g1);
      const { A: A1, c: c1, s: s1 } = simulatePOE(V1, g2);
      const k = (0, utils_js_1.generateRandom)();
      const A0 = g2.multiply(k);
      const commitments = [V, A0, A1];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      const c0 = (0, utils_js_1.subtract_modulo_curve_order)(c, c1);
      const s0 = (0, utils_js_1.compute_s)(k, random, c0);
      const proof = { A0, A1, prefix, c0, s0, s1 };
      return { inputs, proof };
    }
    function _proveBit1(random, g1, g2, prefix) {
      const V = g1.add(g2.multiplyUnsafe(random));
      const inputs = { V, g1, g2 };
      const V0 = V;
      const { A: A0, c: c0, s: s0 } = simulatePOE(V0, g2);
      const k = (0, utils_js_1.generateRandom)();
      const A1 = g2.multiply(k);
      const commitments = [V, A0, A1];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      const c1 = (0, utils_js_1.subtract_modulo_curve_order)(c, c0);
      const s1 = (0, utils_js_1.compute_s)(k, random, c1);
      const proof = { A0, A1, prefix, c0, s0, s1 };
      return { inputs, proof };
    }
    function prove(bit, random, g1, g2, prefix) {
      return bit === 0 ? _proveBit0(random, g1, g2, prefix) : _proveBit1(random, g1, g2, prefix);
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/range.js
var require_range = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/range.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verify = verify;
    exports.pregenerate_randomness = pregenerate_randomness;
    exports.prove = prove;
    var constants_js_1 = require_constants();
    var exceptions_js_1 = require_exceptions();
    var types_js_1 = require_types();
    var utils_js_1 = require_utils4();
    var bit_js_1 = require_bit();
    function verify(inputs, proof) {
      const { g1, g2, bit_size, commitments } = inputs;
      const { proofs } = proof;
      if (commitments.length !== bit_size || proofs.length !== bit_size) {
        throw new exceptions_js_1.LengthMismatchError(commitments.length, bit_size, "commitments and bit_size");
      }
      const initial_prefix = proofs[0].prefix;
      let V_total = types_js_1.ProjectivePoint.ZERO;
      for (let i = 0; i < bit_size; i++) {
        const pow = 2n ** BigInt(i);
        const V = commitments[i];
        const pi = proofs[i];
        if (pi.prefix !== initial_prefix + BigInt(i)) {
          return false;
        }
        const bit_inputs = { V, g1, g2 };
        if (!(0, bit_js_1.verify_with_prefix)(bit_inputs, pi)) {
          return false;
        }
        V_total = V_total.add(V.multiply(pow));
      }
      return V_total;
    }
    function pregenerate_randomness(bit_size) {
      let randomness = [];
      let r = 0n;
      for (let i = 0; i < bit_size; i++) {
        const pow = 2n ** BigInt(i);
        const r_i = (0, utils_js_1.generateRandom)();
        randomness.push(r_i);
        r = (r + r_i * pow) % constants_js_1.CURVE_ORDER;
      }
      return { randomness, total_random: r };
    }
    function prove(b, bit_size, g1, g2, randomness, initial_prefix) {
      if (b >= 2 ** bit_size) {
        throw new exceptions_js_1.OutOfRangeError(`Value ${b} is not in range [0, ${2 ** bit_size - 1}]`, b, `[0, ${2 ** bit_size - 1}]`);
      }
      if (randomness.length !== bit_size) {
        throw new Error(`Randomness length does not match bit_size`);
      }
      const b_bin = b.toString(2).padStart(bit_size, "0").split("").map(Number).map((x) => x).reverse();
      const proofs = [];
      const commitments = [];
      let r = 0n;
      for (let i = 0; i < bit_size; i++) {
        const pow = 2n ** BigInt(i);
        const r_inn = randomness[i];
        const { inputs: inputs2, proof } = (0, bit_js_1.prove)(b_bin[i], r_inn, g1, g2, initial_prefix + BigInt(i));
        proofs.push(proof);
        commitments.push(inputs2.V);
        r = (r + r_inn * pow) % constants_js_1.CURVE_ORDER;
      }
      const inputs = { commitments, g1, g2, bit_size };
      const rangeproof = { proofs };
      return { inputs, proofs: rangeproof, r };
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/ElGamal.js
var require_ElGamal = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/ElGamal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verify = verify;
    exports.verify_with_prefix = verify_with_prefix;
    exports._verify = _verify;
    exports.prove = prove;
    var utils_js_1 = require_utils4();
    var poe_js_1 = require_poe();
    var poe2_js_1 = require_poe2();
    function verify(inputs, proof) {
      const { L, R, g1, g2 } = inputs;
      const { AL, AR, c, sb, sr } = proof;
      return _verify(L, R, g1, g2, AL, AR, c, sb, sr);
    }
    function verify_with_prefix(inputs, proof) {
      const { L, R, g1, g2 } = inputs;
      const { AL, AR, prefix, sb, sr } = proof;
      const commitments = [AL, AR];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      return _verify(L, R, g1, g2, AL, AR, c, sb, sr);
    }
    function _verify(L, R, g1, g2, AL, AR, c, sb, sr) {
      if (!(0, poe_js_1._verify)(R, g1, AR, c, sr)) {
        return false;
      }
      if (!(0, poe2_js_1._verify)(L, g1, g2, AL, c, sb, sr)) {
        return false;
      }
      return true;
    }
    function prove(message, random, g1, g2, prefix) {
      const L = g1.multiply(message).add(g2.multiplyUnsafe(random));
      const R = g1.multiplyUnsafe(random);
      const kb = (0, utils_js_1.generateRandom)();
      const kr = (0, utils_js_1.generateRandom)();
      const AL = g1.multiply(kb).add(g2.multiply(kr));
      const AR = g1.multiply(kr);
      const c = (0, utils_js_1.compute_challenge)(prefix, [AL, AR]);
      const sr = (0, utils_js_1.compute_s)(kr, random, c);
      const sb = (0, utils_js_1.compute_s)(kb, message, c);
      const inputs = { L, R, g1, g2 };
      const proof = { AL, AR, sb, sr, prefix };
      return { inputs, proof };
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/sameEncryption.js
var require_sameEncryption = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/sameEncryption.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verify = verify;
    exports.verify_with_prefix = verify_with_prefix;
    exports._verify = _verify;
    exports.prove = prove;
    var utils_js_1 = require_utils4();
    var ElGamal_js_1 = require_ElGamal();
    function verify(inputs, proof) {
      const { L1, R1, L2, R2, g, y1, y2 } = inputs;
      const { AL1, AR1, AL2, AR2, c, sb, sr1, sr2 } = proof;
      return _verify(L1, R1, L2, R2, g, y1, y2, AL1, AR1, AL2, AR2, c, sb, sr1, sr2);
    }
    function verify_with_prefix(inputs, proof) {
      const { L1, R1, L2, R2, g, y1, y2 } = inputs;
      const { AL1, AR1, AL2, AR2, prefix, sb, sr1, sr2 } = proof;
      const commitments = [AL1, AR1, AL2, AR2];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      return _verify(L1, R1, L2, R2, g, y1, y2, AL1, AR1, AL2, AR2, c, sb, sr1, sr2);
    }
    function _verify(L1, R1, L2, R2, g, y1, y2, AL1, AR1, AL2, AR2, c, sb, sr1, sr2) {
      if (!(0, ElGamal_js_1._verify)(L1, R1, g, y1, AL1, AR1, c, sb, sr1)) {
        return false;
      }
      if (!(0, ElGamal_js_1._verify)(L2, R2, g, y2, AL2, AR2, c, sb, sr2)) {
        return false;
      }
      return true;
    }
    function prove(g, y1, y2, message, random1, random2, prefix) {
      const L1 = g.multiply(message).add(y1.multiply(random1));
      const R1 = g.multiply(random1);
      const L2 = g.multiply(message).add(y2.multiply(random2));
      const R2 = g.multiply(random2);
      const inputs = { L1, R1, L2, R2, y1, y2, g };
      const kb = (0, utils_js_1.generateRandom)();
      const kr1 = (0, utils_js_1.generateRandom)();
      const kr2 = (0, utils_js_1.generateRandom)();
      const AL1 = g.multiply(kb).add(y1.multiply(kr1));
      const AR1 = g.multiply(kr1);
      const AL2 = g.multiply(kb).add(y2.multiply(kr2));
      const AR2 = g.multiply(kr2);
      const commitments = [AL1, AR1, AL2, AR2];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      const sb = (0, utils_js_1.compute_s)(kb, message, c);
      const sr1 = (0, utils_js_1.compute_s)(kr1, random1, c);
      const sr2 = (0, utils_js_1.compute_s)(kr2, random2, c);
      const proof = { AL1, AR1, AL2, AR2, prefix, sb, sr1, sr2 };
      return { inputs, proof };
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/sameEncryptionUnknownRandom.js
var require_sameEncryptionUnknownRandom = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols/sameEncryptionUnknownRandom.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verify = verify;
    exports.verify_with_prefix = verify_with_prefix;
    exports._verify = _verify;
    exports.prove = prove;
    var utils_js_1 = require_utils4();
    var exceptions_js_1 = require_exceptions();
    var ElGamal_js_1 = require_ElGamal();
    var poe_js_1 = require_poe();
    var poe2_js_1 = require_poe2();
    function verify(inputs, proof) {
      const { L1, R1, L2, R2, g, y1, y2 } = inputs;
      const { Ax, AL1, AL2, AR2, c, sb, sx, sr2 } = proof;
      return _verify(L1, R1, L2, R2, g, y1, y2, Ax, AL1, AL2, AR2, c, sb, sx, sr2);
    }
    function verify_with_prefix(inputs, proof) {
      const { L1, R1, L2, R2, g, y1, y2 } = inputs;
      const { Ax, AL1, AL2, AR2, prefix, sb, sx, sr2 } = proof;
      const commitments = [Ax, AL1, AL2, AR2];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      return _verify(L1, R1, L2, R2, g, y1, y2, Ax, AL1, AL2, AR2, c, sb, sx, sr2);
    }
    function _verify(L1, R1, L2, R2, g, y1, y2, Ax, AL1, AL2, AR2, c, sb, sx, sr2) {
      if (!(0, poe_js_1._verify)(y1, g, Ax, c, sx)) {
        return false;
      }
      if (!(0, poe2_js_1._verify)(L1, g, R1, AL1, c, sb, sx)) {
        return false;
      }
      if (!(0, ElGamal_js_1._verify)(L2, R2, g, y2, AL2, AR2, c, sb, sr2)) {
        return false;
      }
      return true;
    }
    function prove(g, secret1, y2, L1, R1, message, random2, prefix) {
      const y = g.multiply(secret1);
      const g_message = L1.subtract(R1.multiply(secret1));
      if (!g_message.equals(g.multiply(message))) {
        throw new exceptions_js_1.PreconditionError("The provided ciphertext (L1, R1) does not encrypt the specified message under the derived public key");
      }
      const L2 = g.multiply(message).add(y2.multiply(random2));
      const R2 = g.multiply(random2);
      const inputs = { L1, R1, L2, R2, g, y1: y, y2 };
      const kx1 = (0, utils_js_1.generateRandom)();
      const kb = (0, utils_js_1.generateRandom)();
      const kr2 = (0, utils_js_1.generateRandom)();
      const Ax = g.multiply(kx1);
      const AL1 = g.multiply(kb).add(R1.multiply(kx1));
      const AL2 = g.multiply(kb).add(y2.multiply(kr2));
      const AR2 = g.multiply(kr2);
      const commitments = [Ax, AL1, AL2, AR2];
      const c = (0, utils_js_1.compute_challenge)(prefix, commitments);
      const sx = (0, utils_js_1.compute_s)(kx1, secret1, c);
      const sb = (0, utils_js_1.compute_s)(kb, message, c);
      const sr2 = (0, utils_js_1.compute_s)(kr2, random2, c);
      const proof = { Ax, AL1, AL2, AR2, prefix, sx, sb, sr2 };
      return { inputs, proof };
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols.js
var require_protocols = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+she@0.4.0/node_modules/@fatsolutions/she/lib/protocols.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SameEncryptUnknownRandom = exports.SameEncrypt = exports.ElGamal = exports.range = exports.bit = exports.poeN = exports.poe2 = exports.poe = void 0;
    exports.poe = __importStar(require_poe());
    exports.poe2 = __importStar(require_poe2());
    exports.poeN = __importStar(require_poeN());
    exports.bit = __importStar(require_bit());
    exports.range = __importStar(require_range());
    exports.ElGamal = __importStar(require_ElGamal());
    exports.SameEncrypt = __importStar(require_sameEncryption());
    exports.SameEncryptUnknownRandom = __importStar(require_sameEncryptionUnknownRandom());
  }
});

// ../../node_modules/.pnpm/@scure+base@1.2.5/node_modules/@scure/base/lib/index.js
var require_lib3 = __commonJS({
  "../../node_modules/.pnpm/@scure+base@1.2.5/node_modules/@scure/base/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bytes = exports.stringToBytes = exports.str = exports.bytesToString = exports.hex = exports.utf8 = exports.bech32m = exports.bech32 = exports.base58check = exports.createBase58check = exports.base58xmr = exports.base58xrp = exports.base58flickr = exports.base58 = exports.base64urlnopad = exports.base64url = exports.base64nopad = exports.base64 = exports.base32crockford = exports.base32hexnopad = exports.base32hex = exports.base32nopad = exports.base32 = exports.base16 = exports.utils = void 0;
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function abytes(b, ...lengths) {
      if (!isBytes(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function isArrayOf(isString, arr) {
      if (!Array.isArray(arr))
        return false;
      if (arr.length === 0)
        return true;
      if (isString) {
        return arr.every((item) => typeof item === "string");
      } else {
        return arr.every((item) => Number.isSafeInteger(item));
      }
    }
    function afn(input) {
      if (typeof input !== "function")
        throw new Error("function expected");
      return true;
    }
    function astr(label, input) {
      if (typeof input !== "string")
        throw new Error(`${label}: string expected`);
      return true;
    }
    function anumber(n) {
      if (!Number.isSafeInteger(n))
        throw new Error(`invalid integer: ${n}`);
    }
    function aArr(input) {
      if (!Array.isArray(input))
        throw new Error("array expected");
    }
    function astrArr(label, input) {
      if (!isArrayOf(true, input))
        throw new Error(`${label}: array of strings expected`);
    }
    function anumArr(label, input) {
      if (!isArrayOf(false, input))
        throw new Error(`${label}: array of numbers expected`);
    }
    // @__NO_SIDE_EFFECTS__
    function chain(...args) {
      const id = (a) => a;
      const wrap = (a, b) => (c) => a(b(c));
      const encode = args.map((x) => x.encode).reduceRight(wrap, id);
      const decode = args.map((x) => x.decode).reduce(wrap, id);
      return { encode, decode };
    }
    // @__NO_SIDE_EFFECTS__
    function alphabet(letters) {
      const lettersA = typeof letters === "string" ? letters.split("") : letters;
      const len = lettersA.length;
      astrArr("alphabet", lettersA);
      const indexes = new Map(lettersA.map((l, i) => [l, i]));
      return {
        encode: (digits) => {
          aArr(digits);
          return digits.map((i) => {
            if (!Number.isSafeInteger(i) || i < 0 || i >= len)
              throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${letters}`);
            return lettersA[i];
          });
        },
        decode: (input) => {
          aArr(input);
          return input.map((letter) => {
            astr("alphabet.decode", letter);
            const i = indexes.get(letter);
            if (i === void 0)
              throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
            return i;
          });
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function join(separator = "") {
      astr("join", separator);
      return {
        encode: (from) => {
          astrArr("join.decode", from);
          return from.join(separator);
        },
        decode: (to) => {
          astr("join.decode", to);
          return to.split(separator);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function padding(bits, chr = "=") {
      anumber(bits);
      astr("padding", chr);
      return {
        encode(data) {
          astrArr("padding.encode", data);
          while (data.length * bits % 8)
            data.push(chr);
          return data;
        },
        decode(input) {
          astrArr("padding.decode", input);
          let end = input.length;
          if (end * bits % 8)
            throw new Error("padding: invalid, string should have whole number of bytes");
          for (; end > 0 && input[end - 1] === chr; end--) {
            const last = end - 1;
            const byte = last * bits;
            if (byte % 8 === 0)
              throw new Error("padding: invalid, string has too much padding");
          }
          return input.slice(0, end);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function normalize(fn) {
      afn(fn);
      return { encode: (from) => from, decode: (to) => fn(to) };
    }
    function convertRadix(data, from, to) {
      if (from < 2)
        throw new Error(`convertRadix: invalid from=${from}, base cannot be less than 2`);
      if (to < 2)
        throw new Error(`convertRadix: invalid to=${to}, base cannot be less than 2`);
      aArr(data);
      if (!data.length)
        return [];
      let pos = 0;
      const res = [];
      const digits = Array.from(data, (d) => {
        anumber(d);
        if (d < 0 || d >= from)
          throw new Error(`invalid integer: ${d}`);
        return d;
      });
      const dlen = digits.length;
      while (true) {
        let carry = 0;
        let done = true;
        for (let i = pos; i < dlen; i++) {
          const digit = digits[i];
          const fromCarry = from * carry;
          const digitBase = fromCarry + digit;
          if (!Number.isSafeInteger(digitBase) || fromCarry / from !== carry || digitBase - digit !== fromCarry) {
            throw new Error("convertRadix: carry overflow");
          }
          const div = digitBase / to;
          carry = digitBase % to;
          const rounded = Math.floor(div);
          digits[i] = rounded;
          if (!Number.isSafeInteger(rounded) || rounded * to + carry !== digitBase)
            throw new Error("convertRadix: carry overflow");
          if (!done)
            continue;
          else if (!rounded)
            pos = i;
          else
            done = false;
        }
        res.push(carry);
        if (done)
          break;
      }
      for (let i = 0; i < data.length - 1 && data[i] === 0; i++)
        res.push(0);
      return res.reverse();
    }
    var gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    var radix2carry = /* @__NO_SIDE_EFFECTS__ */ (from, to) => from + (to - gcd(from, to));
    var powers = /* @__PURE__ */ (() => {
      let res = [];
      for (let i = 0; i < 40; i++)
        res.push(2 ** i);
      return res;
    })();
    function convertRadix2(data, from, to, padding2) {
      aArr(data);
      if (from <= 0 || from > 32)
        throw new Error(`convertRadix2: wrong from=${from}`);
      if (to <= 0 || to > 32)
        throw new Error(`convertRadix2: wrong to=${to}`);
      if (/* @__PURE__ */ radix2carry(from, to) > 32) {
        throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${/* @__PURE__ */ radix2carry(from, to)}`);
      }
      let carry = 0;
      let pos = 0;
      const max = powers[from];
      const mask = powers[to] - 1;
      const res = [];
      for (const n of data) {
        anumber(n);
        if (n >= max)
          throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
        carry = carry << from | n;
        if (pos + from > 32)
          throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
        pos += from;
        for (; pos >= to; pos -= to)
          res.push((carry >> pos - to & mask) >>> 0);
        const pow = powers[pos];
        if (pow === void 0)
          throw new Error("invalid carry");
        carry &= pow - 1;
      }
      carry = carry << to - pos & mask;
      if (!padding2 && pos >= from)
        throw new Error("Excess padding");
      if (!padding2 && carry > 0)
        throw new Error(`Non-zero padding: ${carry}`);
      if (padding2 && pos > 0)
        res.push(carry >>> 0);
      return res;
    }
    // @__NO_SIDE_EFFECTS__
    function radix(num2) {
      anumber(num2);
      const _256 = 2 ** 8;
      return {
        encode: (bytes) => {
          if (!isBytes(bytes))
            throw new Error("radix.encode input should be Uint8Array");
          return convertRadix(Array.from(bytes), _256, num2);
        },
        decode: (digits) => {
          anumArr("radix.decode", digits);
          return Uint8Array.from(convertRadix(digits, num2, _256));
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function radix2(bits, revPadding = false) {
      anumber(bits);
      if (bits <= 0 || bits > 32)
        throw new Error("radix2: bits should be in (0..32]");
      if (/* @__PURE__ */ radix2carry(8, bits) > 32 || /* @__PURE__ */ radix2carry(bits, 8) > 32)
        throw new Error("radix2: carry overflow");
      return {
        encode: (bytes) => {
          if (!isBytes(bytes))
            throw new Error("radix2.encode input should be Uint8Array");
          return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
        },
        decode: (digits) => {
          anumArr("radix2.decode", digits);
          return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
        }
      };
    }
    function unsafeWrapper(fn) {
      afn(fn);
      return function(...args) {
        try {
          return fn.apply(null, args);
        } catch (e) {
        }
      };
    }
    function checksum(len, fn) {
      anumber(len);
      afn(fn);
      return {
        encode(data) {
          if (!isBytes(data))
            throw new Error("checksum.encode: input should be Uint8Array");
          const sum = fn(data).slice(0, len);
          const res = new Uint8Array(data.length + len);
          res.set(data);
          res.set(sum, data.length);
          return res;
        },
        decode(data) {
          if (!isBytes(data))
            throw new Error("checksum.decode: input should be Uint8Array");
          const payload = data.slice(0, -len);
          const oldChecksum = data.slice(-len);
          const newChecksum = fn(payload).slice(0, len);
          for (let i = 0; i < len; i++)
            if (newChecksum[i] !== oldChecksum[i])
              throw new Error("Invalid checksum");
          return payload;
        }
      };
    }
    exports.utils = {
      alphabet,
      chain,
      checksum,
      convertRadix,
      convertRadix2,
      radix,
      radix2,
      join,
      padding
    };
    exports.base16 = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(4), /* @__PURE__ */ alphabet("0123456789ABCDEF"), /* @__PURE__ */ join(""));
    exports.base32 = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(5), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), /* @__PURE__ */ padding(5), /* @__PURE__ */ join(""));
    exports.base32nopad = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(5), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), /* @__PURE__ */ join(""));
    exports.base32hex = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(5), /* @__PURE__ */ alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), /* @__PURE__ */ padding(5), /* @__PURE__ */ join(""));
    exports.base32hexnopad = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(5), /* @__PURE__ */ alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), /* @__PURE__ */ join(""));
    exports.base32crockford = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(5), /* @__PURE__ */ alphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), /* @__PURE__ */ join(""), /* @__PURE__ */ normalize((s) => s.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
    var hasBase64Builtin = /* @__PURE__ */ (() => typeof Uint8Array.from([]).toBase64 === "function" && typeof Uint8Array.fromBase64 === "function")();
    exports.base64 = hasBase64Builtin ? {
      encode(b) {
        abytes(b);
        return b.toBase64();
      },
      decode(s) {
        astr("base64", s);
        return Uint8Array.fromBase64(s, { lastChunkHandling: "strict" });
      }
    } : /* @__PURE__ */ chain(/* @__PURE__ */ radix2(6), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), /* @__PURE__ */ padding(6), /* @__PURE__ */ join(""));
    exports.base64nopad = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(6), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), /* @__PURE__ */ join(""));
    exports.base64url = hasBase64Builtin ? {
      encode(b) {
        abytes(b);
        return b.toBase64({ alphabet: "base64url" });
      },
      decode(s) {
        astr("base64", s);
        return Uint8Array.fromBase64(s, { alphabet: "base64url" });
      }
    } : /* @__PURE__ */ chain(/* @__PURE__ */ radix2(6), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), /* @__PURE__ */ padding(6), /* @__PURE__ */ join(""));
    exports.base64urlnopad = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(6), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), /* @__PURE__ */ join(""));
    var genBase58 = /* @__NO_SIDE_EFFECTS__ */ (abc) => /* @__PURE__ */ chain(/* @__PURE__ */ radix(58), /* @__PURE__ */ alphabet(abc), /* @__PURE__ */ join(""));
    exports.base58 = /* @__PURE__ */ genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
    exports.base58flickr = /* @__PURE__ */ genBase58("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
    exports.base58xrp = /* @__PURE__ */ genBase58("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
    var XMR_BLOCK_LEN = [0, 2, 3, 5, 6, 7, 9, 10, 11];
    exports.base58xmr = {
      encode(data) {
        let res = "";
        for (let i = 0; i < data.length; i += 8) {
          const block = data.subarray(i, i + 8);
          res += exports.base58.encode(block).padStart(XMR_BLOCK_LEN[block.length], "1");
        }
        return res;
      },
      decode(str) {
        let res = [];
        for (let i = 0; i < str.length; i += 11) {
          const slice = str.slice(i, i + 11);
          const blockLen = XMR_BLOCK_LEN.indexOf(slice.length);
          const block = exports.base58.decode(slice);
          for (let j = 0; j < block.length - blockLen; j++) {
            if (block[j] !== 0)
              throw new Error("base58xmr: wrong padding");
          }
          res = res.concat(Array.from(block.slice(block.length - blockLen)));
        }
        return Uint8Array.from(res);
      }
    };
    var createBase58check = (sha256) => /* @__PURE__ */ chain(checksum(4, (data) => sha256(sha256(data))), exports.base58);
    exports.createBase58check = createBase58check;
    exports.base58check = exports.createBase58check;
    var BECH_ALPHABET = /* @__PURE__ */ chain(/* @__PURE__ */ alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), /* @__PURE__ */ join(""));
    var POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
    function bech32Polymod(pre) {
      const b = pre >> 25;
      let chk = (pre & 33554431) << 5;
      for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
        if ((b >> i & 1) === 1)
          chk ^= POLYMOD_GENERATORS[i];
      }
      return chk;
    }
    function bechChecksum(prefix, words, encodingConst = 1) {
      const len = prefix.length;
      let chk = 1;
      for (let i = 0; i < len; i++) {
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126)
          throw new Error(`Invalid prefix (${prefix})`);
        chk = bech32Polymod(chk) ^ c >> 5;
      }
      chk = bech32Polymod(chk);
      for (let i = 0; i < len; i++)
        chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 31;
      for (let v of words)
        chk = bech32Polymod(chk) ^ v;
      for (let i = 0; i < 6; i++)
        chk = bech32Polymod(chk);
      chk ^= encodingConst;
      return BECH_ALPHABET.encode(convertRadix2([chk % powers[30]], 30, 5, false));
    }
    // @__NO_SIDE_EFFECTS__
    function genBech32(encoding) {
      const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
      const _words = /* @__PURE__ */ radix2(5);
      const fromWords = _words.decode;
      const toWords = _words.encode;
      const fromWordsUnsafe = unsafeWrapper(fromWords);
      function encode(prefix, words, limit = 90) {
        astr("bech32.encode prefix", prefix);
        if (isBytes(words))
          words = Array.from(words);
        anumArr("bech32.encode", words);
        const plen = prefix.length;
        if (plen === 0)
          throw new TypeError(`Invalid prefix length ${plen}`);
        const actualLength = plen + 7 + words.length;
        if (limit !== false && actualLength > limit)
          throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
        const lowered = prefix.toLowerCase();
        const sum = bechChecksum(lowered, words, ENCODING_CONST);
        return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
      }
      function decode(str, limit = 90) {
        astr("bech32.decode input", str);
        const slen = str.length;
        if (slen < 8 || limit !== false && slen > limit)
          throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit})`);
        const lowered = str.toLowerCase();
        if (str !== lowered && str !== str.toUpperCase())
          throw new Error(`String must be lowercase or uppercase`);
        const sepIndex = lowered.lastIndexOf("1");
        if (sepIndex === 0 || sepIndex === -1)
          throw new Error(`Letter "1" must be present between prefix and data only`);
        const prefix = lowered.slice(0, sepIndex);
        const data = lowered.slice(sepIndex + 1);
        if (data.length < 6)
          throw new Error("Data must be at least 6 characters long");
        const words = BECH_ALPHABET.decode(data).slice(0, -6);
        const sum = bechChecksum(prefix, words, ENCODING_CONST);
        if (!data.endsWith(sum))
          throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
        return { prefix, words };
      }
      const decodeUnsafe = unsafeWrapper(decode);
      function decodeToBytes(str) {
        const { prefix, words } = decode(str, false);
        return { prefix, words, bytes: fromWords(words) };
      }
      function encodeFromBytes(prefix, bytes) {
        return encode(prefix, toWords(bytes));
      }
      return {
        encode,
        decode,
        encodeFromBytes,
        decodeToBytes,
        decodeUnsafe,
        fromWords,
        fromWordsUnsafe,
        toWords
      };
    }
    exports.bech32 = /* @__PURE__ */ genBech32("bech32");
    exports.bech32m = /* @__PURE__ */ genBech32("bech32m");
    exports.utf8 = {
      encode: (data) => new TextDecoder().decode(data),
      decode: (str) => new TextEncoder().encode(str)
    };
    var hasHexBuiltin = /* @__PURE__ */ (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")();
    var hexBuiltin = {
      encode(data) {
        abytes(data);
        return data.toHex();
      },
      decode(s) {
        astr("hex", s);
        return Uint8Array.fromHex(s);
      }
    };
    exports.hex = hasHexBuiltin ? hexBuiltin : /* @__PURE__ */ chain(/* @__PURE__ */ radix2(4), /* @__PURE__ */ alphabet("0123456789abcdef"), /* @__PURE__ */ join(""), /* @__PURE__ */ normalize((s) => {
      if (typeof s !== "string" || s.length % 2 !== 0)
        throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
      return s.toLowerCase();
    }));
    var CODERS = {
      utf8: exports.utf8,
      hex: exports.hex,
      base16: exports.base16,
      base32: exports.base32,
      base64: exports.base64,
      base64url: exports.base64url,
      base58: exports.base58,
      base58xmr: exports.base58xmr
    };
    var coderTypeError = "Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr";
    var bytesToString = (type, bytes) => {
      if (typeof type !== "string" || !CODERS.hasOwnProperty(type))
        throw new TypeError(coderTypeError);
      if (!isBytes(bytes))
        throw new TypeError("bytesToString() expects Uint8Array");
      return CODERS[type].encode(bytes);
    };
    exports.bytesToString = bytesToString;
    exports.str = exports.bytesToString;
    var stringToBytes = (type, str) => {
      if (!CODERS.hasOwnProperty(type))
        throw new TypeError(coderTypeError);
      if (typeof str !== "string")
        throw new TypeError("stringToBytes() expects string");
      return CODERS[type].decode(str);
    };
    exports.stringToBytes = stringToBytes;
    exports.bytes = exports.stringToBytes;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/cryptoNode.js
var require_cryptoNode3 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/cryptoNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crypto = void 0;
    var nc = __require("crypto");
    exports.crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : nc && typeof nc === "object" && "randomBytes" in nc ? nc : void 0;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/utils.js
var require_utils5 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
    exports.isBytes = isBytes;
    exports.anumber = anumber;
    exports.abytes = abytes;
    exports.ahash = ahash;
    exports.aexists = aexists;
    exports.aoutput = aoutput;
    exports.u8 = u8;
    exports.u32 = u32;
    exports.clean = clean;
    exports.createView = createView;
    exports.rotr = rotr;
    exports.rotl = rotl;
    exports.byteSwap = byteSwap;
    exports.byteSwap32 = byteSwap32;
    exports.bytesToHex = bytesToHex;
    exports.hexToBytes = hexToBytes;
    exports.asyncLoop = asyncLoop;
    exports.utf8ToBytes = utf8ToBytes;
    exports.bytesToUtf8 = bytesToUtf8;
    exports.toBytes = toBytes;
    exports.kdfInputToBytes = kdfInputToBytes;
    exports.concatBytes = concatBytes;
    exports.checkOpts = checkOpts;
    exports.createHasher = createHasher;
    exports.createOptHasher = createOptHasher;
    exports.createXOFer = createXOFer;
    exports.randomBytes = randomBytes;
    var crypto_1 = require_cryptoNode3();
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function anumber(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function abytes(b, ...lengths) {
      if (!isBytes(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      anumber(h.outputLen);
      anumber(h.blockLen);
    }
    function aexists(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function aoutput(out, instance) {
      abytes(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least " + min);
      }
    }
    function u8(arr) {
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function u32(arr) {
      return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    }
    function clean(...arrays) {
      for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
      }
    }
    function createView(arr) {
      return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function rotr(word, shift) {
      return word << 32 - shift | word >>> shift;
    }
    function rotl(word, shift) {
      return word << shift | word >>> 32 - shift >>> 0;
    }
    exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    function byteSwap(word) {
      return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
    }
    exports.swap8IfBE = exports.isLE ? (n) => n : (n) => byteSwap(n);
    exports.byteSwapIfBE = exports.swap8IfBE;
    function byteSwap32(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = byteSwap(arr[i]);
      }
      return arr;
    }
    exports.swap32IfBE = exports.isLE ? (u) => u : byteSwap32;
    var hasHexBuiltin = /* @__PURE__ */ (() => (
      // @ts-ignore
      typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
    ))();
    var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      abytes(bytes);
      if (hasHexBuiltin)
        return bytes.toHex();
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
      }
      return hex;
    }
    var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      if (hasHexBuiltin)
        return Uint8Array.fromHex(hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    var nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function bytesToUtf8(bytes) {
      return new TextDecoder().decode(bytes);
    }
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      abytes(data);
      return data;
    }
    function kdfInputToBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      abytes(data);
      return data;
    }
    function concatBytes(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
        throw new Error("options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    var Hash = class {
    };
    exports.Hash = Hash;
    function createHasher(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    function createOptHasher(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    function createXOFer(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructor = createHasher;
    exports.wrapConstructorWithOpts = createOptHasher;
    exports.wrapXOFConstructorWithOpts = createXOFer;
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/types.js
var require_types2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectivePoint = void 0;
    exports.createCipherBalance = createCipherBalance;
    exports.compute_prefix = compute_prefix;
    exports.starkPointToProjectivePoint = starkPointToProjectivePoint;
    exports.projectivePointToStarkPoint = projectivePointToStarkPoint;
    exports.derivePublicKey = derivePublicKey;
    exports.pubKeyAffineToHex = pubKeyAffineToHex;
    exports.pubKeyAffineToBase58 = pubKeyAffineToBase58;
    exports.pubKeyBase58ToAffine = pubKeyBase58ToAffine;
    exports.pubKeyBase58ToHex = pubKeyBase58ToHex;
    exports.parseCipherBalance = parseCipherBalance;
    var she_1 = require_lib2();
    var base_1 = require_lib3();
    var utils_1 = require_utils5();
    var starknet_1 = require_lib();
    var constants_1 = require_constants2();
    exports.ProjectivePoint = she_1.ProjectivePoint;
    function createCipherBalance(y, amount, random) {
      if (amount === 0n) {
        const L2 = y.multiplyUnsafe(random);
        const R2 = constants_1.GENERATOR.multiplyUnsafe(random);
        return { L: L2, R: R2 };
      }
      const L = constants_1.GENERATOR.multiply(amount).add(y.multiplyUnsafe(random));
      const R = constants_1.GENERATOR.multiplyUnsafe(random);
      return { L, R };
    }
    function compute_prefix(seq) {
      return (0, starknet_1.poseidonHashMany)(seq);
    }
    function starkPointToProjectivePoint({ x, y }) {
      return new exports.ProjectivePoint(BigInt(x), BigInt(y), 1n);
    }
    function projectivePointToStarkPoint(p) {
      const pAffine = p.toAffine();
      return { x: pAffine.x, y: pAffine.y };
    }
    function derivePublicKey(privateKey) {
      return projectivePointToStarkPoint(constants_1.GENERATOR.multiply(privateKey));
    }
    function pubKeyAffineToHex(pub) {
      const point = starkPointToProjectivePoint(pub);
      return (0, utils_1.bytesToHex)(point.toRawBytes(true));
    }
    function pubKeyAffineToBase58(pub) {
      const point = starkPointToProjectivePoint(pub);
      return base_1.base58.encode(point.toRawBytes(true));
    }
    function pubKeyBase58ToAffine(b58string) {
      const bytes = base_1.base58.decode(b58string);
      return exports.ProjectivePoint.fromHex((0, utils_1.bytesToHex)(bytes));
    }
    function pubKeyBase58ToHex(b58string) {
      const bytes = base_1.base58.decode(b58string);
      return (0, utils_1.bytesToHex)(bytes);
    }
    function parseCipherBalance({ L, R }) {
      return {
        L: starkPointToProjectivePoint(L),
        R: starkPointToProjectivePoint(R)
      };
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/constants.js
var require_constants2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SECONDARY_GENERATOR = exports.GENERATOR = exports.CURVE_ORDER = void 0;
    var starknet_1 = require_lib();
    var types_js_1 = require_types2();
    exports.CURVE_ORDER = starknet_1.CURVE.n;
    exports.GENERATOR = new types_js_1.ProjectivePoint(starknet_1.CURVE.Gx, starknet_1.CURVE.Gy, 1n);
    exports.SECONDARY_GENERATOR = new types_js_1.ProjectivePoint(627088272801405713560985229077786158610581355215145837257248988047835443922n, 962306405833205337611861169387935900858447421343428280515103558221889311122n, 1n);
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/utils.js
var require_utils6 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bytesOrNumToBigInt = bytesOrNumToBigInt;
    exports.isUint256 = isUint256;
    exports.castBigInt = castBigInt;
    exports.createCipherBalance = createCipherBalance;
    exports.decipherBalance = decipherBalance;
    exports.assertBalance = assertBalance;
    exports.pubKeyFromSecret = pubKeyFromSecret;
    var utils_1 = require_utils5();
    var starknet_1 = __require("starknet");
    var constants_1 = require_constants2();
    var types_1 = require_types2();
    function bytesOrNumToBigInt(x) {
      if (x instanceof Uint8Array) {
        return starknet_1.num.toBigInt("0x" + (0, utils_1.bytesToHex)(x));
      } else {
        return starknet_1.num.toBigInt(x);
      }
    }
    function isUint256(x) {
      const low = x.low;
      const high = x.high;
      return low !== void 0 && high !== void 0;
    }
    function castBigInt(x) {
      if (starknet_1.num.isBigNumberish(x)) {
        return starknet_1.num.toBigInt(x);
      } else {
        return starknet_1.uint256.uint256ToBN(x);
      }
    }
    function createCipherBalance(y, amount, random) {
      if (amount === 0n) {
        const L2 = y.multiplyUnsafe(random);
        const R2 = constants_1.GENERATOR.multiplyUnsafe(random);
        return { L: L2, R: R2 };
      }
      const L = constants_1.GENERATOR.multiply(amount).add(y.multiplyUnsafe(random));
      const R = constants_1.GENERATOR.multiplyUnsafe(random);
      return { L, R };
    }
    function decipherBalance(x, L, R) {
      const Rx = R.multiply(x);
      if (Rx.equals(L)) {
        return 0n;
      }
      const g_b = L.subtract(Rx);
      let b = 1n;
      let temp = constants_1.GENERATOR;
      if (temp.equals(g_b)) {
        return 1n;
      }
      while (b < 2 ** 32) {
        b = b + 1n;
        temp = temp.add(constants_1.GENERATOR);
        if (temp.equals(g_b)) {
          return b;
        }
      }
      throw new Error("Decription of Cipherbalance has failed");
    }
    function assertBalance(x, balance, L, R) {
      const Rx = R.multiply(x);
      const g_b = L.subtract(Rx);
      return g_b.equals(constants_1.GENERATOR.multiplyUnsafe(balance));
    }
    function pubKeyFromSecret(secret) {
      return (0, types_1.projectivePointToStarkPoint)(constants_1.GENERATOR.multiply(secret));
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/audit.js
var require_audit = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/audit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AUDIT_CAIRO_STRING = void 0;
    exports.proveAudit = proveAudit;
    exports.verifyAudit = verifyAudit;
    var she_1 = require_lib2();
    var protocols_1 = require_protocols();
    var constants_1 = require_constants2();
    var types_1 = require_types2();
    var utils_1 = require_utils6();
    exports.AUDIT_CAIRO_STRING = 418581342580n;
    function prefixAudit(inputs) {
      const { chain_id, tongo_address, sender_address } = inputs.prefix_data;
      const seq = [
        chain_id,
        tongo_address,
        sender_address,
        exports.AUDIT_CAIRO_STRING,
        inputs.y.toAffine().x,
        inputs.y.toAffine().y,
        inputs.auditorPubKey.toAffine().x,
        inputs.auditorPubKey.toAffine().y,
        inputs.storedBalance.L.toAffine().x,
        inputs.storedBalance.L.toAffine().y,
        inputs.storedBalance.R.toAffine().x,
        inputs.storedBalance.R.toAffine().y,
        inputs.auditedBalance.L.toAffine().x,
        inputs.auditedBalance.L.toAffine().y,
        inputs.auditedBalance.R.toAffine().x,
        inputs.auditedBalance.R.toAffine().y
      ];
      return (0, types_1.compute_prefix)(seq);
    }
    function proveAudit(private_key, initial_balance, initial_cipherbalance, auditorPubKey, prefix_data) {
      const x = private_key;
      const y = constants_1.GENERATOR.multiply(x);
      const { L: L0, R: R0 } = initial_cipherbalance;
      const g_b = L0.subtract(R0.multiplyUnsafe(x));
      const temp = constants_1.GENERATOR.multiplyUnsafe(initial_balance);
      if (!g_b.equals(temp)) {
        throw new Error("storedBalance is not an encryption of balance");
      }
      ;
      const r = (0, she_1.generateRandom)();
      const auditedBalance = (0, utils_1.createCipherBalance)(auditorPubKey, initial_balance, r);
      const inputs = { y, storedBalance: initial_cipherbalance, auditorPubKey, auditedBalance, prefix_data };
      const prefix = prefixAudit(inputs);
      const kx = (0, she_1.generateRandom)();
      const kb = (0, she_1.generateRandom)();
      const kr = (0, she_1.generateRandom)();
      const Ax = constants_1.GENERATOR.multiplyUnsafe(kx);
      const AL0 = constants_1.GENERATOR.multiplyUnsafe(kb).add(R0.multiplyUnsafe(kx));
      const AR1 = constants_1.GENERATOR.multiplyUnsafe(kr);
      const AL1 = constants_1.GENERATOR.multiplyUnsafe(kb).add(auditorPubKey.multiplyUnsafe(kr));
      const c = (0, she_1.compute_challenge)(prefix, [Ax, AL0, AL1, AR1]);
      const sx = (0, she_1.compute_s)(kx, x, c);
      const sr = (0, she_1.compute_s)(kr, r, c);
      const sb = (0, she_1.compute_s)(kb, initial_balance, c);
      const proof = { Ax, AL0, AL1, AR1, sx, sb, sr };
      return { inputs, proof };
    }
    function verifyAudit(inputs, proof) {
      const c = (0, she_1.compute_challenge)(exports.AUDIT_CAIRO_STRING, [proof.Ax, proof.AL0, proof.AL1, proof.AR1]);
      const { L: L0, R: R0 } = inputs.storedBalance;
      const { L: L_audit, R: R_audit } = inputs.auditedBalance;
      return protocols_1.SameEncryptUnknownRandom._verify(L0, R0, L_audit, R_audit, constants_1.GENERATOR, inputs.y, inputs.auditorPubKey, proof.Ax, proof.AL0, proof.AL1, proof.AR1, c, proof.sb, proof.sx, proof.sr);
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/fund.js
var require_fund = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/fund.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FUND_CAIRO_STRING = void 0;
    exports.proveFund = proveFund;
    exports.verifyFund = verifyFund;
    var she_1 = require_lib2();
    var protocols_1 = require_protocols();
    var constants_1 = require_constants2();
    var utils_1 = require_utils6();
    var types_1 = require_types2();
    exports.FUND_CAIRO_STRING = 1718972004n;
    function prefixFund(inputs) {
      const { chain_id, tongo_address, sender_address } = inputs.prefix_data;
      const seq = [
        chain_id,
        tongo_address,
        sender_address,
        exports.FUND_CAIRO_STRING,
        inputs.y.toAffine().x,
        inputs.y.toAffine().y,
        inputs.amount,
        inputs.nonce
      ];
      return (0, types_1.compute_prefix)(seq);
    }
    function proveFund(private_key, amount_to_fund, initial_balance, initial_cipherbalance, nonce, prefix_data) {
      const x = private_key;
      const y = constants_1.GENERATOR.multiply(x);
      const { L: L0, R: R0 } = initial_cipherbalance;
      const g_b = L0.subtract(R0.multiplyUnsafe(x));
      const temp = constants_1.GENERATOR.multiplyUnsafe(initial_balance);
      if (!g_b.equals(temp)) {
        throw new Error("storedBalance is not an encryption of balance");
      }
      ;
      const inputs = { y, nonce, amount: amount_to_fund, prefix_data };
      const prefix = prefixFund(inputs);
      const { proof: { s: sx, A: Ax } } = protocols_1.poe.prove(x, constants_1.GENERATOR, prefix);
      const cipher = (0, utils_1.createCipherBalance)(y, amount_to_fund, exports.FUND_CAIRO_STRING);
      const newBalance = { L: L0.add(cipher.L), R: R0.add(cipher.R) };
      return { inputs, proof: { sx, Ax }, newBalance };
    }
    function verifyFund(inputs, proof) {
      const prefix = prefixFund(inputs);
      const c = (0, she_1.compute_challenge)(prefix, [proof.Ax]);
      const res = protocols_1.poe._verify(inputs.y, constants_1.GENERATOR, proof.Ax, c, proof.sx);
      if (res == false) {
        throw new Error("verifyFund failed");
      }
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/ragequit.js
var require_ragequit = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/ragequit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RAGEQUIT_CAIRO_STRING = void 0;
    exports.proveRagequit = proveRagequit;
    exports.verifyRagequit = verifyRagequit;
    var protocols_1 = require_protocols();
    var constants_1 = require_constants2();
    var types_1 = require_types2();
    var utils_1 = require_utils6();
    var she_1 = require_lib2();
    exports.RAGEQUIT_CAIRO_STRING = 8241982478457596276n;
    function prefixRagequit(inputs) {
      const { chain_id, tongo_address, sender_address } = inputs.prefix_data;
      const seq = [
        chain_id,
        tongo_address,
        sender_address,
        exports.RAGEQUIT_CAIRO_STRING,
        inputs.y.toAffine().x,
        inputs.y.toAffine().y,
        inputs.nonce,
        inputs.amount,
        inputs.to,
        inputs.currentBalance.L.toAffine().x,
        inputs.currentBalance.L.toAffine().y,
        inputs.currentBalance.R.toAffine().x,
        inputs.currentBalance.R.toAffine().y
      ];
      return (0, types_1.compute_prefix)(seq);
    }
    function proveRagequit(private_key, initial_cipherbalance, nonce, to, full_amount, prefix_data) {
      const x = private_key;
      const y = constants_1.GENERATOR.multiply(x);
      const { L: L0, R: R0 } = initial_cipherbalance;
      const g_b = L0.subtract(R0.multiplyUnsafe(x));
      const temp = constants_1.GENERATOR.multiplyUnsafe(full_amount);
      if (!g_b.equals(temp)) {
        throw new Error("storedBalance is not an encryption of balance");
      }
      ;
      const inputs = {
        y,
        nonce,
        to,
        amount: full_amount,
        currentBalance: initial_cipherbalance,
        prefix_data
      };
      const prefix = prefixRagequit(inputs);
      const kx = (0, she_1.generateRandom)();
      const Ax = constants_1.GENERATOR.multiply(kx);
      const AR = R0.multiplyUnsafe(kx);
      const c = (0, she_1.compute_challenge)(prefix, [Ax, AR]);
      const sx = (0, she_1.compute_s)(kx, x, c);
      const proof = { Ax, AR, sx };
      const newBalance = (0, utils_1.createCipherBalance)(y, 0n, 1n);
      return { inputs, proof, newBalance };
    }
    function verifyRagequit(inputs, proof) {
      const prefix = prefixRagequit(inputs);
      const c = (0, she_1.compute_challenge)(prefix, [proof.Ax, proof.AR]);
      let res = protocols_1.poe._verify(inputs.y, constants_1.GENERATOR, proof.Ax, c, proof.sx);
      if (res == false) {
        throw new Error("error in poe y");
      }
      const { L: L1, R: R1 } = inputs.currentBalance;
      const L = L1.subtract(constants_1.GENERATOR.multiply(inputs.amount));
      res = protocols_1.poe._verify(L, R1, proof.AR, c, proof.sx);
      if (res == false) {
        throw new Error("error in poe R");
      }
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/rollover.js
var require_rollover = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/rollover.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ROLLOVER_CAIRO_STRING = void 0;
    exports.proveRollover = proveRollover;
    exports.verifyRollover = verifyRollover;
    var she_1 = require_lib2();
    var protocols_1 = require_protocols();
    var constants_1 = require_constants2();
    var types_1 = require_types2();
    exports.ROLLOVER_CAIRO_STRING = 8245928655720965490n;
    function prefixRollover(inputs) {
      const { chain_id, tongo_address, sender_address } = inputs.prefix_data;
      const seq = [
        chain_id,
        tongo_address,
        sender_address,
        exports.ROLLOVER_CAIRO_STRING,
        inputs.y.toAffine().x,
        inputs.y.toAffine().y,
        inputs.nonce
      ];
      return (0, types_1.compute_prefix)(seq);
    }
    function proveRollover(private_key, nonce, prefix_data) {
      const x = private_key;
      const y = constants_1.GENERATOR.multiply(x);
      const inputs = { y, nonce, prefix_data };
      const prefix = prefixRollover(inputs);
      const { proof: { A: Ax, s: sx } } = protocols_1.poe.prove(x, constants_1.GENERATOR, prefix);
      return { inputs, proof: { Ax, sx } };
    }
    function verifyRollover(inputs, proof) {
      const prefix = prefixRollover(inputs);
      const c = (0, she_1.compute_challenge)(prefix, [proof.Ax]);
      const res = protocols_1.poe._verify(inputs.y, constants_1.GENERATOR, proof.Ax, c, proof.sx);
      if (res == false) {
        throw new Error("verifyRollover failed");
      }
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/range.js
var require_range2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/range.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateRangeProof = generateRangeProof;
    exports.verifyRangeProof = verifyRangeProof;
    var protocols_1 = require_protocols();
    var constants_1 = require_constants2();
    function generateRangeProof(amount, bit_size, randomness, initial_prefix) {
      const { inputs, proofs, r } = protocols_1.range.prove(amount, bit_size, constants_1.GENERATOR, constants_1.SECONDARY_GENERATOR, randomness, initial_prefix);
      const range_without_prefix = proofs.proofs.map(({ prefix, ...item }) => item);
      const range_proof = { commitments: inputs.commitments, proofs: range_without_prefix };
      return { r, range: range_proof };
    }
    function verifyRangeProof(range_proof, bit_size, initial_prefix) {
      const inputs = { g1: constants_1.GENERATOR, g2: constants_1.SECONDARY_GENERATOR, bit_size, commitments: range_proof.commitments };
      const proof = { proofs: range_proof.proofs.map((pi, index) => ({ ...pi, prefix: initial_prefix + BigInt(index) })) };
      const V = protocols_1.range.verify(inputs, proof);
      return V;
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/transfer.js
var require_transfer = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/transfer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TRANSFER_CAIRO_STRING = void 0;
    exports.proveTransfer = proveTransfer;
    exports.verifyTransfer = verifyTransfer;
    var she_1 = require_lib2();
    var protocols_1 = require_protocols();
    var protocols_2 = require_protocols();
    var constants_1 = require_constants2();
    var range_1 = require_range2();
    var types_1 = require_types2();
    var utils_1 = require_utils6();
    exports.TRANSFER_CAIRO_STRING = 8390876182755042674n;
    function prefixTransfer(inputs) {
      const { chain_id, tongo_address, sender_address } = inputs.prefix_data;
      const { L: L0, R: R0 } = inputs.currentBalance;
      const { L, R } = inputs.transferBalanceSelf;
      const { L: L_bar, R: R_bar } = inputs.transferBalance;
      const { L: V, R: R_aux } = inputs.auxiliarCipher;
      const { L: V2, R: R_aux2 } = inputs.auxiliarCipher2;
      const seq = [
        chain_id,
        tongo_address,
        sender_address,
        exports.TRANSFER_CAIRO_STRING,
        inputs.from.toAffine().x,
        inputs.from.toAffine().y,
        inputs.to.toAffine().x,
        inputs.to.toAffine().y,
        inputs.nonce,
        L0.toAffine().x,
        L0.toAffine().y,
        R0.toAffine().x,
        R0.toAffine().y,
        L.toAffine().x,
        L.toAffine().y,
        R.toAffine().x,
        R.toAffine().y,
        L_bar.toAffine().x,
        L_bar.toAffine().y,
        R_bar.toAffine().x,
        R_bar.toAffine().y,
        V.toAffine().x,
        V.toAffine().y,
        R_aux.toAffine().x,
        R_aux.toAffine().y,
        V2.toAffine().x,
        V2.toAffine().y,
        R_aux2.toAffine().x,
        R_aux2.toAffine().y
      ];
      return (0, types_1.compute_prefix)(seq);
    }
    function proveTransfer(private_key, to, initial_balance, amount_to_transfer, initial_cipherbalance, nonce, bit_size, prefix_data) {
      const x = private_key;
      const y = constants_1.GENERATOR.multiply(x);
      const { L: L0, R: R0 } = initial_cipherbalance;
      const b = amount_to_transfer;
      const b0 = initial_balance;
      const b_left = b0 - b;
      const { randomness, total_random } = protocols_2.range.pregenerate_randomness(bit_size);
      const auxiliarCipher = (0, utils_1.createCipherBalance)(constants_1.SECONDARY_GENERATOR, amount_to_transfer, total_random);
      const transferBalanceSelf = (0, utils_1.createCipherBalance)(y, b, total_random);
      const transferBalance = (0, utils_1.createCipherBalance)(to, b, total_random);
      const { randomness: randomness2, total_random: total_random2 } = protocols_2.range.pregenerate_randomness(bit_size);
      const auxiliarCipher2 = (0, utils_1.createCipherBalance)(constants_1.SECONDARY_GENERATOR, b_left, total_random2);
      const inputs = {
        from: y,
        to,
        nonce,
        currentBalance: initial_cipherbalance,
        transferBalance,
        transferBalanceSelf,
        auxiliarCipher,
        auxiliarCipher2,
        bit_size,
        prefix_data
      };
      const prefix = prefixTransfer(inputs);
      const { r, range } = (0, range_1.generateRangeProof)(b, bit_size, randomness, prefix);
      if (r !== total_random) {
        throw new Error("random missmatch");
      }
      const { r: r2, range: range2 } = (0, range_1.generateRangeProof)(b_left, bit_size, randomness2, prefix);
      if (r2 !== total_random2) {
        throw new Error("random missmatch");
      }
      const G = R0.subtract(transferBalanceSelf.R);
      const kx = (0, she_1.generateRandom)();
      const kb = (0, she_1.generateRandom)();
      const kr = (0, she_1.generateRandom)();
      const kb2 = (0, she_1.generateRandom)();
      const kr2 = (0, she_1.generateRandom)();
      const A_x = constants_1.GENERATOR.multiplyUnsafe(kx);
      const A_r = constants_1.GENERATOR.multiplyUnsafe(kr);
      const A_r2 = constants_1.GENERATOR.multiplyUnsafe(kr2);
      const A_b = constants_1.GENERATOR.multiplyUnsafe(kb).add(y.multiplyUnsafe(kr));
      const A_bar = constants_1.GENERATOR.multiplyUnsafe(kb).add(to.multiplyUnsafe(kr));
      const A_v = constants_1.GENERATOR.multiplyUnsafe(kb).add(constants_1.SECONDARY_GENERATOR.multiplyUnsafe(kr));
      const A_b2 = constants_1.GENERATOR.multiplyUnsafe(kb2).add(G.multiplyUnsafe(kx));
      const A_v2 = constants_1.GENERATOR.multiplyUnsafe(kb2).add(constants_1.SECONDARY_GENERATOR.multiplyUnsafe(kr2));
      const commitments = [
        A_x,
        A_r,
        A_r2,
        A_b,
        A_b2,
        A_v,
        A_v2,
        A_bar
      ];
      const c = (0, she_1.compute_challenge)(prefix, commitments);
      const s_x = (0, she_1.compute_s)(kx, x, c);
      const s_b = (0, she_1.compute_s)(kb, b, c);
      const s_r = (0, she_1.compute_s)(kr, r, c);
      const s_b2 = (0, she_1.compute_s)(kb2, b_left, c);
      const s_r2 = (0, she_1.compute_s)(kr2, r2, c);
      const proof = {
        A_x,
        A_r,
        A_r2,
        A_b,
        A_b2,
        A_v,
        A_v2,
        A_bar,
        s_x,
        s_r,
        s_b,
        s_b2,
        s_r2,
        range,
        range2
      };
      const newBalance = { L: L0.subtract(transferBalanceSelf.L), R: R0.subtract(transferBalanceSelf.R) };
      return { inputs, proof, newBalance };
    }
    function verifyTransfer(inputs, proof) {
      const bit_size = inputs.bit_size;
      const prefix = prefixTransfer(inputs);
      const c = (0, she_1.compute_challenge)(prefix, [
        proof.A_x,
        proof.A_r,
        proof.A_r2,
        proof.A_b,
        proof.A_b2,
        proof.A_v,
        proof.A_v2,
        proof.A_bar
      ]);
      const { L: CL, R: CR } = inputs.currentBalance;
      const { L, R } = inputs.transferBalanceSelf;
      const { L: L_bar, R: R_bar } = inputs.transferBalance;
      const { L: V, R: R_aux } = inputs.auxiliarCipher;
      const { L: V2, R: R_aux2 } = inputs.auxiliarCipher2;
      let res = protocols_1.poe._verify(inputs.from, constants_1.GENERATOR, proof.A_x, c, proof.s_x);
      if (res == false) {
        throw new Error("error in poe for y");
      }
      let sameEncryptInputs = {
        L1: L,
        R1: R,
        L2: L_bar,
        R2: R_bar,
        g: constants_1.GENERATOR,
        y1: inputs.from,
        y2: inputs.to
      };
      let sameEncryptProof = {
        AL1: proof.A_b,
        AR1: proof.A_r,
        AL2: proof.A_bar,
        AR2: proof.A_r,
        c,
        sb: proof.s_b,
        sr1: proof.s_r,
        sr2: proof.s_r
      };
      res = protocols_1.SameEncrypt.verify(sameEncryptInputs, sameEncryptProof);
      if (res == false) {
        throw new Error("error SameEncryp");
      }
      const V_proof = (0, range_1.verifyRangeProof)(proof.range, bit_size, prefix);
      if (V_proof == false) {
        throw new Error("erro in range for V");
      }
      if (!V.equals(V_proof)) {
        throw new Error("V missmatch");
      }
      ;
      let elGamalInputs = {
        L: V,
        R: R_aux,
        g1: constants_1.GENERATOR,
        g2: constants_1.SECONDARY_GENERATOR
      };
      let elGamalProof = {
        AL: proof.A_v,
        AR: proof.A_r,
        c,
        sb: proof.s_b,
        sr: proof.s_r
      };
      res = protocols_1.ElGamal.verify(elGamalInputs, elGamalProof);
      if (res == false) {
        throw new Error("erro elGamalProof");
      }
      const L0 = CL.subtract(L);
      const R0 = CR.subtract(R);
      const V2_proof = (0, range_1.verifyRangeProof)(proof.range2, bit_size, prefix);
      if (V2_proof == false) {
        throw new Error("erro in range for V2");
      }
      if (!V2.equals(V2_proof)) {
        throw new Error("V2 missmatch");
      }
      ;
      let sameEncryptUnkownRandomInputs = {
        L1: L0,
        R1: R0,
        L2: V2,
        R2: R_aux2,
        g: constants_1.GENERATOR,
        y1: inputs.from,
        y2: constants_1.SECONDARY_GENERATOR
      };
      let sameEncryptUnkownRandomProof = {
        Ax: proof.A_x,
        AL1: proof.A_b2,
        AL2: proof.A_v2,
        AR2: proof.A_r2,
        c,
        sb: proof.s_b2,
        sx: proof.s_x,
        sr2: proof.s_r2
      };
      res = protocols_1.SameEncryptUnknownRandom.verify(sameEncryptUnkownRandomInputs, sameEncryptUnkownRandomProof);
      if (res == false) {
        throw new Error("error in sameEncrypUnkownRandom");
      }
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/withdraw.js
var require_withdraw = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/provers/withdraw.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WITHDRAW_CAIRO_STRING = void 0;
    exports.proveWithdraw = proveWithdraw;
    exports.verifyWithdraw = verifyWithdraw;
    var she_1 = require_lib2();
    var protocols_1 = require_protocols();
    var protocols_2 = require_protocols();
    var constants_1 = require_constants2();
    var range_1 = require_range2();
    var types_1 = require_types2();
    var utils_1 = require_utils6();
    exports.WITHDRAW_CAIRO_STRING = 8604536554778681719n;
    function prefixWithdraw(inputs) {
      const { chain_id, tongo_address, sender_address } = inputs.prefix_data;
      const { L: L0, R: R0 } = inputs.currentBalance;
      const { L: V, R: R_aux } = inputs.auxiliarCipher;
      const seq = [
        chain_id,
        tongo_address,
        sender_address,
        exports.WITHDRAW_CAIRO_STRING,
        inputs.y.toAffine().x,
        inputs.y.toAffine().y,
        inputs.nonce,
        inputs.amount,
        inputs.to,
        L0.toAffine().x,
        L0.toAffine().y,
        R0.toAffine().x,
        R0.toAffine().y,
        V.toAffine().x,
        V.toAffine().y,
        R_aux.toAffine().x,
        R_aux.toAffine().y
      ];
      return (0, types_1.compute_prefix)(seq);
    }
    function proveWithdraw(private_key, initial_balance, amount, to, initial_cipherbalance, nonce, bit_size, prefix_data) {
      const x = private_key;
      const y = constants_1.GENERATOR.multiply(x);
      const { L: L0, R: R0 } = initial_cipherbalance;
      const g_b = L0.subtract(R0.multiplyUnsafe(x));
      const temp = constants_1.GENERATOR.multiplyUnsafe(initial_balance);
      if (!g_b.equals(temp)) {
        throw new Error("storedBalance is not an encryption of balance");
      }
      ;
      const left = initial_balance - amount;
      const { randomness, total_random } = protocols_2.range.pregenerate_randomness(bit_size);
      const auxiliarCipher = (0, utils_1.createCipherBalance)(constants_1.SECONDARY_GENERATOR, left, total_random);
      const inputs = {
        y,
        nonce,
        currentBalance: initial_cipherbalance,
        to,
        amount,
        bit_size,
        auxiliarCipher,
        prefix_data
      };
      const prefix = prefixWithdraw(inputs);
      const { r, range } = (0, range_1.generateRangeProof)(left, bit_size, randomness, prefix);
      if (r !== total_random) {
        throw new Error("random mismatch");
      }
      ;
      const kb = (0, she_1.generateRandom)();
      const kx = (0, she_1.generateRandom)();
      const kr = (0, she_1.generateRandom)();
      const A_x = constants_1.GENERATOR.multiplyUnsafe(kx);
      const A_r = constants_1.GENERATOR.multiplyUnsafe(kr);
      const A = constants_1.GENERATOR.multiplyUnsafe(kb).add(R0.multiplyUnsafe(kx));
      const A_v = constants_1.GENERATOR.multiplyUnsafe(kb).add(constants_1.SECONDARY_GENERATOR.multiplyUnsafe(kr));
      const c = (0, she_1.compute_challenge)(prefix, [A_x, A_r, A, A_v]);
      const sb = (0, she_1.compute_s)(kb, left, c);
      const sx = (0, she_1.compute_s)(kx, x, c);
      const sr = (0, she_1.compute_s)(kr, r, c);
      const proof = {
        A_x,
        A_r,
        A,
        A_v,
        sx,
        sb,
        sr,
        range
      };
      const cipher = (0, utils_1.createCipherBalance)(y, amount, exports.WITHDRAW_CAIRO_STRING);
      const newBalance = { L: L0.subtract(cipher.L), R: R0.subtract(cipher.R) };
      return { inputs, proof, newBalance };
    }
    function verifyWithdraw(inputs, proof) {
      const bit_size = inputs.bit_size;
      const prefix = prefixWithdraw(inputs);
      const c = (0, she_1.compute_challenge)(prefix, [proof.A_x, proof.A_r, proof.A, proof.A_v]);
      let { L: L0, R: R0 } = inputs.currentBalance;
      let { L: V, R: R_aux } = inputs.auxiliarCipher;
      L0 = L0.subtract(constants_1.GENERATOR.multiply(inputs.amount));
      const V_proof = (0, range_1.verifyRangeProof)(proof.range, bit_size, prefix);
      if (V_proof == false) {
        throw new Error("erro in range for V");
      }
      if (!V.equals(V_proof)) {
        throw new Error("V missmatch");
      }
      ;
      let sameEncryptInputs = {
        L1: L0,
        R1: R0,
        L2: V,
        R2: R_aux,
        g: constants_1.GENERATOR,
        y1: inputs.y,
        y2: constants_1.SECONDARY_GENERATOR
      };
      let sameEncrpyProof = {
        Ax: proof.A_x,
        AL1: proof.A,
        AL2: proof.A_v,
        AR2: proof.A_r,
        c,
        sb: proof.sb,
        sx: proof.sx,
        sr2: proof.sr
      };
      let res = protocols_1.SameEncryptUnknownRandom.verify(sameEncryptInputs, sameEncrpyProof);
      if (res == false) {
        throw new Error("error in SameEncrpyUnkownRandom");
      }
    }
  }
});

// ../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/utils.js
var require_utils7 = __commonJS({
  "../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapCipher = exports.Hash = exports.nextTick = exports.isLE = void 0;
    exports.isBytes = isBytes;
    exports.abool = abool;
    exports.anumber = anumber;
    exports.abytes = abytes;
    exports.ahash = ahash;
    exports.aexists = aexists;
    exports.aoutput = aoutput;
    exports.u8 = u8;
    exports.u32 = u32;
    exports.clean = clean;
    exports.createView = createView;
    exports.bytesToHex = bytesToHex;
    exports.hexToBytes = hexToBytes;
    exports.hexToNumber = hexToNumber;
    exports.bytesToNumberBE = bytesToNumberBE;
    exports.numberToBytesBE = numberToBytesBE;
    exports.utf8ToBytes = utf8ToBytes;
    exports.bytesToUtf8 = bytesToUtf8;
    exports.toBytes = toBytes;
    exports.overlapBytes = overlapBytes;
    exports.complexOverlapBytes = complexOverlapBytes;
    exports.concatBytes = concatBytes;
    exports.checkOpts = checkOpts;
    exports.equalBytes = equalBytes;
    exports.getOutput = getOutput;
    exports.setBigUint64 = setBigUint64;
    exports.u64Lengths = u64Lengths;
    exports.isAligned32 = isAligned32;
    exports.copyBytes = copyBytes;
    function isBytes(a) {
      return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
    }
    function abool(b) {
      if (typeof b !== "boolean")
        throw new Error(`boolean expected, not ${b}`);
    }
    function anumber(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function abytes(b, ...lengths) {
      if (!isBytes(b))
        throw new Error("Uint8Array expected");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
    }
    function ahash(h) {
      if (typeof h !== "function" || typeof h.create !== "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      anumber(h.outputLen);
      anumber(h.blockLen);
    }
    function aexists(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function aoutput(out, instance) {
      abytes(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least " + min);
      }
    }
    function u8(arr) {
      return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    function u32(arr) {
      return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    }
    function clean(...arrays) {
      for (let i = 0; i < arrays.length; i++) {
        arrays[i].fill(0);
      }
    }
    function createView(arr) {
      return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    var hasHexBuiltin = /* @__PURE__ */ (() => (
      // @ts-ignore
      typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
    ))();
    var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      abytes(bytes);
      if (hasHexBuiltin)
        return bytes.toHex();
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
      }
      return hex;
    }
    var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function asciiToBase16(ch) {
      if (ch >= asciis._0 && ch <= asciis._9)
        return ch - asciis._0;
      if (ch >= asciis.A && ch <= asciis.F)
        return ch - (asciis.A - 10);
      if (ch >= asciis.a && ch <= asciis.f)
        return ch - (asciis.a - 10);
      return;
    }
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      if (hasHexBuiltin)
        return Uint8Array.fromHex(hex);
      const hl = hex.length;
      const al = hl / 2;
      if (hl % 2)
        throw new Error("hex string expected, got unpadded hex of length " + hl);
      const array = new Uint8Array(al);
      for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === void 0 || n2 === void 0) {
          const char = hex[hi] + hex[hi + 1];
          throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
      }
      return array;
    }
    function hexToNumber(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      return BigInt(hex === "" ? "0" : "0x" + hex);
    }
    function bytesToNumberBE(bytes) {
      return hexToNumber(bytesToHex(bytes));
    }
    function numberToBytesBE(n, len) {
      return hexToBytes(n.toString(16).padStart(len * 2, "0"));
    }
    var nextTick = async () => {
    };
    exports.nextTick = nextTick;
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(str));
    }
    function bytesToUtf8(bytes) {
      return new TextDecoder().decode(bytes);
    }
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      else if (isBytes(data))
        data = copyBytes(data);
      else
        throw new Error("Uint8Array expected, got " + typeof data);
      return data;
    }
    function overlapBytes(a, b) {
      return a.buffer === b.buffer && // best we can do, may fail with an obscure Proxy
      a.byteOffset < b.byteOffset + b.byteLength && // a starts before b end
      b.byteOffset < a.byteOffset + a.byteLength;
    }
    function complexOverlapBytes(input, output) {
      if (overlapBytes(input, output) && input.byteOffset < output.byteOffset)
        throw new Error("complex overlap of input and output is not supported");
    }
    function concatBytes(...arrays) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        const a = arrays[i];
        abytes(a);
        sum += a.length;
      }
      const res = new Uint8Array(sum);
      for (let i = 0, pad = 0; i < arrays.length; i++) {
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
      }
      return res;
    }
    function checkOpts(defaults, opts) {
      if (opts == null || typeof opts !== "object")
        throw new Error("options must be defined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    function equalBytes(a, b) {
      if (a.length !== b.length)
        return false;
      let diff = 0;
      for (let i = 0; i < a.length; i++)
        diff |= a[i] ^ b[i];
      return diff === 0;
    }
    var Hash = class {
    };
    exports.Hash = Hash;
    var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
      function wrappedCipher(key, ...args) {
        abytes(key);
        if (!exports.isLE)
          throw new Error("Non little-endian hardware is not yet supported");
        if (params.nonceLength !== void 0) {
          const nonce = args[0];
          if (!nonce)
            throw new Error("nonce / iv required");
          if (params.varSizeNonce)
            abytes(nonce);
          else
            abytes(nonce, params.nonceLength);
        }
        const tagl = params.tagLength;
        if (tagl && args[1] !== void 0) {
          abytes(args[1]);
        }
        const cipher = constructor(key, ...args);
        const checkOutput = (fnLength, output) => {
          if (output !== void 0) {
            if (fnLength !== 2)
              throw new Error("cipher output not supported");
            abytes(output);
          }
        };
        let called = false;
        const wrCipher = {
          encrypt(data, output) {
            if (called)
              throw new Error("cannot encrypt() twice with same key + nonce");
            called = true;
            abytes(data);
            checkOutput(cipher.encrypt.length, output);
            return cipher.encrypt(data, output);
          },
          decrypt(data, output) {
            abytes(data);
            if (tagl && data.length < tagl)
              throw new Error("invalid ciphertext length: smaller than tagLength=" + tagl);
            checkOutput(cipher.decrypt.length, output);
            return cipher.decrypt(data, output);
          }
        };
        return wrCipher;
      }
      Object.assign(wrappedCipher, params);
      return wrappedCipher;
    };
    exports.wrapCipher = wrapCipher;
    function getOutput(expectedLength, out, onlyAligned = true) {
      if (out === void 0)
        return new Uint8Array(expectedLength);
      if (out.length !== expectedLength)
        throw new Error("invalid output length, expected " + expectedLength + ", got: " + out.length);
      if (onlyAligned && !isAligned32(out))
        throw new Error("invalid output, must be aligned");
      return out;
    }
    function setBigUint64(view, byteOffset, value, isLE) {
      if (typeof view.setBigUint64 === "function")
        return view.setBigUint64(byteOffset, value, isLE);
      const _32n = BigInt(32);
      const _u32_max = BigInt(4294967295);
      const wh = Number(value >> _32n & _u32_max);
      const wl = Number(value & _u32_max);
      const h = isLE ? 4 : 0;
      const l = isLE ? 0 : 4;
      view.setUint32(byteOffset + h, wh, isLE);
      view.setUint32(byteOffset + l, wl, isLE);
    }
    function u64Lengths(dataLength, aadLength, isLE) {
      abool(isLE);
      const num2 = new Uint8Array(16);
      const view = createView(num2);
      setBigUint64(view, 0, BigInt(aadLength), isLE);
      setBigUint64(view, 8, BigInt(dataLength), isLE);
      return num2;
    }
    function isAligned32(bytes) {
      return bytes.byteOffset % 4 === 0;
    }
    function copyBytes(bytes) {
      return Uint8Array.from(bytes);
    }
  }
});

// ../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/_arx.js
var require_arx = __commonJS({
  "../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/_arx.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.rotl = rotl;
    exports.createCipher = createCipher;
    var utils_ts_1 = require_utils7();
    var _utf8ToBytes = (str) => Uint8Array.from(str.split("").map((c) => c.charCodeAt(0)));
    var sigma16 = _utf8ToBytes("expand 16-byte k");
    var sigma32 = _utf8ToBytes("expand 32-byte k");
    var sigma16_32 = (0, utils_ts_1.u32)(sigma16);
    var sigma32_32 = (0, utils_ts_1.u32)(sigma32);
    function rotl(a, b) {
      return a << b | a >>> 32 - b;
    }
    function isAligned32(b) {
      return b.byteOffset % 4 === 0;
    }
    var BLOCK_LEN = 64;
    var BLOCK_LEN32 = 16;
    var MAX_COUNTER = 2 ** 32 - 1;
    var U32_EMPTY = new Uint32Array();
    function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
      const len = data.length;
      const block = new Uint8Array(BLOCK_LEN);
      const b32 = (0, utils_ts_1.u32)(block);
      const isAligned = isAligned32(data) && isAligned32(output);
      const d32 = isAligned ? (0, utils_ts_1.u32)(data) : U32_EMPTY;
      const o32 = isAligned ? (0, utils_ts_1.u32)(output) : U32_EMPTY;
      for (let pos = 0; pos < len; counter++) {
        core(sigma, key, nonce, b32, counter, rounds);
        if (counter >= MAX_COUNTER)
          throw new Error("arx: counter overflow");
        const take = Math.min(BLOCK_LEN, len - pos);
        if (isAligned && take === BLOCK_LEN) {
          const pos32 = pos / 4;
          if (pos % 4 !== 0)
            throw new Error("arx: invalid block position");
          for (let j = 0, posj; j < BLOCK_LEN32; j++) {
            posj = pos32 + j;
            o32[posj] = d32[posj] ^ b32[j];
          }
          pos += BLOCK_LEN;
          continue;
        }
        for (let j = 0, posj; j < take; j++) {
          posj = pos + j;
          output[posj] = data[posj] ^ block[j];
        }
        pos += take;
      }
    }
    function createCipher(core, opts) {
      const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = (0, utils_ts_1.checkOpts)({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
      if (typeof core !== "function")
        throw new Error("core must be a function");
      (0, utils_ts_1.anumber)(counterLength);
      (0, utils_ts_1.anumber)(rounds);
      (0, utils_ts_1.abool)(counterRight);
      (0, utils_ts_1.abool)(allowShortKeys);
      return (key, nonce, data, output, counter = 0) => {
        (0, utils_ts_1.abytes)(key);
        (0, utils_ts_1.abytes)(nonce);
        (0, utils_ts_1.abytes)(data);
        const len = data.length;
        if (output === void 0)
          output = new Uint8Array(len);
        (0, utils_ts_1.abytes)(output);
        (0, utils_ts_1.anumber)(counter);
        if (counter < 0 || counter >= MAX_COUNTER)
          throw new Error("arx: counter overflow");
        if (output.length < len)
          throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
        const toClean = [];
        let l = key.length;
        let k;
        let sigma;
        if (l === 32) {
          toClean.push(k = (0, utils_ts_1.copyBytes)(key));
          sigma = sigma32_32;
        } else if (l === 16 && allowShortKeys) {
          k = new Uint8Array(32);
          k.set(key);
          k.set(key, 16);
          sigma = sigma16_32;
          toClean.push(k);
        } else {
          throw new Error(`arx: invalid 32-byte key, got length=${l}`);
        }
        if (!isAligned32(nonce))
          toClean.push(nonce = (0, utils_ts_1.copyBytes)(nonce));
        const k32 = (0, utils_ts_1.u32)(k);
        if (extendNonceFn) {
          if (nonce.length !== 24)
            throw new Error(`arx: extended nonce must be 24 bytes`);
          extendNonceFn(sigma, k32, (0, utils_ts_1.u32)(nonce.subarray(0, 16)), k32);
          nonce = nonce.subarray(16);
        }
        const nonceNcLen = 16 - counterLength;
        if (nonceNcLen !== nonce.length)
          throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
        if (nonceNcLen !== 12) {
          const nc = new Uint8Array(12);
          nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
          nonce = nc;
          toClean.push(nonce);
        }
        const n32 = (0, utils_ts_1.u32)(nonce);
        runCipher(core, sigma, k32, n32, data, output, counter, rounds);
        (0, utils_ts_1.clean)(...toClean);
        return output;
      };
    }
  }
});

// ../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/_poly1305.js
var require_poly1305 = __commonJS({
  "../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/_poly1305.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.poly1305 = void 0;
    exports.wrapConstructorWithKey = wrapConstructorWithKey;
    var utils_ts_1 = require_utils7();
    var u8to16 = (a, i) => a[i++] & 255 | (a[i++] & 255) << 8;
    var Poly1305 = class {
      constructor(key) {
        this.blockLen = 16;
        this.outputLen = 16;
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.pos = 0;
        this.finished = false;
        key = (0, utils_ts_1.toBytes)(key);
        (0, utils_ts_1.abytes)(key, 32);
        const t0 = u8to16(key, 0);
        const t1 = u8to16(key, 2);
        const t2 = u8to16(key, 4);
        const t3 = u8to16(key, 6);
        const t4 = u8to16(key, 8);
        const t5 = u8to16(key, 10);
        const t6 = u8to16(key, 12);
        const t7 = u8to16(key, 14);
        this.r[0] = t0 & 8191;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this.r[5] = t4 >>> 1 & 8190;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this.r[9] = t7 >>> 5 & 127;
        for (let i = 0; i < 8; i++)
          this.pad[i] = u8to16(key, 16 + 2 * i);
      }
      process(data, offset, isLast = false) {
        const hibit = isLast ? 0 : 1 << 11;
        const { h, r } = this;
        const r0 = r[0];
        const r1 = r[1];
        const r2 = r[2];
        const r3 = r[3];
        const r4 = r[4];
        const r5 = r[5];
        const r6 = r[6];
        const r7 = r[7];
        const r8 = r[8];
        const r9 = r[9];
        const t0 = u8to16(data, offset + 0);
        const t1 = u8to16(data, offset + 2);
        const t2 = u8to16(data, offset + 4);
        const t3 = u8to16(data, offset + 6);
        const t4 = u8to16(data, offset + 8);
        const t5 = u8to16(data, offset + 10);
        const t6 = u8to16(data, offset + 12);
        const t7 = u8to16(data, offset + 14);
        let h0 = h[0] + (t0 & 8191);
        let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
        let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
        let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
        let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
        let h5 = h[5] + (t4 >>> 1 & 8191);
        let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
        let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
        let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
        let h9 = h[9] + (t7 >>> 5 | hibit);
        let c = 0;
        let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
        c = d0 >>> 13;
        d0 &= 8191;
        d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
        c += d0 >>> 13;
        d0 &= 8191;
        let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
        c = d1 >>> 13;
        d1 &= 8191;
        d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
        c += d1 >>> 13;
        d1 &= 8191;
        let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
        c = d2 >>> 13;
        d2 &= 8191;
        d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
        c += d2 >>> 13;
        d2 &= 8191;
        let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
        c = d3 >>> 13;
        d3 &= 8191;
        d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
        c += d3 >>> 13;
        d3 &= 8191;
        let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
        c = d4 >>> 13;
        d4 &= 8191;
        d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
        c += d4 >>> 13;
        d4 &= 8191;
        let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
        c = d5 >>> 13;
        d5 &= 8191;
        d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
        c += d5 >>> 13;
        d5 &= 8191;
        let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
        c = d6 >>> 13;
        d6 &= 8191;
        d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
        c += d6 >>> 13;
        d6 &= 8191;
        let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
        c = d7 >>> 13;
        d7 &= 8191;
        d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
        c += d7 >>> 13;
        d7 &= 8191;
        let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
        c = d8 >>> 13;
        d8 &= 8191;
        d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
        c += d8 >>> 13;
        d8 &= 8191;
        let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
        c = d9 >>> 13;
        d9 &= 8191;
        d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
        c += d9 >>> 13;
        d9 &= 8191;
        c = (c << 2) + c | 0;
        c = c + d0 | 0;
        d0 = c & 8191;
        c = c >>> 13;
        d1 += c;
        h[0] = d0;
        h[1] = d1;
        h[2] = d2;
        h[3] = d3;
        h[4] = d4;
        h[5] = d5;
        h[6] = d6;
        h[7] = d7;
        h[8] = d8;
        h[9] = d9;
      }
      finalize() {
        const { h, pad } = this;
        const g = new Uint16Array(10);
        let c = h[1] >>> 13;
        h[1] &= 8191;
        for (let i = 2; i < 10; i++) {
          h[i] += c;
          c = h[i] >>> 13;
          h[i] &= 8191;
        }
        h[0] += c * 5;
        c = h[0] >>> 13;
        h[0] &= 8191;
        h[1] += c;
        c = h[1] >>> 13;
        h[1] &= 8191;
        h[2] += c;
        g[0] = h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 8191;
        for (let i = 1; i < 10; i++) {
          g[i] = h[i] + c;
          c = g[i] >>> 13;
          g[i] &= 8191;
        }
        g[9] -= 1 << 13;
        let mask = (c ^ 1) - 1;
        for (let i = 0; i < 10; i++)
          g[i] &= mask;
        mask = ~mask;
        for (let i = 0; i < 10; i++)
          h[i] = h[i] & mask | g[i];
        h[0] = (h[0] | h[1] << 13) & 65535;
        h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
        h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
        h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
        h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
        h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
        h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
        h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
        let f = h[0] + pad[0];
        h[0] = f & 65535;
        for (let i = 1; i < 8; i++) {
          f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
          h[i] = f & 65535;
        }
        (0, utils_ts_1.clean)(g);
      }
      update(data) {
        (0, utils_ts_1.aexists)(this);
        data = (0, utils_ts_1.toBytes)(data);
        (0, utils_ts_1.abytes)(data);
        const { buffer, blockLen } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          if (take === blockLen) {
            for (; blockLen <= len - pos; pos += blockLen)
              this.process(data, pos);
            continue;
          }
          buffer.set(data.subarray(pos, pos + take), this.pos);
          this.pos += take;
          pos += take;
          if (this.pos === blockLen) {
            this.process(buffer, 0, false);
            this.pos = 0;
          }
        }
        return this;
      }
      destroy() {
        (0, utils_ts_1.clean)(this.h, this.r, this.buffer, this.pad);
      }
      digestInto(out) {
        (0, utils_ts_1.aexists)(this);
        (0, utils_ts_1.aoutput)(out, this);
        this.finished = true;
        const { buffer, h } = this;
        let { pos } = this;
        if (pos) {
          buffer[pos++] = 1;
          for (; pos < 16; pos++)
            buffer[pos] = 0;
          this.process(buffer, 0, true);
        }
        this.finalize();
        let opos = 0;
        for (let i = 0; i < 8; i++) {
          out[opos++] = h[i] >>> 0;
          out[opos++] = h[i] >>> 8;
        }
        return out;
      }
      digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
      }
    };
    function wrapConstructorWithKey(hashCons) {
      const hashC = (msg, key) => hashCons(key).update((0, utils_ts_1.toBytes)(msg)).digest();
      const tmp = hashCons(new Uint8Array(32));
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (key) => hashCons(key);
      return hashC;
    }
    exports.poly1305 = wrapConstructorWithKey((key) => new Poly1305(key));
  }
});

// ../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/chacha.js
var require_chacha = __commonJS({
  "../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/chacha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.xchacha20poly1305 = exports.chacha20poly1305 = exports._poly1305_aead = exports.chacha12 = exports.chacha8 = exports.xchacha20 = exports.chacha20 = exports.chacha20orig = void 0;
    exports.hchacha = hchacha;
    var _arx_ts_1 = require_arx();
    var _poly1305_ts_1 = require_poly1305();
    var utils_ts_1 = require_utils7();
    function chachaCore(s, k, n, out, cnt, rounds = 20) {
      let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
      let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
      for (let r = 0; r < rounds; r += 2) {
        x00 = x00 + x04 | 0;
        x12 = (0, _arx_ts_1.rotl)(x12 ^ x00, 16);
        x08 = x08 + x12 | 0;
        x04 = (0, _arx_ts_1.rotl)(x04 ^ x08, 12);
        x00 = x00 + x04 | 0;
        x12 = (0, _arx_ts_1.rotl)(x12 ^ x00, 8);
        x08 = x08 + x12 | 0;
        x04 = (0, _arx_ts_1.rotl)(x04 ^ x08, 7);
        x01 = x01 + x05 | 0;
        x13 = (0, _arx_ts_1.rotl)(x13 ^ x01, 16);
        x09 = x09 + x13 | 0;
        x05 = (0, _arx_ts_1.rotl)(x05 ^ x09, 12);
        x01 = x01 + x05 | 0;
        x13 = (0, _arx_ts_1.rotl)(x13 ^ x01, 8);
        x09 = x09 + x13 | 0;
        x05 = (0, _arx_ts_1.rotl)(x05 ^ x09, 7);
        x02 = x02 + x06 | 0;
        x14 = (0, _arx_ts_1.rotl)(x14 ^ x02, 16);
        x10 = x10 + x14 | 0;
        x06 = (0, _arx_ts_1.rotl)(x06 ^ x10, 12);
        x02 = x02 + x06 | 0;
        x14 = (0, _arx_ts_1.rotl)(x14 ^ x02, 8);
        x10 = x10 + x14 | 0;
        x06 = (0, _arx_ts_1.rotl)(x06 ^ x10, 7);
        x03 = x03 + x07 | 0;
        x15 = (0, _arx_ts_1.rotl)(x15 ^ x03, 16);
        x11 = x11 + x15 | 0;
        x07 = (0, _arx_ts_1.rotl)(x07 ^ x11, 12);
        x03 = x03 + x07 | 0;
        x15 = (0, _arx_ts_1.rotl)(x15 ^ x03, 8);
        x11 = x11 + x15 | 0;
        x07 = (0, _arx_ts_1.rotl)(x07 ^ x11, 7);
        x00 = x00 + x05 | 0;
        x15 = (0, _arx_ts_1.rotl)(x15 ^ x00, 16);
        x10 = x10 + x15 | 0;
        x05 = (0, _arx_ts_1.rotl)(x05 ^ x10, 12);
        x00 = x00 + x05 | 0;
        x15 = (0, _arx_ts_1.rotl)(x15 ^ x00, 8);
        x10 = x10 + x15 | 0;
        x05 = (0, _arx_ts_1.rotl)(x05 ^ x10, 7);
        x01 = x01 + x06 | 0;
        x12 = (0, _arx_ts_1.rotl)(x12 ^ x01, 16);
        x11 = x11 + x12 | 0;
        x06 = (0, _arx_ts_1.rotl)(x06 ^ x11, 12);
        x01 = x01 + x06 | 0;
        x12 = (0, _arx_ts_1.rotl)(x12 ^ x01, 8);
        x11 = x11 + x12 | 0;
        x06 = (0, _arx_ts_1.rotl)(x06 ^ x11, 7);
        x02 = x02 + x07 | 0;
        x13 = (0, _arx_ts_1.rotl)(x13 ^ x02, 16);
        x08 = x08 + x13 | 0;
        x07 = (0, _arx_ts_1.rotl)(x07 ^ x08, 12);
        x02 = x02 + x07 | 0;
        x13 = (0, _arx_ts_1.rotl)(x13 ^ x02, 8);
        x08 = x08 + x13 | 0;
        x07 = (0, _arx_ts_1.rotl)(x07 ^ x08, 7);
        x03 = x03 + x04 | 0;
        x14 = (0, _arx_ts_1.rotl)(x14 ^ x03, 16);
        x09 = x09 + x14 | 0;
        x04 = (0, _arx_ts_1.rotl)(x04 ^ x09, 12);
        x03 = x03 + x04 | 0;
        x14 = (0, _arx_ts_1.rotl)(x14 ^ x03, 8);
        x09 = x09 + x14 | 0;
        x04 = (0, _arx_ts_1.rotl)(x04 ^ x09, 7);
      }
      let oi = 0;
      out[oi++] = y00 + x00 | 0;
      out[oi++] = y01 + x01 | 0;
      out[oi++] = y02 + x02 | 0;
      out[oi++] = y03 + x03 | 0;
      out[oi++] = y04 + x04 | 0;
      out[oi++] = y05 + x05 | 0;
      out[oi++] = y06 + x06 | 0;
      out[oi++] = y07 + x07 | 0;
      out[oi++] = y08 + x08 | 0;
      out[oi++] = y09 + x09 | 0;
      out[oi++] = y10 + x10 | 0;
      out[oi++] = y11 + x11 | 0;
      out[oi++] = y12 + x12 | 0;
      out[oi++] = y13 + x13 | 0;
      out[oi++] = y14 + x14 | 0;
      out[oi++] = y15 + x15 | 0;
    }
    function hchacha(s, k, i, o32) {
      let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i[0], x13 = i[1], x14 = i[2], x15 = i[3];
      for (let r = 0; r < 20; r += 2) {
        x00 = x00 + x04 | 0;
        x12 = (0, _arx_ts_1.rotl)(x12 ^ x00, 16);
        x08 = x08 + x12 | 0;
        x04 = (0, _arx_ts_1.rotl)(x04 ^ x08, 12);
        x00 = x00 + x04 | 0;
        x12 = (0, _arx_ts_1.rotl)(x12 ^ x00, 8);
        x08 = x08 + x12 | 0;
        x04 = (0, _arx_ts_1.rotl)(x04 ^ x08, 7);
        x01 = x01 + x05 | 0;
        x13 = (0, _arx_ts_1.rotl)(x13 ^ x01, 16);
        x09 = x09 + x13 | 0;
        x05 = (0, _arx_ts_1.rotl)(x05 ^ x09, 12);
        x01 = x01 + x05 | 0;
        x13 = (0, _arx_ts_1.rotl)(x13 ^ x01, 8);
        x09 = x09 + x13 | 0;
        x05 = (0, _arx_ts_1.rotl)(x05 ^ x09, 7);
        x02 = x02 + x06 | 0;
        x14 = (0, _arx_ts_1.rotl)(x14 ^ x02, 16);
        x10 = x10 + x14 | 0;
        x06 = (0, _arx_ts_1.rotl)(x06 ^ x10, 12);
        x02 = x02 + x06 | 0;
        x14 = (0, _arx_ts_1.rotl)(x14 ^ x02, 8);
        x10 = x10 + x14 | 0;
        x06 = (0, _arx_ts_1.rotl)(x06 ^ x10, 7);
        x03 = x03 + x07 | 0;
        x15 = (0, _arx_ts_1.rotl)(x15 ^ x03, 16);
        x11 = x11 + x15 | 0;
        x07 = (0, _arx_ts_1.rotl)(x07 ^ x11, 12);
        x03 = x03 + x07 | 0;
        x15 = (0, _arx_ts_1.rotl)(x15 ^ x03, 8);
        x11 = x11 + x15 | 0;
        x07 = (0, _arx_ts_1.rotl)(x07 ^ x11, 7);
        x00 = x00 + x05 | 0;
        x15 = (0, _arx_ts_1.rotl)(x15 ^ x00, 16);
        x10 = x10 + x15 | 0;
        x05 = (0, _arx_ts_1.rotl)(x05 ^ x10, 12);
        x00 = x00 + x05 | 0;
        x15 = (0, _arx_ts_1.rotl)(x15 ^ x00, 8);
        x10 = x10 + x15 | 0;
        x05 = (0, _arx_ts_1.rotl)(x05 ^ x10, 7);
        x01 = x01 + x06 | 0;
        x12 = (0, _arx_ts_1.rotl)(x12 ^ x01, 16);
        x11 = x11 + x12 | 0;
        x06 = (0, _arx_ts_1.rotl)(x06 ^ x11, 12);
        x01 = x01 + x06 | 0;
        x12 = (0, _arx_ts_1.rotl)(x12 ^ x01, 8);
        x11 = x11 + x12 | 0;
        x06 = (0, _arx_ts_1.rotl)(x06 ^ x11, 7);
        x02 = x02 + x07 | 0;
        x13 = (0, _arx_ts_1.rotl)(x13 ^ x02, 16);
        x08 = x08 + x13 | 0;
        x07 = (0, _arx_ts_1.rotl)(x07 ^ x08, 12);
        x02 = x02 + x07 | 0;
        x13 = (0, _arx_ts_1.rotl)(x13 ^ x02, 8);
        x08 = x08 + x13 | 0;
        x07 = (0, _arx_ts_1.rotl)(x07 ^ x08, 7);
        x03 = x03 + x04 | 0;
        x14 = (0, _arx_ts_1.rotl)(x14 ^ x03, 16);
        x09 = x09 + x14 | 0;
        x04 = (0, _arx_ts_1.rotl)(x04 ^ x09, 12);
        x03 = x03 + x04 | 0;
        x14 = (0, _arx_ts_1.rotl)(x14 ^ x03, 8);
        x09 = x09 + x14 | 0;
        x04 = (0, _arx_ts_1.rotl)(x04 ^ x09, 7);
      }
      let oi = 0;
      o32[oi++] = x00;
      o32[oi++] = x01;
      o32[oi++] = x02;
      o32[oi++] = x03;
      o32[oi++] = x12;
      o32[oi++] = x13;
      o32[oi++] = x14;
      o32[oi++] = x15;
    }
    exports.chacha20orig = (0, _arx_ts_1.createCipher)(chachaCore, {
      counterRight: false,
      counterLength: 8,
      allowShortKeys: true
    });
    exports.chacha20 = (0, _arx_ts_1.createCipher)(chachaCore, {
      counterRight: false,
      counterLength: 4,
      allowShortKeys: false
    });
    exports.xchacha20 = (0, _arx_ts_1.createCipher)(chachaCore, {
      counterRight: false,
      counterLength: 8,
      extendNonceFn: hchacha,
      allowShortKeys: false
    });
    exports.chacha8 = (0, _arx_ts_1.createCipher)(chachaCore, {
      counterRight: false,
      counterLength: 4,
      rounds: 8
    });
    exports.chacha12 = (0, _arx_ts_1.createCipher)(chachaCore, {
      counterRight: false,
      counterLength: 4,
      rounds: 12
    });
    var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
    var updatePadded = (h, msg) => {
      h.update(msg);
      const left = msg.length % 16;
      if (left)
        h.update(ZEROS16.subarray(left));
    };
    var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
    function computeTag(fn, key, nonce, data, AAD) {
      const authKey = fn(key, nonce, ZEROS32);
      const h = _poly1305_ts_1.poly1305.create(authKey);
      if (AAD)
        updatePadded(h, AAD);
      updatePadded(h, data);
      const num2 = (0, utils_ts_1.u64Lengths)(data.length, AAD ? AAD.length : 0, true);
      h.update(num2);
      const res = h.digest();
      (0, utils_ts_1.clean)(authKey, num2);
      return res;
    }
    var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
      const tagLength = 16;
      return {
        encrypt(plaintext, output) {
          const plength = plaintext.length;
          output = (0, utils_ts_1.getOutput)(plength + tagLength, output, false);
          output.set(plaintext);
          const oPlain = output.subarray(0, -tagLength);
          xorStream(key, nonce, oPlain, oPlain, 1);
          const tag = computeTag(xorStream, key, nonce, oPlain, AAD);
          output.set(tag, plength);
          (0, utils_ts_1.clean)(tag);
          return output;
        },
        decrypt(ciphertext, output) {
          output = (0, utils_ts_1.getOutput)(ciphertext.length - tagLength, output, false);
          const data = ciphertext.subarray(0, -tagLength);
          const passedTag = ciphertext.subarray(-tagLength);
          const tag = computeTag(xorStream, key, nonce, data, AAD);
          if (!(0, utils_ts_1.equalBytes)(passedTag, tag))
            throw new Error("invalid tag");
          output.set(ciphertext.subarray(0, -tagLength));
          xorStream(key, nonce, output, output, 1);
          (0, utils_ts_1.clean)(tag);
          return output;
        }
      };
    };
    exports._poly1305_aead = _poly1305_aead;
    exports.chacha20poly1305 = (0, utils_ts_1.wrapCipher)({ blockSize: 64, nonceLength: 12, tagLength: 16 }, (0, exports._poly1305_aead)(exports.chacha20));
    exports.xchacha20poly1305 = (0, utils_ts_1.wrapCipher)({ blockSize: 64, nonceLength: 24, tagLength: 16 }, (0, exports._poly1305_aead)(exports.xchacha20));
  }
});

// ../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/cryptoNode.js
var require_cryptoNode4 = __commonJS({
  "../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/cryptoNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crypto = void 0;
    var nc = __require("crypto");
    exports.crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : nc && typeof nc === "object" && "randomBytes" in nc ? nc : void 0;
  }
});

// ../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/webcrypto.js
var require_webcrypto = __commonJS({
  "../../node_modules/.pnpm/@noble+ciphers@1.3.0/node_modules/@noble/ciphers/webcrypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gcm = exports.ctr = exports.cbc = exports.utils = void 0;
    exports.randomBytes = randomBytes;
    exports.getWebcryptoSubtle = getWebcryptoSubtle;
    exports.managedNonce = managedNonce;
    var crypto_1 = require_cryptoNode4();
    var utils_ts_1 = require_utils7();
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
        return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
    function getWebcryptoSubtle() {
      if (crypto_1.crypto && typeof crypto_1.crypto.subtle === "object" && crypto_1.crypto.subtle != null)
        return crypto_1.crypto.subtle;
      throw new Error("crypto.subtle must be defined");
    }
    function managedNonce(fn) {
      const { nonceLength } = fn;
      (0, utils_ts_1.anumber)(nonceLength);
      return ((key, ...args) => ({
        encrypt(plaintext, ...argsEnc) {
          const nonce = randomBytes(nonceLength);
          const ciphertext = fn(key, nonce, ...args).encrypt(plaintext, ...argsEnc);
          const out = (0, utils_ts_1.concatBytes)(nonce, ciphertext);
          ciphertext.fill(0);
          return out;
        },
        decrypt(ciphertext, ...argsDec) {
          const nonce = ciphertext.subarray(0, nonceLength);
          const data = ciphertext.subarray(nonceLength);
          return fn(key, nonce, ...args).decrypt(data, ...argsDec);
        }
      }));
    }
    exports.utils = {
      async encrypt(key, keyParams, cryptParams, plaintext) {
        const cr = getWebcryptoSubtle();
        const iKey = await cr.importKey("raw", key, keyParams, true, ["encrypt"]);
        const ciphertext = await cr.encrypt(cryptParams, iKey, plaintext);
        return new Uint8Array(ciphertext);
      },
      async decrypt(key, keyParams, cryptParams, ciphertext) {
        const cr = getWebcryptoSubtle();
        const iKey = await cr.importKey("raw", key, keyParams, true, ["decrypt"]);
        const plaintext = await cr.decrypt(cryptParams, iKey, ciphertext);
        return new Uint8Array(plaintext);
      }
    };
    var mode = {
      CBC: "AES-CBC",
      CTR: "AES-CTR",
      GCM: "AES-GCM"
    };
    function getCryptParams(algo, nonce, AAD) {
      if (algo === mode.CBC)
        return { name: mode.CBC, iv: nonce };
      if (algo === mode.CTR)
        return { name: mode.CTR, counter: nonce, length: 64 };
      if (algo === mode.GCM) {
        if (AAD)
          return { name: mode.GCM, iv: nonce, additionalData: AAD };
        else
          return { name: mode.GCM, iv: nonce };
      }
      throw new Error("unknown aes block mode");
    }
    function generate(algo) {
      return (key, nonce, AAD) => {
        (0, utils_ts_1.abytes)(key);
        (0, utils_ts_1.abytes)(nonce);
        const keyParams = { name: algo, length: key.length * 8 };
        const cryptParams = getCryptParams(algo, nonce, AAD);
        let consumed = false;
        return {
          // keyLength,
          encrypt(plaintext) {
            (0, utils_ts_1.abytes)(plaintext);
            if (consumed)
              throw new Error("Cannot encrypt() twice with same key / nonce");
            consumed = true;
            return exports.utils.encrypt(key, keyParams, cryptParams, plaintext);
          },
          decrypt(ciphertext) {
            (0, utils_ts_1.abytes)(ciphertext);
            return exports.utils.decrypt(key, keyParams, cryptParams, ciphertext);
          }
        };
      };
    }
    exports.cbc = (() => generate(mode.CBC))();
    exports.ctr = (() => generate(mode.CTR))();
    exports.gcm = /* @__PURE__ */ (() => generate(mode.GCM))();
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/ae_balance.js
var require_ae_balance = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/ae_balance.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AEChaCha = void 0;
    exports.AEHintToBytes = AEHintToBytes;
    exports.bytesToAEHint = bytesToAEHint;
    exports.parseAEBalance = parseAEBalance;
    var chacha_js_1 = require_chacha();
    var utils_js_1 = require_utils7();
    var webcrypto_js_1 = require_webcrypto();
    var starknet_1 = __require("starknet");
    var utils_js_2 = require_utils6();
    function AEHintToBytes({ ciphertext, nonce }) {
      return {
        ciphertext: (0, utils_js_1.numberToBytesBE)(ciphertext, 64),
        nonce: (0, utils_js_1.numberToBytesBE)(nonce, 24)
        // XChaCha20 nonce is 192 bits
      };
    }
    function bytesToAEHint({ ciphertext, nonce }) {
      return {
        ciphertext: (0, utils_js_1.bytesToNumberBE)(ciphertext),
        nonce: (0, utils_js_1.bytesToNumberBE)(nonce)
      };
    }
    function parseAEBalance({ ciphertext, nonce }) {
      let parsedNonce;
      if ((0, utils_js_2.isUint256)(nonce)) {
        parsedNonce = starknet_1.uint256.uint256ToBN(nonce);
      } else {
        parsedNonce = BigInt(nonce);
      }
      return {
        ciphertext: BigInt(ciphertext),
        nonce: parsedNonce
      };
    }
    var AEChaCha = class {
      constructor(key) {
        __publicField(this, "key");
        this.key = key;
        if (this.key.length != 32) {
          throw new Error(`Key length must be exactly 32 Bytes, not '${this.key.length}'`);
        }
      }
      encryptBalance(balance) {
        if (balance >= 2n ** 32n) {
          throw new Error("This implementation only supports 32 bit balances");
        }
        const nonce = (0, webcrypto_js_1.randomBytes)(24);
        const noise = (0, webcrypto_js_1.randomBytes)(3 * 16 - 4);
        const numberBytes = (0, utils_js_1.numberToBytesBE)(balance, 48);
        numberBytes.set(noise, 0);
        const chacha = (0, chacha_js_1.xchacha20poly1305)(this.key, nonce);
        const ciphertext = chacha.encrypt(numberBytes);
        return { ciphertext, nonce };
      }
      decryptBalance({ ciphertext, nonce }) {
        const chacha = (0, chacha_js_1.xchacha20poly1305)(this.key, nonce);
        try {
          const plaintext = chacha.decrypt(ciphertext);
          if (plaintext.length !== 48)
            throw new Error("Malformed plaintext");
          return (0, utils_js_1.bytesToNumberBE)(plaintext.slice(44, 48));
        } catch {
          throw new Error("Malformed or tampered ciphertext");
        }
      }
    };
    exports.AEChaCha = AEChaCha;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/tongo.abi.js
var require_tongo_abi = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/tongo.abi.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tongoAbi = void 0;
    exports.tongoAbi = [
      {
        "type": "impl",
        "name": "TongoImpl",
        "interface_name": "tongo::tongo::ITongo::ITongo"
      },
      {
        "type": "struct",
        "name": "core::integer::u256",
        "members": [
          {
            "name": "low",
            "type": "core::integer::u128"
          },
          {
            "name": "high",
            "type": "core::integer::u128"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::common::pubkey::PubKey",
        "members": [
          {
            "name": "x",
            "type": "core::felt252"
          },
          {
            "name": "y",
            "type": "core::felt252"
          }
        ]
      },
      {
        "type": "struct",
        "name": "core::integer::u512",
        "members": [
          {
            "name": "limb0",
            "type": "core::integer::u128"
          },
          {
            "name": "limb1",
            "type": "core::integer::u128"
          },
          {
            "name": "limb2",
            "type": "core::integer::u128"
          },
          {
            "name": "limb3",
            "type": "core::integer::u128"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::aecipher::AEBalance",
        "members": [
          {
            "name": "ciphertext",
            "type": "core::integer::u512"
          },
          {
            "name": "nonce",
            "type": "core::integer::u256"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::common::starkpoint::StarkPoint",
        "members": [
          {
            "name": "x",
            "type": "core::felt252"
          },
          {
            "name": "y",
            "type": "core::felt252"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::fund::ProofOfFund",
        "members": [
          {
            "name": "Ax",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "sx",
            "type": "core::felt252"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::common::cipherbalance::CipherBalance",
        "members": [
          {
            "name": "L",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "R",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::audit::ProofOfAudit",
        "members": [
          {
            "name": "Ax",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "AL0",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "AL1",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "AR1",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "sx",
            "type": "core::felt252"
          },
          {
            "name": "sb",
            "type": "core::felt252"
          },
          {
            "name": "sr",
            "type": "core::felt252"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::audit::Audit",
        "members": [
          {
            "name": "auditedBalance",
            "type": "tongo::structs::common::cipherbalance::CipherBalance"
          },
          {
            "name": "hint",
            "type": "tongo::structs::aecipher::AEBalance"
          },
          {
            "name": "proof",
            "type": "tongo::structs::operations::audit::ProofOfAudit"
          }
        ]
      },
      {
        "type": "enum",
        "name": "core::option::Option::<tongo::structs::operations::audit::Audit>",
        "variants": [
          {
            "name": "Some",
            "type": "tongo::structs::operations::audit::Audit"
          },
          {
            "name": "None",
            "type": "()"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::fund::Fund",
        "members": [
          {
            "name": "to",
            "type": "tongo::structs::common::pubkey::PubKey"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          },
          {
            "name": "hint",
            "type": "tongo::structs::aecipher::AEBalance"
          },
          {
            "name": "proof",
            "type": "tongo::structs::operations::fund::ProofOfFund"
          },
          {
            "name": "auditPart",
            "type": "core::option::Option::<tongo::structs::operations::audit::Audit>"
          }
        ]
      },
      {
        "type": "struct",
        "name": "core::array::Span::<tongo::structs::common::starkpoint::StarkPoint>",
        "members": [
          {
            "name": "snapshot",
            "type": "@core::array::Array::<tongo::structs::common::starkpoint::StarkPoint>"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::verifier::range::bitProof",
        "members": [
          {
            "name": "A0",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A1",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "c0",
            "type": "core::felt252"
          },
          {
            "name": "s0",
            "type": "core::felt252"
          },
          {
            "name": "s1",
            "type": "core::felt252"
          }
        ]
      },
      {
        "type": "struct",
        "name": "core::array::Span::<tongo::verifier::range::bitProof>",
        "members": [
          {
            "name": "snapshot",
            "type": "@core::array::Array::<tongo::verifier::range::bitProof>"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::verifier::range::Range",
        "members": [
          {
            "name": "commitments",
            "type": "core::array::Span::<tongo::structs::common::starkpoint::StarkPoint>"
          },
          {
            "name": "proofs",
            "type": "core::array::Span::<tongo::verifier::range::bitProof>"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::withdraw::ProofOfWithdraw",
        "members": [
          {
            "name": "A_x",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A_r",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A_v",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "sx",
            "type": "core::felt252"
          },
          {
            "name": "sb",
            "type": "core::felt252"
          },
          {
            "name": "sr",
            "type": "core::felt252"
          },
          {
            "name": "range",
            "type": "tongo::verifier::range::Range"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::withdraw::Withdraw",
        "members": [
          {
            "name": "from",
            "type": "tongo::structs::common::pubkey::PubKey"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          },
          {
            "name": "hint",
            "type": "tongo::structs::aecipher::AEBalance"
          },
          {
            "name": "auxiliarCipher",
            "type": "tongo::structs::common::cipherbalance::CipherBalance"
          },
          {
            "name": "proof",
            "type": "tongo::structs::operations::withdraw::ProofOfWithdraw"
          },
          {
            "name": "auditPart",
            "type": "core::option::Option::<tongo::structs::operations::audit::Audit>"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::ragequit::ProofOfRagequit",
        "members": [
          {
            "name": "Ax",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "AR",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "sx",
            "type": "core::felt252"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::ragequit::Ragequit",
        "members": [
          {
            "name": "from",
            "type": "tongo::structs::common::pubkey::PubKey"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u128"
          },
          {
            "name": "hint",
            "type": "tongo::structs::aecipher::AEBalance"
          },
          {
            "name": "proof",
            "type": "tongo::structs::operations::ragequit::ProofOfRagequit"
          },
          {
            "name": "auditPart",
            "type": "core::option::Option::<tongo::structs::operations::audit::Audit>"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::transfer::ProofOfTransfer",
        "members": [
          {
            "name": "A_x",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A_r",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A_r2",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A_b",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A_b2",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A_v",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A_v2",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "A_bar",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "s_x",
            "type": "core::felt252"
          },
          {
            "name": "s_r",
            "type": "core::felt252"
          },
          {
            "name": "s_b",
            "type": "core::felt252"
          },
          {
            "name": "s_b2",
            "type": "core::felt252"
          },
          {
            "name": "s_r2",
            "type": "core::felt252"
          },
          {
            "name": "range",
            "type": "tongo::verifier::range::Range"
          },
          {
            "name": "range2",
            "type": "tongo::verifier::range::Range"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::transfer::Transfer",
        "members": [
          {
            "name": "from",
            "type": "tongo::structs::common::pubkey::PubKey"
          },
          {
            "name": "to",
            "type": "tongo::structs::common::pubkey::PubKey"
          },
          {
            "name": "transferBalance",
            "type": "tongo::structs::common::cipherbalance::CipherBalance"
          },
          {
            "name": "transferBalanceSelf",
            "type": "tongo::structs::common::cipherbalance::CipherBalance"
          },
          {
            "name": "hintTransfer",
            "type": "tongo::structs::aecipher::AEBalance"
          },
          {
            "name": "hintLeftover",
            "type": "tongo::structs::aecipher::AEBalance"
          },
          {
            "name": "auxiliarCipher",
            "type": "tongo::structs::common::cipherbalance::CipherBalance"
          },
          {
            "name": "auxiliarCipher2",
            "type": "tongo::structs::common::cipherbalance::CipherBalance"
          },
          {
            "name": "proof",
            "type": "tongo::structs::operations::transfer::ProofOfTransfer"
          },
          {
            "name": "auditPart",
            "type": "core::option::Option::<tongo::structs::operations::audit::Audit>"
          },
          {
            "name": "auditPartTransfer",
            "type": "core::option::Option::<tongo::structs::operations::audit::Audit>"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::rollover::ProofOfRollOver",
        "members": [
          {
            "name": "Ax",
            "type": "tongo::structs::common::starkpoint::StarkPoint"
          },
          {
            "name": "sx",
            "type": "core::felt252"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::operations::rollover::Rollover",
        "members": [
          {
            "name": "to",
            "type": "tongo::structs::common::pubkey::PubKey"
          },
          {
            "name": "hint",
            "type": "tongo::structs::aecipher::AEBalance"
          },
          {
            "name": "proof",
            "type": "tongo::structs::operations::rollover::ProofOfRollOver"
          }
        ]
      },
      {
        "type": "enum",
        "name": "core::option::Option::<tongo::structs::common::cipherbalance::CipherBalance>",
        "variants": [
          {
            "name": "Some",
            "type": "tongo::structs::common::cipherbalance::CipherBalance"
          },
          {
            "name": "None",
            "type": "()"
          }
        ]
      },
      {
        "type": "enum",
        "name": "core::option::Option::<tongo::structs::aecipher::AEBalance>",
        "variants": [
          {
            "name": "Some",
            "type": "tongo::structs::aecipher::AEBalance"
          },
          {
            "name": "None",
            "type": "()"
          }
        ]
      },
      {
        "type": "struct",
        "name": "tongo::structs::common::state::State",
        "members": [
          {
            "name": "balance",
            "type": "tongo::structs::common::cipherbalance::CipherBalance"
          },
          {
            "name": "pending",
            "type": "tongo::structs::common::cipherbalance::CipherBalance"
          },
          {
            "name": "nonce",
            "type": "core::integer::u64"
          },
          {
            "name": "audit",
            "type": "core::option::Option::<tongo::structs::common::cipherbalance::CipherBalance>"
          },
          {
            "name": "ae_balance",
            "type": "core::option::Option::<tongo::structs::aecipher::AEBalance>"
          },
          {
            "name": "ae_audit_balance",
            "type": "core::option::Option::<tongo::structs::aecipher::AEBalance>"
          }
        ]
      },
      {
        "type": "enum",
        "name": "core::option::Option::<tongo::structs::common::pubkey::PubKey>",
        "variants": [
          {
            "name": "Some",
            "type": "tongo::structs::common::pubkey::PubKey"
          },
          {
            "name": "None",
            "type": "()"
          }
        ]
      },
      {
        "type": "interface",
        "name": "tongo::tongo::ITongo::ITongo",
        "items": [
          {
            "type": "function",
            "name": "ERC20",
            "inputs": [],
            "outputs": [
              {
                "type": "core::starknet::contract_address::ContractAddress"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "get_rate",
            "inputs": [],
            "outputs": [
              {
                "type": "core::integer::u256"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "get_bit_size",
            "inputs": [],
            "outputs": [
              {
                "type": "core::integer::u32"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "get_owner",
            "inputs": [],
            "outputs": [
              {
                "type": "core::starknet::contract_address::ContractAddress"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "fund",
            "inputs": [
              {
                "name": "fund",
                "type": "tongo::structs::operations::fund::Fund"
              }
            ],
            "outputs": [],
            "state_mutability": "external"
          },
          {
            "type": "function",
            "name": "withdraw",
            "inputs": [
              {
                "name": "withdraw",
                "type": "tongo::structs::operations::withdraw::Withdraw"
              }
            ],
            "outputs": [],
            "state_mutability": "external"
          },
          {
            "type": "function",
            "name": "ragequit",
            "inputs": [
              {
                "name": "ragequit",
                "type": "tongo::structs::operations::ragequit::Ragequit"
              }
            ],
            "outputs": [],
            "state_mutability": "external"
          },
          {
            "type": "function",
            "name": "transfer",
            "inputs": [
              {
                "name": "transfer",
                "type": "tongo::structs::operations::transfer::Transfer"
              }
            ],
            "outputs": [],
            "state_mutability": "external"
          },
          {
            "type": "function",
            "name": "rollover",
            "inputs": [
              {
                "name": "rollover",
                "type": "tongo::structs::operations::rollover::Rollover"
              }
            ],
            "outputs": [],
            "state_mutability": "external"
          },
          {
            "type": "function",
            "name": "get_balance",
            "inputs": [
              {
                "name": "y",
                "type": "tongo::structs::common::pubkey::PubKey"
              }
            ],
            "outputs": [
              {
                "type": "tongo::structs::common::cipherbalance::CipherBalance"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "get_pending",
            "inputs": [
              {
                "name": "y",
                "type": "tongo::structs::common::pubkey::PubKey"
              }
            ],
            "outputs": [
              {
                "type": "tongo::structs::common::cipherbalance::CipherBalance"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "get_audit",
            "inputs": [
              {
                "name": "y",
                "type": "tongo::structs::common::pubkey::PubKey"
              }
            ],
            "outputs": [
              {
                "type": "core::option::Option::<tongo::structs::common::cipherbalance::CipherBalance>"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "get_nonce",
            "inputs": [
              {
                "name": "y",
                "type": "tongo::structs::common::pubkey::PubKey"
              }
            ],
            "outputs": [
              {
                "type": "core::integer::u64"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "get_state",
            "inputs": [
              {
                "name": "y",
                "type": "tongo::structs::common::pubkey::PubKey"
              }
            ],
            "outputs": [
              {
                "type": "tongo::structs::common::state::State"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "auditor_key",
            "inputs": [],
            "outputs": [
              {
                "type": "core::option::Option::<tongo::structs::common::pubkey::PubKey>"
              }
            ],
            "state_mutability": "view"
          },
          {
            "type": "function",
            "name": "change_auditor_key",
            "inputs": [
              {
                "name": "new_auditor_key",
                "type": "tongo::structs::common::pubkey::PubKey"
              }
            ],
            "outputs": [],
            "state_mutability": "external"
          }
        ]
      },
      {
        "type": "constructor",
        "name": "constructor",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "ERC20",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "rate",
            "type": "core::integer::u256"
          },
          {
            "name": "bit_size",
            "type": "core::integer::u32"
          },
          {
            "name": "auditor_key",
            "type": "core::option::Option::<tongo::structs::common::pubkey::PubKey>"
          }
        ]
      },
      {
        "type": "event",
        "name": "tongo::structs::events::TransferEvent",
        "kind": "struct",
        "members": [
          {
            "name": "to",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "key"
          },
          {
            "name": "from",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "key"
          },
          {
            "name": "nonce",
            "type": "core::integer::u64",
            "kind": "key"
          },
          {
            "name": "transferBalance",
            "type": "tongo::structs::common::cipherbalance::CipherBalance",
            "kind": "data"
          },
          {
            "name": "transferBalanceSelf",
            "type": "tongo::structs::common::cipherbalance::CipherBalance",
            "kind": "data"
          },
          {
            "name": "hintTransfer",
            "type": "tongo::structs::aecipher::AEBalance",
            "kind": "data"
          },
          {
            "name": "hintLeftover",
            "type": "tongo::structs::aecipher::AEBalance",
            "kind": "data"
          }
        ]
      },
      {
        "type": "event",
        "name": "tongo::structs::events::FundEvent",
        "kind": "struct",
        "members": [
          {
            "name": "to",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "key"
          },
          {
            "name": "nonce",
            "type": "core::integer::u64",
            "kind": "key"
          },
          {
            "name": "amount",
            "type": "core::integer::u128",
            "kind": "data"
          }
        ]
      },
      {
        "type": "event",
        "name": "tongo::structs::events::RolloverEvent",
        "kind": "struct",
        "members": [
          {
            "name": "to",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "key"
          },
          {
            "name": "nonce",
            "type": "core::integer::u64",
            "kind": "key"
          },
          {
            "name": "rollovered",
            "type": "tongo::structs::common::cipherbalance::CipherBalance",
            "kind": "data"
          }
        ]
      },
      {
        "type": "event",
        "name": "tongo::structs::events::WithdrawEvent",
        "kind": "struct",
        "members": [
          {
            "name": "from",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "key"
          },
          {
            "name": "nonce",
            "type": "core::integer::u64",
            "kind": "key"
          },
          {
            "name": "amount",
            "type": "core::integer::u128",
            "kind": "data"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress",
            "kind": "data"
          }
        ]
      },
      {
        "type": "event",
        "name": "tongo::structs::events::RagequitEvent",
        "kind": "struct",
        "members": [
          {
            "name": "from",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "key"
          },
          {
            "name": "nonce",
            "type": "core::integer::u64",
            "kind": "key"
          },
          {
            "name": "amount",
            "type": "core::integer::u128",
            "kind": "data"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress",
            "kind": "data"
          }
        ]
      },
      {
        "type": "event",
        "name": "tongo::structs::events::BalanceDeclared",
        "kind": "struct",
        "members": [
          {
            "name": "from",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "key"
          },
          {
            "name": "nonce",
            "type": "core::integer::u64",
            "kind": "key"
          },
          {
            "name": "auditorPubKey",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "data"
          },
          {
            "name": "declaredCipherBalance",
            "type": "tongo::structs::common::cipherbalance::CipherBalance",
            "kind": "data"
          },
          {
            "name": "hint",
            "type": "tongo::structs::aecipher::AEBalance",
            "kind": "data"
          }
        ]
      },
      {
        "type": "event",
        "name": "tongo::structs::events::TransferDeclared",
        "kind": "struct",
        "members": [
          {
            "name": "from",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "key"
          },
          {
            "name": "to",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "key"
          },
          {
            "name": "nonce",
            "type": "core::integer::u64",
            "kind": "key"
          },
          {
            "name": "auditorPubKey",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "data"
          },
          {
            "name": "declaredCipherBalance",
            "type": "tongo::structs::common::cipherbalance::CipherBalance",
            "kind": "data"
          },
          {
            "name": "hint",
            "type": "tongo::structs::aecipher::AEBalance",
            "kind": "data"
          }
        ]
      },
      {
        "type": "event",
        "name": "tongo::structs::events::AuditorPubKeySet",
        "kind": "struct",
        "members": [
          {
            "name": "keyNumber",
            "type": "core::integer::u128",
            "kind": "key"
          },
          {
            "name": "AuditorPubKey",
            "type": "tongo::structs::common::pubkey::PubKey",
            "kind": "data"
          }
        ]
      },
      {
        "type": "event",
        "name": "tongo::tongo::Tongo::Tongo::Event",
        "kind": "enum",
        "variants": [
          {
            "name": "TransferEvent",
            "type": "tongo::structs::events::TransferEvent",
            "kind": "nested"
          },
          {
            "name": "FundEvent",
            "type": "tongo::structs::events::FundEvent",
            "kind": "nested"
          },
          {
            "name": "RolloverEvent",
            "type": "tongo::structs::events::RolloverEvent",
            "kind": "nested"
          },
          {
            "name": "WithdrawEvent",
            "type": "tongo::structs::events::WithdrawEvent",
            "kind": "nested"
          },
          {
            "name": "RagequitEvent",
            "type": "tongo::structs::events::RagequitEvent",
            "kind": "nested"
          },
          {
            "name": "BalanceDeclared",
            "type": "tongo::structs::events::BalanceDeclared",
            "kind": "nested"
          },
          {
            "name": "TransferDeclared",
            "type": "tongo::structs::events::TransferDeclared",
            "kind": "nested"
          },
          {
            "name": "AuditorPubKeySet",
            "type": "tongo::structs::events::AuditorPubKeySet",
            "kind": "nested"
          }
        ]
      }
    ];
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/data.service.js
var require_data_service = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/data.service.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StarknetEventReader = exports.ReaderEventType = void 0;
    var starknet_1 = __require("starknet");
    var tongo_abi_js_1 = require_tongo_abi();
    var abiEvents = starknet_1.events.getAbiEvents(tongo_abi_js_1.tongoAbi);
    var abiStructs = starknet_1.CallData.getAbiStruct(tongo_abi_js_1.tongoAbi);
    var abiEnums = starknet_1.CallData.getAbiEnum(tongo_abi_js_1.tongoAbi);
    var FUND_EVENT = starknet_1.num.toHex(starknet_1.hash.starknetKeccak("FundEvent"));
    var ROLLOVER_EVENT = starknet_1.num.toHex(starknet_1.hash.starknetKeccak("RolloverEvent"));
    var TRANSFER_EVENT = starknet_1.num.toHex(starknet_1.hash.starknetKeccak("TransferEvent"));
    var WITHDRAW_EVENT = starknet_1.num.toHex(starknet_1.hash.starknetKeccak("WithdrawEvent"));
    var RAGEQUIT_EVENT = starknet_1.num.toHex(starknet_1.hash.starknetKeccak("RagequitEvent"));
    var BALANCE_DECLARED_EVENT = starknet_1.num.toHex(starknet_1.hash.starknetKeccak("BalanceDeclared"));
    var TRANSFER_DECLARED_EVENT = starknet_1.num.toHex(starknet_1.hash.starknetKeccak("TransferDeclared"));
    var FUND_EVENT_PATH = "tongo::structs::events::FundEvent";
    var ROLLOVER_EVENT_PATH = "tongo::structs::events::RolloverEvent";
    var TRANSFER_EVENT_PATH = "tongo::structs::events::TransferEvent";
    var WITHDRAW_EVENT_PATH = "tongo::structs::events::WithdrawEvent";
    var RAGEQUIT_EVENT_PATH = "tongo::structs::events::RagequitEvent";
    var BALANCE_DECLARED_EVENT_PATH = "tongo::structs::events::BalanceDeclared";
    var TRANSFER_DECLARED_EVENT_PATH = "tongo::structs::events::TransferDeclared";
    exports.ReaderEventType = {
      Fund: "fund",
      Withdraw: "withdraw",
      Ragequit: "ragequit",
      Rollover: "rollover",
      TransferIn: "transferIn",
      TransferOut: "transferOut",
      BalanceDeclared: "balanceDeclared",
      TransferDeclared: "transferDeclared"
    };
    function parseTransferEventOut(event) {
      const data = event[TRANSFER_EVENT_PATH];
      return {
        type: exports.ReaderEventType.TransferOut,
        tx_hash: event.transaction_hash,
        block_number: event.block_number,
        ...data
      };
    }
    function parseTransferEventIn(event) {
      const data = event[TRANSFER_EVENT_PATH];
      return {
        type: exports.ReaderEventType.TransferIn,
        tx_hash: event.transaction_hash,
        block_number: event.block_number,
        ...data
      };
    }
    function parseFundEvent(event) {
      const data = event[FUND_EVENT_PATH];
      return {
        type: exports.ReaderEventType.Fund,
        tx_hash: event.transaction_hash,
        block_number: event.block_number,
        ...data
      };
    }
    function parseWithdrawEvent(event) {
      const data = event[WITHDRAW_EVENT_PATH];
      return {
        type: exports.ReaderEventType.Withdraw,
        tx_hash: event.transaction_hash,
        block_number: event.block_number,
        ...data
      };
    }
    function parseRagequitEvent(event) {
      const data = event[RAGEQUIT_EVENT_PATH];
      return {
        type: exports.ReaderEventType.Ragequit,
        tx_hash: event.transaction_hash,
        block_number: event.block_number,
        ...data
      };
    }
    function parseRolloverEvent(event) {
      const data = event[ROLLOVER_EVENT_PATH];
      return {
        type: exports.ReaderEventType.Rollover,
        tx_hash: event.transaction_hash,
        block_number: event.block_number,
        ...data
      };
    }
    function parseBalanceDeclaredEvent(event) {
      const data = event[BALANCE_DECLARED_EVENT_PATH];
      return {
        type: exports.ReaderEventType.BalanceDeclared,
        tx_hash: event.transaction_hash,
        block_number: event.block_number,
        ...data
      };
    }
    function parseTransferDeclaredEvent(event) {
      const data = event[TRANSFER_DECLARED_EVENT_PATH];
      return {
        type: exports.ReaderEventType.TransferDeclared,
        tx_hash: event.transaction_hash,
        block_number: event.block_number,
        ...data
      };
    }
    var _StarknetEventReader = class _StarknetEventReader {
      constructor(provider, tongoAddress) {
        __publicField(this, "provider");
        __publicField(this, "abiParser", _StarknetEventReader.abiParser);
        __publicField(this, "tongoAddress");
        this.provider = provider;
        this.tongoAddress = tongoAddress;
      }
      async getEventsFund(initialBlock, otherPubKey) {
        const eventsResults = await this.provider.getEvents({
          address: this.tongoAddress,
          from_block: { block_number: initialBlock },
          to_block: "latest",
          keys: [[FUND_EVENT], [starknet_1.num.toHex(otherPubKey.x)], [starknet_1.num.toHex(otherPubKey.y)]],
          chunk_size: 100
        });
        const parsedEvents = starknet_1.events.parseEvents(eventsResults.events, abiEvents, abiStructs, abiEnums, this.abiParser);
        return parsedEvents.filter((event) => event[FUND_EVENT_PATH] !== void 0).map((event) => parseFundEvent(event));
      }
      async getEventsWithdraw(initialBlock, otherPubKey) {
        const eventsResults = await this.provider.getEvents({
          address: this.tongoAddress,
          from_block: { block_number: initialBlock },
          to_block: "latest",
          keys: [[WITHDRAW_EVENT], [starknet_1.num.toHex(otherPubKey.x)], [starknet_1.num.toHex(otherPubKey.y)]],
          chunk_size: 100
        });
        const parsedEvents = starknet_1.events.parseEvents(eventsResults.events, abiEvents, abiStructs, abiEnums, this.abiParser);
        return parsedEvents.filter((event) => event[WITHDRAW_EVENT_PATH] !== void 0).map((event) => parseWithdrawEvent(event));
      }
      async getEventsRagequit(initialBlock, otherPubKey) {
        const eventsResults = await this.provider.getEvents({
          address: this.tongoAddress,
          from_block: { block_number: initialBlock },
          to_block: "latest",
          keys: [[RAGEQUIT_EVENT], [starknet_1.num.toHex(otherPubKey.x)], [starknet_1.num.toHex(otherPubKey.y)]],
          chunk_size: 100
        });
        const parsedEvents = starknet_1.events.parseEvents(eventsResults.events, abiEvents, abiStructs, abiEnums, this.abiParser);
        return parsedEvents.filter((event) => event[RAGEQUIT_EVENT_PATH] !== void 0).map((event) => parseRagequitEvent(event));
      }
      async getEventsRollover(initialBlock, otherPubKey) {
        const eventsResults = await this.provider.getEvents({
          address: this.tongoAddress,
          from_block: { block_number: initialBlock },
          to_block: "latest",
          keys: [[ROLLOVER_EVENT], [starknet_1.num.toHex(otherPubKey.x)], [starknet_1.num.toHex(otherPubKey.y)]],
          chunk_size: 100
        });
        const parsedEvents = starknet_1.events.parseEvents(eventsResults.events, abiEvents, abiStructs, abiEnums, this.abiParser);
        return parsedEvents.filter((event) => event[ROLLOVER_EVENT_PATH] !== void 0).map((event) => parseRolloverEvent(event));
      }
      async getEventsTransferOut(initialBlock, otherPubKey) {
        const eventsResults = await this.provider.getEvents({
          address: this.tongoAddress,
          from_block: { block_number: initialBlock },
          to_block: "latest",
          keys: [[TRANSFER_EVENT], [], [], [starknet_1.num.toHex(otherPubKey.x)], [starknet_1.num.toHex(otherPubKey.y)], []],
          chunk_size: 100
        });
        const parsedEvents = starknet_1.events.parseEvents(eventsResults.events, abiEvents, abiStructs, abiEnums, this.abiParser);
        return parsedEvents.filter((event) => event[TRANSFER_EVENT_PATH] !== void 0).map((event) => parseTransferEventOut(event));
      }
      async getEventsTransferIn(initialBlock, otherPubKey) {
        const eventsResults = await this.provider.getEvents({
          address: this.tongoAddress,
          from_block: { block_number: initialBlock },
          to_block: "latest",
          keys: [[TRANSFER_EVENT], [starknet_1.num.toHex(otherPubKey.x)], [starknet_1.num.toHex(otherPubKey.y)], [], [], []],
          chunk_size: 100
        });
        const parsedEvents = starknet_1.events.parseEvents(eventsResults.events, abiEvents, abiStructs, abiEnums, this.abiParser);
        return parsedEvents.filter((event) => event[TRANSFER_EVENT_PATH] !== void 0).map((event) => parseTransferEventIn(event));
      }
      async getAllEvents(initialBlock, otherPubKey) {
        const promises = Promise.all([
          this.getEventsFund(initialBlock, otherPubKey),
          this.getEventsRollover(initialBlock, otherPubKey),
          this.getEventsWithdraw(initialBlock, otherPubKey),
          this.getEventsRagequit(initialBlock, otherPubKey),
          this.getEventsTransferOut(initialBlock, otherPubKey),
          this.getEventsTransferIn(initialBlock, otherPubKey)
        ]);
        const events = (await promises).flat();
        return events.sort((a, b) => b.block_number - a.block_number);
      }
      async getEventsBalanceDeclared(initialBlock, otherPubKey) {
        const eventsResults = await this.provider.getEvents({
          address: this.tongoAddress,
          from_block: { block_number: initialBlock },
          to_block: "latest",
          keys: [[BALANCE_DECLARED_EVENT], [starknet_1.num.toHex(otherPubKey.x)], [starknet_1.num.toHex(otherPubKey.y)], [], [], []],
          chunk_size: 100
        });
        const parsedEvents = starknet_1.events.parseEvents(eventsResults.events, abiEvents, abiStructs, abiEnums, this.abiParser);
        return parsedEvents.filter((event) => event[BALANCE_DECLARED_EVENT_PATH] !== void 0).map((event) => parseBalanceDeclaredEvent(event));
      }
      async getEventsTransferFrom(initialBlock, otherPubKey) {
        const eventsResults = await this.provider.getEvents({
          address: this.tongoAddress,
          from_block: { block_number: initialBlock },
          to_block: "latest",
          keys: [[TRANSFER_DECLARED_EVENT], [starknet_1.num.toHex(otherPubKey.x)], [starknet_1.num.toHex(otherPubKey.y)], [], [], []],
          chunk_size: 100
        });
        const parsedEvents = starknet_1.events.parseEvents(eventsResults.events, abiEvents, abiStructs, abiEnums, this.abiParser);
        return parsedEvents.filter((event) => event[TRANSFER_DECLARED_EVENT_PATH] !== void 0).map((event) => parseTransferDeclaredEvent(event));
      }
      async getEventsTransferTo(initialBlock, otherPubKey) {
        const eventsResults = await this.provider.getEvents({
          address: this.tongoAddress,
          from_block: { block_number: initialBlock },
          to_block: "latest",
          keys: [[TRANSFER_DECLARED_EVENT], [], [], [starknet_1.num.toHex(otherPubKey.x)], [starknet_1.num.toHex(otherPubKey.y)], []],
          chunk_size: 100
        });
        const parsedEvents = starknet_1.events.parseEvents(eventsResults.events, abiEvents, abiStructs, abiEnums, this.abiParser);
        return parsedEvents.filter((event) => event[TRANSFER_DECLARED_EVENT_PATH] !== void 0).map((event) => parseTransferDeclaredEvent(event));
      }
    };
    __publicField(_StarknetEventReader, "abiParser", new starknet_1.AbiParser2(tongo_abi_js_1.tongoAbi));
    var StarknetEventReader = _StarknetEventReader;
    exports.StarknetEventReader = StarknetEventReader;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/_md.js
var require_md2 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/_md.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SHA512_IV = exports.SHA384_IV = exports.SHA224_IV = exports.SHA256_IV = exports.HashMD = void 0;
    exports.setBigUint64 = setBigUint64;
    exports.Chi = Chi;
    exports.Maj = Maj;
    var utils_ts_1 = require_utils5();
    function setBigUint64(view, byteOffset, value, isLE) {
      if (typeof view.setBigUint64 === "function")
        return view.setBigUint64(byteOffset, value, isLE);
      const _32n = BigInt(32);
      const _u32_max = BigInt(4294967295);
      const wh = Number(value >> _32n & _u32_max);
      const wl = Number(value & _u32_max);
      const h = isLE ? 4 : 0;
      const l = isLE ? 0 : 4;
      view.setUint32(byteOffset + h, wh, isLE);
      view.setUint32(byteOffset + l, wl, isLE);
    }
    function Chi(a, b, c) {
      return a & b ^ ~a & c;
    }
    function Maj(a, b, c) {
      return a & b ^ a & c ^ b & c;
    }
    var HashMD = class extends utils_ts_1.Hash {
      constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, utils_ts_1.createView)(this.buffer);
      }
      update(data) {
        (0, utils_ts_1.aexists)(this);
        data = (0, utils_ts_1.toBytes)(data);
        (0, utils_ts_1.abytes)(data);
        const { view, buffer, blockLen } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          if (take === blockLen) {
            const dataView = (0, utils_ts_1.createView)(data);
            for (; blockLen <= len - pos; pos += blockLen)
              this.process(dataView, pos);
            continue;
          }
          buffer.set(data.subarray(pos, pos + take), this.pos);
          this.pos += take;
          pos += take;
          if (this.pos === blockLen) {
            this.process(view, 0);
            this.pos = 0;
          }
        }
        this.length += data.length;
        this.roundClean();
        return this;
      }
      digestInto(out) {
        (0, utils_ts_1.aexists)(this);
        (0, utils_ts_1.aoutput)(out, this);
        this.finished = true;
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        buffer[pos++] = 128;
        (0, utils_ts_1.clean)(this.buffer.subarray(pos));
        if (this.padOffset > blockLen - pos) {
          this.process(view, 0);
          pos = 0;
        }
        for (let i = pos; i < blockLen; i++)
          buffer[i] = 0;
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, utils_ts_1.createView)(out);
        const len = this.outputLen;
        if (len % 4)
          throw new Error("_sha2: outputLen should be aligned to 32bit");
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
          throw new Error("_sha2: outputLen bigger than state");
        for (let i = 0; i < outLen; i++)
          oview.setUint32(4 * i, state[i], isLE);
      }
      digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
      }
      _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        if (length % blockLen)
          to.buffer.set(buffer);
        return to;
      }
      clone() {
        return this._cloneInto();
      }
    };
    exports.HashMD = HashMD;
    exports.SHA256_IV = Uint32Array.from([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    exports.SHA224_IV = Uint32Array.from([
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ]);
    exports.SHA384_IV = Uint32Array.from([
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ]);
    exports.SHA512_IV = Uint32Array.from([
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ]);
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/_u64.js
var require_u642 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/_u64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toBig = exports.shrSL = exports.shrSH = exports.rotrSL = exports.rotrSH = exports.rotrBL = exports.rotrBH = exports.rotr32L = exports.rotr32H = exports.rotlSL = exports.rotlSH = exports.rotlBL = exports.rotlBH = exports.add5L = exports.add5H = exports.add4L = exports.add4H = exports.add3L = exports.add3H = void 0;
    exports.add = add;
    exports.fromBig = fromBig;
    exports.split = split;
    var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    var _32n = /* @__PURE__ */ BigInt(32);
    function fromBig(n, le = false) {
      if (le)
        return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
      return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
    }
    function split(lst, le = false) {
      const len = lst.length;
      let Ah = new Uint32Array(len);
      let Al = new Uint32Array(len);
      for (let i = 0; i < len; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
      }
      return [Ah, Al];
    }
    var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
    exports.toBig = toBig;
    var shrSH = (h, _l, s) => h >>> s;
    exports.shrSH = shrSH;
    var shrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports.shrSL = shrSL;
    var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
    exports.rotrSH = rotrSH;
    var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports.rotrSL = rotrSL;
    var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
    exports.rotrBH = rotrBH;
    var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
    exports.rotrBL = rotrBL;
    var rotr32H = (_h, l) => l;
    exports.rotr32H = rotr32H;
    var rotr32L = (h, _l) => h;
    exports.rotr32L = rotr32L;
    var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    exports.rotlSH = rotlSH;
    var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    exports.rotlSL = rotlSL;
    var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    exports.rotlBH = rotlBH;
    var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
    exports.rotlBL = rotlBL;
    function add(Ah, Al, Bh, Bl) {
      const l = (Al >>> 0) + (Bl >>> 0);
      return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
    }
    var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    exports.add3L = add3L;
    var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
    exports.add3H = add3H;
    var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
    exports.add4L = add4L;
    var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
    exports.add4H = add4H;
    var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
    exports.add5L = add5L;
    var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
    exports.add5H = add5H;
    var u64 = {
      fromBig,
      split,
      toBig,
      shrSH,
      shrSL,
      rotrSH,
      rotrSL,
      rotrBH,
      rotrBL,
      rotr32H,
      rotr32L,
      rotlSH,
      rotlSL,
      rotlBH,
      rotlBL,
      add,
      add3L,
      add3H,
      add4L,
      add4H,
      add5H,
      add5L
    };
    exports.default = u64;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/sha2.js
var require_sha2 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/sha2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sha512_224 = exports.sha512_256 = exports.sha384 = exports.sha512 = exports.sha224 = exports.sha256 = exports.SHA512_256 = exports.SHA512_224 = exports.SHA384 = exports.SHA512 = exports.SHA224 = exports.SHA256 = void 0;
    var _md_ts_1 = require_md2();
    var u64 = require_u642();
    var utils_ts_1 = require_utils5();
    var SHA256_K = /* @__PURE__ */ Uint32Array.from([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
    var SHA256 = class extends _md_ts_1.HashMD {
      constructor(outputLen = 32) {
        super(64, outputLen, 8, false);
        this.A = _md_ts_1.SHA256_IV[0] | 0;
        this.B = _md_ts_1.SHA256_IV[1] | 0;
        this.C = _md_ts_1.SHA256_IV[2] | 0;
        this.D = _md_ts_1.SHA256_IV[3] | 0;
        this.E = _md_ts_1.SHA256_IV[4] | 0;
        this.F = _md_ts_1.SHA256_IV[5] | 0;
        this.G = _md_ts_1.SHA256_IV[6] | 0;
        this.H = _md_ts_1.SHA256_IV[7] | 0;
      }
      get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
      }
      // prettier-ignore
      set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
      }
      process(view, offset) {
        for (let i = 0; i < 16; i++, offset += 4)
          SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
          const W15 = SHA256_W[i - 15];
          const W2 = SHA256_W[i - 2];
          const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
          const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
          SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
          const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
          const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
          const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
          const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
          H = G;
          G = F;
          F = E;
          E = D + T1 | 0;
          D = C;
          C = B;
          B = A;
          A = T1 + T2 | 0;
        }
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
      }
      roundClean() {
        (0, utils_ts_1.clean)(SHA256_W);
      }
      destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        (0, utils_ts_1.clean)(this.buffer);
      }
    };
    exports.SHA256 = SHA256;
    var SHA224 = class extends SHA256 {
      constructor() {
        super(28);
        this.A = _md_ts_1.SHA224_IV[0] | 0;
        this.B = _md_ts_1.SHA224_IV[1] | 0;
        this.C = _md_ts_1.SHA224_IV[2] | 0;
        this.D = _md_ts_1.SHA224_IV[3] | 0;
        this.E = _md_ts_1.SHA224_IV[4] | 0;
        this.F = _md_ts_1.SHA224_IV[5] | 0;
        this.G = _md_ts_1.SHA224_IV[6] | 0;
        this.H = _md_ts_1.SHA224_IV[7] | 0;
      }
    };
    exports.SHA224 = SHA224;
    var K512 = /* @__PURE__ */ (() => u64.split([
      "0x428a2f98d728ae22",
      "0x7137449123ef65cd",
      "0xb5c0fbcfec4d3b2f",
      "0xe9b5dba58189dbbc",
      "0x3956c25bf348b538",
      "0x59f111f1b605d019",
      "0x923f82a4af194f9b",
      "0xab1c5ed5da6d8118",
      "0xd807aa98a3030242",
      "0x12835b0145706fbe",
      "0x243185be4ee4b28c",
      "0x550c7dc3d5ffb4e2",
      "0x72be5d74f27b896f",
      "0x80deb1fe3b1696b1",
      "0x9bdc06a725c71235",
      "0xc19bf174cf692694",
      "0xe49b69c19ef14ad2",
      "0xefbe4786384f25e3",
      "0x0fc19dc68b8cd5b5",
      "0x240ca1cc77ac9c65",
      "0x2de92c6f592b0275",
      "0x4a7484aa6ea6e483",
      "0x5cb0a9dcbd41fbd4",
      "0x76f988da831153b5",
      "0x983e5152ee66dfab",
      "0xa831c66d2db43210",
      "0xb00327c898fb213f",
      "0xbf597fc7beef0ee4",
      "0xc6e00bf33da88fc2",
      "0xd5a79147930aa725",
      "0x06ca6351e003826f",
      "0x142929670a0e6e70",
      "0x27b70a8546d22ffc",
      "0x2e1b21385c26c926",
      "0x4d2c6dfc5ac42aed",
      "0x53380d139d95b3df",
      "0x650a73548baf63de",
      "0x766a0abb3c77b2a8",
      "0x81c2c92e47edaee6",
      "0x92722c851482353b",
      "0xa2bfe8a14cf10364",
      "0xa81a664bbc423001",
      "0xc24b8b70d0f89791",
      "0xc76c51a30654be30",
      "0xd192e819d6ef5218",
      "0xd69906245565a910",
      "0xf40e35855771202a",
      "0x106aa07032bbd1b8",
      "0x19a4c116b8d2d0c8",
      "0x1e376c085141ab53",
      "0x2748774cdf8eeb99",
      "0x34b0bcb5e19b48a8",
      "0x391c0cb3c5c95a63",
      "0x4ed8aa4ae3418acb",
      "0x5b9cca4f7763e373",
      "0x682e6ff3d6b2b8a3",
      "0x748f82ee5defb2fc",
      "0x78a5636f43172f60",
      "0x84c87814a1f0ab72",
      "0x8cc702081a6439ec",
      "0x90befffa23631e28",
      "0xa4506cebde82bde9",
      "0xbef9a3f7b2c67915",
      "0xc67178f2e372532b",
      "0xca273eceea26619c",
      "0xd186b8c721c0c207",
      "0xeada7dd6cde0eb1e",
      "0xf57d4f7fee6ed178",
      "0x06f067aa72176fba",
      "0x0a637dc5a2c898a6",
      "0x113f9804bef90dae",
      "0x1b710b35131c471b",
      "0x28db77f523047d84",
      "0x32caab7b40c72493",
      "0x3c9ebe0a15c9bebc",
      "0x431d67c49c100d4c",
      "0x4cc5d4becb3e42b6",
      "0x597f299cfc657e2a",
      "0x5fcb6fab3ad6faec",
      "0x6c44198c4a475817"
    ].map((n) => BigInt(n))))();
    var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
    var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
    var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
    var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
    var SHA512 = class extends _md_ts_1.HashMD {
      constructor(outputLen = 64) {
        super(128, outputLen, 16, false);
        this.Ah = _md_ts_1.SHA512_IV[0] | 0;
        this.Al = _md_ts_1.SHA512_IV[1] | 0;
        this.Bh = _md_ts_1.SHA512_IV[2] | 0;
        this.Bl = _md_ts_1.SHA512_IV[3] | 0;
        this.Ch = _md_ts_1.SHA512_IV[4] | 0;
        this.Cl = _md_ts_1.SHA512_IV[5] | 0;
        this.Dh = _md_ts_1.SHA512_IV[6] | 0;
        this.Dl = _md_ts_1.SHA512_IV[7] | 0;
        this.Eh = _md_ts_1.SHA512_IV[8] | 0;
        this.El = _md_ts_1.SHA512_IV[9] | 0;
        this.Fh = _md_ts_1.SHA512_IV[10] | 0;
        this.Fl = _md_ts_1.SHA512_IV[11] | 0;
        this.Gh = _md_ts_1.SHA512_IV[12] | 0;
        this.Gl = _md_ts_1.SHA512_IV[13] | 0;
        this.Hh = _md_ts_1.SHA512_IV[14] | 0;
        this.Hl = _md_ts_1.SHA512_IV[15] | 0;
      }
      // prettier-ignore
      get() {
        const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
      }
      // prettier-ignore
      set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
        this.Ah = Ah | 0;
        this.Al = Al | 0;
        this.Bh = Bh | 0;
        this.Bl = Bl | 0;
        this.Ch = Ch | 0;
        this.Cl = Cl | 0;
        this.Dh = Dh | 0;
        this.Dl = Dl | 0;
        this.Eh = Eh | 0;
        this.El = El | 0;
        this.Fh = Fh | 0;
        this.Fl = Fl | 0;
        this.Gh = Gh | 0;
        this.Gl = Gl | 0;
        this.Hh = Hh | 0;
        this.Hl = Hl | 0;
      }
      process(view, offset) {
        for (let i = 0; i < 16; i++, offset += 4) {
          SHA512_W_H[i] = view.getUint32(offset);
          SHA512_W_L[i] = view.getUint32(offset += 4);
        }
        for (let i = 16; i < 80; i++) {
          const W15h = SHA512_W_H[i - 15] | 0;
          const W15l = SHA512_W_L[i - 15] | 0;
          const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
          const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
          const W2h = SHA512_W_H[i - 2] | 0;
          const W2l = SHA512_W_L[i - 2] | 0;
          const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
          const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
          const SUMl = u64.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
          const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
          SHA512_W_H[i] = SUMh | 0;
          SHA512_W_L[i] = SUMl | 0;
        }
        let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        for (let i = 0; i < 80; i++) {
          const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
          const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
          const CHIh = Eh & Fh ^ ~Eh & Gh;
          const CHIl = El & Fl ^ ~El & Gl;
          const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
          const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
          const T1l = T1ll | 0;
          const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
          const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
          const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
          const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
          Hh = Gh | 0;
          Hl = Gl | 0;
          Gh = Fh | 0;
          Gl = Fl | 0;
          Fh = Eh | 0;
          Fl = El | 0;
          ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
          Dh = Ch | 0;
          Dl = Cl | 0;
          Ch = Bh | 0;
          Cl = Bl | 0;
          Bh = Ah | 0;
          Bl = Al | 0;
          const All = u64.add3L(T1l, sigma0l, MAJl);
          Ah = u64.add3H(All, T1h, sigma0h, MAJh);
          Al = All | 0;
        }
        ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
        ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
        ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
        ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
        ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
        ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
        ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
        ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
        this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
      }
      roundClean() {
        (0, utils_ts_1.clean)(SHA512_W_H, SHA512_W_L);
      }
      destroy() {
        (0, utils_ts_1.clean)(this.buffer);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    };
    exports.SHA512 = SHA512;
    var SHA384 = class extends SHA512 {
      constructor() {
        super(48);
        this.Ah = _md_ts_1.SHA384_IV[0] | 0;
        this.Al = _md_ts_1.SHA384_IV[1] | 0;
        this.Bh = _md_ts_1.SHA384_IV[2] | 0;
        this.Bl = _md_ts_1.SHA384_IV[3] | 0;
        this.Ch = _md_ts_1.SHA384_IV[4] | 0;
        this.Cl = _md_ts_1.SHA384_IV[5] | 0;
        this.Dh = _md_ts_1.SHA384_IV[6] | 0;
        this.Dl = _md_ts_1.SHA384_IV[7] | 0;
        this.Eh = _md_ts_1.SHA384_IV[8] | 0;
        this.El = _md_ts_1.SHA384_IV[9] | 0;
        this.Fh = _md_ts_1.SHA384_IV[10] | 0;
        this.Fl = _md_ts_1.SHA384_IV[11] | 0;
        this.Gh = _md_ts_1.SHA384_IV[12] | 0;
        this.Gl = _md_ts_1.SHA384_IV[13] | 0;
        this.Hh = _md_ts_1.SHA384_IV[14] | 0;
        this.Hl = _md_ts_1.SHA384_IV[15] | 0;
      }
    };
    exports.SHA384 = SHA384;
    var T224_IV = /* @__PURE__ */ Uint32Array.from([
      2352822216,
      424955298,
      1944164710,
      2312950998,
      502970286,
      855612546,
      1738396948,
      1479516111,
      258812777,
      2077511080,
      2011393907,
      79989058,
      1067287976,
      1780299464,
      286451373,
      2446758561
    ]);
    var T256_IV = /* @__PURE__ */ Uint32Array.from([
      573645204,
      4230739756,
      2673172387,
      3360449730,
      596883563,
      1867755857,
      2520282905,
      1497426621,
      2519219938,
      2827943907,
      3193839141,
      1401305490,
      721525244,
      746961066,
      246885852,
      2177182882
    ]);
    var SHA512_224 = class extends SHA512 {
      constructor() {
        super(28);
        this.Ah = T224_IV[0] | 0;
        this.Al = T224_IV[1] | 0;
        this.Bh = T224_IV[2] | 0;
        this.Bl = T224_IV[3] | 0;
        this.Ch = T224_IV[4] | 0;
        this.Cl = T224_IV[5] | 0;
        this.Dh = T224_IV[6] | 0;
        this.Dl = T224_IV[7] | 0;
        this.Eh = T224_IV[8] | 0;
        this.El = T224_IV[9] | 0;
        this.Fh = T224_IV[10] | 0;
        this.Fl = T224_IV[11] | 0;
        this.Gh = T224_IV[12] | 0;
        this.Gl = T224_IV[13] | 0;
        this.Hh = T224_IV[14] | 0;
        this.Hl = T224_IV[15] | 0;
      }
    };
    exports.SHA512_224 = SHA512_224;
    var SHA512_256 = class extends SHA512 {
      constructor() {
        super(32);
        this.Ah = T256_IV[0] | 0;
        this.Al = T256_IV[1] | 0;
        this.Bh = T256_IV[2] | 0;
        this.Bl = T256_IV[3] | 0;
        this.Ch = T256_IV[4] | 0;
        this.Cl = T256_IV[5] | 0;
        this.Dh = T256_IV[6] | 0;
        this.Dl = T256_IV[7] | 0;
        this.Eh = T256_IV[8] | 0;
        this.El = T256_IV[9] | 0;
        this.Fh = T256_IV[10] | 0;
        this.Fl = T256_IV[11] | 0;
        this.Gh = T256_IV[12] | 0;
        this.Gl = T256_IV[13] | 0;
        this.Hh = T256_IV[14] | 0;
        this.Hl = T256_IV[15] | 0;
      }
    };
    exports.SHA512_256 = SHA512_256;
    exports.sha256 = (0, utils_ts_1.createHasher)(() => new SHA256());
    exports.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
    exports.sha512 = (0, utils_ts_1.createHasher)(() => new SHA512());
    exports.sha384 = (0, utils_ts_1.createHasher)(() => new SHA384());
    exports.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
    exports.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/key.js
var require_key = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/key.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ECDiffieHellman = ECDiffieHellman;
    exports.buildInfo = buildInfo;
    exports.buildSalt = buildSalt;
    exports.deriveSymmetricEncryptionKey = deriveSymmetricEncryptionKey;
    var utils_1 = require_utils7();
    var sha2_1 = require_sha2();
    var starknet_1 = require_lib();
    function ECDiffieHellman(secret, otherPublicKey) {
      return starknet_1._starkCurve.getSharedSecret(secret, otherPublicKey, false);
    }
    function buildInfo(tongoAddress) {
      const tongoBytes = new Uint8Array([116, 111, 110, 103, 111]);
      const tongoAddresBytes = (0, utils_1.hexToBytes)(tongoAddress.replace(/^0x/, "").padStart(64, "0"));
      const extraBytes = new Uint8Array(27).fill(0);
      const info = new Uint8Array(64);
      info.set(tongoBytes);
      info.set(tongoAddresBytes, tongoBytes.length);
      info.set(extraBytes, tongoAddresBytes.length + tongoBytes.length);
      return info;
    }
    function buildSalt(nonce, sharedSecret) {
      const hashInput = new Uint8Array(64 + 8);
      const nonceBytes = (0, utils_1.numberToBytesBE)(nonce, 8);
      hashInput.set(nonceBytes);
      if (sharedSecret.at(0) !== 4) {
        throw new Error("InvalidSharedSecret");
      }
      hashInput.set(sharedSecret.slice(1), nonceBytes.length);
      return (0, sha2_1.sha256)(hashInput);
    }
    async function deriveSymmetricEncryptionKey(deriveSymKeyParams) {
      const { contractAddress, nonce, secret } = deriveSymKeyParams;
      const hkdfParams = {
        name: "HKDF",
        hash: "SHA-256",
        // Although this value can be public and/or empty, the HKDF standard recommends using a pseudo-random value
        salt: buildSalt(nonce, secret),
        // 64 B of application related information
        info: buildInfo(contractAddress),
        length: 32
      };
      const key = await crypto.subtle.importKey("raw", secret, "HKDF", false, ["deriveKey"]);
      const derivedKeyType = { name: "HMAC", hash: "SHA-256", length: 256 };
      const derivedKey = await crypto.subtle.deriveKey(hkdfParams, key, derivedKeyType, true, ["sign"]);
      const rawKey = await crypto.subtle.exportKey("raw", derivedKey);
      const derivedKeyBytes = new Uint8Array(rawKey);
      return derivedKeyBytes;
    }
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/operation.js
var require_operation = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/operation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationType = void 0;
    exports.OperationType = {
      Audit: "audit",
      Fund: "fund",
      Ragequit: "ragequit",
      Withdraw: "withdraw",
      Rollover: "rollover",
      Transfer: "transfer"
    };
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/fund.js
var require_fund2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/fund.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FundOperation = void 0;
    var starknet_1 = __require("starknet");
    var utils_js_1 = require_utils6();
    var operation_js_1 = require_operation();
    var FundOperation = class {
      constructor({ to, amount, proof, auditPart, Tongo, hint }) {
        __publicField(this, "type");
        __publicField(this, "Tongo");
        __publicField(this, "to");
        __publicField(this, "amount");
        __publicField(this, "hint");
        __publicField(this, "proof");
        __publicField(this, "auditPart");
        __publicField(this, "approve");
        this.type = operation_js_1.OperationType.Fund;
        this.to = to;
        this.amount = amount;
        this.hint = hint;
        this.auditPart = auditPart;
        this.proof = proof;
        this.Tongo = Tongo;
      }
      toCalldata() {
        return this.Tongo.populate("fund", [
          {
            to: this.to,
            amount: this.amount,
            hint: this.hint,
            proof: this.proof,
            auditPart: this.auditPart
          }
        ]);
      }
      // TODO: better ux for this. Maybe return the call?
      async populateApprove() {
        const erc20 = await this.Tongo.ERC20();
        const erc20_addres = starknet_1.num.toHex(erc20);
        const tongo_address = this.Tongo.address;
        const rate = await this.Tongo.get_rate();
        const amount = starknet_1.cairo.uint256(this.amount * (0, utils_js_1.castBigInt)(rate));
        const calldata = starknet_1.CallData.compile({ spender: tongo_address, amount });
        this.approve = { contractAddress: erc20_addres, entrypoint: "approve", calldata };
      }
    };
    exports.FundOperation = FundOperation;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/ragequit.js
var require_ragequit2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/ragequit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RagequitOperation = void 0;
    var operation_js_1 = require_operation();
    var RagequitOperation = class {
      constructor({ from, to, amount, proof, Tongo, hint, auditPart }) {
        __publicField(this, "type", operation_js_1.OperationType.Ragequit);
        __publicField(this, "from");
        __publicField(this, "to");
        __publicField(this, "amount");
        __publicField(this, "hint");
        __publicField(this, "auditPart");
        __publicField(this, "proof");
        __publicField(this, "Tongo");
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.hint = hint;
        this.proof = proof;
        this.auditPart = auditPart;
        this.Tongo = Tongo;
      }
      toCalldata() {
        return this.Tongo.populate("ragequit", [
          {
            from: this.from,
            amount: this.amount,
            to: "0x" + this.to.toString(16),
            proof: this.proof,
            hint: this.hint,
            auditPart: this.auditPart
          }
        ]);
      }
    };
    exports.RagequitOperation = RagequitOperation;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/rollover.js
var require_rollover2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/rollover.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RollOverOperation = void 0;
    var operation_js_1 = require_operation();
    var RollOverOperation = class {
      constructor({ to, proof, Tongo, hint }) {
        __publicField(this, "type", operation_js_1.OperationType.Rollover);
        __publicField(this, "to");
        __publicField(this, "proof");
        __publicField(this, "Tongo");
        __publicField(this, "hint");
        this.to = to;
        this.proof = proof;
        this.Tongo = Tongo;
        this.hint = hint;
      }
      toCalldata() {
        return this.Tongo.populate("rollover", [{ to: this.to, proof: this.proof, hint: this.hint }]);
      }
    };
    exports.RollOverOperation = RollOverOperation;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/transfer.js
var require_transfer2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/transfer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransferOperation = void 0;
    var operation_js_1 = require_operation();
    var TransferOperation = class {
      constructor({ from, to, transferBalance, transferBalanceSelf, proof, auditPart, auditPartTransfer, auxiliarCipher, auxiliarCipher2, Tongo, hintTransfer, hintLeftover }) {
        __publicField(this, "type", operation_js_1.OperationType.Transfer);
        __publicField(this, "Tongo");
        __publicField(this, "from");
        __publicField(this, "to");
        __publicField(this, "transferBalance");
        __publicField(this, "transferBalanceSelf");
        __publicField(this, "auxiliarCipher");
        __publicField(this, "auxiliarCipher2");
        __publicField(this, "hintTransfer");
        __publicField(this, "hintLeftover");
        __publicField(this, "proof");
        __publicField(this, "auditPart");
        __publicField(this, "auditPartTransfer");
        this.from = from;
        this.to = to;
        this.transferBalance = transferBalance;
        this.transferBalanceSelf = transferBalanceSelf;
        this.auxiliarCipher = auxiliarCipher;
        this.auxiliarCipher2 = auxiliarCipher2;
        this.hintTransfer = hintTransfer;
        this.hintLeftover = hintLeftover;
        this.proof = proof;
        this.auditPart = auditPart;
        this.auditPartTransfer = auditPartTransfer;
        this.Tongo = Tongo;
      }
      toCalldata() {
        return this.Tongo.populate("transfer", [
          {
            from: this.from,
            to: this.to,
            transferBalance: this.transferBalance,
            transferBalanceSelf: this.transferBalanceSelf,
            auxiliarCipher: this.auxiliarCipher,
            auxiliarCipher2: this.auxiliarCipher2,
            hintTransfer: this.hintTransfer,
            hintLeftover: this.hintLeftover,
            proof: this.proof,
            auditPart: this.auditPart,
            auditPartTransfer: this.auditPartTransfer
          }
        ]);
      }
    };
    exports.TransferOperation = TransferOperation;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/withdraw.js
var require_withdraw2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/withdraw.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WithdrawOperation = void 0;
    var starknet_1 = __require("starknet");
    var operation_js_1 = require_operation();
    var WithdrawOperation = class {
      constructor({ from, to, amount, proof, auditPart, Tongo, hint, auxiliarCipher }) {
        __publicField(this, "type", operation_js_1.OperationType.Withdraw);
        __publicField(this, "from");
        __publicField(this, "to");
        __publicField(this, "amount");
        __publicField(this, "hint");
        __publicField(this, "auxiliarCipher");
        __publicField(this, "proof");
        __publicField(this, "auditPart");
        __publicField(this, "Tongo");
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.auxiliarCipher = auxiliarCipher;
        this.hint = hint;
        this.proof = proof;
        this.auditPart = auditPart;
        this.Tongo = Tongo;
      }
      toCalldata() {
        return this.Tongo.populate("withdraw", [
          {
            from: this.from,
            amount: this.amount,
            hint: this.hint,
            to: starknet_1.num.toHex(this.to),
            auxiliarCipher: this.auxiliarCipher,
            auditPart: this.auditPart,
            proof: this.proof
          }
        ]);
      }
    };
    exports.WithdrawOperation = WithdrawOperation;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/account/events.js
var require_events = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/account/events.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReaderToAccountEvents = void 0;
    var data_service_js_1 = require_data_service();
    var AccountEvent = {
      Fund: "fund",
      Withdraw: "withdraw",
      Ragequit: "ragequit",
      Rollover: "rollover",
      TransferIn: "transferIn",
      TransferOut: "transferOut"
    };
    exports.ReaderToAccountEvents = {
      [data_service_js_1.ReaderEventType.Fund]: AccountEvent.Fund,
      [data_service_js_1.ReaderEventType.Rollover]: AccountEvent.Rollover,
      [data_service_js_1.ReaderEventType.Withdraw]: AccountEvent.Withdraw,
      [data_service_js_1.ReaderEventType.Ragequit]: AccountEvent.Ragequit,
      [data_service_js_1.ReaderEventType.TransferIn]: AccountEvent.TransferIn,
      [data_service_js_1.ReaderEventType.TransferOut]: AccountEvent.TransferOut
    };
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/account/account.js
var require_account = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/account/account.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Account = void 0;
    var starknet_1 = __require("starknet");
    var audit_1 = require_audit();
    var fund_1 = require_fund();
    var ragequit_1 = require_ragequit();
    var rollover_1 = require_rollover();
    var transfer_1 = require_transfer();
    var withdraw_1 = require_withdraw();
    var ae_balance_js_1 = require_ae_balance();
    var data_service_js_1 = require_data_service();
    var key_js_1 = require_key();
    var fund_js_1 = require_fund2();
    var ragequit_js_1 = require_ragequit2();
    var rollover_js_1 = require_rollover2();
    var transfer_js_1 = require_transfer2();
    var withdraw_js_1 = require_withdraw2();
    var tongo_abi_js_1 = require_tongo_abi();
    var types_js_1 = require_types2();
    var utils_js_1 = require_utils6();
    var events_js_1 = require_events();
    var Account2 = class _Account {
      constructor(pk, contractAddress, providerOrUrl) {
        __publicField(this, "publicKey");
        __publicField(this, "pk");
        __publicField(this, "provider");
        __publicField(this, "Tongo");
        let provider;
        if (typeof providerOrUrl === "string") {
          provider = new starknet_1.RpcProvider({
            nodeUrl: providerOrUrl,
            specVersion: "0.10.0"
          });
        } else {
          provider = providerOrUrl;
        }
        this.pk = (0, utils_js_1.bytesOrNumToBigInt)(pk);
        this.Tongo = new starknet_1.Contract({
          abi: tongo_abi_js_1.tongoAbi,
          address: contractAddress,
          providerOrAccount: provider
        }).typedv2(tongo_abi_js_1.tongoAbi);
        this.publicKey = (0, utils_js_1.pubKeyFromSecret)(this.pk);
        this.provider = provider;
      }
      tongoAddress() {
        return (0, types_js_1.pubKeyAffineToBase58)(this.publicKey);
      }
      static tongoAddress(pk) {
        return (0, types_js_1.pubKeyAffineToBase58)((0, utils_js_1.pubKeyFromSecret)((0, utils_js_1.bytesOrNumToBigInt)(pk)));
      }
      async nonce() {
        const { nonce } = await this.rawState();
        return nonce;
      }
      /// Returns the State of the account. This functions decrypts the balance and pending
      /// CipherBalances.
      async state() {
        const { balance, pending, aeBalance, nonce } = await this.rawState();
        const hint = aeBalance ? await this.decryptAEBalance(aeBalance, nonce) : void 0;
        const balanceAmount = this.decryptCipherBalance(balance, hint);
        const pendingAmount = this.decryptCipherBalance(pending);
        return { balance: balanceAmount, pending: pendingAmount, nonce };
      }
      /// Retunrs the `almost` raw account state. The only handing that happens here is type
      // convertion from CairoOption::None to undefinded and from StarkPoints to ProjectivePoints
      async rawState() {
        const state = await this.Tongo.get_state(this.publicKey);
        return _Account.parseAccountState(state);
      }
      /// Returns the rate of convertion of Tongo
      async rate() {
        const rate = await this.Tongo.get_rate();
        return (0, utils_js_1.castBigInt)(rate);
      }
      /// Returns the bit_size of this Tongo contract
      async bit_size() {
        const bit = await this.Tongo.get_bit_size();
        const bit_size = typeof bit == "bigint" ? Number(bit) : bit;
        return bit_size;
      }
      // Warning: This is only for display. This is not the correct amount
      // of tongos that corresponds to erc20Amount
      async erc20ToTongo(erc20Amount) {
        const rate = await this.rate();
        const temp = erc20Amount / rate;
        if (erc20Amount % rate != 0n) {
          return temp + 1n;
        } else {
          return temp;
        }
      }
      async tongoToErc20(tongoAmount) {
        const rate = await this.rate();
        return tongoAmount * rate;
      }
      async auditorKey() {
        const auditorKey = await this.Tongo.auditor_key();
        return auditorKey;
      }
      /// Returns Option(None) if tongo has not and auditor and Some(Audit) if tongo has an auditor
      async createAuditPart(balance, storedCipherBalance, prefix_data) {
        let auditPart = new starknet_1.CairoOption(starknet_1.CairoOptionVariant.None);
        const auditor = await this.auditorKey();
        if (auditor.isSome()) {
          const auditorPubKey = (0, types_js_1.starkPointToProjectivePoint)(auditor.unwrap());
          const { inputs: inputsAudit, proof: proofAudit } = (0, audit_1.proveAudit)(this.pk, balance, storedCipherBalance, auditorPubKey, prefix_data);
          const nonce = await this.nonce();
          const hint = await this.computeAEHintForPubKey(balance, nonce, auditorPubKey);
          const audit = { auditedBalance: inputsAudit.auditedBalance, hint, proof: proofAudit };
          auditPart = new starknet_1.CairoOption(starknet_1.CairoOptionVariant.Some, audit);
        }
        return auditPart;
      }
      async fund(fundDetails) {
        const { amount, sender } = fundDetails;
        const { nonce, balance: currentBalance, aeBalance } = await this.rawState();
        const current_hint = aeBalance ? await this.decryptAEBalance(aeBalance, nonce) : void 0;
        const initialBalance = this.decryptCipherBalance(currentBalance, current_hint);
        const prefix_data = {
          chain_id: BigInt(await this.provider.getChainId()),
          tongo_address: BigInt(this.Tongo.address),
          sender_address: BigInt(sender)
        };
        const { inputs, proof, newBalance } = (0, fund_1.proveFund)(this.pk, amount, initialBalance, currentBalance, nonce, prefix_data);
        const auditPart = await this.createAuditPart(amount + initialBalance, newBalance, prefix_data);
        const hint = await this.computeAEHintForSelf(amount + initialBalance, nonce + 1n);
        const operation = new fund_js_1.FundOperation({ to: inputs.y, amount, hint, proof, auditPart, Tongo: this.Tongo });
        await operation.populateApprove();
        return operation;
      }
      async transfer(transferDetails) {
        const { amount, sender } = transferDetails;
        const bit_size = await this.bit_size();
        const { nonce, balance: currentBalance, aeBalance } = await this.rawState();
        const current_hint = aeBalance ? await this.decryptAEBalance(aeBalance, nonce) : void 0;
        const initialBalance = this.decryptCipherBalance(currentBalance, current_hint);
        if (initialBalance < amount) {
          throw new Error("You dont have enough balance");
        }
        const to = (0, types_js_1.starkPointToProjectivePoint)(transferDetails.to);
        const prefix_data = {
          chain_id: BigInt(await this.provider.getChainId()),
          tongo_address: BigInt(this.Tongo.address),
          sender_address: BigInt(sender)
        };
        const { inputs, proof, newBalance } = (0, transfer_1.proveTransfer)(this.pk, to, initialBalance, amount, currentBalance, nonce, bit_size, prefix_data);
        const hintTransfer = await this.computeAEHintForPubKey(amount, nonce, to);
        const hintLeftover = await this.computeAEHintForSelf(initialBalance - amount, nonce + 1n);
        const auditPart = await this.createAuditPart(initialBalance - amount, newBalance, prefix_data);
        const auditPartTransfer = await this.createAuditPart(amount, inputs.transferBalanceSelf, prefix_data);
        return new transfer_js_1.TransferOperation({
          from: inputs.from,
          to: inputs.to,
          transferBalance: inputs.transferBalance,
          transferBalanceSelf: inputs.transferBalanceSelf,
          auxiliarCipher: inputs.auxiliarCipher,
          auxiliarCipher2: inputs.auxiliarCipher2,
          hintTransfer,
          hintLeftover,
          proof,
          auditPart,
          auditPartTransfer,
          Tongo: this.Tongo
        });
      }
      async ragequit(ragequitDetails) {
        const { to, sender } = ragequitDetails;
        const { nonce, balance: currentBalance, aeBalance } = await this.rawState();
        const current_hint = aeBalance ? await this.decryptAEBalance(aeBalance, nonce) : void 0;
        const currentBalanceAmount = this.decryptCipherBalance(currentBalance, current_hint);
        if (currentBalanceAmount === 0n) {
          throw new Error("You dont have enough balance");
        }
        const prefix_data = {
          chain_id: BigInt(await this.provider.getChainId()),
          tongo_address: BigInt(this.Tongo.address),
          sender_address: BigInt(sender)
        };
        const { inputs, proof, newBalance } = (0, ragequit_1.proveRagequit)(this.pk, currentBalance, nonce, BigInt(to), currentBalanceAmount, prefix_data);
        const hint = await this.computeAEHintForSelf(0n, nonce + 1n);
        const auditPart = await this.createAuditPart(0n, newBalance, prefix_data);
        return new ragequit_js_1.RagequitOperation({
          from: inputs.y,
          to: inputs.to,
          amount: inputs.amount,
          hint,
          proof,
          Tongo: this.Tongo,
          auditPart
        });
      }
      async withdraw(withdrawDetails) {
        const { amount, to, sender } = withdrawDetails;
        const bit_size = await this.bit_size();
        const { nonce, balance: currentBalance, aeBalance } = await this.rawState();
        const current_hint = aeBalance ? await this.decryptAEBalance(aeBalance, nonce) : void 0;
        const initialBalance = this.decryptCipherBalance(currentBalance, current_hint);
        if (initialBalance < amount) {
          throw new Error("You dont have enought balance");
        }
        const prefix_data = {
          chain_id: BigInt(await this.provider.getChainId()),
          tongo_address: BigInt(this.Tongo.address),
          sender_address: BigInt(sender)
        };
        const { inputs, proof, newBalance } = (0, withdraw_1.proveWithdraw)(this.pk, initialBalance, amount, BigInt(to), currentBalance, nonce, bit_size, prefix_data);
        const hint = await this.computeAEHintForSelf(initialBalance - amount, nonce + 1n);
        const auditPart = await this.createAuditPart(initialBalance - amount, newBalance, prefix_data);
        return new withdraw_js_1.WithdrawOperation({
          from: inputs.y,
          to: inputs.to,
          amount: inputs.amount,
          auxiliarCipher: inputs.auxiliarCipher,
          hint,
          proof,
          auditPart,
          Tongo: this.Tongo
        });
      }
      async rollover(rolloverDetails) {
        const { sender } = rolloverDetails;
        const state = await this.rawState();
        const { nonce, balance: currentBalance, aeBalance, pending } = state;
        const current_hint = aeBalance ? await this.decryptAEBalance(aeBalance, nonce) : void 0;
        const unlockedAmount = this.decryptCipherBalance(currentBalance, current_hint);
        const pendingAmount = this.decryptCipherBalance(pending);
        if (pendingAmount == 0n) {
          throw new Error("Your pending ammount is 0");
        }
        const prefix_data = {
          chain_id: BigInt(await this.provider.getChainId()),
          tongo_address: BigInt(this.Tongo.address),
          sender_address: BigInt(sender)
        };
        const { inputs, proof } = (0, rollover_1.proveRollover)(this.pk, nonce, prefix_data);
        const hint = await this.computeAEHintForSelf(pendingAmount + unlockedAmount, nonce + 1n);
        return new rollover_js_1.RollOverOperation({ to: inputs.y, proof, Tongo: this.Tongo, hint });
      }
      async decryptAEBalance(aeBalance, accountNonce) {
        return this.decryptAEHintForPubKey(aeBalance, accountNonce, this.publicKey);
      }
      async decryptAEHintForPubKey(aeHint, accountNonce, other) {
        const keyAEHint = await this.deriveSymmetricKeyForPubKey(accountNonce, other);
        const { ciphertext, nonce: cipherNonce } = (0, ae_balance_js_1.AEHintToBytes)(aeHint);
        const balance = new ae_balance_js_1.AEChaCha(keyAEHint).decryptBalance({ ciphertext, nonce: cipherNonce });
        return balance;
      }
      decryptCipherBalance({ L, R }, hint) {
        if (hint) {
          if ((0, utils_js_1.assertBalance)(this.pk, hint, L, R)) {
            return hint;
          }
        }
        return (0, utils_js_1.decipherBalance)(this.pk, L, R);
      }
      //TODO: rethink this to better ux
      async generateExPost(to, cipher, sender) {
        if (cipher.L == null) {
          throw new Error("L is null");
        }
        if (cipher.R == null) {
          throw new Error("R is null");
        }
        const prefix_data = {
          chain_id: BigInt(await this.provider.getChainId()),
          tongo_address: BigInt(this.Tongo.address),
          sender_address: BigInt(sender)
        };
        const balance = this.decryptCipherBalance(cipher);
        const { inputs, proof } = (0, audit_1.proveAudit)(this.pk, balance, cipher, (0, types_js_1.starkPointToProjectivePoint)(to), prefix_data);
        return { inputs, proof };
      }
      verifyExPost(expost) {
        const y = (0, types_js_1.projectivePointToStarkPoint)(expost.inputs.y);
        if (y != this.publicKey) {
          throw new Error("The expost is not for you");
        }
        (0, audit_1.verifyAudit)(expost.inputs, expost.proof);
        const amount = this.decryptCipherBalance({
          L: expost.inputs.auditedBalance.L,
          R: expost.inputs.auditedBalance.R
        });
        return amount;
      }
      _diffieHellman(other) {
        const otherPublicKey = (0, types_js_1.pubKeyBase58ToHex)(other);
        return (0, key_js_1.ECDiffieHellman)(this.pk, otherPublicKey);
      }
      async computeAEHintForPubKey(amount, nonce, pubKey) {
        const keyAEBal = await this.deriveSymmetricKeyForPubKey(nonce, pubKey);
        return (0, ae_balance_js_1.bytesToAEHint)(new ae_balance_js_1.AEChaCha(keyAEBal).encryptBalance(amount));
      }
      async computeAEHintForSelf(amount, nonce) {
        return this.computeAEHintForPubKey(amount, nonce, this.publicKey);
      }
      async deriveSymmetricKeyForPubKey(nonce, other) {
        const sharedSecret = (0, key_js_1.ECDiffieHellman)(this.pk, (0, types_js_1.pubKeyAffineToHex)(other));
        return (0, key_js_1.deriveSymmetricEncryptionKey)({
          contractAddress: this.Tongo.address,
          nonce,
          secret: sharedSecret
        });
      }
      static parseAccountState(state) {
        const { balance, pending, audit, nonce, ae_balance, ae_audit_balance } = state;
        let parsedAudit;
        if (audit.isSome()) {
          parsedAudit = (0, types_js_1.parseCipherBalance)(audit.unwrap());
        }
        return {
          balance: (0, types_js_1.parseCipherBalance)(balance),
          pending: (0, types_js_1.parseCipherBalance)(pending),
          audit: parsedAudit,
          nonce: starknet_1.num.toBigInt(nonce),
          aeBalance: ae_balance.isSome() ? (0, ae_balance_js_1.parseAEBalance)(ae_balance.unwrap()) : void 0,
          aeAuditBalance: ae_audit_balance.isSome() ? (0, ae_balance_js_1.parseAEBalance)(ae_audit_balance.unwrap()) : void 0
        };
      }
      async getEventsFund(initialBlock) {
        const reader = new data_service_js_1.StarknetEventReader(this.provider, this.Tongo.address);
        const events = await reader.getEventsFund(initialBlock, this.publicKey);
        return events.map((event) => ({
          type: events_js_1.ReaderToAccountEvents[event.type],
          tx_hash: event.tx_hash,
          block_number: event.block_number,
          nonce: event.nonce,
          amount: event.amount
        }));
      }
      async getEventsRollover(initialBlock) {
        const reader = new data_service_js_1.StarknetEventReader(this.provider, this.Tongo.address);
        const events = await reader.getEventsRollover(initialBlock, this.publicKey);
        return events.map((event) => ({
          type: events_js_1.ReaderToAccountEvents[event.type],
          tx_hash: event.tx_hash,
          block_number: event.block_number,
          nonce: event.nonce,
          amount: this.decryptCipherBalance((0, types_js_1.parseCipherBalance)(event.rollovered))
        }));
      }
      async getEventsWithdraw(initialBlock) {
        const reader = new data_service_js_1.StarknetEventReader(this.provider, this.Tongo.address);
        const events = await reader.getEventsWithdraw(initialBlock, this.publicKey);
        return events.map((event) => ({
          type: events_js_1.ReaderToAccountEvents[event.type],
          tx_hash: event.tx_hash,
          block_number: event.block_number,
          nonce: event.nonce,
          amount: event.amount,
          to: starknet_1.num.toHex(event.to)
        }));
      }
      async getEventsRagequit(initialBlock) {
        const reader = new data_service_js_1.StarknetEventReader(this.provider, this.Tongo.address);
        const events = await reader.getEventsRagequit(initialBlock, this.publicKey);
        return events.map((event) => ({
          type: events_js_1.ReaderToAccountEvents[event.type],
          tx_hash: event.tx_hash,
          block_number: event.block_number,
          nonce: event.nonce,
          amount: event.amount,
          to: starknet_1.num.toHex(event.to)
        }));
      }
      async getEventsTransferOut(initialBlock) {
        const reader = new data_service_js_1.StarknetEventReader(this.provider, this.Tongo.address);
        const events = await reader.getEventsTransferOut(initialBlock, this.publicKey);
        return Promise.all(events.map(async (event) => ({
          type: events_js_1.ReaderToAccountEvents[event.type],
          tx_hash: event.tx_hash,
          block_number: event.block_number,
          nonce: event.nonce,
          amount: this.decryptCipherBalance((0, types_js_1.parseCipherBalance)(event.transferBalanceSelf), await this.decryptAEHintForPubKey(event.hintTransfer, event.nonce, event.to)),
          to: (0, types_js_1.pubKeyAffineToBase58)(event.to)
        })));
      }
      async getEventsTransferIn(initialBlock) {
        const reader = new data_service_js_1.StarknetEventReader(this.provider, this.Tongo.address);
        const events = await reader.getEventsTransferIn(initialBlock, this.publicKey);
        return Promise.all(events.map(async (event) => ({
          type: events_js_1.ReaderToAccountEvents[event.type],
          tx_hash: event.tx_hash,
          block_number: event.block_number,
          nonce: event.nonce,
          amount: this.decryptCipherBalance((0, types_js_1.parseCipherBalance)(event.transferBalance), await this.decryptAEHintForPubKey(event.hintTransfer, event.nonce, event.from)),
          from: (0, types_js_1.pubKeyAffineToBase58)(event.from)
        })));
      }
      async getTxHistory(initialBlock) {
        const promises = Promise.all([
          this.getEventsFund(initialBlock),
          this.getEventsRollover(initialBlock),
          this.getEventsWithdraw(initialBlock),
          this.getEventsRagequit(initialBlock),
          this.getEventsTransferOut(initialBlock),
          this.getEventsTransferIn(initialBlock)
        ]);
        const events = (await promises).flat();
        return events.sort((a, b) => b.block_number - a.block_number);
      }
    };
    exports.Account = Account2;
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/account/account.interface.js
var require_account_interface = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/account/account.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/account/index.js
var require_account2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/account/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_account(), exports);
    __exportStar(require_account_interface(), exports);
    __exportStar(require_events(), exports);
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/audit.js
var require_audit2 = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/audit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/index.js
var require_operations = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/operations/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_audit2(), exports);
    __exportStar(require_fund2(), exports);
    __exportStar(require_operation(), exports);
    __exportStar(require_ragequit2(), exports);
    __exportStar(require_rollover2(), exports);
    __exportStar(require_transfer2(), exports);
    __exportStar(require_withdraw2(), exports);
  }
});

// ../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/@fatsolutions+tongo-sdk@1.4.0_typescript@5.8.3_zod@3.25.76/node_modules/@fatsolutions/tongo-sdk/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_account2(), exports);
    __exportStar(require_operations(), exports);
    __exportStar(require_ae_balance(), exports);
    __exportStar(require_key(), exports);
    __exportStar(require_types2(), exports);
  }
});

// src/components/PayLinkProvider.tsx
import { PrivyProvider } from "@privy-io/react-auth";

// src/config.ts
var config = {
  network: "sepolia",
  serverUrl: "http://localhost:3001",
  alchemyApiKey: void 0,
  debug: false
};
function setPayLinkConfig(newConfig) {
  config = { ...config, ...newConfig };
}
function getPayLinkConfig() {
  return config;
}

// src/components/PayLinkProvider.tsx
import { jsx } from "react/jsx-runtime";
function PayLinkProvider({ privyAppId, config: config2, children }) {
  setPayLinkConfig(config2 || {});
  return /* @__PURE__ */ jsx(
    PrivyProvider,
    {
      appId: privyAppId,
      config: {
        loginMethods: ["google", "email"],
        appearance: { theme: "light" }
      },
      children
    }
  );
}

// src/hooks/useStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// src/lib/address.ts
function normalizeAddress(address) {
  if (!address) return "0x0";
  let hex = address.toLowerCase();
  if (hex.startsWith("0x")) {
    hex = hex.slice(2);
  }
  const stripped = hex.replace(/^0+/, "") || "0";
  return "0x" + stripped;
}

// src/hooks/useStore.ts
var useAuthStore = create()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      setAuth: (isLoggedIn, user) => set({ isLoggedIn, user }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : updates,
        isLoggedIn: true
      }))
    }),
    {
      name: "paylink_user_storage"
    }
  )
);
var usePaymentStore = create()(
  persist(
    (set) => ({
      amount: "",
      step: "amount",
      isLoading: false,
      balance: null,
      walletAddress: null,
      selectedMethod: null,
      savedMethod: null,
      preferredAsset: "USDC",
      transactions: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      setAmount: (amount) => set({ amount }),
      setStep: (step) => set({ step }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setBalance: (balance) => set({ balance }),
      setMethod: (method) => set({ selectedMethod: method }),
      saveMethod: (method) => set({ savedMethod: method }),
      setPreferredAsset: (asset) => set({ preferredAsset: asset }),
      setWalletAddress: (address) => set({ walletAddress: address ? normalizeAddress(address) : null }),
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (tx) => set((state) => {
        if (!tx.senderAddress || !tx.recipientAddress) return state;
        const sender = normalizeAddress(tx.senderAddress);
        const recipient = normalizeAddress(tx.recipientAddress);
        if (sender === recipient) return state;
        const newTx = {
          ...tx,
          senderAddress: sender,
          recipientAddress: recipient,
          direction: tx.direction || "sent"
        };
        const filtered = state.transactions.filter((t) => t.hash !== tx.hash);
        return { transactions: [newTx, ...filtered] };
      }),
      updateTransactionStatus: (hash4, status) => set((state) => ({
        transactions: state.transactions.map(
          (tx) => tx.hash === hash4 ? { ...tx, status } : tx
        )
      })),
      clearTransactions: () => set({ transactions: [] })
    }),
    {
      name: "paylink-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        transactions: state.transactions,
        preferredAsset: state.preferredAsset,
        savedMethod: state.savedMethod
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      }
    }
  )
);
var useUIStore = create((set) => ({
  view: "sender",
  isAdvancedMode: false,
  activeModal: null,
  pendingAction: null,
  setView: (view) => set({ view }),
  setAdvancedMode: (enabled) => set({ isAdvancedMode: enabled }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setPendingAction: (action) => set({ pendingAction: action })
}));

// src/hooks/useAuth.ts
import { usePrivy } from "@privy-io/react-auth";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/sdk.js
import { RpcProvider as RpcProvider2 } from "starknet";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/network/presets.js
var mainnet = {
  name: "Mainnet",
  chainId: ChainId.MAINNET,
  rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet",
  explorerUrl: "https://voyager.online"
};
var sepolia = {
  name: "Sepolia",
  chainId: ChainId.SEPOLIA,
  rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
  explorerUrl: "https://sepolia.voyager.online"
};
var devnet = {
  name: "Devnet",
  chainId: ChainId.SEPOLIA,
  // Devnet typically uses Sepolia chain ID
  rpcUrl: "http://localhost:5050"
};
var networks = {
  mainnet,
  sepolia,
  devnet
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/wallet/index.js
import { Account, RpcProvider, PaymasterRpc, hash as hash3 } from "starknet";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/wallet/accounts/provider.js
import { hash, num } from "starknet";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/account/presets.js
import { CallData, CairoCustomEnum, CairoOption, CairoOptionVariant } from "starknet";
var DevnetPreset = {
  classHash: "0x5b4b537eaa2399e3aa99c4e2e0208ebd6c71bc1467938cd52c798c601e43564",
  buildConstructorCalldata(publicKey) {
    return CallData.compile({ public_key: publicKey });
  }
};
var OpenZeppelinPreset = {
  classHash: (
    // OZ AccountUpgradeable v3.0.0 (supports SRC9 outside execution)
    "0x01d1777db36cdd06dd62cfde77b1b6ae06412af95d57a13dc40ac77b8a702381"
  ),
  buildConstructorCalldata(publicKey) {
    return CallData.compile({ publicKey });
  }
};
var ArgentPreset = {
  classHash: "0x036078334509b514626504edc9fb252328d1a240e4e948bef8d0c08dff45927f",
  buildConstructorCalldata(publicKey) {
    const axSigner = new CairoCustomEnum({ Starknet: { pubkey: publicKey } });
    const axGuardian = new CairoOption(CairoOptionVariant.None);
    return CallData.compile({
      owner: axSigner,
      guardian: axGuardian
    });
  }
};
var BraavosPreset = {
  // BraavosBaseAccount class hash - used for deployment
  classHash: "0x03d16c7a9a60b0593bd202f660a28c5d76e0403601d9ccc7e4fa253b6a70c201",
  buildConstructorCalldata(publicKey) {
    return [publicKey];
  },
  getSalt(publicKey) {
    return publicKey;
  }
};
var BRAAVOS_IMPL_CLASS_HASH = "0x03957f9f5a1cbfe918cedc2015c85200ca51a5f7506ecb6de98a5207b759bf8a";
var ArgentXV050Preset = {
  classHash: "0x073414441639dcd11d1846f287650a00c60c416b9d3ba45d31c651672125b2c2",
  buildConstructorCalldata(publicKey) {
    const axSigner = new CairoCustomEnum({ Starknet: { pubkey: publicKey } });
    const axGuardian = new CairoOption(CairoOptionVariant.None);
    return CallData.compile({
      owner: axSigner,
      guardian: axGuardian
    });
  }
};
var accountPresets = {
  devnet: DevnetPreset,
  openzeppelin: OpenZeppelinPreset,
  argent: ArgentPreset,
  braavos: BraavosPreset,
  argentXV050: ArgentXV050Preset
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/wallet/accounts/provider.js
function toHex(value) {
  if (typeof value === "string" && value.startsWith("0x")) {
    return value;
  }
  return num.toHex(value);
}
var AccountProvider = class {
  /**
   * @param signer - The signer implementation for signing operations
   * @param accountClass - Account class configuration (default: {@link OpenZeppelinPreset})
   */
  constructor(signer, accountClass) {
    this.cachedPublicKey = null;
    this.cachedAddress = null;
    this.signer = signer;
    this.accountClass = accountClass ?? OpenZeppelinPreset;
  }
  /**
   * Compute and return the counterfactual address for this account.
   *
   * The address is derived from the signer's public key, the account class
   * hash, and the constructor calldata. Cached after first computation.
   *
   * @returns The Starknet address for this account
   */
  async getAddress() {
    if (this.cachedAddress) {
      return this.cachedAddress;
    }
    const publicKey = await this.getPublicKey();
    const calldata = this.getConstructorCalldata(publicKey);
    const salt = this.getSalt(publicKey);
    const addressStr = hash.calculateContractAddressFromHash(
      salt,
      this.accountClass.classHash,
      calldata,
      0
      // deployer address (0 for counterfactual)
    );
    this.cachedAddress = fromAddress(addressStr);
    return this.cachedAddress;
  }
  /**
   * Get the public key from the underlying signer. Cached after first call.
   * @returns The public key as a hex string
   */
  async getPublicKey() {
    if (this.cachedPublicKey) {
      return this.cachedPublicKey;
    }
    const pubKey = await this.signer.getPubKey();
    this.cachedPublicKey = pubKey;
    return pubKey;
  }
  /** Get the underlying signer instance. */
  getSigner() {
    return this.signer;
  }
  /** Get the account contract class hash. */
  getClassHash() {
    return this.accountClass.classHash;
  }
  /** Build the constructor calldata from the given public key. */
  getConstructorCalldata(publicKey) {
    return this.accountClass.buildConstructorCalldata(publicKey);
  }
  /** Compute the address salt from the given public key. */
  getSalt(publicKey) {
    return this.accountClass.getSalt ? this.accountClass.getSalt(publicKey) : publicKey;
  }
  /**
   * Get deployment data for paymaster-sponsored deployment.
   */
  async getDeploymentData() {
    const publicKey = await this.getPublicKey();
    const address = await this.getAddress();
    const calldata = this.getConstructorCalldata(publicKey);
    const salt = this.getSalt(publicKey);
    return {
      address: toHex(address.toString()),
      class_hash: toHex(this.accountClass.classHash),
      salt: toHex(salt),
      calldata: calldata.map((v) => toHex(v)),
      version: 1
    };
  }
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/signer/adapter.js
import { typedData as typedDataUtils, CallData as CallData2, hash as hash2, transaction, EDAMode } from "starknet";
function intDAM(mode) {
  if (mode === EDAMode.L2 || mode === "L2")
    return 1;
  return 0;
}
function assertV3Version(version, operation) {
  let isV3 = false;
  try {
    isV3 = (BigInt(version) & 0xffn) === 0x3n;
  } catch {
    isV3 = false;
  }
  if (!isV3) {
    throw new Error(`SignerAdapter only supports V3 ${operation} transactions (received version ${version}).`);
  }
}
var SignerAdapter = class {
  constructor(signer) {
    this.signer = signer;
  }
  async getPubKey() {
    return this.signer.getPubKey();
  }
  async signMessage(typedData, accountAddress) {
    const msgHash = typedDataUtils.getMessageHash(typedData, accountAddress);
    return this.signer.signRaw(msgHash);
  }
  async signTransaction(transactions, details) {
    assertV3Version(details.version, "invoke");
    const det = details;
    const compiledCalldata = transaction.getExecuteCalldata(transactions, det.cairoVersion);
    const msgHash = hash2.calculateInvokeTransactionHash({
      senderAddress: det.walletAddress,
      version: det.version,
      compiledCalldata,
      chainId: det.chainId,
      nonce: det.nonce,
      accountDeploymentData: det.accountDeploymentData || [],
      nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      resourceBounds: det.resourceBounds,
      tip: det.tip ?? 0,
      paymasterData: det.paymasterData || []
    });
    return this.signer.signRaw(msgHash);
  }
  async signDeployAccountTransaction(details) {
    assertV3Version(details.version, "deploy_account");
    const det = details;
    const compiledConstructorCalldata = CallData2.compile(det.constructorCalldata);
    const msgHash = hash2.calculateDeployAccountTransactionHash({
      contractAddress: det.contractAddress,
      classHash: det.classHash,
      compiledConstructorCalldata,
      salt: det.addressSalt,
      version: det.version,
      chainId: det.chainId,
      nonce: det.nonce,
      nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      resourceBounds: det.resourceBounds,
      tip: det.tip ?? 0,
      paymasterData: det.paymasterData || []
    });
    const txSig = await this.signer.signRaw(msgHash);
    const txSigArray = Array.isArray(txSig) ? txSig : [txSig.r, txSig.s];
    if (!txSigArray[0] || !txSigArray[1]) {
      throw new Error("Invalid signature format from signer");
    }
    if (det.classHash === BraavosPreset.classHash) {
      const chainIdFelt = typeof det.chainId === "string" ? det.chainId : BigInt(det.chainId).toString(16).replace(/^/, "0x");
      const auxData = [
        BRAAVOS_IMPL_CLASS_HASH,
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        chainIdFelt
      ];
      const auxHash = hash2.computePoseidonHashOnElements(auxData);
      const auxSig = await this.signer.signRaw(auxHash);
      const auxSigArray = Array.isArray(auxSig) ? auxSig : [auxSig.r, auxSig.s];
      if (!auxSigArray[0] || !auxSigArray[1]) {
        throw new Error("Invalid aux signature format from signer");
      }
      return [
        String(txSigArray[0]),
        String(txSigArray[1]),
        BRAAVOS_IMPL_CLASS_HASH,
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        "0x0",
        chainIdFelt,
        String(auxSigArray[0]),
        String(auxSigArray[1])
      ];
    }
    return txSig;
  }
  async signDeclareTransaction(details) {
    assertV3Version(details.version, "declare");
    const det = details;
    const msgHash = hash2.calculateDeclareTransactionHash({
      classHash: det.classHash,
      compiledClassHash: det.compiledClassHash,
      senderAddress: det.senderAddress,
      version: det.version,
      chainId: det.chainId,
      nonce: det.nonce,
      accountDeploymentData: det.accountDeploymentData || [],
      nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      resourceBounds: det.resourceBounds,
      tip: det.tip ?? 0,
      paymasterData: det.paymasterData || []
    });
    return this.signer.signRaw(msgHash);
  }
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/signer/stark.js
import { ec } from "starknet";
var StarkSigner = class {
  constructor(privateKey) {
    this.privateKey = privateKey;
    this.publicKey = ec.starkCurve.getStarkKey(privateKey);
  }
  async getPubKey() {
    return this.publicKey;
  }
  async signRaw(hash4) {
    const signature = ec.starkCurve.sign(hash4, this.privateKey);
    return ["0x" + signature.r.toString(16), "0x" + signature.s.toString(16)];
  }
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/signer/privy.js
function parsePrivySignature(signature) {
  if (typeof signature !== "string" || signature.length === 0) {
    throw new Error("Privy signing failed: empty signature response");
  }
  const sigWithout0x = signature.startsWith("0x") ? signature.slice(2) : signature;
  if (!/^[0-9a-fA-F]+$/.test(sigWithout0x)) {
    throw new Error("Privy signing failed: signature is not valid hex");
  }
  if (sigWithout0x.length !== 128) {
    throw new Error("Privy signing failed: expected a 64-byte signature (r||s)");
  }
  const r = "0x" + sigWithout0x.slice(0, 64);
  const s = "0x" + sigWithout0x.slice(64);
  return [r, s];
}
var PrivySigner = class {
  constructor(config2) {
    if (!config2.serverUrl && !config2.rawSign) {
      throw new Error("PrivySigner requires either serverUrl or rawSign");
    }
    this.walletId = config2.walletId;
    this.publicKey = config2.publicKey;
    this.rawSignFn = config2.rawSign ?? this.defaultRawSignFn(config2.serverUrl, {
      headers: config2.headers,
      buildBody: config2.buildBody,
      requestTimeoutMs: config2.requestTimeoutMs
    });
  }
  async resolveHeaders(headers) {
    if (!headers) {
      return {};
    }
    return typeof headers === "function" ? await headers() : headers;
  }
  defaultRawSignFn(serverUrl2, options) {
    const normalizedUrl = assertSafeHttpUrl(serverUrl2, "PrivySigner serverUrl").toString();
    const timeoutMs = options.requestTimeoutMs ?? 1e4;
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
      throw new Error("PrivySigner requestTimeoutMs must be a positive finite number");
    }
    return async (walletId, hash4) => {
      const extraHeaders = await this.resolveHeaders(options.headers);
      const payload = await options.buildBody?.({ walletId, hash: hash4 }) ?? {
        walletId,
        hash: hash4
      };
      const controller = typeof AbortController !== "undefined" ? new AbortController() : void 0;
      const timeoutHandle = controller && setTimeout(() => {
        controller.abort();
      }, timeoutMs);
      let response;
      try {
        const requestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json", ...extraHeaders },
          body: JSON.stringify(payload)
        };
        if (controller) {
          requestInit.signal = controller.signal;
        }
        response = await fetch(normalizedUrl, requestInit);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          throw new Error(`Privy signing request timed out after ${timeoutMs}ms`);
        }
        throw error;
      } finally {
        if (timeoutHandle) {
          clearTimeout(timeoutHandle);
        }
      }
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Privy signing failed: invalid JSON response");
      }
      if (!response.ok) {
        const err = typeof data === "object" && data !== null ? data : {};
        throw new Error(typeof err.details === "string" && err.details || typeof err.error === "string" && err.error || "Privy signing failed");
      }
      const signature = typeof data === "object" && data !== null ? data.signature : void 0;
      if (typeof signature !== "string") {
        throw new Error("Privy signing failed: invalid server response");
      }
      return signature;
    };
  }
  async getPubKey() {
    return this.publicKey;
  }
  async signRaw(hash4) {
    const hashWithPrefix = hash4.startsWith("0x") ? hash4 : "0x" + hash4;
    const signature = await this.rawSignFn(this.walletId, hashWithPrefix);
    return parsePrivySignature(signature);
  }
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/wallet/index.js
var BRAAVOS_FACTORY_ADDRESS = "0x3d94f65ebc7552eb517ddb374250a9525b605f25f4e41ded6e7d7381ff1c2e8";
var NEGATIVE_DEPLOYMENT_CACHE_TTL_MS = 3e3;
var Wallet = class _Wallet extends BaseWallet {
  constructor(options) {
    super({
      address: options.address,
      stakingConfig: options.stakingConfig,
      bridgingConfig: options.bridgingConfig
    });
    this.deployedCache = null;
    this.deployedCacheExpiresAt = 0;
    this.sponsoredDeployLock = null;
    this.accountProvider = options.accountProvider;
    this.account = options.account;
    this.provider = options.provider;
    this.chainId = options.chainId;
    this.explorerConfig = options.explorerConfig;
    this.defaultFeeMode = options.defaultFeeMode;
    this.defaultTimeBounds = options.defaultTimeBounds;
  }
  /**
   * Create a new Wallet instance.
   *
   * @example
   * ```ts
   * // With signer (address computed from public key)
   * const wallet = await Wallet.create({
   *   account: { signer: new StarkSigner(privateKey), accountClass: ArgentPreset },
   *   provider,
   *   config,
   * });
   *
   * // With known address (skips address computation)
   * const wallet = await Wallet.create({
   *   account: { signer: new StarkSigner(privateKey) },
   *   address: "0x123...",
   *   provider,
   *   config,
   * });
   * ```
   */
  static async create(options) {
    const { account: accountInput, provider, config: config2, accountAddress: providedAddress, feeMode = "user_pays", timeBounds, swapProviders, defaultSwapProviderId, dcaProviders, defaultDcaProviderId } = options;
    const accountProvider = accountInput instanceof AccountProvider ? accountInput : new AccountProvider(accountInput.signer, accountInput.accountClass);
    const address = providedAddress ?? await accountProvider.getAddress();
    const signer = accountProvider.getSigner();
    const signerAdapter = new SignerAdapter(signer);
    const paymaster = config2.paymaster ? new PaymasterRpc(config2.paymaster) : void 0;
    const account = new Account({
      provider,
      address,
      signer: signerAdapter,
      ...paymaster && { paymaster }
    });
    if (!config2.chainId) {
      throw new Error("Wallet requires 'chainId' in the SDK config. Use 'network' or set 'chainId' explicitly.");
    }
    const wallet = new _Wallet({
      address,
      accountProvider,
      account,
      provider,
      chainId: config2.chainId,
      ...config2.explorer && { explorerConfig: config2.explorer },
      defaultFeeMode: feeMode,
      ...timeBounds && { defaultTimeBounds: timeBounds },
      stakingConfig: options.config.staking,
      bridgingConfig: options.config.bridging
    });
    if (swapProviders?.length) {
      for (const swapProvider of swapProviders) {
        wallet.registerSwapProvider(swapProvider);
      }
    }
    if (defaultSwapProviderId) {
      wallet.setDefaultSwapProvider(defaultSwapProviderId);
    }
    if (dcaProviders?.length) {
      for (const dcaProvider of dcaProviders) {
        wallet.dca().registerProvider(dcaProvider);
      }
    }
    if (defaultDcaProviderId) {
      wallet.dca().setDefaultProvider(defaultDcaProviderId);
    }
    return wallet;
  }
  async isDeployed() {
    const now = Date.now();
    if (this.deployedCache === true) {
      return true;
    }
    if (this.deployedCache === false && now < this.deployedCacheExpiresAt) {
      return false;
    }
    const deployed = await checkDeployed(this.provider, this.address);
    if (deployed) {
      this.deployedCache = true;
      this.deployedCacheExpiresAt = Number.POSITIVE_INFINITY;
    } else {
      this.deployedCache = false;
      this.deployedCacheExpiresAt = now + NEGATIVE_DEPLOYMENT_CACHE_TTL_MS;
    }
    return deployed;
  }
  clearDeploymentCache() {
    this.deployedCache = null;
    this.deployedCacheExpiresAt = 0;
  }
  async withSponsoredDeployLock(work) {
    while (this.sponsoredDeployLock) {
      await this.sponsoredDeployLock;
    }
    let releaseLock;
    this.sponsoredDeployLock = new Promise((resolve) => {
      releaseLock = resolve;
    });
    try {
      return await work();
    } finally {
      releaseLock?.();
      this.sponsoredDeployLock = null;
    }
  }
  async ensureReady(options = {}) {
    return ensureWalletReady(this, options);
  }
  async deploy(options = {}) {
    this.clearDeploymentCache();
    const feeMode = options.feeMode ?? this.defaultFeeMode;
    const timeBounds = options.timeBounds ?? this.defaultTimeBounds;
    if (feeMode === "sponsored") {
      const tx = await this.deployPaymasterWith([], timeBounds);
      return tx;
    }
    const classHash = this.accountProvider.getClassHash();
    const publicKey = await this.accountProvider.getPublicKey();
    const addressSalt = this.accountProvider.getSalt(publicKey);
    const constructorCalldata = this.accountProvider.getConstructorCalldata(publicKey);
    const multiply2x = (value) => {
      return {
        max_amount: value.max_amount * 2n,
        max_price_per_unit: value.max_price_per_unit * 2n
      };
    };
    const DEFAULT_DEPLOY_RESOURCE_BOUNDS = {
      l1_gas: { max_amount: 50000n, max_price_per_unit: 50000000000000n },
      l2_gas: {
        max_amount: 1100000n,
        max_price_per_unit: 50000000000000n
      },
      l1_data_gas: {
        max_amount: 50000n,
        max_price_per_unit: 50000000000000n
      }
    };
    let resourceBounds;
    try {
      const estimateFee = await this.account.estimateAccountDeployFee({
        classHash,
        constructorCalldata,
        addressSalt
      });
      const { l1_gas, l2_gas, l1_data_gas } = estimateFee.resourceBounds;
      resourceBounds = {
        l1_gas: multiply2x(l1_gas),
        l2_gas: multiply2x(l2_gas),
        l1_data_gas: multiply2x(l1_data_gas)
      };
    } catch {
      resourceBounds = DEFAULT_DEPLOY_RESOURCE_BOUNDS;
    }
    const { transaction_hash } = await this.account.deployAccount({ classHash, constructorCalldata, addressSalt }, { resourceBounds });
    return new Tx(transaction_hash, this.provider, this.chainId, this.explorerConfig);
  }
  async deployPaymasterWith(calls, timeBounds) {
    this.clearDeploymentCache();
    const classHash = this.accountProvider.getClassHash();
    if (classHash === BraavosPreset.classHash) {
      return this.deployBraavosViaFactory(calls, timeBounds);
    }
    const deploymentData = await this.accountProvider.getDeploymentData();
    const { transaction_hash } = await this.account.executePaymasterTransaction(calls, sponsoredDetails(timeBounds ?? this.defaultTimeBounds, deploymentData));
    return new Tx(transaction_hash, this.provider, this.chainId, this.explorerConfig);
  }
  /**
   * Deploy a Braavos account via the Braavos factory.
   *
   * This works by:
   * 1. Deploying a temporary OZ account (same public key) via paymaster
   * 2. Using that OZ account to call the Braavos factory
   * 3. The factory deploys the Braavos account
   */
  async deployBraavosViaFactory(calls, timeBounds) {
    const publicKey = await this.accountProvider.getPublicKey();
    const signer = this.accountProvider.getSigner();
    const ozProvider = new AccountProvider(signer, OpenZeppelinPreset);
    const ozAddress = await ozProvider.getAddress();
    const ozDeployed = await checkDeployed(this.provider, ozAddress);
    const chainIdFelt = this.chainId.toFelt252();
    const auxData = [
      BRAAVOS_IMPL_CLASS_HASH,
      // Implementation class hash
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      // 9 zeros for basic account
      chainIdFelt
      // Chain ID
    ];
    const auxHash = hash3.computePoseidonHashOnElements(auxData);
    const auxSignature = await signer.signRaw(auxHash);
    const sigArray = Array.isArray(auxSignature) ? auxSignature : [auxSignature.r, auxSignature.s];
    if (!sigArray[0] || !sigArray[1]) {
      throw new Error("Invalid signature format from signer");
    }
    const additionalParams = [
      ...auxData,
      String(sigArray[0]),
      String(sigArray[1])
    ];
    const factoryCall = {
      contractAddress: BRAAVOS_FACTORY_ADDRESS,
      entrypoint: "deploy_braavos_account",
      calldata: [
        publicKey,
        String(additionalParams.length),
        ...additionalParams
      ]
    };
    const signerAdapter = new SignerAdapter(signer);
    const paymaster = this.account.paymaster;
    const ozAccount = new Account({
      provider: this.provider,
      address: ozAddress,
      signer: signerAdapter,
      ...paymaster && { paymaster }
    });
    let transactionHash;
    if (ozDeployed) {
      const allCalls = [factoryCall, ...calls];
      const result = await ozAccount.executePaymasterTransaction(allCalls, sponsoredDetails(timeBounds ?? this.defaultTimeBounds));
      transactionHash = result.transaction_hash;
    } else {
      const ozDeploymentData = await ozProvider.getDeploymentData();
      const allCalls = [factoryCall, ...calls];
      const result = await ozAccount.executePaymasterTransaction(allCalls, sponsoredDetails(timeBounds ?? this.defaultTimeBounds, ozDeploymentData));
      transactionHash = result.transaction_hash;
    }
    return new Tx(transactionHash, this.provider, this.chainId, this.explorerConfig);
  }
  async execute(calls, options = {}) {
    const feeMode = options.feeMode ?? this.defaultFeeMode;
    const timeBounds = options.timeBounds ?? this.defaultTimeBounds;
    let transactionHash;
    if (feeMode === "sponsored") {
      const deployed = await this.isDeployed();
      if (deployed) {
        transactionHash = (await this.account.executePaymasterTransaction(calls, sponsoredDetails(timeBounds))).transaction_hash;
      } else {
        transactionHash = await this.withSponsoredDeployLock(async () => {
          const recheckedDeployed = await this.isDeployed();
          if (recheckedDeployed) {
            return (await this.account.executePaymasterTransaction(calls, sponsoredDetails(timeBounds))).transaction_hash;
          }
          try {
            return (await this.deployPaymasterWith(calls, timeBounds)).hash;
          } catch (error) {
            if (!isAlreadyDeployedError(error)) {
              throw error;
            }
            return (await this.account.executePaymasterTransaction(calls, sponsoredDetails(timeBounds))).transaction_hash;
          }
        });
      }
    } else {
      const deployed = await this.isDeployed();
      if (!deployed) {
        throw new Error('Account is not deployed. Call wallet.ensureReady({ deploy: "if_needed" }) before execute() in user_pays mode.');
      }
      transactionHash = (await this.account.execute(calls)).transaction_hash;
    }
    return new Tx(transactionHash, this.provider, this.chainId, this.explorerConfig);
  }
  async signMessage(typedData) {
    return this.account.signMessage(typedData);
  }
  async preflight(options) {
    const feeMode = options.feeMode ?? this.defaultFeeMode;
    return preflightTransaction(this, this.account, {
      ...options,
      feeMode
    });
  }
  getAccount() {
    return this.account;
  }
  getProvider() {
    return this.provider;
  }
  /**
   * Get the chain ID this wallet is connected to.
   */
  getChainId() {
    return this.chainId;
  }
  /**
   * Get the default fee mode for this wallet.
   */
  getFeeMode() {
    return this.defaultFeeMode;
  }
  /**
   * Get the account class hash.
   */
  getClassHash() {
    return this.accountProvider.getClassHash();
  }
  /**
   * Estimate the fee for executing calls.
   *
   * @example
   * ```ts
   * const fee = await wallet.estimateFee([
   *   { contractAddress: "0x...", entrypoint: "transfer", calldata: [...] }
   * ]);
   * console.log(`Estimated fee: ${fee.overall_fee}`);
   * ```
   */
  async estimateFee(calls) {
    return this.account.estimateInvokeFee(calls);
  }
  async disconnect() {
    this.clearCaches();
    this.clearDeploymentCache();
  }
};
function isAlreadyDeployedError(error) {
  const message = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return message.includes("already deployed") || message.includes("account already exists") || message.includes("contract already exists");
}

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/sdk.js
function isWebRuntime() {
  const hasDom = typeof window !== "undefined" && typeof document !== "undefined" && typeof document.createElement === "function";
  const isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
  return hasDom && !isReactNative;
}
var StarkZap = class {
  constructor(config2) {
    this.bridgeTokenRepository = null;
    this.chainValidationPromise = null;
    this.config = this.resolveConfig(config2);
    this.provider = new RpcProvider2({ nodeUrl: this.config.rpcUrl });
  }
  resolveConfig(config2) {
    let networkPreset;
    if (config2.network) {
      networkPreset = typeof config2.network === "string" ? networks[config2.network] : config2.network;
    }
    const rpcUrl = config2.rpcUrl ?? networkPreset?.rpcUrl;
    if (!rpcUrl) {
      throw new Error("StarkZap requires either 'network' or 'rpcUrl' to be specified");
    }
    const normalizedRpcUrl = assertSafeHttpUrl(rpcUrl, "rpcUrl").toString();
    const chainId = config2.chainId ?? networkPreset?.chainId;
    if (!chainId) {
      throw new Error("StarkZap requires either 'network' or 'chainId' to be specified");
    }
    let explorer = config2.explorer ?? (networkPreset?.explorerUrl ? { baseUrl: networkPreset.explorerUrl } : void 0);
    if (explorer?.baseUrl) {
      explorer = {
        ...explorer,
        baseUrl: assertSafeHttpUrl(explorer.baseUrl, "explorer.baseUrl").toString()
      };
    }
    const staking = config2.staking ?? getStakingPreset(chainId);
    return {
      ...config2,
      rpcUrl: normalizedRpcUrl,
      chainId,
      staking,
      ...explorer && { explorer }
    };
  }
  getStakingConfig() {
    if (!this.config.staking?.contract) {
      throw new Error(`No staking contract configured for chain ${this.config.chainId.toLiteral()}. Set \`staking.contract\` explicitly in SDK config.`);
    }
    return this.config.staking;
  }
  getResolvedConfig() {
    return this.config;
  }
  async ensureProviderChainMatchesConfig() {
    if (!this.chainValidationPromise) {
      this.chainValidationPromise = (async () => {
        const providerChainId = await getChainId(this.provider);
        if (providerChainId.toLiteral() !== this.config.chainId.toLiteral()) {
          throw new Error(`RPC chain mismatch: provider returned ${providerChainId.toLiteral()} but SDK is configured for ${this.config.chainId.toLiteral()}.`);
        }
      })().catch((error) => {
        this.chainValidationPromise = null;
        throw error;
      });
    }
    await this.chainValidationPromise;
  }
  /**
   * Connect a wallet using the specified signer and account configuration.
   *
   * @example
   * ```ts
   * import { StarkSigner, OpenZeppelinPreset, ArgentPreset } from "starkzap";
   *
   * // Default: OpenZeppelin account
   * const wallet = await sdk.connectWallet({
   *   account: { signer: new StarkSigner(privateKey) },
   * });
   *
   * // With Argent preset
   * const wallet = await sdk.connectWallet({
   *   account: {
   *     signer: new StarkSigner(privateKey),
   *     accountClass: ArgentPreset,
   *   },
   * });
   *
   * // With custom account class
   * const wallet = await sdk.connectWallet({
   *   account: {
   *     signer: new StarkSigner(privateKey),
   *     accountClass: {
   *       classHash: "0x...",
   *       buildConstructorCalldata: (pk) => [pk, "0x0"],
   *     },
   *   },
   * });
   *
   * // With sponsored transactions
   * const wallet = await sdk.connectWallet({
   *   account: { signer: new StarkSigner(privateKey) },
   *   feeMode: "sponsored",
   * });
   * ```
   */
  async connectWallet(options) {
    await this.ensureProviderChainMatchesConfig();
    const { account, accountAddress, feeMode, timeBounds, swapProviders, defaultSwapProviderId, dcaProviders, defaultDcaProviderId } = options;
    return Wallet.create({
      account,
      ...accountAddress && { accountAddress },
      provider: this.provider,
      config: this.config,
      ...feeMode && { feeMode },
      ...timeBounds && { timeBounds },
      ...swapProviders && { swapProviders },
      ...defaultSwapProviderId && { defaultSwapProviderId },
      ...dcaProviders && { dcaProviders },
      ...defaultDcaProviderId && { defaultDcaProviderId }
    });
  }
  resolveAccountPreset(preset, fallback) {
    if (!preset)
      return fallback;
    if (typeof preset === "string") {
      const resolved = accountPresets[preset];
      if (!resolved) {
        throw new Error(`Unknown account preset: ${preset}`);
      }
      return resolved;
    }
    return preset;
  }
  /**
   * High-level onboarding API for app integrations.
   *
   * Strategy behaviors:
   * - `signer`: connect with a provided signer/account config
   * - `privy`: resolve Privy auth context, then connect via PrivySigner
   * - `cartridge`: connect via Cartridge Controller
   *
   * By default, onboarding calls `wallet.ensureReady({ deploy: "if_needed" })`.
   */
  async onboard(options) {
    const deploy = options.deploy ?? "if_needed";
    const feeMode = options.feeMode;
    const timeBounds = options.timeBounds;
    const swapProviders = options.swapProviders;
    const defaultSwapProviderId = options.defaultSwapProviderId;
    const dcaProviders = options.dcaProviders;
    const defaultDcaProviderId = options.defaultDcaProviderId;
    const shouldEnsureReady = deploy !== "never";
    if (options.strategy === "signer") {
      const wallet = await this.connectWallet({
        account: {
          signer: options.account.signer,
          accountClass: this.resolveAccountPreset(options.accountPreset ?? options.account.accountClass, OpenZeppelinPreset)
        },
        ...feeMode && { feeMode },
        ...timeBounds && { timeBounds },
        ...swapProviders && { swapProviders },
        ...defaultSwapProviderId && { defaultSwapProviderId },
        ...dcaProviders && { dcaProviders },
        ...defaultDcaProviderId && { defaultDcaProviderId }
      });
      if (shouldEnsureReady) {
        await wallet.ensureReady({
          deploy,
          ...feeMode && { feeMode },
          ...options.onProgress && { onProgress: options.onProgress }
        });
      }
      return {
        wallet,
        strategy: options.strategy,
        deployed: await wallet.isDeployed()
      };
    }
    if (options.strategy === "privy") {
      const privy = await options.privy.resolve();
      const signer = new PrivySigner({
        walletId: privy.walletId,
        publicKey: privy.publicKey,
        ...privy.serverUrl && { serverUrl: privy.serverUrl },
        ...privy.rawSign && { rawSign: privy.rawSign },
        ...privy.headers && { headers: privy.headers },
        ...privy.buildBody && { buildBody: privy.buildBody },
        ...privy.requestTimeoutMs && {
          requestTimeoutMs: privy.requestTimeoutMs
        }
      });
      const wallet = await this.connectWallet({
        account: {
          signer,
          accountClass: this.resolveAccountPreset(options.accountPreset, ArgentXV050Preset)
        },
        ...feeMode && { feeMode },
        ...timeBounds && { timeBounds },
        ...swapProviders && { swapProviders },
        ...defaultSwapProviderId && { defaultSwapProviderId },
        ...dcaProviders && { dcaProviders },
        ...defaultDcaProviderId && { defaultDcaProviderId }
      });
      if (shouldEnsureReady) {
        await wallet.ensureReady({
          deploy,
          ...feeMode && { feeMode },
          ...options.onProgress && { onProgress: options.onProgress }
        });
      }
      return {
        wallet,
        strategy: options.strategy,
        deployed: await wallet.isDeployed(),
        ...privy.metadata && { metadata: privy.metadata }
      };
    }
    if (options.strategy === "cartridge") {
      const wallet = await this.connectCartridge({
        ...options.cartridge ?? {},
        ...feeMode && { feeMode },
        ...timeBounds && { timeBounds }
      });
      if (swapProviders?.length) {
        for (const swapProvider of swapProviders) {
          wallet.registerSwapProvider(swapProvider);
        }
      }
      if (defaultSwapProviderId) {
        wallet.setDefaultSwapProvider(defaultSwapProviderId);
      }
      if (dcaProviders?.length) {
        for (const dcaProvider of dcaProviders) {
          wallet.dca().registerProvider(dcaProvider);
        }
      }
      if (defaultDcaProviderId) {
        wallet.dca().setDefaultProvider(defaultDcaProviderId);
      }
      if (shouldEnsureReady) {
        await wallet.ensureReady({
          deploy,
          ...feeMode && { feeMode },
          ...options.onProgress && { onProgress: options.onProgress }
        });
      }
      return {
        wallet,
        strategy: options.strategy,
        deployed: await wallet.isDeployed()
      };
    }
    const _never = options;
    throw new Error(`Unknown onboard strategy: ${String(_never)}`);
  }
  /**
   * Connect using Cartridge Controller.
   *
   * Opens the Cartridge authentication popup for social login or passkeys.
   * Returns a CartridgeWallet that implements WalletInterface.
   *
   * @example
   * ```ts
   * const wallet = await sdk.connectCartridge({
   *   policies: [
   *     { target: "0xCONTRACT", method: "transfer" }
   *   ]
   * });
   *
   * // Use just like any other wallet
   * await wallet.execute([...]);
   *
   * // Access Cartridge-specific features
   * const controller = wallet.getController();
   * controller.openProfile();
   * ```
   */
  async connectCartridge(options = {}) {
    await this.ensureProviderChainMatchesConfig();
    const explorer = options.explorer ?? this.config.explorer;
    if (!isWebRuntime()) {
      throw new Error("Cartridge is only supported in web environments. Use signer/privy strategies on native or server runtimes.");
    }
    const { CartridgeWallet } = await import("./cartridge-M7ECY7WN.mjs");
    const wallet = await CartridgeWallet.create({
      ...options.policies && { policies: options.policies },
      ...options.preset && { preset: options.preset },
      ...options.url && { url: options.url },
      ...options.feeMode && { feeMode: options.feeMode },
      ...options.timeBounds && { timeBounds: options.timeBounds },
      rpcUrl: this.config.rpcUrl,
      chainId: this.config.chainId,
      ...explorer && { explorer }
    }, this.config.staking, this.config.bridging);
    return wallet;
  }
  /**
   * Get all tokens that are currently enabled for staking.
   *
   * Returns the list of tokens that can be staked in the protocol.
   * Typically includes STRK and may include other tokens.
   *
   * @returns Array of tokens that can be staked
   * @throws Error if staking is not configured in the SDK config
   *
   * @example
   * ```ts
   * const tokens = await sdk.stakingTokens();
   * console.log(`Stakeable tokens: ${tokens.map(t => t.symbol).join(', ')}`);
   * // Output: "Stakeable tokens: STRK, BTC"
   * ```
   */
  async stakingTokens() {
    return Staking.activeTokens(this.provider, this.getStakingConfig());
  }
  /**
   * Get all delegation pools managed by a specific validator.
   *
   * Validators can have multiple pools, one for each supported token.
   * Use this to discover what pools a validator offers and their current
   * delegation amounts.
   *
   * @param staker - The validator's staker address
   * @returns Array of pools with their contract addresses, tokens, and amounts
   * @throws Error if staking is not configured in the SDK config
   *
   * @example
   * ```ts
   * const pools = await sdk.getStakerPools(validatorAddress);
   * for (const pool of pools) {
   *   console.log(`${pool.token.symbol}: ${pool.amount.toFormatted()} delegated`);
   * }
   * ```
   */
  async getStakerPools(staker) {
    return await Staking.getStakerPools(this.provider, staker, this.getStakingConfig());
  }
  /**
   * Get bridgeable tokens for the SDK's configured Starknet network.
   *
   * @remarks
   * The bridge token API environment is inferred from the configured chain:
   * - `SN_MAIN` -> `mainnet`
   * - `SN_SEPOLIA` -> `testnet`
   *
   * @param chain - Optional external chain filter.
   * If omitted, tokens from all supported external chains are returned.
   *
   * @returns Array of bridgeable tokens for the selected environment and chain filter.
   *
   * @example
   * ```ts
   * // All bridgeable tokens for the configured Starknet chain
   * const allTokens = await sdk.getBridgingTokens();
   *
   * // Only Ethereum bridgeable tokens
   * const ethereumTokens = await sdk.getBridgingTokens(ExternalChain.ETHEREUM);
   * ```
   */
  async getBridgingTokens(chain) {
    if (!this.bridgeTokenRepository) {
      this.bridgeTokenRepository = new BridgeTokenRepository();
    }
    const env = this.config.chainId.isMainnet() ? "mainnet" : "testnet";
    return this.bridgeTokenRepository.getTokens({
      env,
      ...chain ? { chain } : {}
    });
  }
  /**
   * Get the underlying RPC provider.
   */
  getProvider() {
    return this.provider;
  }
  /**
   * Call a read-only contract entrypoint using the SDK provider.
   *
   * This executes an RPC `call` without sending a transaction.
   * Useful before wallet connection or for app-level reads.
   */
  callContract(call) {
    return this.provider.callContract(call);
  }
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/confidential/tongo.js
var import_tongo_sdk = __toESM(require_dist(), 1);

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/index.js
import { Contract, TransactionFinalityStatus, TransactionExecutionStatus } from "starknet";

// src/hooks/useAuth.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { ec as ec2 } from "starknet";
var { network, serverUrl } = getPayLinkConfig();
var sdk = new StarkZap({
  network
});
var SERVER_URL = serverUrl;
var sharedWallet = null;
var sharedAddress = null;
var isOnboarding = false;
function useAuth() {
  const {
    login: privyLogin,
    logout: privyLogout,
    authenticated,
    ready,
    user,
    getAccessToken
  } = usePrivy();
  const [wallet, setWallet] = useState(sharedWallet);
  const [starknetAddress, setStarknetAddress] = useState(sharedAddress);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { clearTransactions } = usePaymentStore.getState();
  const getAccessTokenRef = useRef(getAccessToken);
  useEffect(() => {
    getAccessTokenRef.current = getAccessToken;
  });
  const onboardWithSigner = useCallback(async () => {
    const token = await getAccessTokenRef.current();
    if (!token) {
      console.warn("[onboard] No token yet, skipping...");
      throw new Error("AUTH_NOT_READY");
    }
    console.log("[onboard] Fetching private key from server...");
    const response = await fetch(`${SERVER_URL}/api/wallet/get-or-create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error ?? "Failed to get wallet key");
    }
    const { privateKey } = await response.json();
    const hexKey = privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
    const validStarkKey = ec2.starkCurve.grindKey(hexKey);
    const { wallet: connectedWallet } = await sdk.onboard({
      strategy: OnboardStrategy.Signer,
      account: { signer: new StarkSigner(validStarkKey) },
      deploy: "never"
    });
    console.log("[onboard] Wallet address (SOURCE OF TRUTH):", connectedWallet.address);
    await fetch(`${SERVER_URL}/api/wallet/get-or-create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        address: connectedWallet.address
      })
    });
    const { setWalletAddress } = usePaymentStore.getState();
    setWalletAddress(connectedWallet.address);
    return connectedWallet;
  }, []);
  useEffect(() => {
    if (!ready || !authenticated || sharedWallet || isOnboarding) return;
    if (!getAccessTokenRef.current) return;
    isOnboarding = true;
    const run = async () => {
      try {
        const connectedWallet = await onboardWithSigner();
        sharedWallet = connectedWallet;
        sharedAddress = connectedWallet.address;
        setWallet(connectedWallet);
        setStarknetAddress(connectedWallet.address);
        const { setWalletAddress } = usePaymentStore.getState();
        setWalletAddress(connectedWallet.address);
      } catch (err) {
        if (err.message === "AUTH_NOT_READY") {
          console.log("[auto-onboard] Waiting for token...");
          isOnboarding = false;
          setTimeout(run, 500);
          return;
        }
        console.error("[auto-onboard] Failed:", err);
        isOnboarding = false;
      }
    };
    run();
  }, [ready, authenticated, onboardWithSigner]);
  const login = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!authenticated) {
        await privyLogin();
        setIsLoading(false);
        return null;
      }
      if (sharedWallet) {
        const { setWalletAddress: setWalletAddress2 } = usePaymentStore.getState();
        setWalletAddress2(sharedWallet.address);
        setIsLoading(false);
        return {
          address: sharedWallet.address,
          walletInstance: sharedWallet
        };
      }
      isOnboarding = false;
      const connectedWallet = await onboardWithSigner();
      sharedWallet = connectedWallet;
      sharedAddress = connectedWallet.address;
      setWallet(connectedWallet);
      setStarknetAddress(connectedWallet.address);
      const { setWalletAddress } = usePaymentStore.getState();
      setWalletAddress(connectedWallet.address);
      return {
        address: connectedWallet.address,
        walletInstance: connectedWallet
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      console.error("[login] Error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    await privyLogout();
    sharedWallet = null;
    sharedAddress = null;
    isOnboarding = false;
    setWallet(null);
    setStarknetAddress(null);
    setError(null);
    const { setWalletAddress } = usePaymentStore.getState();
    setWalletAddress(null);
    clearTransactions();
  };
  return {
    login,
    logout,
    wallet,
    authenticated,
    ready,
    isLoading,
    error,
    user,
    starknetAddress: starknetAddress || user?.wallet?.address || null,
    getAccessToken
  };
}

// src/lib/transactions.ts
function getServerUrl() {
  const { serverUrl: serverUrl2 } = getPayLinkConfig();
  return serverUrl2;
}
async function saveTransactionToServer(token, transaction2) {
  try {
    const res = await fetch(`${getServerUrl()}/api/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, transaction: transaction2 })
    });
    if (!res.ok) console.warn("[tx] Save failed:", await res.text());
  } catch (err) {
    console.warn("[tx] Could not save to server:", err);
  }
}
async function fetchTransactionsFromServer(recipientAddress) {
  try {
    const res = await fetch(`${getServerUrl()}/api/transactions/${recipientAddress}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.transactions ?? [];
  } catch {
    return [];
  }
}
async function updateTransactionOnServer(hash4, status) {
  try {
    await fetch(`${getServerUrl()}/api/transactions/${hash4}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
  } catch (err) {
    console.warn("[tx] Status update failed:", err);
  }
}

// src/hooks/usePaymentFlow.ts
import { useEffect as useEffect2, useRef as useRef2, useState as useState2, useCallback as useCallback2 } from "react";

// src/lib/registry.ts
import { RpcProvider as RpcProvider3, shortString } from "starknet";
var REGISTRY_ADDRESS = "0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822";
function getEndpoints() {
  const { alchemyApiKey, network: network2 } = getPayLinkConfig();
  const endpoints = [];
  if (alchemyApiKey) {
    const base = network2 === "mainnet" ? "https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/" : "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/";
    endpoints.push(`${base}${alchemyApiKey}`);
  }
  if (network2 === "mainnet") {
    endpoints.push("https://free-rpc.nethermind.io/mainnet-juno");
  } else {
    endpoints.push("https://free-rpc.nethermind.io/sepolia-juno");
    endpoints.push("https://rpc.starknet-testnet.lava.build");
  }
  return endpoints;
}
async function resolveUsername(username) {
  if (!username || username.length < 3) return null;
  const endpoints = getEndpoints();
  const nameFelt = shortString.encodeShortString(username);
  console.log("[registry] Resolving:", username, "| endpoints:", endpoints.length);
  let lastError = null;
  for (const url of endpoints) {
    try {
      console.log("[registry] Trying:", url);
      const provider = new RpcProvider3({ nodeUrl: url });
      const result = await provider.callContract({
        contractAddress: REGISTRY_ADDRESS,
        entrypoint: "resolve_name",
        calldata: [nameFelt]
      });
      console.log("[registry] Raw result from", url, ":", result);
      let rawAddress;
      if (typeof result === "bigint") {
        rawAddress = "0x" + result.toString(16);
      } else if (typeof result === "string") {
        rawAddress = result;
      } else if (Array.isArray(result)) {
        const first = result[0];
        rawAddress = typeof first === "bigint" ? "0x" + first.toString(16) : String(first);
      } else if (result && typeof result === "object" && "result" in result) {
        const arr = result.result;
        rawAddress = arr[0] ?? "0x0";
      } else {
        rawAddress = String(result);
      }
      console.log("[registry] Parsed address:", rawAddress);
      if (!rawAddress || rawAddress === "0x0" || rawAddress === "0x") {
        return null;
      }
      try {
        if (BigInt(rawAddress) === 0n) return null;
      } catch {
      }
      const normalized = normalizeAddress(rawAddress);
      return normalized;
    } catch (err) {
      lastError = err;
    }
  }
  console.error("[registry] All endpoints failed. Last error:", lastError);
  throw new Error("Could not connect to Starknet. Please try again.");
}
var { debug } = getPayLinkConfig();
if (debug && typeof window !== "undefined") {
  window.testResolve = (username) => resolveUsername(username).then((res) => console.log(`[testResolve] ${username} ->`, res)).catch((err) => console.error(`[testResolve] ${username} failed:`, err));
}

// src/hooks/usePaymentFlow.ts
var STRK = sepoliaTokens.STRK;
var USDC = sepoliaTokens.USDC;
function openMoonPay(walletAddress) {
  const { moonpayApiKey } = getPayLinkConfig();
  if (!moonpayApiKey) {
    console.warn("[moonpay] API key not configured");
    return;
  }
  const params = new URLSearchParams({
    apiKey: moonpayApiKey,
    currencyCode: "usdc_starknet",
    walletAddress,
    colorCode: "#0D9488"
  });
  window.open(
    `https://buy-sandbox.moonpay.com?${params.toString()}`,
    "_blank",
    "noopener,noreferrer"
  );
}
function usePaymentFlow(recipientUsername) {
  const {
    amount,
    setAmount,
    step,
    setStep,
    setIsLoading,
    balance,
    setBalance,
    walletAddress,
    setWalletAddress,
    transactions,
    addTransaction,
    updateTransactionStatus,
    preferredAsset
  } = usePaymentStore();
  const [recipientAddress, setRecipientAddress] = useState2(null);
  const [error, setError] = useState2(null);
  const { authenticated, wallet, login, getAccessToken } = useAuth();
  const getAccessTokenRef = useRef2(getAccessToken);
  useEffect2(() => {
    getAccessTokenRef.current = getAccessToken;
  });
  const performResolution = useCallback2(async () => {
    if (!recipientUsername) return;
    setIsLoading(true);
    setError(null);
    try {
      const addr = await resolveUsername(recipientUsername);
      if (addr) {
        setRecipientAddress(normalizeAddress(addr));
      } else {
        setStep("error");
        setError(`This PayLink (@${recipientUsername}) has not been set up yet.`);
      }
    } catch (err) {
      console.error(`[paymentFlow] Resolution failed for ${recipientUsername}:`, err);
      setStep("error");
      setError(err.message || "Could not connect to Starknet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [recipientUsername, setStep, setIsLoading]);
  useEffect2(() => {
    performResolution();
  }, [performResolution]);
  const getActiveWallet = async () => {
    if (authenticated && wallet) return wallet;
    const result = await login();
    if (!result?.walletInstance) throw new Error("Login cancelled");
    return result.walletInstance;
  };
  const executeTransfer = async (activeWallet, onTransferComplete) => {
    if (!recipientAddress) {
      setStep("error");
      throw new Error("Recipient address resolution failed.");
    }
    const currentAddress = normalizeAddress(activeWallet.address);
    const normalizedRecipient = normalizeAddress(recipientAddress);
    if (currentAddress === normalizedRecipient) {
      setStep("error");
      setError("Cannot send payment to yourself");
      throw new Error("Invalid payment: recipient equals sender");
    }
    await activeWallet.ensureReady({ deploy: "if_needed" });
    const tx = await activeWallet.transfer(
      USDC,
      [{ to: normalizedRecipient, amount: Amount.parse(amount, USDC) }],
      { feeMode: "user_pays" }
    );
    const txHash = tx.transaction_hash ?? tx.hash;
    addTransaction({
      hash: txHash,
      amount,
      symbol: preferredAsset || "USDC",
      timestamp: Date.now(),
      status: "pending",
      senderAddress: currentAddress,
      recipientAddress: normalizedRecipient,
      direction: "sent"
    });
    const token = await getAccessTokenRef?.current?.() ?? "";
    try {
      await saveTransactionToServer(token, {
        hash: txHash,
        amount,
        symbol: preferredAsset || "USDC",
        timestamp: Date.now(),
        status: "pending",
        recipientAddress: normalizedRecipient,
        senderAddress: currentAddress
      });
    } catch (e) {
      console.warn("[paymentFlow] Server sync failed, will retry on success", e);
    }
    try {
      await tx.wait();
      const updatedBalance = await activeWallet.balanceOf(USDC);
      setBalance(Number(updatedBalance.toUnit()));
      updateTransactionStatus(txHash, "success");
      await updateTransactionOnServer(txHash, "success");
      await new Promise((r) => setTimeout(r, 1500));
      if (onTransferComplete) {
        onTransferComplete();
      }
      setStep("success");
    } catch (error2) {
      console.error("[paymentFlow] Transaction execution failed:", error2);
      updateTransactionStatus(txHash, "failed");
      updateTransactionOnServer(txHash, "failed");
      throw error2;
    }
  };
  const startPayment = async (onTransferComplete) => {
    setIsLoading(true);
    try {
      const activeWallet = await getActiveWallet();
      setWalletAddress(normalizeAddress(activeWallet.address));
      setStep("processing");
      const gasBalance = await activeWallet.balanceOf(STRK);
      const gasAmount = Number(gasBalance.toUnit());
      if (!Number.isFinite(gasAmount) || gasAmount === 0) {
        setStep("waiting_for_gas");
        return;
      }
      const balanceData = await activeWallet.balanceOf(USDC);
      const balanceAmount = Number(balanceData.toUnit());
      setBalance(balanceAmount);
      if (balanceAmount < Number(amount)) {
        setStep(balanceAmount === 0 ? "funding" : "insufficient_funds");
        return;
      }
      await executeTransfer(activeWallet, onTransferComplete);
    } catch (error2) {
      console.error("Payment Flow Error:", error2);
      if (error2?.message !== "Login cancelled") {
        setStep("amount");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const confirmAfterFunding = async (onTransferComplete) => {
    setIsLoading(true);
    try {
      const activeWallet = await getActiveWallet();
      setWalletAddress(normalizeAddress(activeWallet.address));
      setStep("processing");
      const balanceData = await activeWallet.balanceOf(USDC);
      const balanceAmount = Number(balanceData.toUnit());
      setBalance(balanceAmount);
      if (!Number.isFinite(balanceAmount) || balanceAmount < Number(amount)) {
        setStep("funding");
        return;
      }
      await executeTransfer(activeWallet, onTransferComplete);
    } catch (error2) {
      console.error("confirmAfterFunding error:", error2);
      setStep("funding");
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenMoonPay = () => {
    if (walletAddress) openMoonPay(walletAddress);
  };
  return {
    transactions,
    amount,
    setAmount,
    step,
    setStep,
    isLoading: usePaymentStore((s) => s.isLoading),
    startPayment,
    confirmAfterFunding,
    handleOpenMoonPay,
    isLoggedIn: authenticated,
    balance,
    walletAddress,
    resolutionError: error,
    retryResolution: performResolution
  };
}

// src/hooks/useUnifiedTransactions.ts
import { useState as useState3, useEffect as useEffect3, useCallback as useCallback3, useMemo } from "react";
function useUnifiedTransactions(walletAddress) {
  const { transactions: localTransactions } = usePaymentStore();
  const [serverTransactions, setServerTransactions] = useState3([]);
  const [isLoading, setIsLoading] = useState3(false);
  const normalizedWallet = useMemo(
    () => walletAddress ? normalizeAddress(walletAddress) : null,
    [walletAddress]
  );
  const refetch = useCallback3(async () => {
    if (!normalizedWallet || normalizedWallet === "0x0") return;
    setIsLoading(true);
    try {
      console.log("[FETCH] Wallet:", normalizedWallet);
      const txs = await fetchTransactionsFromServer(normalizedWallet);
      console.log("[FETCH] Server returned", txs.length, "transactions");
      const normalizedTxs = txs.map((tx) => ({
        ...tx,
        senderAddress: tx.senderAddress ? normalizeAddress(tx.senderAddress) : "0x0",
        recipientAddress: tx.recipientAddress ? normalizeAddress(tx.recipientAddress) : "0x0"
      }));
      setServerTransactions(normalizedTxs);
    } catch (err) {
      console.error("[useUnifiedTransactions]", err);
    } finally {
      setIsLoading(false);
    }
  }, [normalizedWallet]);
  const isReady = !!normalizedWallet && normalizedWallet !== "0x0";
  useEffect3(() => {
    if (!isReady) return;
    const timeout = setTimeout(() => {
      refetch();
    }, 200);
    return () => clearTimeout(timeout);
  }, [isReady, refetch]);
  const unifiedTransactions = useMemo(() => {
    if (!normalizedWallet) return [];
    const map = /* @__PURE__ */ new Map();
    serverTransactions.forEach((tx) => {
      if (tx.hash) {
        map.set(tx.hash, tx);
      }
    });
    localTransactions.forEach((tx) => {
      if (!tx.hash) return;
      const sender = normalizeAddress(tx.senderAddress || "");
      const recipient = normalizeAddress(tx.recipientAddress || "");
      const isRelevant = sender === normalizedWallet || recipient === normalizedWallet;
      if (isRelevant) {
        map.set(tx.hash, tx);
      }
    });
    return Array.from(map.values()).map((tx) => {
      const sender = normalizeAddress(tx.senderAddress || "");
      const recipient = normalizeAddress(tx.recipientAddress || "");
      if (!tx.senderAddress || !tx.recipientAddress) return tx;
      let direction = "unknown";
      if (sender === normalizedWallet) {
        direction = "sent";
      } else if (recipient === normalizedWallet) {
        direction = "received";
      }
      return {
        ...tx,
        direction
      };
    }).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }, [serverTransactions, localTransactions, normalizedWallet]);
  return {
    transactions: unifiedTransactions,
    refetch,
    isLoading
  };
}

// src/lib/withdraw.ts
var USDC2 = sepoliaTokens.USDC;
async function withdrawToAddress(wallet, recipientAddress, amount) {
  if (!wallet) throw new Error("Wallet not connected");
  if (!recipientAddress) throw new Error("Recipient address required");
  if (!amount || parseFloat(amount) <= 0) throw new Error("Invalid amount");
  const normalized = normalizeAddress(recipientAddress);
  if (!normalized || normalized === "0x0") {
    throw new Error("Invalid Starknet address");
  }
  await wallet.ensureReady({ deploy: "if_needed" });
  const tx = await wallet.transfer(
    USDC2,
    [{ to: normalized, amount: Amount.parse(amount, USDC2) }],
    { feeMode: "user_pays" }
  );
  const txHash = tx.transaction_hash ?? tx.hash;
  await tx.wait();
  return txHash;
}
export {
  PayLinkProvider,
  normalizeAddress,
  resolveUsername,
  saveTransactionToServer,
  updateTransactionOnServer,
  useAuth,
  usePaymentFlow,
  usePaymentStore,
  useUIStore,
  useUnifiedTransactions,
  withdrawToAddress
};
/*! Bundled license information:

@noble/hashes/utils.js:
@noble/hashes/utils.js:
@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/abstract/utils.js:
@noble/curves/abstract/modular.js:
@noble/curves/abstract/poseidon.js:
@noble/curves/abstract/curve.js:
@noble/curves/abstract/weierstrass.js:
@noble/curves/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@scure/starknet/lib/index.js:
  (*! scure-starknet - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@scure/base/lib/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ciphers/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/
