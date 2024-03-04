const CategoryModel = require('../models/category.model')

const getCategories = async (req, res) => {
    try{
        const categories = await CategoryModel.findAll()
        res.status(200).json(categories)

    }catch(error){
 console.log(error)
 res.status(500).send('Error gettin categories')
    }
}
const getOneCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByPk(req.params.id)
        if (category) {
            return res.status(200).json(category)
        } else {
            return res.status(404).send('Category not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const createCategory = async (req, res) => {
    try{
        const category = await CategoryModel.create(req.body)
        res.status(200).json(category)

    }catch(error){
 console.log(error)
 res.status(500).send('Error creating category')
    }
}

const updateCategory = async(req, res) => {
    try {
        const [categoryExist, category] = await CategoryModel.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (categoryExist !== 0) {
            return res.status(200).json({ message: 'Category updated', category })
        } else {
            return res.status(404).send('Category not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteCategory = async(req, res) => {
    try {
        const category = await CategoryModel.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (category) {
            return res.status(200).json('Category deleted')
        } else {
            return res.status(404).send('Category not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
}