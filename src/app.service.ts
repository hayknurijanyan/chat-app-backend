import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Server is Ready! Run the chat-app to start chatting...';
  }
}
