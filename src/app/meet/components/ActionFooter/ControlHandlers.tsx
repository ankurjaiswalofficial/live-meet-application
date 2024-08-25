import TooltipIconButton from '@/components/TooltipIconButton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronUp, Info, MessageSquareTextIcon, ShieldCheck, UserRound, UsersRound } from 'lucide-react'
import React from 'react'

export default function ControlHandlers() {
  return (
    <div className="h-full flex items-center justify-end px-4">
      <div className="flex items-center justify-end">
        <div className="w-fit flex-row flex-nowrap items-center justify-center gap-3 hidden md:flex">
          <TooltipIconButton title="Meeting Details" ghost>
            <Info className="h-5 w-5" />
          </TooltipIconButton>
          <TooltipIconButton title="Show everyone" ghost>
            <UsersRound className="h-5 w-5" />
          </TooltipIconButton>
          <TooltipIconButton title="Show messages" ghost>
            <MessageSquareTextIcon className="h-5 w-5" />
          </TooltipIconButton>
          <TooltipIconButton title="Host controls" ghost>
            <ShieldCheck className="h-5 w-5" />
          </TooltipIconButton>
        </div>
        <div className="w-fit flex-row flex-nowrap items-center justify-center flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='mr-4'>
                <TooltipIconButton
                  title="Meeting Controls"
                  ghost
                >
                  <ChevronUp className="h-5 w-5" />
                </TooltipIconButton>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56 text-neutral-600 mr-4">
              <DropdownMenuGroup>
                <DropdownMenuItem className={"h-12"}>
                  <div className="w-full flex flex-row items-center justify-start">
                    <Info className="w-6 h-6 mr-2" />
                    <div className="flex flex-col items-start justify-center">
                      <p>Meeting Details</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className={"h-12"}>
                  <div className="w-full flex flex-row items-center justify-start">
                    <UserRound className="w-6 h-6 mr-2" />
                    <div className="flex flex-col items-start justify-center">
                      <p>Show Everyone</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className={"h-12"}>
                  <div className="w-full flex flex-row items-center justify-start">
                    <MessageSquareTextIcon className="w-6 h-6 mr-2" />
                    <div className="flex flex-col items-start justify-center">
                      <p>Chat with everyone</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className={"h-12"}>
                  <div className="w-full flex flex-row items-center justify-start">
                    <ShieldCheck className="w-6 h-6 mr-2" />
                    <div className="flex flex-col items-start justify-center">
                      <p>Host Controls</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
