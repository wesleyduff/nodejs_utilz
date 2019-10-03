import BaseError from './BaseError';
import CONSTANTS from '../CONSTANTS';

class ConditionNotMetError extends BaseError {
    constructor(message, caller = null) {
        super(message, caller);
        this.name = CONSTANTS.ERROR_CONDITIONS_NOT_MET;
    }
}

export default ConditionNotMetError;
