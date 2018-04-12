import { Socket, AppData } from './socketTypes'

type Handler = {
  [key: string]: (param: any) => void
}
type PossibleData = Foo1Data
  | Foo2Data
// TODO: use class or curry fn?
const foo = (app: AppData, socket: Socket<{}, PossibleData>): Handler => ({
  foo1: foo1(app, socket), foo2: foo2(app, socket)
})

// Events
type Foo1Data = {}
type Foo1 = (app: AppData, socket: Socket<Foo1Data, {}>) => (
  data: Foo1Data
) => void
const foo1: Foo1 = (app, socket) => (data) => {
  console.log('foo1', data)
}

type Foo2Data = {}
type Foo2 = (app: AppData, socket: Socket<Foo2Data, {}>) => (
  data: Foo2Data
) => void
const foo2: Foo2 = (app, socket) => (data) => {
  // Reply to sender
  console.log('foo2', data)
  socket.emit('foo3', data)
  app.allSockets.forEach(soc => {
    soc.emit('foo3', data)
  })
}

export default foo
