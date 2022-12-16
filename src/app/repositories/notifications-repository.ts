import { Notification } from "../entities/notification";

export abstract class NotificationRepository {
    abstract findByID(notificationID: string): Promise<Notification | null> 

    abstract create(notification: Notification): Promise<void> 
    abstract save(notification: Notification): Promise<void> 
}