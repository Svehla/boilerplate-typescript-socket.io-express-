import { Router, Request, Response, NextFunction } from 'express'
import { createJWTToken } from '../auth'
/*
const users = {
  users: [
    { id: 0, name: 'Me', password: '1234' }
  ]
}
*/
console.log(process.env.JWT_SECRET)

export class Authenticate {
  router: Router

  /**
   * Initialize the HeroRouter
   */
  constructor () {
    this.router = Router()
    this.init()
  }

  /**
   * POST all authenticate
   */
  public authenticate (req: Request, res: Response, next: NextFunction) {
    const { username } = req.body
    const jwt = createJWTToken(username)
    res.send({ jwt })
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init () {
    this.router.post('/', this.authenticate)
  }

}

// Create the HeroRouter, and export its configured Express.Router
const authenticateRoutes = new Authenticate()
authenticateRoutes.init()

export default (authenticateRoutes.router)
