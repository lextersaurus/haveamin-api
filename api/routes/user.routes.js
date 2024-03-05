const router = require('express').Router()
const { getUsers, getOneUser, updateUser, deleteUser, getUserEvents } = require('../controllers/user.controller')


router.get('/showall', getUsers)
router.get('/show/:id', getOneUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/:userId/events', getUserEvents)



module.exports = router