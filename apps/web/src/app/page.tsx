'use client';
import React, { useEffect } from "react"
import Base from "./home/Base";
import { signIn, useSession } from 'next-auth/react'
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const user = useUser();
    useEffect(() => {
        console.log(status, session)
        if ((status === "authenticated") && session.user?.email) {
            user.setUserData(session.user.email);
        }
        if (status === "loading") {
            console.log(status, session)
        }
        if (status === "unauthenticated") {
            // router.push("/api/auth/signin");
            // router.refresh();
            signIn();
        }
    }, [status])
    return (
        <>
            {status === "authenticated" && session && <Base />}
            {status === "loading" && <>Loading... Please Wait</>}
            {status === "unauthenticated" && <Link href={"/api/auth/signin"}><Button>Authenticate</Button></Link>}
        </>
    )
}

