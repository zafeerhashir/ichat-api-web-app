export interface Conversation {
  _id: string
  users: User[]
  messages: Message[]
  createdAt: string
  __v: number
}

export interface User {
  _id: string
  username: string
  email: string
  __v: number
  online: boolean
  socketId: string
}

export interface Message {
  _id: string
  conversation: string
  from: User
  to: User
  text: string
  createdAt: string
  __v: number
}
