import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { updateDate, updateTime } from "../redux/slices/timeSlice";

const useDateTime = () => {
    const { currentTime, currentDate } = useSelector((state: RootState) => (state.timeHandler))
    const dispatch = useAppDispatch();

    const updateDateTime = useCallback(() => {
        dispatch(updateTime())
        dispatch(updateDate())
    }, [dispatch])

    const context = useMemo(() => {
        return { currentTime, currentDate, updateDate, updateTime, updateDateTime }
    }, [currentTime, currentDate, updateDateTime])
    return context;
}

export default useDateTime;
