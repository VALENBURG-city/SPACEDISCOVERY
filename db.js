const { Pool } = require('pg')

const pool = new Pool({
    database: 'postgres',
    user: 'postgres',
    host: 'localhost',
    password: '0644',
    port: 5432

})

module.exports = pool;