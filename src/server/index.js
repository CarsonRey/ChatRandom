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
            rooms[roomName].people === 1
          })

    if(!rooms.roomNames.length || roomToJoin == false){
      // if there are no rooms to join or none with open spots, we make a room and join it, add roomname to rooms[roomNames]
      socket.join(socket.id)
      rooms[socket.id] = {people: 1}
      rooms.roomNames.push(socket.id)

      socket.emit('notification', {notification: true, message: "Waiting for another user to connect...."})
    } else {
      socket.join(roomToJoin)
      rooms[roomToJoin].people = 2

      io.in(roomToJoin).emit('notification', {notification: true, message: "You're now in a room with the ID of: ", roomToJoin})
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
//
// // does this room exist or not
//       socket.join(roomtoJoin)
//     }
//
//     socket.join(room)
//     socket.to(room).emit('user joined', socket.id)
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


// user the first user's socketId as a key pointing to an array
// the array contains the usernames
// if length is one, push current user into
// go through

// SENDING A MESSAGE
  socket.on('send message', (data) => {
    currentUserSocketId = socket.id
    console.log("the data is: ", data)
    io.sockets.connected[socket.id].emit('send message', data)
  })
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
