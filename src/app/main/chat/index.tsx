"use client";
import React from 'react'
import Texting from './texting';
import ConversationList from './conversationList';
import styles from './chat.module.css'
import Header from './header';

export default function List() {
  return (
    <div className={styles.container}>
      <Header/>
      <ConversationList/>
      <Texting/>
    </div>
  )
}
