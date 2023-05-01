require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const route = require('./routers/route')

app.use(express.json())
// app.use(express.urlencoded())

app.use(route)

app.listen(PORT, () => {
    console.log(`Server connection success on http://localhost:${PORT}/`)
})