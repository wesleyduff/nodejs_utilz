import logger from './packages/logger';
import * as errors from "./packages/errors";
import CONSTANTS from './packages/CONSTANTS';
import msUtils from './packages/utils';
import mongo from 'mongodb';

// Used for InstanceOf in tests
const UtilsObjectID = mongo.ObjectID;

export {
    CONSTANTS,
    errors,
    logger,
    msUtils,
    UtilsObjectID,
};
