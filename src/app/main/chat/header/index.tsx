import React, { useContext, useMemo } from 'react'
import styles from './header.module.scss'
import { AppContext } from '@/app/core/Providers/AppContext';
import { formatUsername, getInitials } from '@/app/core/utilts';
import { Conversation, User } from '../../conversations/types';
import { getRecipientUser } from '../utils';

export default function Header() {
  const { conversation = {} as Conversation, user = {} as User }  = useContext(AppContext)
  const { users = [] } = conversation
  const recipientUser = useMemo(() => getRecipientUser(users, user), [conversation])

  return (
    <div className={styles.header}>
    <div className={styles.avatar}>
      { recipientUser &&
      <div className={styles.initials}>{getInitials(recipientUser.username as string)}</div>
      }
    </div>
    { recipientUser &&
     <div className={styles.name}>{formatUsername(recipientUser.username as string)}</div>
    }
  </div>
  )
}
