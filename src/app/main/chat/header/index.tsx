import React, { useContext } from 'react'
import styles from './header.module.scss'
import { AppContext } from '@/app/core/Providers/context';
import { formatUsername, getInitials } from '@/app/core/utilts';
import { User } from '../../conversations/types';

export default function Header() {
  const { user } = useContext(AppContext);
  const { username } = user as User;

  return (
    <div className={styles.header}>
    <div className={styles.avatar}>
      <div className={styles.initials}>{getInitials(username as string)}</div>
    </div>
    <div className={styles.name}>{formatUsername(username as string)}</div>
  </div>
  )
}
