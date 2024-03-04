require('dotenv').config()
const morgan = require('morgan') 
const express = require('express') 
const sequelize = require('./db') 
const dbSync = require('./db/sync') 
const createRelationships = require('./db/relationship')

const api = express()

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
api.use(morgan('dev')) 
api.use(express.json())

api.get('/', (req, res) => res.send('Connected to Haveamin API'))

api.use('/api', require('./api/routes'))

api.listen(process.env.PORT, async (err) => {
    if (err) throw new Error('Cannot star API')
    console.log('*'.repeat(50))
    console.log(`Haveamin API Running on port ${process.env.PORT}`)
    await dbCheck()
    console.log('*'.repeat(50))

})