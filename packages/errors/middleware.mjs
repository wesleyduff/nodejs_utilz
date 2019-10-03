import CONSTANTS from '../CONSTANTS';
import { inspect } from 'util';

export default (exception, req, res, next) => {
    global['LoggerName'].error(`${exception.constructor.name} : Error`,{
        caller: exception.caller ? exception.caller : 'errors/middleware.mjs',
        message: exception.message
            ? `${exception.message}: ${inspect(exception)}`
            : `Message was not provided but here is the exception : ${inspect(exception)}`
    });

    let name = exception.name ? exception.name : exception.error ? exception.error.name : exception.type ? exception.type.name.charAt(0).toLowerCase() + exception.type.name.slice(1) + 'Error' : null;

    switch (name) {
        case CONSTANTS.ERROR_PARSE:
            return res.status(502).json({
                status: 502,
                details: {
                    errorCode: 'RMS005',
                    reason: 'Could not parse XML data from thrid party service',
                    message: exception.message ? exception.message : 'Could not parse data from third party'
                }
            });
        case CONSTANTS.ERROR_REQUEST:
            return res.status(502).json({
                status: 502,
                details: {
                    errorCode: 'RMS005',
                    reason: 'A third party call using the request library has failed and returned an error',
                    message: exception.message ? exception.message : 'The 3rd party call failed to perform the reqeust'
                }
            });
        case CONSTANTS.ERROR_DATABASE:
            return res.status(500).json({
                status: 500,
                details: {
                    errorCode: 'RMS004',
                    reason: 'The database failed to perform the task applied',
                    message: exception.message ? exception.message : 'The database failed to perform the task applied'
                }
            });
        case CONSTANTS.ERROR_EMPTY_RESPONSE:
            return res.status(204).json({
                status: 204,
                details: {
                    errorCode: 'RMS003',
                    reason: 'The response to your DB inquery has returned zero results',
                    message: exception.message ? exception.message : 'The response to your DB inquery has returned zero results'
                }
            });
        case CONSTANTS.ERROR_OBJECT_ID_CREATION:
            return res.status(422).json({
                status: 422,
                details: {
                    errorCode: 'RMS001',
                    reason: 'Failed to convert provided ID into a type of ObjectID',
                    message: exception.message ? exception.message : 'Could not convert provided ID into ObjectID'
                }
            });
        case CONSTANTS.ERROR_INCORRECT_PARAMTERS:
            return res.status(422).json({
                status: 422,
                details: {
                    errorCode: 'RMS002',
                    reason: 'Missing mandatory field',
                    message: exception.message ? exception.message : 'Provided parameters did not meet minimum required parameters'
                }
            });
        case CONSTANTS.ERROR_NOT_FOUND:
            return res.status(404).json({
                status:404,
                details: {
                    errorCode: 'RMS004',
                    reason: 'Not found',
                    message: exception.message ? exception.message : 'Not found'
                }
            });
    }
    res.status(500).json({
        status: 500,
        details: {
            errorCode: 'RMS000',
            reason: `Failed to return : ${inspect(exception)}`,
            message: exception.message ? exception.message : 'Failed to return'
        }
    });
};
