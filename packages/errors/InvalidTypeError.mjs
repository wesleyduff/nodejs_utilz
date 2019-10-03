import BaseError from './BaseError';
import CONSTANTS from '../CONSTANTS';

class InvalidTypeError extends BaseError {
    constructor(message, caller = null) {
        super(message, caller);
        this.name = CONSTANTS.ERROR_INVALID_TYPE;
    }
}

export default InvalidTypeError;
