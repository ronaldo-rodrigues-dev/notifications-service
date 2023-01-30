import { Notification } from "@app/entities/notification"
import { Injectable } from "@nestjs/common"
import { NotificationRepository } from "../repositories/notifications-repository"

interface GetRecipientNotificationRequest {
    recipientID: string
}

interface GetRecipientNotificationResponse {
    notifications: Notification[]
} 

@Injectable()
export class GetRecipientNotification { 
    constructor (private notificationRepository: NotificationRepository) { }

    async execute(req: GetRecipientNotificationRequest): Promise<GetRecipientNotificationResponse> {
        const { recipientID } = req

        const notifications = await this.notificationRepository.findManyByRecipientID(recipientID) 
        return {
            notifications
        }
    }   
}