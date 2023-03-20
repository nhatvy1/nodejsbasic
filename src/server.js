import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'
import initApiRoute from './route/api'
// import connection from './configs/connectDB'

require('dotenv').config()
var morgan = require('morgan')

const path = require('path')
const app = express()
const port = process.env.PORT || 3000 

app.use((req, res, next) => {
    console.log('>>> run into my middleware')
    console.log(req.method)
    next()
})

app.use(morgan('combined'))

// gửi data từ client lên server đơn giản 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// setup view engine
configViewEngine(app)


// init web route
initWebRoute(app)

// handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})

// init api route
initApiRoute(app)


app.listen(port, 'localhost', () => {
    console.log(`Node.JS server is running on http://localhost:${port}`);
})