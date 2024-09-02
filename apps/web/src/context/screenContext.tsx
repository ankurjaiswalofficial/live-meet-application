"use client";
import React, {createContext, ReactNode, RefObject, useRef} from "react";


const ScreenContext = createContext<RefObject<HTMLVideoElement> | null>(null);

const ScreenContextProvider = ({children}: Readonly<{ children: ReactNode }>) => {
    const screenRef = useRef(null);

    return (
        <ScreenContext.Provider value={screenRef}>
            {children}
        </ScreenContext.Provider>
    )
}


export {ScreenContext, ScreenContextProvider};
