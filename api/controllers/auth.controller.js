const UserModel = require('../models/user.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT))
        req.body.password = bcrypt.hashSync(req.body.password, salt)

        const user = await UserModel.create(req.body)
        
        const token = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET)

        res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error signing up')
    }
}

const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) return res.status(500).send('Email or password incorrect')

        if (!bcrypt.compareSync(req.body.password, user.password)) return res.status(500).send('Email or password incorrect')

        const token = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET)

        res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error loggin up')
    } 
}

module.exports = {
    signup,
    login
}