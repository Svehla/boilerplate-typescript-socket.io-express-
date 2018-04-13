import { Router, Request, Response, NextFunction } from 'express'
import data from '../data'
import { EnhanceRequest } from '../types/http'

const NO_USER_WITH_ID = 'No user found with the given id.'

const users = data.users
/*
 * private router -> only for logged user
 */
export class UserRouter {
  router: Router

  /**
   * Initialize the UserRouter
   */
  constructor () {
    this.router = Router()
    this.init()
  }

  /**
   * GET all users.
   */
  public getAll (req: EnhanceRequest, res: Response, next: NextFunction) {
    // check header or url parameters or post parameters for token
    res.send(users)
  }

  /**
   * GET one user by id
   */
  public getOne (req: Request, res: Response, next: NextFunction) {
    const query = parseInt(req.params.id, 10)
    const user = users.find(user => user.id === query)
    if (user) {
      res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          user
        })
    } else {
      res.status(404)
        .send({
          message: NO_USER_WITH_ID,
          status: res.status
        })
    }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init () {
    this.router.get('/', this.getAll)
    this.router.get('/:id', this.getOne)
  }

}

// Create the UserRoutes, and export its configured Express.Router
const userRoutes = new UserRouter()
userRoutes.init()

export default (userRoutes.router)
