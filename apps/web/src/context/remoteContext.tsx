"use client";
import { RemoteContextProps } from "@/types/card-types";
import React, { createContext, ReactNode, useMemo, useState } from "react";

const RemoteContext = createContext<RemoteContextProps | null>(null);

const RemoteContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    const [remoteContent, setRemoteContent] = useState<RemoteContextProps["remoteContent"]>({});
    // const [remoteData, setRemoteData] = useState<RemoteContextProps["remoteContent"]>({});

    const contextValue = useMemo(() => {
        return { remoteContent, setRemoteContent };
    }, [remoteContent]);

    return (
        <RemoteContext.Provider value={contextValue}>
            {children}
        </RemoteContext.Provider>
    );
};

export { RemoteContext, RemoteContextProvider };
