import { User } from "../conversations/types"

export const getRecipientUser = (users: User[], user: User) => {
  for(let i = 0 ; i < users.length ; i++){
    if(users[i]._id !== user._id){
      return users[i]
    }
  }
}