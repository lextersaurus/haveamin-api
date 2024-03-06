const router = require('express').Router()
const { getCategories, getOneCategory,createCategory, updateCategory, deleteCategory, quitEventCategory, addEventCategory, getCategoryEvents } = require('../controllers/category.controller')
const {checkAdmin} = require ("../middleware/auth.middleware")

router.get('/showall', getCategories)
router.get('/show/:id', getOneCategory)
router.post('/create', checkAdmin, createCategory)
router.put('/update/:id', checkAdmin, updateCategory)
router.delete('/delete/:id', checkAdmin, deleteCategory)
router.put('/:categoryId/add/:eventId', addEventCategory)
router.delete('/:categoryId/quit/:eventId', quitEventCategory)
router.get('/:categoryId/events', getCategoryEvents)

module.exports = router