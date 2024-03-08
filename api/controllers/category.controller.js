const CategoryModel = require('../models/category.model')
const EventModel = require('../models/event.model')

const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.findAll()

        res.status(200).json(categories)
    } catch (error) {
        res.status(500).send('Error getting categories')
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
    try {
        if (res.locals.user.role !== 'admin') return res.status(401).send('User not authorized')

        const category = await CategoryModel.create(req.body)

        res.status(200).json('Category created')
    } catch (error) {
        res.status(500).send('Error creating category')
    }
}

const updateCategory = async (req, res) => {
    try {
        if (res.locals.user.role !== 'admin') return res.status(401).send('User not authorized')

        const [categoryExist, category] = await CategoryModel.update(req.body, {
            returning: true,
            where: {
                id: req.params.id
            }
        })

        if (categoryExist !== 0) {
            return res.status(200).json({
                message: 'Category updated',
                category
            })
        } else {
            return res.status(404).send('Category not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteCategory = async (req, res) => {
    try {
        if (res.locals.user.role !== 'admin') return res.status(401).send('User not authorized')

        const category = await CategoryModel.destroy({
            where: {
                id: req.params.id
            }
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

const addEventCategory = async (req, res) => {
    try {
        const event = await EventModel.findByPk(req.params.eventId)
        const category = await CategoryModel.findByPk(req.params.categoryId)

        if (res.locals.user.id !== event.userId && res.locals.user.role !== 'admin') return res.status(401).send('User not authorized')
        await event.addCategory(category)

        if (event) {
            return res.status(200).json('Event added to category')
        } else {
            return res.status(404).send('Event not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const quitEventCategory = async (req, res) => {
    try {
        const event = await EventModel.findByPk(req.params.eventId)
        const category = await CategoryModel.findByPk(req.params.categoryId)

        if (res.locals.user.id !== event.userId && res.locals.user.role !== 'admin') return res.status(401).send('User not authorized')
        await event.removeCategory(category)

        if (event) {
            return res.status(200).json('Event deleted from category')
        } else {
            return res.status(404).send('Event not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getCategoryEvents = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({
            where: {
                id: req.params.categoryId
            }
        })
        const events = await category.getEvents({ joinTableAttributes: [] })

        res.json(events)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    addEventCategory,
    quitEventCategory,
    getCategoryEvents
}