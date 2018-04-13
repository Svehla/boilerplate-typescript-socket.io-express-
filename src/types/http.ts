import { Request } from 'express'
import { User } from './user'

export interface EnhanceRequest extends Request {
  token: string,
  decoded: User,
}
