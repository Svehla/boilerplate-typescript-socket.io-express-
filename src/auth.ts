import * as jwt from 'jsonwebtoken'

export const createJWTToken = (username: string) => (
  jwt.sign(
    { username },
    process.env.JWT_SECRET
  )
)

export const verifyJWTToken = (token) => (
  jwt.verify(token, process.env.JWT_SECRET)
)
