const EventModel = require('../api/models/event.model')
const UserModel = require('../api/models/user.model')

const dbSync = async () => {
    try{
        //await UserModel.sync()
        //await EventModel.sync()
        console.log('DB Sync succesful')

    }catch(err){
        throw new Error(error)
    }
}
module.exports = dbSync