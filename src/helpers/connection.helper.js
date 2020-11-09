const knex = require('knex')

function createConnection() {
    return knex({
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'admin',
            database: 'events'
        }
    })
}

module.exports = { createConnection }