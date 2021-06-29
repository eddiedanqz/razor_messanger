// Current users
let  users: {connectionid:string,id:string, username:string, email:string}[]  = []

// Add user
export const joinUser = (connectionid:string,id:string, username:string,email:string) => {
 const user  = users.find(user => user.username === username)

  if (user) {
      return false;
  }

  users.push({connectionid,id,username,email})
  return true
}

//  Disconnect user
export const userLeft = (id:string) => {
 users = users.filter((user) => user.connectionid !== id)

}

// Return current users
export const getUsers = () => users



