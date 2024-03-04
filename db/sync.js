const CategoryModel = require('../api/models/category.model')
const UserModel = require('../api/models/user.model')

const dbSync = async () => {
    try{
        //await UserModel.sync()
        //await CategoryModel.sync()
        console.log('DB Sync succesful')

    }catch(err){
        throw new Error(error)
    }
}
module.exports = dbSync