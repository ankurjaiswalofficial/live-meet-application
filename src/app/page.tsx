"use client";
import Link from "next/link"
import { Calendar, CircleUser, Keyboard, Link2, Menu, MessageSquareWarning, Package2, Plus, Search, Settings, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipArrow } from "@radix-ui/react-tooltip"

import dayjs from 'dayjs';
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = React.useState(dayjs());
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="flex items-center justify-start">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base "
            >
              <div className="w-fit h-ful flex flex-row items-center justify-start gap-1.5">
                <Video className="h-10 w-10 stroke-1 fill-green-500" />
                <span className="text-lg font-medium text-nowrap">Google Meet</span>
              </div>
              <span className="sr-only">Google Meet</span>
            </Link>
          </nav>
          <div className="flex w-full items-center justify-end gap-4 ml-auto">
            <div className="hidden sm:block text-base font-normal ">
              {currentTime.format('HH:mm')} • {currentTime.format('ddd, DD MMM')}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full hidden sm:flex">
                  <MessageSquareWarning className="h-5 w-5" />
                  <span className="sr-only">Report a problem</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">Report a problem</p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full hidden sm:flex">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">Settings</p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar>
                      <AvatarImage src="" alt="@ankurjaiswalofficial@gmail.com" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col items-start justify-start font-medium">
                      <p className="font-bold">User Account</p>
                      <p className="">Ankur Jaiswal</p>
                      <p className="">ankurjaiswalofficial@gmail.com</p>
                    </div>
                    <TooltipArrow />
                  </TooltipContent>
                </Tooltip>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ankur Jaiswal <br /> ankurjaiswalofficial@gmail.com</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={"sm:hidden"}>Feedback</DropdownMenuItem>
                <DropdownMenuItem className={"sm:hidden"}>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted dark:bg-background p-4 md:gap-8 md:p-10">
          <Card className={"max-w-[38rem] my-auto border shadow-none"}>
            <CardHeader className="gap-4 px-0 sm:px-6">
              <CardTitle className="text-5xl font-normal">Video calls and meetings for everyone</CardTitle>
              <CardDescription className="text-xl w-full sm:w-10/12">
                Connect, collaborate and celebrate from anywhere with Google Meet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-6 mt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="text-base gap-2 p-6 px-5 bg-blue-600 text-white hover:bg-blue-700"><Video className="h-6 w-6" /> New Meeting</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={"left-[50%]"} >
                    <DropdownMenuItem className={"p-4 font-medium"} ><Link2 className="h-6 w-6 mr-4" />Create a meeting for later</DropdownMenuItem>
                    <DropdownMenuItem className={"p-4 font-medium"} ><Plus className="h-6 w-6 mr-4" />Start an instant meeting</DropdownMenuItem>
                    <DropdownMenuItem className={"p-4 font-medium"} ><Calendar className="h-6 w-6 mr-4" />Schedule in Google Calendar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex-grow flex flex-row flex-wrap items-center justify-start gap-2">
                  <div className="relative w-64">
                    <Keyboard className="absolute top-[50%] translate-y-[-50%] left-3 h-6 w-6 text-muted-foreground " />
                    <Input
                      type="text"
                      placeholder="Enter your code or link"
                      className="text-base rounded-lg bg-background flex-grow p-6 pl-12"
                    />
                  </div>
                  <Button variant={"ghost"} className="text-base gap-2 p-6 text-blue-700 hover:bg-blue-100 hover:text-blue-800">Join</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <p className="text-sm">
                <Link href={"#"} className="text-blue-500">Learn More</Link> about Google Meet
              </p>
            </CardFooter>
          </Card>
        </main>
      </div>
  )
}

