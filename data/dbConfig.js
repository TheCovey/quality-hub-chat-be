const knex = require('knex');

const knexConfig = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || "staging"
const configObj = knexConfig[dbEnv]

module.exports = knex(configObj);