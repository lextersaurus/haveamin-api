const router = require('express').Router()
const AuthRouter = require('./auth.routes')
const EventRouter = require('./event.routes')
const CategoryRouter = require('./category.routes')
const UserRouter = require('./user.routes')
const {checkAuth} = require('../middleware/auth.middleware')

router.use('/auth', AuthRouter)
router.use('/category', checkAuth, CategoryRouter)
router.use('/event', checkAuth, EventRouter)
router.use('/user', checkAuth, UserRouter)

module.exports = router