const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
//const cors = require('cors')
//app.use(cors())

//Middleware
app.use(bodyParser.json())

//Routes
const todosRoute = require('./routes/todos')
app.use('/api/todos', todosRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

const mongoUri = process.env.mongodb || process.env.DB_CONNECTION 
mongoose.connect(mongoUri,{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`app is running on port: ${port}`))