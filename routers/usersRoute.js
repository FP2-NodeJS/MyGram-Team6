const express = require('express')
const app = express()
const {User} = require("../models")

app.post('/login', (req,res)=>{
    console.log('login user');
})

app.post('/register', (req,res)=>{
    console.log('register user');
})

app.put('/:userId', (req,res)=>{
    console.log('edit user');
})

app.delete('/:userId', (req,res)=>{
    console.log('delete user');
})

module.exports = app