import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(function (request: any, response: any) {
  console.log((new Date()) + 'Received requiest for ' + request.url);
  response.end("Not a valid server");
})

const wss = new WebSocketServer({ server });

wss.on('connection', function (ws) {
  console.log("WebSocket Connected");

  ws.on('message', function (message: WebSocket.RawData) {
    try {
      const data = JSON.parse(message.toString());

      switch (data.type) {
        case "offer":
          console.log("Offer received");
          // Broadcast the offer to all connected clients except the sender
          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "offer", offer: data.offer }));
            }
          });
          break;

        case "answer":
          console.log("Answer received");
          // Broadcast the answer to all connected clients except the sender
          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "answer", answer: data.answer }));
            }
          });
          break;

        case "iceCandidate":
          console.log("ICE Candidate received");
          // Broadcast the ICE candidate to all connected clients except the sender
          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "iceCandidate", candidate: data.candidate }));
            }
          });
          break;

        default:
          console.log("Unknown message type:", data.type);
          ws.send(JSON.stringify({ type: "null_data", data: data }))
          break;
      }

      console.log("Message data:", data);

    } catch (error) {
      console.error("Error processing message:", error);
    }
  });
});


server.listen(8080, function () {
  console.log((new Date()), "Listening at port 8080")
})
