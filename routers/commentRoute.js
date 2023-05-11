const express = require('express')
const app = express()
const commentCtr = require('../controllers/commentController')

app.get('/', commentCtr.showComment)

app.post('/', commentCtr.AddComment)

app.put('/:commentId', commentCtr.EditComment)

app.delete('/:commentId',commentCtr.DeleteComment)

module.exports = app