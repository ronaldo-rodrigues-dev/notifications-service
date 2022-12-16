import { Injectable } from "@nestjs/common"
import { Content } from "../entities/content"
import { Notification } from "../entities/notification"
import { NotificationRepository } from "../repositories/notifications-repository"

interface SendNotificationRequest {
    recipientID: string
    content: string
    category: string 
}

interface SendNotificationResponse {
    notification: Notification
}

@Injectable()
export class SendNotification { 
    constructor (private notificationRepository: NotificationRepository) { }

    async execute(req: SendNotificationRequest): Promise<SendNotificationResponse> {
        const { recipientID, content, category } = req

        const notification = new Notification({
            recipientID: recipientID, 
            content: new Content(content),
            category: category
        }) 

        await this.notificationRepository.create(notification)

        return {
            notification
        }
    }   
}