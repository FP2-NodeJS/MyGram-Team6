const express = require('express')
const app = express.Router()
const PhotoController = require('../controllers/photosController')
const authentication = require('../middlewares/authentication')

app.post('/', PhotoController.createPhoto)
app.get('/', PhotoController.getPhotos)
app.put('/:photoId', PhotoController.updatePhotoById)
app.delete('/:photoId', PhotoController.deletePhotoById)

module.exports = app