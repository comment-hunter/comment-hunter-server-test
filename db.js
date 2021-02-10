/**
 * Connection settings to Heroku PostgreSQL database.
 * process.env.DATABASE_URL is established by Heroku and used as the connection string.
 */

// PostgreSQL client for Node.js
const pg = require('pg');

// Connection settings to Heroku PostgreSQL database.
const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

module.exports = { client }
