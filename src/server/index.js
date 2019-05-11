// const server = require('http').createServer()
const port = process.env.PORT || 3001
const express = require('express')
const socket = require('socket.io')

const app = express();
app.use(express.static('public'));

const server = app.listen(`${port}`, ()=> {
  console.log(`listening on port ${port}`)
})
//
// app.get('/', (req, res) => {
//   res.render('../../public/index.html')
// })

const io = socket(server)

io.on('connection', (socket) =>{
  console.log('made socket connection', socket.id)


  socket.on('send message', (data) => {
    console.log("the data is: ", data)
    io.sockets.emit('send message', data)
  })


  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// var btn
//
//
// btn.addEventListener('click', () => {
//   socket.emit('chat', {
//     message: message.value,
//     username: username.value
//   })
// })





// const socket = require('./socket')
