const express = require('express')
const User = require('../models/User')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/user/register', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ 'message': 'success' })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ 'message': 'success', token })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

})

router.get('/user', auth, async(req, res) => {
    res.send(req.user)
})

router.get('/user/:id', auth, async(req, res) => {
    console.log(req.params.id);
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router