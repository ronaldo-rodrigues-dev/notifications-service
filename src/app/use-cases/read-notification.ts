import { Injectable } from "@nestjs/common"
import { NotificationRepository } from "../repositories/notifications-repository"
import { NotificationNotFoundError } from "./errors/notification-not-found-error"

interface ReadNotificationRequest {
    notificationID: string    
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotification { 
    constructor (private notificationRepository: NotificationRepository) { }

    async execute(req: ReadNotificationRequest): Promise<ReadNotificationResponse> {
        const { notificationID } = req

        const notification = await this.notificationRepository.findByID(notificationID)        
        if (!notification) throw new NotificationNotFoundError()

        notification.read()
        await this.notificationRepository.save(notification)
    } 
} 