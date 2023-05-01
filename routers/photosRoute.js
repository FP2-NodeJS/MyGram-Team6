const express = require('express')
const app = express()

app.get('/', (req,res)=>{
    console.log('get all photos');
})

app.post('/', (req,res)=>{
    console.log('add photos');
})

app.put('/:photoId', (req,res)=>{
    console.log('edit photos');
})

app.delete('/:photoId', (req,res)=>{
    console.log('delete photos');
})

module.exports = app