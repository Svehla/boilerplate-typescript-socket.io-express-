import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import HeroRouter from './routes/HeroRouter'

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
  private middleware (): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  // Configure API endpoints.
  private routes (): void {
    let router: express.Router = express.Router()
    // placeholder route handler
    router.get('/', (req: express.Request, res: express.Response) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
    this.express.use('/api/v1/heroes', HeroRouter)
  }

}

export default new App().express
