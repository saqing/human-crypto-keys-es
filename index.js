Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.getKeyPairFromSeed = exports.getKeyPairFromMnemonic = exports.generateKeyPair = void 0;

const bip39 = _interopRequireWildcard(require('bip39'));

const _algorithm = _interopRequireDefault(require('./algorithm'));

const _cryptoKeyComposer = require('crypto-key-composer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== 'function') { return null; } const cacheBabelInterop = new WeakMap(); const cacheNodeInterop = new WeakMap();

    return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== 'object' && typeof obj !== 'function') { return { default: obj }; } const cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) { return cache.get(obj); } const newObj = {}; const hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (const key in obj) {
        if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
            const desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

            if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; }
        }
    } newObj.default = obj; if (cache) { cache.set(obj, newObj); }

    return newObj;
}

const composeKeys = ({
    privateKey,
    publicKey,
}, keyAlgorithm, options) => {
    options = {
        privateKeyFormat: 'pkcs8-pem',
        publicKeyFormat: 'spki-pem',
        ...options,
    };
    const {
        privateKeyFormat,
        publicKeyFormat,
        encryptionAlgorithm,
        password,
    } = options;

    return {
        privateKey: (0, _cryptoKeyComposer.composePrivateKey)({
            format: privateKeyFormat,
            keyAlgorithm,
            keyData: privateKey,
            encryptionAlgorithm,
        }, {
            password,
        }),
        publicKey: (0, _cryptoKeyComposer.composePublicKey)({
            format: publicKeyFormat,
            keyAlgorithm,
            keyData: publicKey,
        }),
    };
};

const generateKeys = async (seed, algorithm, options) => {
    const {
        id,
        params,
        generate,
    } = (0, _algorithm.default)(algorithm);
    const keyPair = await generate(params, seed);
    const keyAlgorithm = {
        id,
        ...params,
    };
    const composedKeyPair = composeKeys(keyPair, keyAlgorithm, options);

    return {
        keyAlgorithm,
        composedKeyPair,
    };
};

const generateKeyPair = async (algorithm, options) => {
    const mnemonic = bip39.generateMnemonic();
    const seedBuffer = await bip39.mnemonicToSeed(mnemonic);
    const seed = new Uint8Array(seedBuffer.buffer);
    const {
        keyAlgorithm,
        composedKeyPair,
    } = await generateKeys(seed, algorithm, options);

    return {
        algorithm: keyAlgorithm,
        mnemonic,
        seed,
        ...composedKeyPair,
    };
};

exports.generateKeyPair = generateKeyPair;

const getKeyPairFromMnemonic = async (mnemonic, algorithm, options) => {
    const seedBuffer = await bip39.mnemonicToSeed(mnemonic);
    const seed = new Uint8Array(seedBuffer.buffer);

    return getKeyPairFromSeed(seed, algorithm, options);
};

exports.getKeyPairFromMnemonic = getKeyPairFromMnemonic;

const getKeyPairFromSeed = async (seed, algorithm, options) => {
    const {
        composedKeyPair,
    } = await generateKeys(seed, algorithm, options);

    return composedKeyPair;
};

exports.getKeyPairFromSeed = getKeyPairFromSeed;
