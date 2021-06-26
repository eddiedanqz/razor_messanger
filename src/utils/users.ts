let  users: {id:string, username:string}[]  = []

// Add user
export const joinUser = (id:string, username:string) => {
 const user  = users.find(user => user.username === username)

  if (user) {
      return false;
  }

  users.push({id,username})
  return true
}

//  Disconnect user
export const userLeft = (id:string) => {
 users = users.filter((user) => user.id !== id)

}

// Return current users
export const getUsers = () => users



