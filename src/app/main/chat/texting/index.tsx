"use client"
import React, { useContext, useState } from 'react'
import styles from './texting.module.css'
import { io } from 'socket.io-client';
import events from '@/app/core/events';
import useSocket from '@/app/core/Hooks/useSockets';
import { AppContext } from '@/app/core/Providers/context';
import { Conversation, User } from '../../conversations/types';


export default function Texting() {
  const [inputValue, setInputValue] = useState('');
  const { conversation = {} as Conversation } = useContext(AppContext)
  const { sentMessage } = useSocket();

  const handleButtonClick = () => {
    if(inputValue && conversation){
      const { users = [] } = conversation;
      const [ fromUser = {} as User, toUser = {} as User] = users
      const { _id: loggedInUserId } = fromUser;
      const { _id: recipientUserId} = toUser;
      sentMessage(loggedInUserId, recipientUserId, inputValue)
    }
    setInputValue('')
  };

  return (
    <div className={styles.container}> 
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.textInput}
          placeholder="Enter text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleButtonClick}>
          Submit
        </button>
      </div>
    </div>
  )
}
