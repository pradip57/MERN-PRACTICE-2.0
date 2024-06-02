const authRoute = require('../modules/auth/auth.route')
const bannerRoute = require('../modules/banner/banner.router')

const mainRoute = require('express').Router()

mainRoute.use('/auth',authRoute)
mainRoute.use('/banner',bannerRoute)

module.exports = mainRoute
