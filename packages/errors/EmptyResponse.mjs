import BaseError from './BaseError';
import CONSTANTS from '../CONSTANTS';

class EmptyResponse extends BaseError {
    constructor(message, caller = null) {
        super(message, caller);
        this.name = CONSTANTS.ERROR_EMPTY_RESPONSE;
    }
}

export default EmptyResponse;