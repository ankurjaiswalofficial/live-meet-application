"use client";
import { RemoteDataProps } from "@/app/meet/components/ContactCard/RemoteCard";
import React, {createContext, ReactNode, useRef} from "react";


const RemoteContext = createContext<RemoteDataProps[]>([]);

const RemoteContextProvider = ({children}:Readonly<{ children: ReactNode }>) => {
    const remoteRef = useRef<RemoteDataProps[]>([]);

    return (
        <RemoteContext.Provider value={remoteRef.current}>
            {children}
        </RemoteContext.Provider>
    )
}


export {RemoteContext, RemoteContextProvider};
