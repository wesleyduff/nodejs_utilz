import * as errors from "../errors";
import momentTZ from 'moment-timezone';

export default {
    /**
     * Handler to remove need for try...catch in api_routes.
     * http://www.acuriousanimal.com/2018/02/15/express-async-middleware.html
     * @param fn
     * @returns {function(*=, *=, *=): Promise<function>}
     */
    asyncHandler: fn => (req, res, next) => Promise
        .resolve(fn(req, res, next))
        .catch(next),

    /**
     * Make sure the passed in param is an array else throw an incorrectParametersError
     * @param param
     * @param location
     */
    validateArrayParameter(param, location = ''){
        if(!param || !Array.isArray(param) || !param.length){
            throw new errors.IncorrectParametersError('Parameter passed in is not an array or was undefined or empty array', location)
        }
    },

    /**
     * validate build parameters for items that take ID and facade
     * @param ID
     * @param facade
     * @return an ObjectID of the passed in ID type
     */
    validateBuildByIDParameters: (ID, facade) => {
        if (!ID) {
            throw new errors.IncorrectParametersError('No parameters were provided', 'Utilities -> validateBuildByParameters');
        } else if (ID.constructor.name !== 'ObjectID') {
            //try to convert it
            if (typeof ID !== 'string') {
                throw new Error('ID must be a valid string to convert into an ObjectID')
            } else {
                try {
                    ID = ObjectID(ID);
                } catch (exception) {
                    throw new errors.ObjectIDCreationError(`Could not create an ObjectID from : ${ID}`, 'validateBuildByIDParameters');
                }
            }
        }
        if (!facade || facade.constructor.name !== 'StockFacade') {
            throw new Error('Parameter for facade was not provided or was incorrect')
        }

        return ID;
    },

    /**
     * Basic way to get timestamps
     * @param date
     * @return {Date}
     */
    getTimeStamp: (date = new Date()) => new Date(date),

    /**
     * Get timestamp via Moment w/ timezone
     */
    getTimeZoneMomentTimeStamp: (timeZone = "America/Los_Angeles") => {
        return momentTZ().tz(timeZone).format();
    },

    /**
     * Chunk an array into multiple chunks of 100 items.
     */
    chunk:(collection) => {
        const chunkedArray = [];
        for (var i = 0, j = collection.length, chunk = 100; i < j; i += chunk) {
            chunkedArray.push(collection.slice(i, i + chunk));
        }

        return chunkedArray;
    }
}
