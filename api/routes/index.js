const router = require('express').Router()
const AuthRouter = require('./auth.routes')
const EventRouter = require('./event.routes')
const CategoryRouter = require('./category.routes')
const UserRouter = require('./user.routes')

router.use('/auth', AuthRouter)
router.use('/category', CategoryRouter)
router.use('/event', EventRouter)
router.use('/user', UserRouter)

module.exports = router