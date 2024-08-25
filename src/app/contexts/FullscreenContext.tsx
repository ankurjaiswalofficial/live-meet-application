import React from 'react';


export const FullscreenContextJSON = () => {
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    const handleFullscreen = React.useCallback(() => {
        const documentElement = document.documentElement;

        if (!isFullscreen) {
            if (documentElement.requestFullscreen) {
                documentElement
                    .requestFullscreen()
                    .then(() => {
                        setIsFullscreen(true);
                    })
                    .catch((error) => {
                        console.error("Error requesting fullscreen:", error);
                    });
            }
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }, [isFullscreen]);

    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement !== null);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, [isFullscreen]);

    const fullscreenObject = { isFullscreen, handleFullscreen };

    return fullscreenObject;
}

export const FullscreenContext = React.createContext(FullscreenContextJSON);

export const useFullscreen = () => {
    return React.useContext(FullscreenContext);
}

