var express = require('express');
var router = express.Router();
const db = require('../models');
const ParticipantService = require('../services/ParticipantService')
const participantService = new ParticipantService(db)

router.get('/', async (req, res) => {
    try {
        const participants = await participantService.getAll()
        res.status(200).json(participants)
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.post('/add', async (req, res) => {
    const participant = req.body
    try {
        const newpParticipant = await participantService.addParticipant(participant)
        res.status(201).json(newpParticipant)
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.get('/details', async (req, res) => {
    try {
        const participants = await participantService.getDetails()
        res.status(200).json(participants)
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.get('/details/:email', async (req, res) => {
    const email = req.params.email
    try {
        const participantDetails = await participantService.getDetailsByEmail(email)
        res.status(200).json(participantDetails)
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.get('/work/:email', (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.get('/home/:email', (req, res) => {
    try {
        res.status(200).json('Connected successfully')
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.delete('/:email', (req, res) => {
    try {
        res.status(200).json('Connected successfully')
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.put('/:email', (req, res) => {
    try {
        res.status(200).json('Connected successfully')
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

module.exports = router