import BaseError from './BaseError';
import CONSTANTS from '../CONSTANTS';

class ProjectAndCheckError extends BaseError {
    constructor(message, caller) {
        super(message, caller);
        this.name = CONSTANTS.ERROR_PROTECT_AND_CHECK;
    }
}

export default ProjectAndCheckError;
