const router = require('express').Router()
const { getCategories, getOneCategory,createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')
const {checkAdmin} = require ("../middleware/auth.middleware")

router.get('/showall', getCategories)
router.get('/show/:id', getOneCategory)
router.post('/create', checkAdmin, createCategory)
router.put('/update/:id', checkAdmin, updateCategory)
router.delete('/delete/:id', checkAdmin, deleteCategory)



module.exports = router