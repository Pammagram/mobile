const { CODEGEN_PATH } = require('./constants');
const { config: configDotenv } = require('dotenv');

configDotenv();

/**
 * @type {import('@graphql-codegen/cli').CodegenConfig}
 */
const config = {
  overwrite: true,
  schema: process.env.API_URL,
  watch: true,
  generates: {
    [CODEGEN_PATH]: {
      watchPattern: "src/**/*.ts",
      plugins: ['typescript'],
      config: {
        scalars: {
          // * We need this to define DateTime as string type, not any.
          DateTime: 'string',
        }
      }
    },
  },
};

module.exports = config;
