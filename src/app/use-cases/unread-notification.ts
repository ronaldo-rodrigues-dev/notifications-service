import { Injectable } from "@nestjs/common"
import { NotificationRepository } from "../repositories/notifications-repository"
import { NotificationNotFoundError } from "./errors/notification-not-found-error"

interface UnreadNotificationRequest {
    notificationID: string    
}

type UnreadNotificationResponse = void

@Injectable()
export class UnreadNotification { 
    constructor (private notificationRepository: NotificationRepository) { }

    async execute(req: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
        const { notificationID } = req

        const notification = await this.notificationRepository.findByID(notificationID)        
        if (!notification) throw new NotificationNotFoundError()

        notification.unread()
        await this.notificationRepository.save(notification)
    } 
} 