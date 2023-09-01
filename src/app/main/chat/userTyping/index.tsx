import React, { useState } from 'react'
import useSocket from '@/app/core/Hooks/useSockets';
import styles from './typing.module.scss'
import events from '@/app/core/events';

export default function UserTyping() {
  const sockets = useSocket();
  const [typing, setTyping] = useState(false);
  
  const updateMessagesOnPrivateMessage = (typing: string) => {
    setTyping(!!typing)
  };
  
  sockets.subscribe(events.USER_TYPING, updateMessagesOnPrivateMessage);

  if(typing){
    return (
      <div className={styles.dots}>
        <div className={styles.dot}/>
        <div className={styles.dot}/>
        <div className={styles.dot}/>
      </div>
    )
  }
  return  <div className={styles.dots}/>
}

