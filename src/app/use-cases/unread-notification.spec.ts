import { InMemoryNotificationRepository } from "@test/repositories/in-memory-respository-notifications"
import { UnreadNotification } from "./unread-notification"
import { NotificationNotFoundError } from "./errors/notification-not-found-error"
import { makeNotification } from "@test/factories/norification-factory"

describe('Read Notification', () => {
    test('deve ser capaz de ler a notificação', async () => {
        const notificationRepository = new InMemoryNotificationRepository()                
        const unreadNotification = new UnreadNotification(notificationRepository)

        const notification = makeNotification( {
            readAt: new Date() 
        }) 
        
        await notificationRepository.create(notification)

        await unreadNotification.execute({
            notificationID: notification.id
        })        

        expect(notificationRepository.notifications[0].readAt).toBeNull()     
    }) 

    test('não deve ser capaz de ler uma notificação não existente', async () => {
        const notificationRepository = new InMemoryNotificationRepository()                
        const unreadNotification = new UnreadNotification(notificationRepository)                       

        expect(() => {
            return unreadNotification.execute({
                notificationID: 'fake-notificationID'
            }) 
        }).rejects.toThrow(NotificationNotFoundError) 
    }) 
})