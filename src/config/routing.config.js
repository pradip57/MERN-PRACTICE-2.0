const authRoute = require('../modules/auth/auth.route')

const mainRoute = require('express').Router()

mainRoute.use('/auth',authRoute)

module.exports = mainRoute
