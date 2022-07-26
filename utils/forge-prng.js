Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.default = void 0;

const _util = _interopRequireDefault(require('node-forge/lib/util'));

const _hmacDrbg = _interopRequireDefault(require('hmac-drbg'));

const _hash = _interopRequireDefault(require('hash.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createForgePrng = (seed) => {
    const hmacDrgb = new _hmacDrbg.default({
        hash: _hash.default.sha256,
        entropy: _util.default.binary.hex.encode(seed),
        nonce: null,
        pers: null,
    });

    return {
        getBytesSync: (size) => {
            const bytesArray = hmacDrgb.generate(size);
            const bytes = new Uint8Array(bytesArray);

            return _util.default.binary.raw.encode(bytes);
        },
    };
};

const _default = createForgePrng;

exports.default = _default;
module.exports = exports.default;
