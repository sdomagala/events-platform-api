import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { publishersController } from './controllers/publishers.controller'
import { userMgmtController } from './controllers/user-mgmt.controller'
import { userController } from './controllers/users.controller'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware'
import { handleConnectionMiddleware } from './middlewares/handle-connection.middleware'
import { loggerMiddleware, logger } from './middlewares/logger.middleware'

const app = new Koa()
app.use(loggerMiddleware())
app.use(handleConnectionMiddleware())
app.use(errorHandlerMiddleware())
app.use(bodyParser())

registerRoutes(app)

app.listen(3001, () => logger.info('Server started on http://localhost:3001'))

function registerRoutes(app: Koa) {
    app
        .use(userMgmtController.routes())
        .use(userMgmtController.allowedMethods())
        .use(userController.routes())
        .use(userController.allowedMethods())
        .use(publishersController.routes())
        .use(publishersController.allowedMethods())
    logger.info({ message: 'Registered routes for user-mgmt:', routes: userMgmtController.stack.map(i => i.path) })
    logger.info({ message: 'Registered routes for users:', routes: userController.stack.map(i => i.path) })
    logger.info({ message: 'Registered routes for publishers:', routes: publishersController.stack.map(i => i.path) })
}