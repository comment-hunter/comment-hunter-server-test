/**
 * Express server running on Heroku.
 * process.env.PORT will be set by Heroku and can be left alone.
 */

const express = require('express')
const app = express()
const cors = require('cors')

// Connection settings to Heroku PostgreSQL database.
const db = require('./db')

// Establish connection to the database
db.client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Connected to Heroku postgreSQL database...')
    }
})


/**
 * MIDDLEWARE
 */

// cors configuration
const corsOptions = {
    origin: '*',
    methods: 'GET',
    preflightContinue: false,
    optionsSuccessStatus: 204
}
app.use(cors(corsOptions))


/**
 *  ROUTES
 */

// GET — /data | SELECT * FROM data
app.get('/data', async (req, res) => {
    db.client.query('SELECT * FROM data', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


/**
 *  Connection Listener
 *  listen on the set port.
 */

app.listen(process.env.PORT, () => { console.log(`Express server is live...`) })
