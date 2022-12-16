import { InMemoryNotificationRepository } from "@test/repositories/in-memory-respository-notifications"
import { SendNotification } from "./send-notification" 

describe('Send Notification', () => {
    test('deve ser capaz de enviar uma notificação', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const sendNotification = new SendNotification(notificationRepository)

        const { notification } = await sendNotification.execute({
            recipientID: 'example-recipiendID', 
            content: 'This is first notification', 
            category: 'Tests'
        })        

        expect(notificationRepository.notifications[0]).toEqual(notification) 
        // expect(notificationRepository.notifications).toHaveLength(1) 
    })    
})