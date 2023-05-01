const express = require('express')
const app = express()

app.get('/', (req,res)=>{
    console.log('get social media');
})

app.post('/', (req,res)=>{
    console.log('add social media');
})

app.put('/:socialMediaId', (req,res)=>{
    console.log('edit social media');
})

app.delete('/:socialMediaId', (req,res)=>{
    console.log('delete social media');
})

module.exports = app