class Users {
  constructor(){
    this.users = []
  }

  addUser(username, room){
    let user = {username: username, room: room}
    this.users.push(user)
    return user;
  }

  updateRoom(username, newRoom){
    this.users[userToUpdate.username].room = newRoom
  }
}



module.exports = {Users}
