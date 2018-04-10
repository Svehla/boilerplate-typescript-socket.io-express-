
type NormalizePort = (val: number | string) => number | string | boolean
export const normalizePort: NormalizePort = val => {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val
  if (isNaN(port)) return val
  else if (port >= 0) return port
  else return false
}
