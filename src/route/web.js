import express from 'express'
import homeController from '../controller/homeController'
let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)

    router.get('/about', (req, res) => {
        res.render('test/index.ejs')
    })

    return app.use('/abc', router)
}

export default initWebRoute
// module.export = initWebRoute