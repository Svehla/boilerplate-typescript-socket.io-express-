import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as bearerToken from 'express-bearer-token'
import UserRouter from './routes/UserRouter'
import AuthenticateRouter from './routes/AuthenticateRouter'
import authMiddleware from './auth/authMiddleware'

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application

  // Run configuration methods on the Express instance.
  constructor () {
    this.express = express()
    this.middleware()
    this.routes()
  }

  // Configure Express middleware.
  private middleware () {
    this.express.use(cors())
    this.express.use(bearerToken())
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  // Configure API endpoints.
  private routes () {
    let router: express.Router = express.Router()
    // placeholder route handler
    router.get('/', (req: express.Request, res: express.Response) => {
      res.json({
        message: 'Hello World! Man'
      })
    })
    this.express.use('/', router)
    this.express.use('/api/users', [authMiddleware], UserRouter)
    this.express.use('/api/authenticate', AuthenticateRouter)
  }

}

export default new App().express
