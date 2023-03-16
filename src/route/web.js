import express from 'express'
import homeController from '../controller/homeController'
import aboutController from '../controller/aboutController'

let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)

    router.get('/about', aboutController.aboutPage)

    return app.use('/', router) // tiền tố được thêm vào mỗi khi gửi request
}

export default initWebRoute
// module.export = initWebRoute