import {cn} from '@/lib/utils'
import {useContext} from "react";
import {AudioContext} from "@/context/audioContext";

export default function AudioElement() {
    const audioRef = useContext(AudioContext);
    return (
        <audio ref={audioRef} autoPlay className={cn({"invisible": true})}></audio>
    )
}
