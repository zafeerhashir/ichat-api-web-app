"use client"
import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from './types';
import { Message } from '@/app/main/chat/conversationList/types';
import { Conversation } from '@/app/main/conversations/types';  
import React, { useEffect } from 'react';


type ContextType = {
  messages: Message[] | undefined,
  conversations: Conversation[] | undefined,
  conversation: Conversation | undefined,
  user: User | undefined,
  setUser: (user: User) => void,
  setMessages: (item: Message[]) => void,
  setConversations: (item: Conversation[]) => void,
  setConversation: (item: Conversation) => void,
};

export const AppContext = createContext<ContextType>({ } as ContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>({
    "_id": "647eeead6cb04851500c0f85",
    "username": "cena",
    "email": "cena@gmail.com",
    "__v": 0,
    "online": false,
    "socketId": ""
  });
  const [messages, setMessages] = useState<Message[]>();
  const [conversations, setConversations] = useState<Conversation[]>();
  const [conversation, setConversation] = useState<Conversation | undefined>();

  return (  
      <AppContext.Provider 
        value={{ 
          user,
          setUser,
          messages,
          setMessages,
          conversations,
          setConversations,
          conversation,
          setConversation,
          }}>
        {children}
      </AppContext.Provider>
  );
};

