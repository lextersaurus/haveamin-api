require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan') 
const express = require('express') 
const sequelize = require('./db') 
const dbSync = require('./db/sync') 
const createRelationships = require('./db/relationship')

const dbCheck = async () => {
    try {
        await sequelize.authenticate() 
        createRelationships()
        await dbSync() 
        console.log('Connected to Haveamin DB')
    } catch (error) {
        throw new Error(error)
    }
}

const api = express()
    .use(cors())
    .use(morgan('dev')) 
    .use(express.json())
    .get('/', (req, res) => res.send('Connected to Haveamin API'))
    .use('/api', require('./api/routes'))
    .listen(process.env.PORT, async (err) => {
    if (err) throw new Error('Cannot start API')
    console.log('*'.repeat(50))
    console.log(`Haveamin API running on port ${process.env.PORT}`)
    await dbCheck()
    console.log('*'.repeat(50))
    })