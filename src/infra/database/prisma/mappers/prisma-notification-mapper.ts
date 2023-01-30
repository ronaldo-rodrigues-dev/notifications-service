import { Notification as RawNotification } from "@prisma/client"
import { Notification } from "@app/entities/notification";
import { Content } from "@app/entities/content";

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

    static toDomain(raw: RawNotification): Notification { 
        return new Notification({             
            recipientID: raw.recipienteID, 
            content: new Content(raw.content), 
            category: raw.category, 
            readAt: raw.readAt, 
            cancelAt: raw.cancelAt, 
            createdAt: raw.createdAt
        }, raw.id)
    }
}