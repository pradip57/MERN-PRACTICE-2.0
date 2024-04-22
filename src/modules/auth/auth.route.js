const authRoute = require('express').Router()
const { uploader, setPath } = require('../../middleware/uploader.middleware')
const { bodyValidator } = require('../../middleware/validate.middleware')
const authCtrl = require('./auth.controller')
const { registerDTO } = require('./auth.dto')

authRoute.post('/register',setPath('users'),uploader.single('image'),bodyValidator(registerDTO),authCtrl.register)
authRoute.post('/login',authCtrl.login)


module.exports = authRoute