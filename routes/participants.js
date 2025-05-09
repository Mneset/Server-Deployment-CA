var express = require('express');
var router = express.Router();
const db = require('../models');
const validateParticipant = require('../utils/validateParticipant')
const validatePut = require('../utils/validatePut')
const ParticipantService = require('../services/ParticipantService')
const participantService = new ParticipantService(db)
const createError = require('http-errors')

router.get('/', async (req, res, next) => {
    try {
        const participants = await participantService.getAll()
        res.status(200).json(participants)
    } catch (error) {
        next(createError(error))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
})

router.post('/add', validateParticipant,  async (req, res, next) => {
    const participant = req.body
    try {    
        const newpParticipant = await participantService.addParticipant(participant)
        res.status(201).json(newpParticipant)
    } catch (error) {
        next(createError(error))
    }
})

router.get('/details', async (req, res, next) => {
    try {
        const participants = await participantService.getDetails()
        res.status(200).json(participants)
    } catch (error) {
        next(createError(error))
    }
})

router.get('/details/:email', async (req, res, next) => {
    const email = req.params.email
    try {
        const participantDetails = await participantService.getDetailsByEmail(email)
        res.status(200).json(participantDetails)
    } catch (error) {
        next(createError(error))
    }
})

router.get('/work/:email', async (req, res, next) => {
    const email = req.params.email
    try {
        const participantWorkDetails = await participantService.getWorkByEmail(email)
        res.status(200).json(participantWorkDetails)
    } catch (error) {
        next(createError(error))
    }
})

router.get('/home/:email', async (req, res, next) => {
    const email = req.params.email
    try {
        const participantHomeDetails = await participantService.getHomeByEmail(email)
        res.status(200).json(participantHomeDetails)
    } catch (error) {
        next(createError(error))
    }
})

router.delete('/:email', async (req, res, next) => {
    const email = req.params.email
    try {
        const participant = await participantService.getParticipant(email)

        if(!participant){
            return next(createError(404, 'No participant found with this email'))
        }

        await participantService.deleteParticipant(email, participant) 
        res.status(200).json(`Participant with the following email was deleted: ${email}`)
    } catch (error) {
        next(createError(error))
    }
})

router.put('/:email', validatePut, async (req, res, next) => { 
    const email = req.params.email
    const updatedData = req.body
    try {
        const participant = await participantService.getParticipant(email)

        if(!participant){
            return next(createError(404, 'No participant found with this email'))
        }

        const [affectedRows, updatedParticipant] = await participantService.updateParticipant(updatedData, participant)
        
        if(affectedRows === 0) {
            return next(createError(400, 'No changes were made to the participant'))
        }
        
        res.status(200).json(updatedParticipant)
    } catch (error) {
        next(createError(error))
    }
})

module.exports = router