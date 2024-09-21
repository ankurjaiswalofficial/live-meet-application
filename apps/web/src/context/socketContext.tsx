"use client";
import useMeetInfo from '@/hooks/useMeetInfo';
import useUser from '@/hooks/useUser';
import { SocketContextType } from '@/types/socket-types';
import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import { io } from 'socket.io-client';

const socket = io("ws://localhost:8080");

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

function SocketContextProvider({ children }: Readonly<{ children: ReactNode }>) {
  const user = useUser();
  const meetInfo = useMeetInfo();

  const signal = useCallback(() => (type: string, message: JSON) => {
    if (socket.connected) {
      socket.emit(type, { meetId: meetInfo.meetId, user: user.userData, data: message })
    }
  }, [meetInfo.meetId, user.userData])

  const contextValue = useMemo(() => ({ socket, signal }), [signal]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
