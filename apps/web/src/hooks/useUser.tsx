import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useAppDispatch } from './useAppDispatch';
import { userSliceActions } from '../redux/slices/userSlice';
import { UserDataInterface } from '@/types/user-types';


const useUser = () => {
    const { username, email, imgSrc, peerId, userData } = useSelector((state: RootState) => state.userHandler)
    const dispatch = useAppDispatch();

    const setUserData = useMemo(() => (userData: UserDataInterface) => dispatch(userSliceActions.setUser(userData)), [dispatch]);
    const context = useMemo(() => {
        return {
            username, email, imgSrc, peerId, userData, setUserData
        }
    }, [email, imgSrc, peerId, username, userData, setUserData]);

    return context;
}

export default useUser;
