# Raven Microservice Utils

Contains base packages for Raven 2.0 Microservices

## Raven Microservice Runner

### Install
`npm install`

### Run
`npm start`

### Usage
express routes: 
`
import { msUtils } from 'raven-ms-utils';

app.get('/endpoint', msUtils.asyncHandler(async (req, res) => {
    const response = await new Facade().method(); //Best to use facade pattern
    res.status(response.status).json(response); //this response will execute only if an exception is not throwin anywhere within the facade method that was executed or its sub processes.
}));
`
