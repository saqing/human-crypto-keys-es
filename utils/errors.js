Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.UnknownAlgorithmParamError = exports.UnknownAlgorithmError = exports.TypeMismatchAlgorithmParamError = exports.NilAlgorithmParamError = void 0;

class BaseError extends Error {
    constructor(message, code, props) {
        super(message);
        Object.assign(this, { ...props,
            code,
            name: this.constructor.name,
        });

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);

            return;
        }

        this.stack = new Error(message).stack;
    }
}

class UnknownAlgorithmError extends BaseError {
    constructor(algorithm) {
        super(`Unknown algorithm \`${algorithm}\``, 'UNKNOWN_ALGORITHM');
    }
}

exports.UnknownAlgorithmError = UnknownAlgorithmError;

class UnknownAlgorithmParamError extends BaseError {
    constructor(param) {
        super(`Unknown algorithm param \`${param}\``, 'UNKNOWN_ALGORITHM_PARAM');
    }
}

exports.UnknownAlgorithmParamError = UnknownAlgorithmParamError;

class NilAlgorithmParamError extends BaseError {
    constructor(param) {
        super(`Algorithm param \`${param}\` can't be null or undefined`, 'NIL_ALGORITHM_PARAM');
    }
}

exports.NilAlgorithmParamError = NilAlgorithmParamError;

class TypeMismatchAlgorithmParamError extends BaseError {
    constructor(param, type) {
        super(`Expected algorithm param \`${param}\` to be of type \`${type}\``, 'TYPE_ALGORITHM_PARAM');
    }
}

exports.TypeMismatchAlgorithmParamError = TypeMismatchAlgorithmParamError;
