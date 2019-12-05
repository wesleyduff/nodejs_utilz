# Raven Microservice Utils

Contains base packages for Raven 2.0 Microservices

## Raven Microservice Runner

### Install
`npm install`

### Run
`npm start`

### Usage
express routes: 
```
import { msUtils } from 'raven-ms-utils';

app.get('/endpoint', msUtils.asyncHandler(async (req, res) => {
    const response = await new Facade().method(); //Best to use facade pattern
    res.status(response.status).json(response); //this response will execute only if an exception is not throwin anywhere within the facade method that was executed or its sub processes.
}));
```
Facade method: 
Facade.mjs (use .mjs so we can use "import" without webpack or before node ver. 12)(must execute script with --experimental-modules)
``` 
import { errors, msUtils } from 'raven-ms-utils';
import { handlers } from '../handlers/'; //each app has its own handlers
...

async method() {
    const getDataFromRepository =  await this.repository.getContent({
        _id: msUtils.validateBuildByIDParameters(id)
    });

    /*
    Use the handlers.responseHandler to manage all possible responses
    */
    return handlers.responseHandler(
        'someAction',
        await performSomeAsyncAction,
        id,
        'Facade -> method'
    );
}


```
