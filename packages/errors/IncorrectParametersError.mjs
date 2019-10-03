import BaseError from './BaseError';
import CONSTANTS from '../CONSTANTS';

class IncorrectParametersError extends BaseError {
    constructor(message, caller = null) {
        super(message, caller);
        this.name = CONSTANTS.ERROR_INCORRECT_PARAMETERS;
    }
}

export default IncorrectParametersError;
