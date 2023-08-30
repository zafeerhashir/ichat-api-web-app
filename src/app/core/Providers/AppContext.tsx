"use client"
import { createContext, useState, ReactNode } from 'react';
import { User } from './types';
import { Message } from '@/app/main/chat/conversationList/types';
import { Conversation } from '@/app/main/conversations/types';  
import React, { useEffect } from 'react';


type ContextType = {
  authenticated: boolean | undefined,
  messages: Message[] | undefined,
  conversations: Conversation[] | undefined,
  conversation: Conversation | undefined,
  user: User | undefined,
  setUser: (user: User) => void,
  setMessages: (item: Message[]) => void,
  setConversations: (item: Conversation[]) => void,
  setConversation: (item: Conversation) => void,
  setAuthenticated: (authenticate: boolean) => void,
};

export const AppContext = createContext<ContextType>({ } as ContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>();
  const [conversations, setConversations] = useState<Conversation[]>();
  const [conversation, setConversation] = useState<Conversation | undefined>();
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  
  React.useEffect(() => {
    if(user){
      setAuthenticated(true)
    }
  },[user])

  const contextValue: ContextType = {
    authenticated,
    setAuthenticated,
    user,
    setUser,
    messages,
    setMessages,
    conversations,
    setConversations,
    conversation,
    setConversation,
  };

  return (  
      <AppContext.Provider 
        value={contextValue}>
        {children}
      </AppContext.Provider>
  );
};

