Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.generateKeyPair = exports.defaultParams = void 0;

const _rsa = _interopRequireDefault(require('node-forge/lib/rsa'));

const _pify = _interopRequireDefault(require('pify'));

const _forgePrng = _interopRequireDefault(require('../utils/forge-prng'));

const _disableWorker = _interopRequireDefault(require('../utils/disable-worker'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const forgeGenerateKeyPair = (0, _pify.default)(_rsa.default.generateKeyPair);
const defaultParams = {
    modulusLength: 2048,
    publicExponent: 65537,
    method: 'PRIMEINC',
};

exports.defaultParams = defaultParams;

const parseForgePrivateKey = (privateKey) => {
    const {
        n,
        e,
        d,
        p,
        q,
        dP,
        dQ,
        qInv,
    } = privateKey;

    return {
        modulus: new Uint8Array(n.toByteArray()),
        publicExponent: e.intValue(),
        privateExponent: new Uint8Array(d.toByteArray()),
        prime1: new Uint8Array(p.toByteArray()),
        prime2: new Uint8Array(q.toByteArray()),
        exponent1: new Uint8Array(dP.toByteArray()),
        exponent2: new Uint8Array(dQ.toByteArray()),
        coefficient: new Uint8Array(qInv.toByteArray()),
    };
};

const parseForgePublicKey = (publicKey) => {
    const {
        n,
        e,
    } = publicKey;

    return {
        modulus: new Uint8Array(n.toByteArray()),
        publicExponent: e.intValue(),
    };
};

const generateKeyPair = async (params, seed) => {
    const {
        modulusLength,
        publicExponent,
        method,
    } = params;
    const restoreWorker = (0, _disableWorker.default)();
    const {
        privateKey,
        publicKey,
    } = await forgeGenerateKeyPair(modulusLength, publicExponent, {
        prng: (0, _forgePrng.default)(seed),
        algorithm: method,
    });

    restoreWorker();

    return {
        privateKey: parseForgePrivateKey(privateKey),
        publicKey: parseForgePublicKey(publicKey),
    };
};

exports.generateKeyPair = generateKeyPair;
