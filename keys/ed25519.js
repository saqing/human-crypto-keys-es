Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.generateKeyPair = exports.defaultParams = void 0;

const _ed = _interopRequireDefault(require('node-forge/lib/ed25519'));

const _binary = require('../utils/binary');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultParams = {};

exports.defaultParams = defaultParams;

const generateKeyPair = (params, seed) => {
    seed = seed.slice(0, 32);

    const {
        publicKey,
    } = _ed.default.generateKeyPair({
        seed,
    });

    return {
        privateKey: {
            seed,
        },
        publicKey: {
            bytes: (0, _binary.typedArrayToUint8Array)(publicKey),
        },
    };
};

exports.generateKeyPair = generateKeyPair;
