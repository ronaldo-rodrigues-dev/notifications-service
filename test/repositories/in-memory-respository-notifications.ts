import { Notification } from "@app/entities/notification"
import { NotificationRepository } from "@app/repositories/notifications-repository"

export class InMemoryNotificationRepository implements NotificationRepository {        
    public notifications: Notification[] = []

    async findByID(notificationID: string): Promise<Notification | null> {
        const notification = this.notifications.find(
            (item) => item.id === notificationID
        )

        if (!notification)
            return null 

        return notification
    }

    async findManyByRecipientID(recipientID: string): Promise<Notification[]> {
        return this.notifications.filter(
            (notification) => notification.recipientID === recipientID
        )                 
    } 

    async countManyByRecipientID(recipientID: string): Promise<number> {
        return this.notifications.filter(
            (notification) => notification.recipientID === recipientID
        ).length                 
    } 

    async create(notification: Notification) {
        this.notifications.push(notification) 
    }

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(
            (item) => item.id === notification.id
        )

        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification
        }
    }      
}