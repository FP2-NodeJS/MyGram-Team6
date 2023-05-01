const express = require('express')
const app = express()
const {User} = require("../models")

app.post('/login', (req,res)=>{
    try{
        const {email,full_name, username, password,profile_image_url,age,phone_number}= req.body
        let data = User.create({
            full_name,email, username, password,profile_image_url,age,phone_number
        })
        res.status(200).json({
            user: data
        })      
    }catch(err){
        res.status(400).json(err)
    }
})

app.post('/register', (req,res)=>{
    try{
        const {email,full_name, username, password,profile_image_url,age,phone_number}= req.body
        User.create({
            full_name,email, username, password,profile_image_url,age,phone_number
        }).then((result) => {
            res.status(200).json(result)    
        }).catch((err) => {
            
        });
                 
    }catch(err){
        res.status(400).json(err)
    }
})

app.put('/:userId', (req,res)=>{
    console.log('edit user');
})

app.delete('/:userId', (req,res)=>{
    console.log('delete user');
})

module.exports = app