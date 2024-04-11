const router = require('express').Router()
const { getEvents, getOneEvent,createEvent, updateEvent, deleteEvent, joinEvent, quitEvent, searchEvent, getCreatedEvents } = require('../controllers/event.controller')

router.get('/showall', getEvents)
router.get('/show/:id', getOneEvent)
router.post('/create', createEvent)
router.put('/update/:id', updateEvent)
router.delete('/delete/:id', deleteEvent)
router.put('/:id/join', joinEvent)
router.delete('/:id/quit', quitEvent)
router.post('/search', searchEvent)
router.get('/created/:userId', getCreatedEvents)

module.exports = router