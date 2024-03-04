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

module.exports = {
    signup
}