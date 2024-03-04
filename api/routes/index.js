const router = require('express').Router()
const AuthRouter = require('./auth.routes')
const CategoryRouter = require('./category.routes')

router.use('/auth', AuthRouter)
router.use('/category', CategoryRouter)

module.exports = router