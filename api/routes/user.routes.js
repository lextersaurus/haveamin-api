const router = require('express').Router()
const { getUsers, getOneUser, updateUser, deleteUser, getUserEvents, createUser, getUserLogged } = require('../controllers/user.controller')

router.get('/showall', getUsers)
router.get('/show/:id', getOneUser)
router.get('/show', getUserLogged)
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/events', getUserEvents)

module.exports = router