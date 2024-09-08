"use client";
import { SocketContextType } from '@/types/socket-types';
import React, { createContext, ReactNode, useMemo } from 'react';
import { io } from 'socket.io-client';


export const SocketContext = createContext<SocketContextType | undefined>(undefined);

function SocketContextProvider({ children }: Readonly<{ children: ReactNode }>) {
  const socket = useMemo(() => io("ws://localhost:8080"), []);

  const contextValue = useMemo(() => ({ socket }), [socket]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
