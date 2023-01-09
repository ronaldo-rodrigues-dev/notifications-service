import { Injectable } from "@nestjs/common"
import { NotificationRepository } from "../repositories/notifications-repository"

interface CountRecipientNotificationRequest {
    recipientID: string
}

interface CountRecipientNotificationResponse {
    count: number
} 

@Injectable()
export class CountRecipientNotification { 
    constructor (private notificationRepository: NotificationRepository) { }

    async execute(req: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
        const { recipientID } = req

        const count = await this.notificationRepository.countManyByRecipientID(recipientID)         
        return {
            count
        }
    }   
}