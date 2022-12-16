import { Injectable } from "@nestjs/common"
import { NotificationRepository } from "../repositories/notifications-repository"
import { NotificationNotFoundError } from "./errors/notification-not-found-error"

interface CancelNotificationRequest {
    notificationID: string    
}

type CancelNotificationResponse = void

@Injectable()
export class CancelNotification { 
    constructor (private notificationRepository: NotificationRepository) { }

    async execute(req: CancelNotificationRequest): Promise<CancelNotificationResponse> {
        const { notificationID } = req

        const notification = await this.notificationRepository.findByID(notificationID)        
        if (!notification) throw new NotificationNotFoundError()

        notification.cancel()
        await this.notificationRepository.save(notification)
    }   
}