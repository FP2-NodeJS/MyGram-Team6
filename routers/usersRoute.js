const express = require('express')
const app = express()
const userController = require('../controllers/usersController');
const authentication = require("../middlewares/authentication")

app.post('/login', userController.login)

app.post('/register', userController.register)

app.use(authentication)

app.put('/:id', userController.updateUser)

app.delete('/:id', userController.deleteUser)

module.exports = app