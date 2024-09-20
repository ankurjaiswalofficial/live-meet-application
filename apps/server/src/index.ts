import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow all origins (you can specify specific origins if needed)
        methods: ["GET", "POST"], // Allowed HTTP methods
        allowedHeaders: ["my-custom-header"], // Specify allowed headers
        credentials: true // Allow credentials (cookies, authorization headers, etc.)
    }
});
const usersToMeet: Map<string, Map<string, Array<any>>> = new Map();

io.on("connection", (socket) => {
    console.log(`Someone connected to socket server and socket id is ${socket.id}`);

    socket.on("create-meet", ({ meetId, userData }) => {
        if (usersToMeet.get(meetId)) {
            socket.to(socket.id).emit("exists", false);
        }
        else {
            const peerMap: Map<string, Array<any>> = new Map();
            const arrayData = new Array();
            arrayData.push(socket.id);
            arrayData.push(userData);
            peerMap.set(userData.peerId, arrayData);
            usersToMeet.set(meetId, peerMap);
        }
    })

    socket.on("join-meet", ({ meetId, userData }) => {
        console.log("join", userData.peerId);
        console.log("Join Meet by ", userData.peerId);
        if (usersToMeet.get(meetId)) {
            // usersToMeet.get(meetId)?.forEach((peerId) => {
            //     if (peerId !== userData.peerId) {
            //         socket.emit("new-peer", { userData });
            //     }
            // })
            const arrayData = new Array();
            arrayData.push(socket.id);
            arrayData.push(userData);
            usersToMeet.get(meetId)?.set(userData.peerId, arrayData)
                // ?.forEach((peerData) => {
                //     if (peerData[1].peerId !== userData.peerId) {
                //         console.log("New Peer JOIN MEET")
                //         socket.to(peerData[0]).emit("new-peer", { meetId,  });
                //     }
                // })
                // 
            socket.to(socket.id).emit("send-media-status", { meetId, userData });
        }
        else {
            const peerMap: Map<string, Array<any>> = new Map();
            const arrayData = new Array();
            arrayData.push(socket.id);
            arrayData.push(userData);
            peerMap.set(userData.peerId, arrayData);
            usersToMeet.set(meetId, peerMap);
            socket.emit("send-media-status", { meetId, userData });
        }
        // else {
        //     socket.to(socket.id).emit("no-meet", false);
        // }
    })

    socket.on("media-status", ({ meetId, userData, audioActive, videoActive }) => {
        console.log("media", userData.peerId);
        if (usersToMeet.get(meetId)) {
            const arrayData = new Array();
            arrayData.push(socket.id);
            arrayData.push(userData);
            arrayData.push(audioActive);
            arrayData.push(videoActive);
            usersToMeet.get(meetId)
                ?.set(userData.peerId, arrayData)
                ?.forEach((peerData) => {
                    if (peerData[1].peerId !== userData.peerId) {
                        console.log("New Peer exe")
                        socket.to(peerData[0]).emit("new-peer", { meetId, userData, audioActive, videoActive });
                        socket.to(peerData[0]).emit("send-media-status", { meetId, userData: peerData[1] });
                        // socket.to(socket.id).emit("new-peer", {meetId, userData: peerData[1], audioActive: peerData[2], videoActive: peerData[3]})
                    }
                })
            socket.to(socket.id).emit("send-offer", { meetId, userData });
        } else {
            socket.to(socket.id).emit("no-meet", false);
        }
    })

    socket.on("offer", ({ meetId, userData, offer }) => {
        console.log("offer", userData.peerId);
        if (usersToMeet.get(meetId)) {
            usersToMeet.get(meetId)
                ?.forEach((peerData) => {
                    if (peerData[1].peerId !== userData.peerId) {
                        console.log("Offer exe")
                        socket.to(peerData[0]).emit("offer", { meetId, userData, offer });
                    }
                })
        } else {
            socket.to(socket.id).emit("no-meet", false);
        }
    })

    socket.on("answer", ({ meetId, userData, answer }) => {
        console.log("answer", userData.peerId);
        if (usersToMeet.get(meetId)) {
            usersToMeet.get(meetId)
                ?.forEach((peerData) => {
                    if (peerData[1].peerId !== userData.peerId) {
                        console.log("Answer exe")
                        socket.to(peerData[0]).emit("answer", { meetId, userData, answer });
                    }
                })
        } else {
            socket.to(socket.id).emit("no-meet", false);
        }
    })

    socket.on("candidate", ({ meetId, userData, candidate }) => {
        console.log("Candidate received from:", userData.peerId);
        if (usersToMeet.get(meetId)) {
            usersToMeet.get(meetId)?.forEach((peerData) => {
                if (peerData[1].peerId !== userData.peerId) {
                    console.log("Broadcasting candidate to:", peerData[1].peerId);
                    socket.to(peerData[0]).emit("candidate", { meetId, userData, candidate });
                }
            });
        } else {
            socket.to(socket.id).emit("no-meet", false);
        }
    })

    socket.on("disconnect", () => {
        usersToMeet.forEach((meetUsers, meetId) => {
            meetUsers.forEach((userData, peerId) => {
                if (userData[0] === socket.id) {
                    meetUsers.delete(peerId);
                    socket.to(meetId).emit("peer-disconnected", { peerId });
                }
            });
            if (meetUsers.size === 0) {
                usersToMeet.delete(meetId);
            }
        });
    });
})

server.listen(8080, () => {
    console.log(`Server listening on port 8080`);
});
