const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')


// import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

// this code for connect to file .env in there we will see the link to db mongodb
dotenv.config();

// connect to db
mongoose.connect(
    process.env.DB_CONNECT, // this can run because we have package dotenv and in file .env we have DB_CONNECT
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => {
    console.log('connected to db')
})

//Middleware
app.use(express.json())

// Router Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)


app.listen(3000, () => {
    console.log('server is running')
})