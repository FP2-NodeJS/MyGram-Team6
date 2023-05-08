const express = require('express')
const app = express()
const SosMedController = require('../controllers/sosmedController')

app.get('/', SosMedController.GetAllSocialMedia)

app.post('/', SosMedController.AddSocialMedia)

app.put('/:socialMediaId', SosMedController.EditSocialMedia)

app.delete('/:socialMediaId', SosMedController.DeleteSocialMedia)

module.exports = app