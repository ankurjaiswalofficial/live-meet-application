'use client';
import React, { useEffect } from "react"
import Base from "./home/Base";
import { signIn, useSession } from 'next-auth/react'
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const user = useUser();
    useEffect(() => {
        console.log(status, session)
        if ((status === "authenticated") && session.user?.email) {
            console.log(status, session)
            user.setUserData(session.user.email);
            console.log(user.email, "hfngcgjfgjd")
        }
        if (status === "loading") {
            console.log(status, session)
        }
        if (status === "unauthenticated") {
            // router.push("/api/auth/signin");
            // router.refresh();
            signIn("google");
        }
    }, [router, session, status, user])
    return (
        <>
            {status === "authenticated" && session && <Base />}
            {status === "loading" && <>Loading... Please Wait</>}
            {status === "unauthenticated" && <Link href={"/api/auth/signin"}><Button>Authenticate</Button></Link>}
        </>
    )
}

