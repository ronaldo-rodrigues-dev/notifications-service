import { InMemoryNotificationRepository } from "@test/repositories/in-memory-respository-notifications"
import { CancelNotification } from "./cancel-notification"
import { NotificationNotFoundError } from "./errors/notification-not-found-error"
import { makeNotification } from "@test/factories/norification-factory"

describe('Cancel Notification', () => {
    test('deve ser capaz de cancelar a notificação', async () => {
        const notificationRepository = new InMemoryNotificationRepository()                
        const cancelNotification = new CancelNotification(notificationRepository)

        const notification = makeNotification()
        await cancelNotification.execute({
            notificationID: notification.id
        })        

        expect(notificationRepository.notifications[0].cancelAt).toEqual(
            expect.any(Date)
        )         
    }) 

    test('não deve ser capaz de cancelar uma notificação não existente', async () => {
        const notificationRepository = new InMemoryNotificationRepository()                
        const cancelNotification = new CancelNotification(notificationRepository)                       

        expect(() => {
            return cancelNotification.execute({
                notificationID: 'fake-notificationID'
            }) 
        }).rejects.toThrow(NotificationNotFoundError)        
    })
})