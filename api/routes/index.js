const router = require('express').Router()
const AuthRouter = require('./auth.routes')
const EventRouter = require('./event.routes')


router.use('/auth', AuthRouter)
router.use('/event', EventRouter)


module.exports = router