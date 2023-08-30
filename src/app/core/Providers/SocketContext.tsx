"use client"
import React, { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { baseUrl } from '../endpoints';

interface SocketContextType {
  socket: Socket | null;
  subscribe: (event: string, callback: (...args: any[]) => void) => void;
  unsubscribe: (event: string, callback: (...args: any[]) => void) => void;
  emit: (...args: [string, ...any[]]) => void;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketInstance = io(baseUrl);

  const subscribe = (event: string, callback: (...args: any[]) => void) => {
    socketInstance.on(event, callback);
  };

  const unsubscribe = (event: string, callback: (...args: any[]) => void) => {
    socketInstance.off(event, callback);
  };

  const emit = (...args: [string, ...any[]]) => {
    const [eventname, ...rest] = args;
    socketInstance.emit(eventname, ...rest);
  };

  const socketContextValue: SocketContextType = {
    socket: socketInstance,
    subscribe,
    unsubscribe,
    emit,
  };

  return (
    <SocketContext.Provider value={socketContextValue}>
      {children}
    </SocketContext.Provider>
  );
};