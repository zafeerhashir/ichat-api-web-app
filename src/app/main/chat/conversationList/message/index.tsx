"use client";

import React, { useContext } from 'react'
import styles from './msg.module.scss'
import { AppContext } from '@/app/core/Providers/AppContext';
import { Message } from '../types';
import { getInitials } from '@/app/core/utilts';


export type Props = {
  item: Message
}

export default function Msg(props: Props) {
  const { item } = props;
  const { user } = useContext(AppContext);

  if (item && user) {
    const { text, from } = item;
    const { _id: fromUserId } = from;
    const { _id: loggedInUserId } = user;
    const messageSent = fromUserId === loggedInUserId;
  
    if(messageSent) {
      return (
          <div className={styles.sentContainer}>
            <div className={styles.sentText}>
              {text}
            </div>
          </div>
      )
    }
    return (
        <div className={styles.receivedContainer}>
          <div className={styles.receivedText}>
            {text}
          </div>
        </div>
    )
  }

  return null;
 
}
