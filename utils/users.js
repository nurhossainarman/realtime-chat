
var counter = 0;

//Creates a newUser object, pushes the obj to usersList array 
function joinUser(usersList, user, socketId){
    let newUser = {
        username: user,
        id: counter++,
        socketId: socketId
    }
    usersList.push(newUser);   
}

function filterUser(usersList, socketId){
    return usersList.filter((user)=>{
        return user.socketId !== socketId;
    })
}

function getUserBySocketId(usersList, socketId) {
    for (const user of usersList) {
      if (user.socketId === socketId) {
        return user;
      }
    }
    return null;
  }

module.exports = {
    joinUser,
    getUserBySocketId,
    filterUser
}