import { useMemo } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const useMeetInfo = () => {
    const meetId = useSelector((state: RootState) => state.meetHandler.meetId)
    const context = useMemo(() => {
        return {
            meetId
        }
    }, [meetId])
    return context;
}

export default useMeetInfo;
