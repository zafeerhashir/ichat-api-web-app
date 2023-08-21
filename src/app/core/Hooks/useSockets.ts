"use client";

import { useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { baseUrl } from '../endpoints';
import events from '../events';
import { AppContext } from '../Providers/context';
import { Message } from '@/app/main/conversations/types';

const useSocket = () => {
  const socket = io(baseUrl);
  const { messages, setMessages } = useContext(AppContext)


  useEffect(() => {

      socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  const privateMessageHandler = (fromUser: string, toUser: string, text: string) => {
    if(messages && messages.length > 0){
      const [ item ] = messages
      const updatedMessages = [...messages, { ...item, text}] 
      setMessages(updatedMessages); 
    }
  }

  socket.on(events.PRIVATE_MESSAGE, privateMessageHandler)

    return () => {
      socket.disconnect();
    };
  }, [socket]);



  const online = (loggedInUserId: string) => {
    socket.emit(events.USER_ONLINE, loggedInUserId);
  };

  const sentMessage  = (loggedInUserId: string, recipientUserId: string, text: string) => {
    socket.emit(events.PRIVATE_MESSAGE, loggedInUserId, recipientUserId, text);
  };


  return { online, sentMessage };
};

export default useSocket;