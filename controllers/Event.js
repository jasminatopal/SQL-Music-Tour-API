// DEPENDENCIES
const event = require('express').Router()
const db = require('../models')
const { Event, Stage, SetTimes, MeetGreet } = db
const { Op } = require('sequelize')

// FIND ALL EVENTS
event.get('/', async (req, res) => {
    try {
        const foundEvent = await Event.findAll()
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC EVENT
event.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id },
            include: [
                {
                    model: Stage,
                    as: "stage",
                    include: {
                        model: Event,
                        as: "events",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                },
                {
                    model: SetTimes,
                    as: "set_times",
                    include: {
                        model: Event,
                        as: "events",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                },
                {
                    model: MeetGreet,
                    as: "meet_greets",
                    include: {
                        model: Event,
                        as: "events",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                }

            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE AN EVENT
event.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE AN EVENT
event.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvent} event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE AN EVENT
event.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})



// EXPORT
module.exports = event


