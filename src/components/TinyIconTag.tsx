import React from 'react';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';

interface TinyIconTagProps {
    className?: string;
    ActiveIcon: React.JSXElementConstructor<LucideProps>;
    FallbackIcon: React.JSXElementConstructor<LucideProps> | null;
    activeHandler?: boolean | null;
    absoluted?: boolean;
    show?: boolean;
}

export default function TinyIconTag({
    className,
    ActiveIcon,
    FallbackIcon,
    activeHandler,
    ...props
}: Readonly<TinyIconTagProps>) {
    return (
        <div
            className={cn(
                "text-white rounded-full bg-neutral-700 p-2",
                { "hidden": (props.show === false) },
                { "absolute top-2 right-2": props.absoluted },
                className
            )}
        >
            {activeHandler ? (
                <ActiveIcon className="h-4 w-4" />
            ) : (
                FallbackIcon && <FallbackIcon className="h-4 w-4" />
            )}
        </div>
    );
}
