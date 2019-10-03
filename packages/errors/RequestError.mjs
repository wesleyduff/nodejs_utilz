import BaseError from './BaseError';
import CONSTANTS from '../CONSTANTS';

class RequestError extends BaseError {
    constructor(message, caller = null) {
        super(message, caller);
        this.name = CONSTANTS.ERROR_REQUEST;
    }
}

export default RequestError;
