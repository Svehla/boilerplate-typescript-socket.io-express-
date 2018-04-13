import { Response, NextFunction } from 'express'
import { EnhanceRequest } from '../types/http'
import { verifyJWTToken } from './authUtils'
import data from '../data'

const NOT_AUTH_401_MSG = 'Failed to authenticate token.'

const authMiddleware = (
  // there is any becouse we don't care about shape of user data
  req: EnhanceRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.token
  if (token) {
    try {
      const decoded = verifyJWTToken(token)
      const email = decoded.email
      const user = data.users.find(user => user.email === email)
      if (user) {
        req.decoded = user
        next()
      } else {
        // this use case should not happen
        // but for example: when you have old token and your account is deleted
        res.status(401).json({
          success: false,
          message: NOT_AUTH_401_MSG
        })
      }
    } catch (e) {
      // unsuccessful decoding of jwt
      res.status(401).json({
        success: false,
        message: NOT_AUTH_401_MSG
      })
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
