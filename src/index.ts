import * as http from 'http'
import * as debug from 'debug'
import App from './App'
import { normalizePort } from './utils'
const packageJson = require('../package.json')
require('dotenv').load()
debug('ts-express:server')


const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') throw error
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

const onListening = (): void => {
  console.log(`${packageJson.name} ${packageJson.version} listening on port ${port}!`)
  console.log(`PROD mode is ${process.env.PRODUCTON ? 'ON' : 'OFF' }`)
  let addr = server.address()
  let bind = `port ${addr.port}`
  debug(`Listening on ${bind}`)
}

const port = normalizePort(process.env.PORT || 3000)
App.set('port', port)

const server = http.createServer(App)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
