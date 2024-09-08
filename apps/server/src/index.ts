import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const server = createServer(app);
const io = new Server(server);
const usersToMeet = new Map();

io.on("connection", (socket) => {
    console.log(`Someone connected to socket server and socket id is ${socket.id}`);
    socket.on("create-meet", ({meetId, userData}) => {
        usersToMeet.set(meetId, [socket.id, userData]);
    })
})

server.listen(8080, () => {
    console.log(`Server listening on port 8080`);
});
