import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationView } from '../views/notification-view';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification';
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController { 
  constructor(
    private sendNotification: SendNotification, 
    private cancelNotification: CancelNotification, 
    private readNotification: ReadNotification, 
    private unreadNotification: UnreadNotification, 
    private countRecipientNotification: CountRecipientNotification, 
    private getRecipientNotification: GetRecipientNotification
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationID: id
    })
  } 

  @Get('count/from/:recipientID')                 
  async countFromRecipient(@Param('recipientID') recipientID: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientID 
    }) 

    return {
      count
    }          
  } 
  
  @Get('from/:recipientID')                 
  async getFromRecipient(@Param('recipientID') recipientID: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientID 
    }) 

    return {
      notifications: notifications.map(NotificationView.toHTTP)
    }          
  } 

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationID: id
    })
  } 

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationID: id
    })
  } 

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