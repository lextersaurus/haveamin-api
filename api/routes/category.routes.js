const router = require('express').Router()
const { getCategories, getOneCategory,createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')


router.get('/showall', getCategories)
router.get('/show/:id', getOneCategory)
router.post('/create', createCategory)
router.put('/update/:id', updateCategory)
router.delete('/delete/:id', deleteCategory)



module.exports = router