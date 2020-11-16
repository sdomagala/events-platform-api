const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { userMgmtController } = require('./controllers/user-mgmt.controller')
const { userController } = require('./controllers/users.controller')
const { errorHandlerMiddleware } = require('./middlewares/error-handler.middleware')
const { handleConnectionMiddleware } = require('./middlewares/handle-connection.middleware')
const { loggerMiddleware, logger } = require('./middlewares/logger.middleware')

const app = new Koa()
app.use(loggerMiddleware())
app.use(handleConnectionMiddleware())
app.use(errorHandlerMiddleware())
app.use(bodyParser())

registerRoutes(app)

app.listen(3001, () => logger.info('Server started on http://localhost:3001'))

function registerRoutes(app) {
    app
        .use(userMgmtController.routes())
        .use(userMgmtController.allowedMethods())
        .use(userController.routes())
        .use(userController.allowedMethods())
    logger.info({ message: 'Registered routes for user-mgmt:', routes: userMgmtController.stack.map(i => i.path) })
    logger.info({ message: 'Registered routes for users:', routes: userController.stack.map(i => i.path) })
}