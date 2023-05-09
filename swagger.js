const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routers/index.js'];

swaggerAutogen(outputFile, endpointsFiles);