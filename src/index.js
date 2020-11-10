const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { userMgmtController } = require('./controllers/user-mgmt.controller')
const { errorHandlerMiddleware } = require('./middlewares/error-handler.middleware')
const { handleConnectionMiddleware } = require('./middlewares/handle-connection.middleware')

const app = new Koa()

app.use(handleConnectionMiddleware())
app.use(errorHandlerMiddleware())
app.use(bodyParser())

registerRoutes(app)

app.listen(3001, () => console.log('Server started on http://localhost:3001'))

function registerRoutes(app) {
    app
        .use(userMgmtController.routes())
        .use(userMgmtController.allowedMethods())
    console.log('Registered routes:', userMgmtController.stack.map(i => i.path))
}