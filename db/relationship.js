const CategoryModel = require('../api/models/category.model')
const EventModel = require('../api/models/event.model')
const Event_Category = require('../api/models/event_category.model')
const UserModel = require('../api/models/user.model')
const User_Event = require('../api/models/user_event.model')

const createRelationships = () => {
    UserModel.belongsToMany(EventModel, { through: User_Event })
    EventModel.belongsToMany(UserModel, { through: User_Event })

    EventModel.belongsToMany(CategoryModel, { through: Event_Category })
    CategoryModel.belongsToMany(EventModel, { through: Event_Category })

    UserModel.hasMany(EventModel)
    EventModel.belongsTo(UserModel)
}

module.exports = createRelationships