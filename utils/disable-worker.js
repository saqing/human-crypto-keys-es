Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.default = void 0;
let refCount = 0;
let globalWorker;

const restore = () => {
    refCount -= 1;

    if (refCount <= 0 && globalWorker) {
    /* eslint-disable no-global-assign */
        Worker = globalWorker;
    /* eslint-enabled no-global-assign */
    }
};

const disableWorker = () => {
    refCount += 1;

    if (typeof Worker === 'undefined') {
        return restore;
    }

    globalWorker = Worker;
    /* eslint-disable no-global-assign */

    Worker = undefined;
    /* eslint-enabled no-global-assign */

    return restore;
};

const _default = disableWorker;

exports.default = _default;
module.exports = exports.default;
