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

const meetMap = new Map<string, [string, Map<string, Array<any>>]>();

io.on("connection", (socket) => {
    console.log(`Someone connected to socket server and socket id is ${socket.id}`);
    socket.on("open", (data) => {
        console.log(data);
    })
    socket.on("join-meet", (data) => {
        if (meetMap.has(data.meetId)){
            const host = meetMap.get(data.meetId)[0];
            socket.to()
            meetMap.get(data.meetId)[1].set(data.userData.peerId, data.userData);
        }


        socket.emit("joint-meet", data);
    })
    socket.on("disconnect", () => {
        console.log("Closing Socket")
    })
})

server.listen(8080, () => {
    console.log(`Server listening on port 8080`);
});
