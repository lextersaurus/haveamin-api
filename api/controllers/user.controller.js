const UserModel = require('../models/user.model')

const getUsers = async (req, res) => {
    try{
        const users = await UserModel.findAll()
        res.status(200).json(users)

    }catch(error){
 console.log(error)
 res.status(500).send('Error gettin users')
    }
}

const getOneUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateUser = async(req, res) => {
    try {
        const [userExist, user] = await UserModel.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (userExist !== 0) {
            return res.status(200).json({ message: 'User updated', user })
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteUser = async(req, res) => {
    try {
        const user = await UserModel.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (user) {
            return res.status(200).json('User deleted')
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getUsers,
    getOneUser,
    updateUser,
    deleteUser
}