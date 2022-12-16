import { Notification } from "@app/entities/notification";

export class PrismaNotificationMapper { 
    static toPrisma(notification: Notification) { 
        return { 
            id: notification.id, 
            recipienteID: notification.recipientID, 
            content: notification.content.value, 
            category: notification.category, 
            readAt: notification.readAt, 
            createdAt: notification.createdAt
        }
    }
}