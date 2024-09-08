import { useContext } from "react";
import { MediaContext } from "@/context/mediaContext";

/* 
// import { AudioContext } from "@/context/dump/audioContext";
// import { ScreenContext } from "@/context/screenContext";
// import { VideoContext } from "@/context/videoContext";

// const useMedia = () => {
//     const audioContext = useContext(AudioContext);
//     const videoContext = useContext(VideoContext);
//     const screenContext = useContext(ScreenContext);

//     if (!audioContext) {
//         throw new Error("useMedia must be used within a AudioContextProvider");
//     }
//     if (!videoContext) {
//         throw new Error("useMedia must be used within a VideoContextProvider");
//     }
//     if (!screenContext) {
//         throw new Error("useMedia must be used within a VideoContextProvider");
//     }
//     return {audioContext, videoContext, screenContext};
// };

// export default useMedia; */

const useMedia = () => {
    const context = useContext(MediaContext);
    
    if (!context) {
        throw new Error("useMedia must be used within a MediaContext");
    }
    return context;
};

export default useMedia;

