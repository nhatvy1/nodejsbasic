import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'
import initApiRoute from './route/api'
// import connection from './configs/connectDB'

require('dotenv').config()

const path = require('path')
const app = express()
const port = process.env.PORT || 3000 

// gửi data từ client lên server đơn giản 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// setup view engine
configViewEngine(app)

// init web route
initWebRoute(app)

// init api route
initApiRoute(app)


app.listen(port, 'localhost', () => {
    console.log(`Node.JS server is running on http://localhost:${port}`);
})