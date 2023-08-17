"use client"
import React, { useState } from 'react'
import styles from './texting.module.css'

export default function Texting() {
  const [inputValue, setInputValue] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  return (
   <div className={styles.inputContainer}>
    <input
      type="text"
      className={styles.textInput}
      placeholder="Enter text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
    <button className={styles.submitButton} onClick={handleButtonClick}>
      Submit
    </button>
  </div>
  )
}
