"use client";

import React from 'react'
import List from './list'
import styles from './conversation.module.scss'
import Header from './header'

export default function index() {
  return (
    <div className={styles.container}>
      <Header/>
      <List/>
    </div>
  )
}
