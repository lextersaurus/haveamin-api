const router = require('express').Router()
const { getEvents, getOneEvent,createEvent, updateEvent, deleteEvent, joinEvent, quitEvent, searchEvent } = require('../controllers/event.controller')


router.get('/showall', getEvents)
router.get('/show/:id', getOneEvent)
router.post('/create', createEvent)
router.put('/update/:id', updateEvent)
router.delete('/delete/:id', deleteEvent)
router.put('/:id/join', joinEvent)
router.delete('/:id/quit', quitEvent)
router.post('/search', searchEvent)



module.exports = router