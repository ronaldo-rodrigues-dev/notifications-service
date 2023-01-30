import { InMemoryNotificationRepository } from "@test/repositories/in-memory-respository-notifications"
import { ReadNotification } from "./read-notification"
import { NotificationNotFoundError } from "./errors/notification-not-found-error"
import { makeNotification } from "@test/factories/norification-factory"

describe('Read Notification', () => {
    test('deve ser capaz de ler a notificação', async () => {
        const notificationRepository = new InMemoryNotificationRepository()                
        const readNotification = new ReadNotification(notificationRepository)

        const notification = makeNotification() 
        
        await notificationRepository.create(notification)

        await readNotification.execute({
            notificationID: notification.id
        })        

        expect(notificationRepository.notifications[0].readAt).toEqual(
            expect.any(Date)
        )         
    }) 

    test('não deve ser capaz de ler uma notificação não existente', async () => {
        const notificationRepository = new InMemoryNotificationRepository()                
        const readNotification = new ReadNotification(notificationRepository)                       

        expect(() => {
            return readNotification.execute({
                notificationID: 'fake-notificationID'
            }) 
        }).rejects.toThrow(NotificationNotFoundError)        
    })
})