const express = require('express')
const app = express()
const users = require('./usersRoute')
const photos = require('./photosRoute')
const comments = require('./commentRoute')
const socialmedias = require('./socialMediasRoutes')

app.use('/users', users)
app.use('/photos', photos)
app.use('/comments',comments)
app.use('/socialmedias', socialmedias)

module.exports = app