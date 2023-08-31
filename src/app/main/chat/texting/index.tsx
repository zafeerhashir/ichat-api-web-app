"use client"
import useSocket from '@/app/core/Hooks/useSockets';
import { AppContext } from '@/app/core/Providers/AppContext';
import events from '@/app/core/events';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Conversation, Message, User } from '../../conversations/types';
import { getRecipientUser } from '../utils';
import styles from './texting.module.css';


export default function Texting() {
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const { conversation = {} as Conversation, setMessages, messages, user = {} as User } = useContext(AppContext)
  const sockets = useSocket();
  const { users = [] } = conversation;
  const recipientUser = useMemo(() => getRecipientUser(users, user), [conversation])

  useEffect(() => {
    if(typing){
      sockets.emit(events.USER_TYPING, true);
    }
    else {
      sockets.emit(events.USER_TYPING, false);
    }
  }, [typing]);

  const updateMessageList = (loggedInUserId:string, recipientUserId: string) => {
    if(messages && messages.length > 0){
      const [ item ] = messages
      const updatedMessages = [...messages, { ...item, from: { _id: loggedInUserId }, to: { _id: recipientUserId} , text } as Message ] 
      setMessages(updatedMessages); 
    }
  }

  const emitEvent = () => {
    if(text && recipientUser && user){
      const { _id: loggedInUserId } = user;
      const { _id: recipientUserId} = recipientUser as User;
      sockets.emit(events.PRIVATE_MESSAGE, loggedInUserId, recipientUserId, text)
      updateMessageList(loggedInUserId, recipientUserId);
    }
    setText('')
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if(event.key === 'Enter'){
      emitEvent()
    }
  } 

  const onClick = () => {
    emitEvent()
  } 

  const onChange = (value: string) => {
    if(value){
      setTyping(true)
    }
    else {
      setTyping(false)
    }
    setText(value);
  } 

  return (
    <div className={styles.container}> 
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.textInput}
          placeholder="Enter text"
          value={text}
          onKeyDown={onKeyDown}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className={styles.submitButton} onClick={onClick}>
          Submit
        </button>
      </div>
    </div>
  )
}
