const router = require('express').Router()
const AuthRouter = require('./auth.routes')
const EventRouter = require('./event.routes')
const CategoryRouter = require('./category.routes')

router.use('/auth', AuthRouter)
router.use('/category', CategoryRouter)
router.use('/event', EventRouter)

module.exports = router