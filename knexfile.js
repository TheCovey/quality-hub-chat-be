// Update with your config settings.
require('dotenv').config()
const prodConn = process.env.DB_URL
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './qhchat.sqlite3'
    }
  },

  staging: {
    client: 'pg',
    useNullAsDefault: true,
    connection: prodConn,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
