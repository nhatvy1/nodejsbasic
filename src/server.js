import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'
import connection from './configs/connectDB'
require('dotenv').config()

const path = require('path')
const app = express()
const port = process.env.PORT || 3000 

// setup view engine
configViewEngine(app)

// init web route
initWebRoute(app)


app.listen(port, 'localhost', () => {
    console.log('Node.JS server is running on port: 3000');
})