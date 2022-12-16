import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationView } from '../views/notification-view';

@Controller('notifications')
export class NotificationsController { 
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientID } = body;
    
    const { notification } = await this.sendNotification.execute({
      recipientID, 
      content, 
      category 
    }) 

    return { 
      notification: NotificationView.toHTTP(notification) 
    }
  }
}
