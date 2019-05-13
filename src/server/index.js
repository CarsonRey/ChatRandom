// const server = require('http').createServer()

const express = require('express')
const socket = require('socket.io')

const {Users} = require('./users.js')

// let users = new Users();
const port = process.env.PORT || 3001
const app = express();

// app.use(express.static('public'));

const server = app.listen(`${port}`, ()=> {
  console.log(`listening on port ${port}`)
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })


const io = socket(server)


let usernames = []
let pairedUserSocketId;
let currentUserSocketId;
let rooms = {
  roomNames: []
}

let users = {}



io.on('connection', (socket) =>{
  console.log('made socket connection', socket.id)

// --------- JOIN ROOM --------- //
  socket.on('join room', (user) => {
    console.log(user, "wants To Join")

    let roomToJoin = rooms.roomNames.find(roomName => {
            return rooms[roomName].people === 1
          })

          console.log("ROOM TO JOIN IS ", roomToJoin)

    if( !roomToJoin || !rooms.roomNames.length ){


      // if there are no rooms to join or none with open spots, we make a room and join it, add roomname to rooms[roomNames]
      socket.join(`${socket.id}`)

      rooms[`${socket.id}`] = {people: 1}
      rooms.roomNames.push(`${socket.id}`)


      let updatedUsers = Object.assign({}, users, {[`${user}`]: `${socket.id}`})
      users = updatedUsers
      let userRoom = users[user]
      console.log("HELLO HELLO USERS OBJECT IS ", users)

      io.sockets.emit('send room', {users: users, user: user, room:`${socket.id}`})
      io.sockets.emit('send message', {room: userRoom, notification: true, message: "Waiting for another user to connect...."})
        // io.to(userRoom).emit('send message', {room: userRoom, notification: true, message: "Waiting for another user to connect...."})

    } else if (roomToJoin) {

      socket.join(`${roomToJoin}`)
      rooms[`${roomToJoin}`].people++

      let updatedUsers = Object.assign({}, users, {[`${user}`]: `${roomToJoin}`})
      users = updatedUsers
      let userRoom = users[user]



      io.sockets.emit('send room', {users: users, user: user, room:`${roomToJoin}`})
      io.sockets.emit('send message', {user: user, room: userRoom, notification: true, message: "You've been connected with random user!"})
    }

  console.log(rooms)
  })

  // --------- SENDING ROOM --------- //
  socket.on('send room', (roomName) => {
    console.log("sending room to App component")
  })

  socket.on('update users', (usersObj) => {
    console.log("currently updating users", usersObj)
    io.sockets.emit('update users', {users: usersObj})
  })

  // --------- HOPPING TO NEW CHAT --------- //
  socket.on('hop', () => {
    console.log("hop")
  })

  // --------- SENDING A MESSAGE --------- //
  socket.on('send message', (data) => {
  let userRoom = users[data.user]

  console.log(users)
    io.sockets.emit('send message', {notification: data.notification, username: data.username, message: data.message, room: userRoom})
  })
//   io.in(`${users[data.username]}`).emit('send message', {notification: data.notification, username: data.username, message: data.message, room: data.room})
// })
  // DISCONNECTING
  socket.once('disconnect', () => {
    console.log('user disconnected')
  })
})

// // --------- SETTING THE USER --------- //
//   socket.on('set user', (currentUser) => {
//
//     users[currentUser] = {socketId: socket.id, paired: false}
//     usernames.push(currentUser)
//
//     let pairedUser = usernames.find(user => {
//   return users[user].socketId !== users[currentUser].socketId && users[user].paired === false
//     //   if(users[user].socketId !== users[currentUser].socketId ){
//     //     if ()
//     //     pairedUserSocketId = users[user].socketId
//     //   } else {
//     //     console.log("UR V ALONE")
//     //   }
//     // })
//     // console.log(pairedUser)
//     // console.log(Object.keys(users))
//     // let userIndex = Object.keys(users).indexOf(currentUser)
//     // let pairedUser = Object.
//     // //server -> { chatroom -> (person1data, person2 data) }
//     // console.log(userIndex)
//     // USE USERNAME TO FIND index
//     // START SEARCHING FROM END OF USERS:KEYS-ARRAY, GRAB INDEX
//     // IF THE INDEX IS EVEN
//       // GRAB THAT USERNAME AND FIND THE KEY IN THE USERS { } OBJ
//       // USER THAT AS A VAR AND USE IT FOR IO.SOCKETS.EMIT EXCEPT IT'S ONLY FOR 1 USER
//     // ELSE
//       // TELL USER THAT THEY HAVE TO WAIT
//
//   })
//
// })
