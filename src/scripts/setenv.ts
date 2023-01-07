const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

if (!process.env['API_URL']) {
    console.error('All the required environment variables were not provided!');
    process.exit(-1);
 }

const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;

// we have access to our environment variables
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   API_URL: "${process.env['API_URL']}",
};
`;

// write the environment variables to the respective file
writeFile(targetPath, environmentFileContent, function (err:any) {
   if (err) {
      console.log(err);
   }

   console.log(`Wrote variables to ${targetPath}`);
},);