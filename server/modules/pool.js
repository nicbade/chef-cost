/**
 * You'll need to use environment variables in order to deploy your
 * pg-pool configuration to Heroku.
 * It will look something like this:
 **/

var pg = require('pg');
var url = require('url');
var config = {
    database: 'chefcost', // the name of the database
    host: 'localhost', // where your database is located
    port: 5432, // the port number for your database
    max: 10, // the number of connections allowed at a time
    idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    var params = url.parse(process.env.DATABASE_URL);
    var auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true, // heroku requires ssl to be true
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };

} else {
    config = {
        user: process.env.PG_USER || null, //env var: PGUSER
        password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
        host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
        port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
        database: process.env.DATABASE_NAME || 'chefcost', //env var: PGDATABASE
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
}

module.exports = new pg.Pool(config);