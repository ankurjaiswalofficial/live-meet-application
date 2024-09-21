import { prisma } from "@/lib/prisma";

const createMeet = async (user: any, meetType: string) => {
    const meet = await prisma.meet.create({
        data: {
            active: true,
            hostId: user.id,
            peers: [],
        }
    })
    console.log("Meet Created with data", meet);
    return meet.id;
}

const joinMeet = async (meetId: string, userId: string) => {
    const meet = await prisma.meet.findUnique({
        where: {
            id: meetId,
        },
        select: {
            hostId: true,
            peers: true,
        },
    });

    if (!meet) {
        return { error: "Meet not found" };
    }

    const isUserInMeet = meet.hostId === userId || meet.peers.includes(userId);

    if (isUserInMeet) {
        // User can join the meet
        console.log("User is allowed to join the meet");
    } else {
        // User is not allowed to join
        throw new Error("User is not authorized to join this meet");
    }
};


export { createMeet, joinMeet };
