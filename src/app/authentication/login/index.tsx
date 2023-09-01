"use client";
import React, { useState, useContext } from 'react';
import styles from './login.module.scss';
import { AppContext } from '@/app/core/Providers/AppContext';
import { User } from '@/app/core/Providers/types';
import { baseUrl, login } from '@/app/core/endpoints';

const postFetcher = async (url: string, options: RequestInit): Promise<User> => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

export default function Index() {
  const { setUser } = useContext(AppContext);
  const [username, setUsername] = useState<string>('');

  const loggedInUser = async () => {
    const url = `${baseUrl}${login}`;
    const postData = {
      username,
    };
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(postData),
    };
  
    try {
      const user = await postFetcher(url, options);
      if(user){
        setUser(user);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handleLogin = (): void => {
    if(username){
      loggedInUser()
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1>ChattaAmico</h1>
        <input
          type="text"
          placeholder="Username"
          className={styles.textInput}
          value={username}
          onChange={handleUsernameChange}
        />
        <button 
          className={styles.button}
          onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

