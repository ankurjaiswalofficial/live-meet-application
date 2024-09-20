import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('Request LOG: ', req)
        const body = await req.json();
        
        const user = await prisma.user.findUnique({
            where: { email: body.email }
        });
        console.log('Request LOG USER: ', user)
        if (!user) {
            return NextResponse.error()
        }
        return NextResponse.json({user: user});
}
