const authRoute = require('../modules/auth/auth.route')
const bannerRoute = require('../modules/banner/banner.router')
const brandRoute = require('../modules/brand/brand.router')

const mainRoute = require('express').Router()

mainRoute.use('/auth',authRoute)
mainRoute.use('/banner',bannerRoute)
mainRoute.use('/brand',brandRoute)

module.exports = mainRoute
