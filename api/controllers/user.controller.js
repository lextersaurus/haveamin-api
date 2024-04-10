const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            attributes: { exclude: ['id', 'email', 'password', 'role'] }
        })

        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error getting users')
    }
}

const getOneUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id, {
            attributes: { exclude: ['id', 'email', 'password', 'role'] }
        })

        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const getUserLogged = async (req, res) => {
    try {
        const user = await UserModel.findByPk( res.locals.user.id, {
            attributes: { exclude: ['id', 'email', 'password', 'role'] }
        })

        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const selectedUser = await UserModel.findByPk(req.params.id)
        if (res.locals.user.id !== selectedUser.id && res.locals.user.role !== 'admin') return res.status(401).send('User not authorized')

        const [userExist, user] = await UserModel.update(req.body, {
            returning: true,
            where: {
                id: req.params.id
            }
        })

        if (userExist !==0) {
            return res.status(200).json({ message: 'User updated', user })
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const selectedUser = await UserModel.findByPk(req.params.id)
        if (res.locals.user.id !== selectedUser.id && res.locals.user.role !== 'admin') return res.status(401).send('User not authorized')

        const user = await UserModel.destroy({
            where: {
                id: req.params.id
            }
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

const getUserEvents = async (req, res) => {
    try {
        const events = await res.locals.user.getEvents({ joinTableAttributes: [] })

        res.json(events)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createUser = async (req, res) => {
    try {
        if (res.locals.user.role !== 'admin') return res.status(401).send('User not authorized')
        const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT))
        req.body.password = bcrypt.hashSync(req.body.password, salt)

        const user = await UserModel.create(req.body)

        res.status(200).json('User created')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error creating user')
    }
}

const getEventsByUser = async (req, res) => {
    try {
        const user = res.locals.user; 
        const events = await user.getEvents({
        });

        if (events.length > 0) {
            return res.status(200).json(events);
        } else {
            return res.status(404).send('No events found for the logged in user');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getUsers,
    getOneUser,
    updateUser,
    deleteUser,
    getUserEvents,
    createUser,
    getUserLogged,
    getEventsByUser
}