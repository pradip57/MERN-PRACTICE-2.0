const authRoute = require('express').Router()
const { bodyValidator } = require('../../middleware/validate.middleware')
const authCtrl = require('./auth.controller')
const { registerDTO } = require('./auth.dto')

authRoute.post('/register',bodyValidator(registerDTO),authCtrl.register)
authRoute.post('/login',authCtrl.login)


module.exports = authRoute