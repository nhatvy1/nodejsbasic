import express from 'express'
import configViewEngine from './configs/viewEngine'

const path = require('path')
const app = express()
const port = 3000

configViewEngine(app)

app.get('/', (req, res) => {
    res.render('test/index.ejs')
})

app.listen(port, 'localhost', () => {
    console.log('Node.JS server is running on port: 3000');
})