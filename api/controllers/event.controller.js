const EventModel = require('../models/event.model')

const getEvents = async (req, res) => {
    try{
        const events = await EventModel.findAll()
        res.status(200).json(events)

    }catch(error){
 console.log(error)
 res.status(500).send('error gettin events')
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
    try{
        const event = req.body

        res.locals.event = event
        event.userId = res.locals.user.id

        await EventModel.create(event)

        res.status(200).json(event)
    }catch(error){
 console.log(error)
 res.status(500).send('error creating event')
    }
}

const updateEvent = async(req, res) => {
    try {
        const selectedEvent = await EventModel.findByPk(req.params.id)
        if (res.locals.user.id !== selectedEvent.userId) return res.status(401).send('User not authorized')

        const [eventExist, event] = await EventModel.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (eventExist !== 0) {
            return res.status(200).json({ message: 'event updated', event })
        } else {
            return res.status(404).send('Event not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteEvent = async(req, res) => {
    try {
        const selectedEvent = await EventModel.findByPk(req.params.id)
        if (res.locals.user.id !== selectedEvent.userId) return res.status(401).send('User not authorized')
        
        const event = await EventModel.destroy({
            where: {
                id: req.params.id,
            },
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

module.exports = {
    getEvents,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent
}