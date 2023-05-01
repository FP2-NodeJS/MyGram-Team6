const express = require('express')
const app = express()

app.get('/', (req,res)=>{
    console.log('get comment');
})

app.post('/', (req,res)=>{
    console.log('add comment');
})

app.put('/:commentId', (req,res)=>{
    console.log('edit comment');
})

app.delete('/:commentId', (req,res)=>{
    console.log('delete comment');
})

module.exports = app