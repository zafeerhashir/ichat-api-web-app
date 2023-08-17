
export interface Message {
  _id: string
  conversation: string
  from: From
  to: To
  text: string
  createdAt: string
  __v: number
}

export interface From {
  _id: string
  username: string
  email: string
  __v: number
  online: boolean
  socketId: string
}

export interface To {
  _id: string
  username: string
  email: string
  __v: number
  online: boolean
  socketId: string
}
