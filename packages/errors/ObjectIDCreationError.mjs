import BaseError from './BaseError';
import CONSTANTS from '../CONSTANTS';

class ObjectIDCreationError extends BaseError {
    constructor(message, caller) {
        super(message, caller);
        this.name = CONSTANTS.ERROR_OBJECT_ID_CREATION;
    }
}

export default ObjectIDCreationError;
