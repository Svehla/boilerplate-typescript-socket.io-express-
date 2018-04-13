import * as jwt from 'jsonwebtoken'

type UserData = {
  email: string,
  id: string | number
}
export const createJWTToken = (userData: UserData) => (
  jwt.sign(
    userData,
    process.env.JWT_SECRET
  )
)

type VerifyTokenData = {
  email: string,
  id: string | number,
  iat: number
}
export const verifyJWTToken = (token): VerifyTokenData => (
  jwt.verify(token, process.env.JWT_SECRET)
)
