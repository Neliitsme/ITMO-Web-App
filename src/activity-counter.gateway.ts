import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ActivityCounterService } from './activity-counter/activity-counter.service';

@WebSocketGateway()
export class ActivityCounterGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly activityCounterService: ActivityCounterService,
  ) {}

  @SubscribeMessage('connection')
  async requestAllMessages(@ConnectedSocket() socket: Socket) {
    return await this.activityCounterService.getAllCounters();
  }

  @SubscribeMessage('send_user_count')
  async sendUserCount() {
    const userCount = await this.activityCounterService.updateUserCount();
    this.server.sockets.emit('receive_user_count', { userCount: userCount });
  }

  @SubscribeMessage('send_item_count')
  async sendItemCount() {
    const itemCount = await this.activityCounterService.updateItemCount();
    this.server.sockets.emit('receive_item_count', { itemCount: itemCount });
  }
}
