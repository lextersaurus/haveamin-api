const router = require('express').Router()
const { getUsers, getOneUser, updateUser, deleteUser } = require('../controllers/user.controller')


router.get('/showall', getUsers)
router.get('/show/:id', getOneUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)



module.exports = router