"use client";
import { SocketContextType } from '@/types/socket-types';
import React, { createContext, ReactNode, useMemo } from 'react';
import { io } from 'socket.io-client';

const socket = io("ws://localhost:8080");

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

function SocketContextProvider({ children }: Readonly<{ children: ReactNode }>) {

  const contextValue = useMemo(() => ({ socket }), []);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
