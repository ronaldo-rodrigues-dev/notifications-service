import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notification";
import { NotificationRepository } from "@app/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository { 
    constructor(private prisma: PrismaService) {}    
    
    async findByID(notificationID: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({ 
            where: {
                id: notificationID 
            }             
        })

        if (!notification) {
            return null
        }

        return PrismaNotificationMapper.toDomain(notification)
    }

    async findManyByRecipientID(recipientID: string): Promise<Notification[]> {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipienteID: recipientID
            }
        })

        return notifications.map(PrismaNotificationMapper.toDomain)
        // return notifications.map((notification) => {
        //     return PrismaNotificationMapper.toDomain(notification)
        // })
    }

    async countManyByRecipientID(recipientID: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipienteID: recipientID
            }
        })
        
        return count
    }    

    async create(notification: Notification): Promise<void> { 
        const raw = PrismaNotificationMapper.toPrisma(notification)

        await this.prisma.notification.create({
            data: raw
        })
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification)

        await this.prisma.notification.update({
            where: {
                id: raw.id 
            }, 
            data: raw
        })
    }
}