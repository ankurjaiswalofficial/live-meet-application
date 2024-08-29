import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { FullscreenIcon } from 'lucide-react';
import { toggleFullscreen } from '@/app/redux/slices/fullscreenSlice';
import { RootState } from '@/app/redux/store';
import { useAppDispatch } from '@/app/redux/hooks';

export default function FullscreenHandler() {
    const isFullscreen = useSelector((state: RootState) => state.fullScreen.isFullscreen);

    const dispatch = useAppDispatch();
    const handleIsFullscreen = useCallback(() => {
        dispatch(toggleFullscreen());
    }, [dispatch]);

    return (
        <DropdownMenuItem className={"h-12"} onClick={handleIsFullscreen}>
            <div className="w-full flex flex-row items-center justify-start">
                <FullscreenIcon className="w-6 h-6 mr-2" />
                <div className="flex flex-col items-start justify-center">
                    {isFullscreen ? <p>Exit Full Screen</p> : <p>Full Screen</p>}
                </div>
            </div>
        </DropdownMenuItem>
    );
}
