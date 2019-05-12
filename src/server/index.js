// const server = require('http').createServer()
const port = process.env.PORT || 3001
const express = require('express')
const socket = require('socket.io')

const app = express();
// app.use(express.static('public'));

const server = app.listen(`${port}`, ()=> {
  console.log(`listening on port ${port}`)
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })


const io = socket(server)

let users = {}
let usernames = []
let pairedUserSocketId;
let currentUserSocketId;
let rooms = {
  roomNames: []
}
// let otherServer = {
//   "connections" : 0,
//   "chatrooms" : [{person1: null, person2: null}]
// }

// rooms = {
// roomNames: []
// roomName: {people: 1}
// }


io.on('connection', (socket) =>{
  console.log('made socket connection', socket.id)

// --------- JOIN ROOM --------- //
  socket.on('join room', (user) => {
    console.log(user, "wants To Join")

    let roomToJoin = rooms.roomNames.find(roomName => {
            return rooms[roomName].people === 1
          })

          console.log("ROOM TO JOIN IS ", roomToJoin)
          console.log("THIS SHOULD BE WORKING ", !roomToJoin)
      // user the first user's socketId as a key pointing to an array
      // the array contains the usernames
      // if length is one, push current user into

    if( !roomToJoin || !rooms.roomNames.length ){
      // if there are no rooms to join or none with open spots, we make a room and join it, add roomname to rooms[roomNames]
      socket.join(`${socket.id}`)
      rooms[`${socket.id}`] = {people: 1}
      rooms.roomNames.push(`${socket.id}`)

      io.sockets.emit('send message', {user: user, room: socket.id, notification: true, message: "Waiting for another user to connect...."})
// console.log("THESE ARE CONNECTED SOCKETS",io.sockets.connected)
// console.log("THIS IS THE CONNECT SOCKET", io.sockets.connected[socket.id])
      // io.sockets.connected[`${socket.id}~`].emit('send message', {user: user, room: socket.id, notification: true, message: "Waiting for another user to connect...."})
    } else if (roomToJoin) {



      socket.join(roomToJoin)
      rooms[roomToJoin].people++

      io.sockets.emit('send message', {notification: true, message: "You've been connected with random user!"})
    }

  console.log(rooms)
//     if(!rooms[room] || (rooms[room] && rooms[room].people === 2)){
//       // if the room doesn't exist or that room is full, make room out of currentUser socketId and join it. Add socketId to list of rooms
//
//       socket.join(socket.id)
//       room[roomNames].push(socket.id)
//
//       io.socket.connected[socket.id].emit('notification', { notification: true, message: "waiting to pair you with another user!"})
//     } else {
//     socket.to(room).emit('user joined', socket.id)
  })

  // --------- SENDING A MESSAGE --------- //
  socket.on('send message', (data) => {

    io.sockets.emit('send message', {notification: data.notification, username: data.username, message: data.message, other: "hello"})
  })

// ---------  HANDLING NOTIFICATIONS  --------- //
  socket.on('notification', (data) => {
    io.socket.connected[socket.id].emit('send message', data)
  })

// --------- SETTING THE USER --------- //
  socket.on('set user', (currentUser) => {



    users[currentUser] = {socketId: socket.id, paired: false}
    usernames.push(currentUser)

    let pairedUser = usernames.find(user => {
  return users[user].socketId !== users[currentUser].socketId && users[user].paired === false
    //   if(users[user].socketId !== users[currentUser].socketId ){
    //     if ()
    //     pairedUserSocketId = users[user].socketId
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

  if(!pairedUserSocketId){

  }
  // otherUsers.find(user => {})

  console.log(pairedUserSocketId)
  console.log(users)

})


// go through
// HOPPING TO NEXT USER
  socket.on('hop', (data) => {
    console.log("hop")
    // io.sockets.emit('hop', data)
  })

// DISCONNECTING
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
