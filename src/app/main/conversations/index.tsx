import React from 'react'
import List from './list'
import styles from './conversation.module.scss'

export default function index() {
  return (
    <div className={styles.container}>
      <List/>
    </div>
  )
}
