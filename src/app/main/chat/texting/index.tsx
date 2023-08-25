"use client"
import React, { useContext, useState, useMemo } from 'react'
import styles from './texting.module.css'
import { io } from 'socket.io-client';
import events from '@/app/core/events';
import useSocket from '@/app/core/Hooks/useSockets';
import { AppContext } from '@/app/core/Providers/context';
import { Conversation, Message, User } from '../../conversations/types';
import { getRecipientUser } from '../utils';


export default function Texting() {
  const [text, setText] = useState('');
  const { conversation = {} as Conversation, setMessages, messages, user = {} as User } = useContext(AppContext)
  const { sentMessage } = useSocket();
  const { users = [] } = conversation;
  const recipientUser = useMemo(() => getRecipientUser(users, user), [conversation])


  const updateMessageList = (loggedInUserId:string, recipientUserId: string) => {
    if(messages && messages.length > 0){
      const [ item ] = messages
      const updatedMessages = [...messages, { ...item, from: { _id: loggedInUserId }, to: { _id: recipientUserId} , text } as Message ] 
      setMessages(updatedMessages); 
    }
  }

  const handleButtonClick = () => {
    if(text && recipientUser && user){
      const { _id: loggedInUserId } = user;
      const { _id: recipientUserId} = recipientUser as User;
      sentMessage(loggedInUserId, recipientUserId, text)
      updateMessageList(loggedInUserId, recipientUserId);
    }
    setText('')
  };

  return (
    <div className={styles.container}> 
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.textInput}
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleButtonClick}>
          Submit
        </button>
      </div>
    </div>
  )
}
