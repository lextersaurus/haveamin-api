
const CategoryModel = require('../api/models/category.model')
const EventModel = require('../api/models/event.model')
const Event_Category = require('../api/models/event_category.model')
const UserModel = require('../api/models/user.model')
const User_Event = require('../api/models/user_event.model')

const dbSync = async () => {
    try{
        //await UserModel.sync()
        //await CategoryModel.sync()
        //await EventModel.sync()
        //await Event_Category.sync()
        //await User_Event.sync()
        console.log('DB Sync succesful')

    }catch(err){
        throw new Error(error)
    }
}
module.exports = dbSync