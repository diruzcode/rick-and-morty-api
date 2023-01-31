const { Pool } = require('pg');
const pgCamelCase = require('pg-camelcase');

let pool;
let revertCamelCase;
const isCamelCaseInjected = () => !!pool.Client.prototype.usingPGcamelCase;

/**
 * initializePool : generate the pool initialized or return the same pool if it has already been initialized
 * @function
 */
const initializePool = () => {
  if (pool) return pool;

  pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    max: 20,
  });

  return pool;
};

/**
 * columnFormat : generate the format of structure if we use camelCase or snake_case
 * @property {boolean} camelCase - parameter indicate if the pool need camelCase or not
 * @function isCamelCaseInjected() check if the pgCamelCase it is inject in the pool
 * @function
 */
const columnFormat = (camelCase) => {
  if (camelCase) {
    if (!isCamelCaseInjected()) {
      revertCamelCase = pgCamelCase.inject(pool.Client);
      pool.Client.prototype.usingPGcamelCase = true;
    }
  } else if (isCamelCaseInjected()) {
    revertCamelCase();
    pool.Client.prototype.usingPGcamelCase = false;
  }
};

/**
 * Postgres Initialization
 * @property {boolean} camelCase - parameter indicate if the pool need camelCase or not
 * @default camelCase false
 * @function
 */
function getPool({ camelCase = false } = {}) {
  pool = initializePool();
  columnFormat(camelCase);
  return pool;
}

module.exports = { getPool };
