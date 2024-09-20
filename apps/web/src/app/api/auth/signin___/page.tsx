"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator";
import { handleOAuth } from '@/lib/auth';


function Authentication() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        })

        if (result) {
            router.push('/')
            router.refresh()
            console.log(result)
        } else {
            // Handle error
            // @ts-ignore
            console.error(result.error)
        }
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card className="max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign-In/Sign-Up</CardTitle>
                <CardDescription>
                    Enter your information to SignIn / SignUp into <b>Google Meet Clone</b>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="********"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Signin/ SignUp
                    </Button>
                </form>
                    <Separator title="Other Options" />
                    <Button variant="outline" className="w-full" onClick={() => handleOAuth('google')}>
                        Login with Google
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleOAuth('github')}>
                        Login with GitHub
                    </Button>
            </CardContent>
        </Card>
        </div>
    )
}

export default Authentication;
