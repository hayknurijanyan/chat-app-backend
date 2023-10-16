import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import ChatMessage from './chatTypes';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  private chatHistory: string[] = [];

  handleConnection(client: Socket) {
    client.emit('chatHistory', this.chatHistory);
    client.on('message', (message: string) => {
      this.chatHistory.push(message);
    });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: ChatMessage): void {
    this.server.emit('message', message);
  }
}
