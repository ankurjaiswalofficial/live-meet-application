"use client";
import { UserData } from '@/app/meet/components/ContactCard/ContactCard';
// import { generateFakeUser } from '@/lib/utils';
import React, { createContext, ReactNode, useMemo, useRef } from 'react';


interface UserContextType extends UserData { }

const UserContext = createContext<UserContextType | null>(null);

function UserContextProvider({ children }: Readonly<{ children: ReactNode }>) {
    // const userId = useRef<string>(generateFakeUser());
    const data = useMemo(() => {
        return {
            username: "Peer User",
            email: "randomEmail@email.com",
            imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            userId: `peer_fghjfghj`,
        }
    }, [])
    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, type UserContextType };
export default UserContextProvider
