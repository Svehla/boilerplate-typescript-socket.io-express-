import { Request, Response, NextFunction } from 'express'
import { verifyJWTToken } from './auth'

type UserData = {}
interface EnhanceRequest<UserData> extends Request {
  token: string,
  decoded: UserData,
}

const authMiddleware = (
  req: EnhanceRequest<UserData>,
  res: Response,
  next: NextFunction
) => {
  console.log('auth')
  console.log('____________________')
  let token = req.token
  console.log(token)
  if (token) {
    try {
      const decoded = verifyJWTToken(token)
      console.log(decoded)
      req.decoded = decoded
      next()
    } catch (e) {
      res.json({ success: false, message: 'Failed to authenticate token.' })
      res.sendStatus(401)
    }
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }

}

export default authMiddleware
