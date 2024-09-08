declare module 'socket.io-stream' {
    import { Duplex } from 'stream';
    import { Socket } from 'socket.io';
  
    function ss(socket: Socket): {
      emit(event: string, stream: Duplex, data?: any): void;
      on(event: string, callback: (stream: Duplex, data?: any) => void): void;
    };
  
    namespace ss {
      function createStream(): Duplex;
    }
  
    export = ss;
  }
  