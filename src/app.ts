import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()

app.use(cors())
app.use(helmet())

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  socket.on('message', message => {
    console.log(`A user said: ${message}`)
    io.emit('message', message)
  })
})

server.listen(8080, () => {
  console.log('server is running on port 8080')
})
