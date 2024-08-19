import React, { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from './ui/button';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

interface TooltipIconButtonProps { title: string, className?: string, onClick?: () => void, children: ReactNode, disabled?: boolean, active?: boolean, required?: boolean, ghost?: boolean }

function TooltipIconButton({ title, className, onClick, children, disabled = false, active = false, required = false, ghost = false }: TooltipIconButtonProps) {

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button size={"icon"} variant={"default"} className={
                    cn(
                        "rounded-full bg-neutral-700 hover:bg-neutral-700 w-11 h-11",
                        { "bg-blue-500 hover:bg-blue-500": active },
                        { "bg-red-600 hover:bg-red-700": required },
                        { "bg-blue-500 hover:bg-blue-500": (active && required) },
                        { "bg-transparent border border-neutral-700": ghost }, className)}
                    onClick={onClick} disabled={disabled}>
                    {children}
                    <span className="sr-only">{title}</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-medium">{title}</p>
                <TooltipArrow />
            </TooltipContent>
        </Tooltip>
    )
}

export default TooltipIconButton
