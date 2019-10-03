import BaseError from './BaseError';
import CONSTANTS from '../CONSTANTS';

class BadDataError extends BaseError {
    constructor(message, caller = null) {
        super(message, caller);
        this.name = CONSTANTS.ERROR_BAD_DATA;
    }
}

export default BadDataError;
