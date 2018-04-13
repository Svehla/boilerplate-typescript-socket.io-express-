import { Router, Request, Response, NextFunction } from 'express'
import { createJWTToken } from '../auth/authUtils'
import data from '../data'

type ReqBody = {
  email: string,
  password: string
}

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
    const { email, password }: ReqBody = req.body
    const user = data.users.find(user => user.email === email)
    if (user) {
      if (password === user.password) {
        const jwt = createJWTToken({
          email,
          id: user.id
        })
        res.send({ jwt })
      } else {
        res.status(401).send('Password is not correct')
      }
    } else {
      res.status(401).send('User name does not exist')
    }
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
