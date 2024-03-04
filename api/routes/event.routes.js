const router = require('express').Router()
const { getEvents, getOneEvent,createEvent, updateEvent, deleteEvent } = require('../controllers/event.controller')


router.get('/showall', getEvents)
router.get('/show/:id', getOneEvent)
router.post('/create', createEvent)
router.put('/update/:id', updateEvent)
router.delete('/delete/:id', deleteEvent)



module.exports = router