// const server = require('http').createServer()
const port = process.env.PORT || 3001
const express = require('express')
const socket = require('socket.io')

const app = express();
// app.use(express.static('public'));

const server = app.listen(`${port}`, ()=> {
  console.log(`listening on port ${port}`)
})
//
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const io = socket(server)

let users = {}
let usernames = []
let pairedUserSocketId;
// let otherServer = {
//   "connections" : 0,
//   "chatrooms" : [{person1: null, person2: null}]
// }

const checkUser = (user) => {

}

io.on('connection', (socket) =>{
  console.log('made socket connection', socket.id)

  // socket.on('join room', (room) => {
  //   socket.join(room)
  //   socket.to(room).emit('user joined', socket.id)
  // })

  socket.on('set user', (currentUser) => {

    users[currentUser] = {socketId: socket.id, paired: false}
    usernames.push(currentUser)

    let pairedUser = usernames.find(user => {
  return users[user].socketId !== users[currentUser].socketId && users[user].paired === false
    //   if(users[user].socketId !== users[currentUser].socketId ){
    //     if ()
    //     pairedUserSocketId = users[user].socketId
    //     users[user].paired = true
    //     users[currentUser].paired = true
    //   } else {
    //     console.log("UR V ALONE")
    //   }
    // })
    // console.log(pairedUser)
    // console.log(Object.keys(users))
    // let userIndex = Object.keys(users).indexOf(currentUser)
    // let pairedUser = Object.
    // //server -> { chatroom -> (person1data, person2 data) }
    // console.log(userIndex)
    // USE USERNAME TO FIND index
    // START SEARCHING FROM END OF USERS:KEYS-ARRAY, GRAB INDEX
    // IF THE INDEX IS EVEN
      // GRAB THAT USERNAME AND FIND THE KEY IN THE USERS { } OBJ
      // USER THAT AS A VAR AND USE IT FOR IO.SOCKETS.EMIT EXCEPT IT'S ONLY FOR 1 USER
    // ELSE
      // TELL USER THAT THEY HAVE TO WAIT

  })
  pairedUserSocketId = pairedUser && users[pairedUser].socketId
  // otherUsers.find(user => {})

  console.log(pairedUserSocketId)

})


  // console.log(Object.keys(io.sockets.connected))

  socket.on('send message', (data) => {
    console.log("the data is: ", data)
    io.to(`${pairedUserSocketId}`).emit('send message', data)
  })

  socket.on('hop', (data) => {
    console.log("hop")
    // io.sockets.emit('hop', data)
  })


  socket.once('disconnect', () => {
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
