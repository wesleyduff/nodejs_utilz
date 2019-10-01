const concurrently = require('concurrently');
const path = require('path');

const MICROSERVICES = [
  { name: 'stocks', msPath: '../../raven-ms-stocks', port: 3001 },
  { name: 'lottery', msPath: '../../raven-ms-lottery', port: 3002 },
  { name: 'mobile', msPath: '../../raven-ms-mobile', port: 3003 },
  { name: 'tickers', msPath: '../../raven-ms-tickers', port: 3004 },
  { name: 'custom-tickers', msPath: '../../raven-ms-custom-tickers', port: 3005 },
];

concurrently(MICROSERVICES.map(microservice => ({
  command: `cd ${path.join(__dirname, microservice.msPath)} && NODE_ENV=start NODE_PORT=${microservice.port} node --experimental-modules ${path.join(__dirname, microservice.msPath, 'app.mjs')}`,
  name: microservice.name,
})));
