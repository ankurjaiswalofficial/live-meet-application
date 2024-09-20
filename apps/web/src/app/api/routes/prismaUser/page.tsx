"use server";
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;
        
        // Ensure proper Prisma handling
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json(user); // Return the actual user object directly
    } else {
        res.status(404).json({ error: "Method Not Allowed" });
    }
}
