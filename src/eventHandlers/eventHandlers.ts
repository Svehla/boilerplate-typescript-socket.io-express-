import { Server } from 'socket.io'
import foo from './foo'
import bar from './bar'
import { Socket, AppData } from './socketTypes'

// --------------------------------------
// -------- SOCKET.IO handlers ----------
// --------------------------------------

const app: AppData = {
  allSockets: []
}
// structure inspired by
// https://stackoverflow.com/questions/20466129/how-to-organize-socket-handling-in-node-js-and-socket-io-app
export default (io: Server) => {
  // Chatroom
  io.on('connection', (socket: Socket<any, any>) => {

    const eventHandlers = [
      foo(app, socket),
      bar(app, socket)
    ]

    // Bind events to handlers
    eventHandlers.forEach(handler => {
      for (let eventName in handler) {
        socket.on(eventName, handler[eventName])
      }
    })

    // Keep track of the socket
    app.allSockets.push(socket)
  })
}
