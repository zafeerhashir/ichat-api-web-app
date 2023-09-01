"use client";
import React from 'react'
import Texting from './texting';
import ConversationList from './conversationList';
import Header from './header';
import UserTyping from './userTyping';
import styles from './chat.module.scss'

export default function List() {
  return (
    <div className={styles.container}>
      <Header/>
       <ConversationList/>
       <UserTyping/>      
      <Texting/> 
    </div>
  )
}
