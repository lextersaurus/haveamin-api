const EventModel = require('../models/event.model')
const UserModel = require('../models/user.model')
const { Op } = require('sequelize')

const getEvents = async (req, res) => {
    try {
        const events = await EventModel.findAll()

        res.status(200).json(events)
    } catch (error) {
        res.status(500).send('Error getting events')
    }
}

const getOneEvent = async (req, res) => {
    try {
        const event = await EventModel.findByPk(req.params.id)

        if (event) {
            return res.status(200).json(event)
        } else {
            return res.status(404).send('Event not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const createEvent = async (req, res) => {
    try {
        const event = {
            ...req.body,
            userId: res.locals.user.id,
        }

        await EventModel.create(event)

        res.status(200).json('Event created')
    } catch (error) {
        res.status(500).send('Error creating event')
    }
}

const updateEvent = async (req, res) => {
    try {
        const selectedEvent = await EventModel.findByPk(req.params.id)
        if (res.locals.user.id !== selectedEvent.userId) return res.status(401).send('User not authorized')

        const [eventExist, event] = await EventModel.update(req.body, {
            returning: true,
            where: {
                id: req.params.id
            }
        })

        if (eventExist) {
            return res.status(200).json({
                message: 'Event updated',
                event
            })
        } else {
            return res.status(404).send('Event not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteEvent = async (req, res) => {
    try {
        const selectedEvent = await EventModel.findByPk(req.params.id)
        if (res.locals.user.id !== selectedEvent.userId && res.locals.user.role !== 'admin') return res.status(401).send('User not authorized')

        const event = await EventModel.destroy({
            where: {
                id: req.params.id
            }
        })

        if (event) {
            return res.status(200).json('Event deleted')
        } else {
            return res.status(404).send('Event not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const joinEvent = async (req, res) => {
    try {
        const event = await EventModel.findByPk(req.params.id)
        const user = await UserModel.findByPk(res.locals.user.id)
        await event.addUser(user)
       
        if (event) {
            return res.status(200).json('Event joined')
        } else {
            return res.status(404).send('Event not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const quitEvent = async (req, res) => {
    try {
        const event = await EventModel.findByPk(req.params.id)
        const user = await UserModel.findByPk(res.locals.user.id)
        await event.removeUser(user)
       
        if (event) {
            return res.status(200).json('Event quit')
        } else {
            return res.status(404).send('Event not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const searchEvent = async (req, res) => {
    try {
        const searchTerm = req.body.search

        if (!Object.values(searchTerm).length) {
            const events = await EventModel.findAll()

            if (events) {
                return res.status(200).json(events)
            } else {
                return res.status(404).send('No events found')
            }
        } else {
            const events = await EventModel.findAll({
                where: {
                    name: {
                        [Op.like]: `%${searchTerm}%`
                    }
                }
            })

            if (events.length) {
                return res.status(200).json(events)
              } else {
                return res.status(404).send('No matches found')
              }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getEvents,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    joinEvent,
    quitEvent,
    searchEvent
}