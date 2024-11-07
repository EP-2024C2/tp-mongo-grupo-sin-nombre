const express = require('express')
const PORT = process.env.PORT || 3000
const connectToDatabase = require('./db/mongo.db').connectToDatabase
const app = express()

app.use(express.json())

app.listen(PORT, async ()=> {
    console.log(`Aplicación iniciada en el puerto ${PORT}`)
    await connectToDatabase()
})