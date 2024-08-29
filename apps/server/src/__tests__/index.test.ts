import {WebSocket} from 'ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { Server } from 'http';

const port = 8080;
let server: Server;
let wsServer: WebSocketServer;

beforeAll((done) => {
  server = createServer();
  wsServer = new WebSocketServer({ server });

  wsServer.on('connection', (ws) => {
    ws.on('message', (message) => {
      // Broadcast message to other clients
      wsServer.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });
  });

  server.listen(port, done);
});

afterAll((done) => {
  wsServer.close();
  server.close(done);
});

test('should broadcast messages to other clients', (done) => {
  const client1 = new WebSocket(`ws://localhost:${port}`);
  const client2 = new WebSocket(`ws://localhost:${port}`);

  client1.on('open', () => {
    client2.on('message', (message) => {
      expect(message.toString()).toBe('hello');
      client1.close();
      client2.close();
      done();
    });

    client1.send('hello');
  });
});
