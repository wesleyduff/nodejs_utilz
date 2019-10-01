import path from 'path';
import winston from 'winston';
import util from 'util';

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

let logPath = path.join(path.dirname(''), './logs');
const environment = process.env.NODE_ENV || 'start';

// for non-local envs, log to directory
if (environment !== 'start' && environment !== 'test') {
    logPath = '/data/logs';
}

export default (config) => {
    const desiredFormatForLogs = printf(({ level, message, label, timestamp, details }) => {
        let returnString = `[${timestamp}] :: ${level} => [${label}] :: ${message} `;
        if(details){
            returnString += `:: ${util.inspect(details)}`
        }
        return returnString;
    });

    const fileFormatSpecs = combine(
            format.splat(),
            label({label: `env = ${process.env.NODE_ENV}`}),
            timestamp(),
            desiredFormatForLogs
        );

    const defaultLogger = createLogger({
        level: 'debug',
        format: fileFormatSpecs,
        defaultMeta: { service : config.service},
        transports : [
            new transports.File({ filename: path.join(logPath, 'error.log'), level: 'error' }),
            new transports.File({ filename: path.join(logPath, 'combined.log'), level: 'info' }),
            new transports.File({ filename: path.join(logPath, 'debug.log'), level: 'debug' }),
        ],
        exceptionHandlers : [
            new transports.File({filename: path.join(logPath, 'exceptions.log')})
        ]
    })



    if (process.env.NODE_ENV !== 'production') {
        //run console transport when not in production
        defaultLogger.add(new transports.Console({
            format: combine(
                        format.colorize(),
                        format.splat(),
                        label({label: `env = ${process.env.NODE_ENV}`}),
                        timestamp(),
                        desiredFormatForLogs
            )
        }));
    }


    global.RavenLogger = defaultLogger;
}

