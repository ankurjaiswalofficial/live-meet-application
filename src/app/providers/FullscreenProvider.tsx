import React, { ReactNode } from "react";
import { FullscreenContext, FullscreenContextJSON } from "../contexts/FullscreenContext";

export default function FullscreenProvider({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <FullscreenContext.Provider value={FullscreenContextJSON}>
            {children}
        </FullscreenContext.Provider>
    );
}
