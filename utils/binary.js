Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.typedArrayToUint8Array = void 0;

const typedArrayToUint8Array = (typedArray) => new Uint8Array(typedArray.buffer.slice(typedArray.byteOffset, typedArray.byteOffset + typedArray.byteLength));

exports.typedArrayToUint8Array = typedArrayToUint8Array;
