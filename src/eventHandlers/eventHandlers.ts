import foo from './foo'
import bar from './bar'
// --------------------------------------
// -------- SOCKET.IO handlers ----------
// --------------------------------------

const app = {
  allSockets: []
}
// structure inspired by
// https://stackoverflow.com/questions/20466129/how-to-organize-socket-handling-in-node-js-and-socket-io-app
export default (io) => {
  // Chatroom
  // let numUsers = 0
  io.on('connection', socket => {

    let eventHandlers = {
      foo: foo(app, socket),
      bar: bar(app, socket)
    }
    // Bind events to handlers
    for (let category in eventHandlers) {
      const handler = eventHandlers[category]
      for (let eventName in handler) {
        socket.on(eventName, handler[eventName])
      }
    }

    // Keep track of the socket
    app.allSockets.push(socket)
  })
}
