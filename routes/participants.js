var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    try {
        res.status(200).json('Connected successfully')
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.post('/add', (req, res) => {
    try {
        res.status(200).json('Connected successfully')
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.get('/details', (req, res) => {
    try {
        res.status(200).json('Connected successfully')
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.get('/details/:email', (req, res) => {
    try {
        res.status(200).json('Connected successfully')
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})

router.get('/work/:email', (req, res) => {
    try {
        res.status(200).json('Connected successfully')
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