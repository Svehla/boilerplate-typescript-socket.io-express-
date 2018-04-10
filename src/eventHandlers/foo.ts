const foo = (app, socket) => {
  const handler = {
    foo1: foo1(app, socket),
    foo2: foo2(app, socket)
  }
  return handler
}

// Events
const foo1 = (app, socket) => (data) => {
  console.log('foo1', data)
})

const foo2 = (app, socket) => (data) => {
  // Reply to sender
  console.log('foo2', data)
  socket.emit('foo3', data)
  app.allSockets.forEach(soc => {
    soc.emit('foo3', data)
  })
})

export default foo
