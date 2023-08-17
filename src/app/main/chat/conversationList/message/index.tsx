import React, { useContext } from 'react'
import styles from './msg.module.scss'
import { AppContext } from '@/app/core/Providers/context';
import { Message } from '../types';
import { getInitials } from '@/app/core/utilts';


export type Props = {
  item: Message
}

export default function Msg(props: Props) {
  const { item } = props;
  const { user } = useContext(AppContext);

  if (item && user) {
    const { text, from, to } = item;
    const { _id: fromUserId } = from;
    const { _id: userId, username } = user;
    const messageSent = fromUserId === userId;
  
    if(messageSent) {
      return (
          <div className={styles.sentContainer}>
              <div className={styles.avatar}>
                <div className={styles.initials}>{getInitials(username as string)}</div>
              </div>
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
