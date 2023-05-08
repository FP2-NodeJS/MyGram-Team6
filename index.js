require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const route = require('./routers/route')
const config = require("./config/config")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(route)

app.listen(PORT, () => {
    console.log(`Server connection success on http://localhost:${PORT}/`)
})